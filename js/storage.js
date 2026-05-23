// Handles loading/saving localStorage data, course JSON fetches, demo seed data, and SMART target text.
function loadConsultantDatabase() {
  const saved = localStorage.getItem(CONSULTANT_STORAGE_KEY);
  if (!saved) return CONSULTANTS;

  try {
    const parsed = JSON.parse(saved);
    // Ensure we actually got an array and not a corrupted object/string
    return Array.isArray(parsed) ? parsed : CONSULTANTS;
  } catch (error) {
    console.error("Failed to parse consultant database, falling back to seeds", error);
    return CONSULTANTS;
  }
}

function saveConsultantDatabase() {
  localStorage.setItem(CONSULTANT_STORAGE_KEY, JSON.stringify(CONSULTANTS));
}

async function loadCourseData() {
  try {
    const response = await fetch("data/courses.json");
    if (!response.ok) return;
    courseData = await response.json();
    renderCurrentView();
  } catch (error) {
    courseData = FALLBACK_COURSES;
  }
}

function loadSavedData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const seed = createSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return mergeSavedData(JSON.parse(saved));
  } catch (error) {
    const seed = createSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

function loadAuthData() {
  const defaults = { passwords: {}, changed: {} };
  getAuthAccounts().forEach(account => {
    defaults.passwords[account.key] = getDefaultPassword(account.username);
    defaults.changed[account.key] = false;
  });

  const saved = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!saved) return defaults;

  try {
    const parsed = JSON.parse(saved);
    return {
      passwords: { ...defaults.passwords, ...(parsed.passwords || {}) },
      changed: { ...defaults.changed, ...(parsed.changed || {}) }
    };
  } catch (error) {
    return defaults;
  }
}

function saveAuthData() {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
}

function mergeSavedData(saved) {
  const seed = createSeedData();
  CONSULTANTS.forEach(consultant => {
    const savedProgress = saved?.progress?.[consultant.id] || {};
    const savedTargets = saved?.targets?.[consultant.id] || {};
    seed.progress[consultant.id] = { ...seed.progress[consultant.id], ...savedProgress };
    seed.targets[consultant.id] = { ...seed.targets[consultant.id], ...savedTargets };
  });
  return seed;
}

function createSeedData() {
  const progress = {};
  const targets = {};

  CONSULTANTS.forEach(consultant => {
    progress[consultant.id] = {};
    targets[consultant.id] = {};
    seedConsultantProgress(consultant, progress[consultant.id]);
  });

  limitSharedStatus(progress, "complete", 2);
  addSeedTargets(progress, targets);

  return { progress, targets };
}

function seedConsultantProgress(consultant, progressMap) {
  const skills = getRoleSkills(consultant.roleId);
  const completeTarget = randomInt(2, Math.min(7, skills.length - 2));
  const inProgressTarget = randomInt(2, Math.min(5, skills.length - completeTarget));
  const shuffled = [...skills].sort(() => Math.random() - 0.5);

  shuffled.forEach((item, index) => {
    if (index < completeTarget) {
      progressMap[item.id] = "complete";
    } else if (index < completeTarget + inProgressTarget) {
      progressMap[item.id] = "in-progress";
    } else {
      progressMap[item.id] = "not-started";
    }
  });
}

function addSeedTargets(progress, targets) {
  const deadlines = ["2026-06-18", "2026-06-28", "2026-07-05", "2026-07-12", "2026-07-19"];
  CONSULTANTS.forEach((consultant, consultantIndex) => {
    const targetSkills = getRoleSkills(consultant.roleId)
      .filter(item => progress[consultant.id][item.id] === "in-progress")
      .slice(0, consultantIndex % 3 === 0 ? 2 : 1);

    targetSkills.forEach((item, index) => {
      targets[consultant.id][item.id] = target(item.id, deadlines[(consultantIndex + index) % deadlines.length]);
    });
  });
}

function limitSharedStatus(progress, status, maxSharedSkills) {
  let sharedSkills = 0;
  Object.values(ROLES).forEach(role => {
    role.skills.forEach(item => {
      const relevantConsultants = CONSULTANTS.filter(consultant => consultant.roleId === item.roleId);
      const matches = relevantConsultants.filter(consultant => progress[consultant.id][item.id] === status);
      if (matches.length < 2) return;

      sharedSkills += 1;
      if (sharedSkills <= maxSharedSkills) return;

      matches.slice(1).forEach(consultant => {
        progress[consultant.id][item.id] = "in-progress";
      });
    });
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function target(skillId, deadline) {
  const item = getSkillById(skillId);
  return {
    text: makeSmartTarget(item, deadline),
    deadline
  };
}

function makeSmartTarget(item, deadline) {
  const resource = getResources(item.id)[0];
  const dateText = deadline || "the selected deadline";
  return `By ${dateText}, I will improve ${item.name} by completing "${resource.title}" and applying it to a practical ${item.category.toLowerCase()} task, then evidence my progress with notes, examples, or a short demo for my ${ROLES[item.roleId].title} roadmap.`;
}
