// Shared lookup and reporting helpers used by consultant, admin, auth, and storage modules.
function getConsultant(id) {
  return CONSULTANTS.find(person => person.id === id);
}

function getAuthAccounts() {
  return [
    ...CONSULTANTS.map(person => ({
      key: `consultant:${person.id}`,
      type: "consultant",
      id: person.id,
      name: person.name,
      username: person.username || makeUsername(person.name)
    })),
    ...ADMIN_ACCOUNTS.map(admin => ({
      key: `admin:${admin.id}`,
      type: "admin",
      id: admin.id,
      name: admin.name,
      username: admin.username
    }))
  ];
}

function makeUsername(name) {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .join(".");
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function getDefaultPassword(username) {
  return `${username}1`;
}

function isValidSession(session) {
  if (!session) return false;
  if (session.type === "admin") return ADMIN_ACCOUNTS.some(admin => admin.id === session.id);
  return session.type === "consultant" && Boolean(getConsultant(session.id));
}

function getConsultantsByRole(roleId) {
  return CONSULTANTS.filter(person => person.roleId === roleId);
}

function getComparableRoleIds() {
  return Object.keys(ROLES).filter(roleId => getConsultantsByRole(roleId).length >= 2);
}

function getDefaultComparisonRoleId() {
  return getComparableRoleIds()[0] || Object.keys(ROLES)[0];
}

function getDefaultComparisonPair(roleId) {
  return getConsultantsByRole(roleId).slice(0, 2).map(person => person.id);
}

function normalizeComparisonState() {
  const comparableRoleIds = getComparableRoleIds();
  if (!comparableRoleIds.includes(comparisonRoleId)) {
    comparisonRoleId = comparableRoleIds[0] || Object.keys(ROLES)[0];
  }

  const rolePeople = getConsultantsByRole(comparisonRoleId);
  const rolePersonIds = rolePeople.map(person => person.id);
  comparisonConsultantIds = [...new Set(comparisonConsultantIds.filter(id => rolePersonIds.includes(id)))];

  rolePersonIds.forEach(id => {
    if (comparisonConsultantIds.length < 2 && !comparisonConsultantIds.includes(id)) {
      comparisonConsultantIds.push(id);
    }
  });

  comparisonConsultantIds = comparisonConsultantIds.slice(0, 2);
}

function getRoleSkills(roleId) {
  return ROLES[roleId].skills;
}

function getSkillById(skillId) {
  return Object.values(ROLES).flatMap(role => role.skills).find(item => item.id === skillId);
}

function getStatus(consultantId, skillId) {
  return appData.progress[consultantId]?.[skillId] || "not-started";
}

function getVerificationStatus(consultantId, skillId) {
  return appData.verifications?.[consultantId]?.[skillId] || null;
}

function getComment(consultantId, skillId) {
  return appData.comments?.[consultantId]?.[skillId] || "";
}

function isTargetOverdue(deadline) {
  if (!deadline) return false;
  const today = new Date().toISOString().slice(0, 10);
  return deadline < today;
}

function hasPendingVerifications(consultantId) {
  const person = getConsultant(consultantId);
  if (!person || !person.roleId || !ROLES[person.roleId]) return false;
  return getRoleSkills(person.roleId).some(skill => 
    getStatus(person.id, skill.id) === "complete" && getVerificationStatus(person.id, skill.id) === null
  );
}

function getResources(skillId) {
  return courseData[skillId] || FALLBACK_COURSES[skillId] || [];
}

function getConsultantStats(consultantId, roleId) {
  const consultant = getConsultant(consultantId);
  const effectiveRoleId = roleId && ROLES[roleId] ? roleId : consultant.roleId;
  if (!effectiveRoleId || !ROLES[effectiveRoleId]) {
    return { complete: 0, inProgress: 0, notStarted: 0, targetCount: 0, progressPercent: 0 };
  }
  const skills = getRoleSkills(effectiveRoleId);

  let complete = 0;
  let inProgress = 0;
  let notStarted = 0;

  skills.forEach(item => {
    const status = getStatus(consultantId, item.id);
    const verification = getVerificationStatus(consultantId, item.id);
    
    if (status === "complete" && verification === "verified") {
      complete++;
    } else if (status === "in-progress" || (status === "complete" && verification !== "verified")) {
      inProgress++;
    } else {
      notStarted++;
    }
  });

  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTotalSkillCount() {
  return Object.values(ROLES).reduce((total, role) => total + role.skills.length, 0);
}

function getTeamStats() {
  if (CONSULTANTS.length === 0) return { averageProgress: 0, targetCount: 0, pendingVerificationCount: 0, overdueTargetCount: 0 };
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);

  let pendingVerificationCount = 0;
  let overdueTargetCount = 0;
  CONSULTANTS.forEach(person => {
    if (!person.roleId || !ROLES[person.roleId]) return;
    getRoleSkills(person.roleId).forEach(skill => {
      if (getStatus(person.id, skill.id) === "complete" && getVerificationStatus(person.id, skill.id) === null) {
        pendingVerificationCount++;
      }
    });

    const targets = appData.targets[person.id] || {};
    Object.values(targets).forEach(t => {
      if (isTargetOverdue(t.deadline)) overdueTargetCount++;
    });
  });

  return { averageProgress, targetCount, pendingVerificationCount, overdueTargetCount };
}

function getSkillRanking(status) {
  const allSkills = Object.values(ROLES).flatMap(r => r.skills);
  const skillCounts = allSkills.map(skill => {
    const relevantConsultants = CONSULTANTS.filter(c => c.roleId === skill.roleId);
    let count = 0;
    relevantConsultants.forEach(c => {
      if (getStatus(c.id, skill.id) === status) {
        count++;
      }
    });
    return { ...skill, count, applicableCount: relevantConsultants.length };
  }).filter(item => item.applicableCount > 0);

  return skillCounts
    .sort((a, b) => (b.count - a.count) || (b.applicableCount - a.applicableCount) || a.name.localeCompare(b.name))
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
