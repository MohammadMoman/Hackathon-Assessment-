// Renders the consultant role selection, dashboard, skill accordions, status controls, and SMART editor.
function renderRoleSelection() {
  if (!activeSession || activeSession.type !== "consultant") {
    renderLogin();
    return;
  }

  setView("role");
  clearCharts();
  logoutButton.classList.remove("hide");
  activeConsultantId = activeSession.id;
  const consultant = getConsultant(activeConsultantId);
  const currentRoleId = getActiveRoleId(consultant);
  app.innerHTML = `
    <section class="role-picker">
      <div class="role-picker-hero">
        <div>
          <p class="eyebrow">Choose your skills pathway</p>
          <h2>${consultant.name}, pick the role you want to build toward</h2>
          <p>Each pathway opens a tailored skills matrix with level-by-level progression, SMART targets, and Learning Bridge resources.</p>
        </div>
        <div class="role-picker-stat">
          <strong>${Object.keys(ROLES).length}</strong>
          <span>available roles</span>
        </div>
      </div>
      <div class="role-selection">
        ${Object.entries(ROLES).map(([roleId, roleItem]) => `
          <article class="role-card ${roleId === currentRoleId ? "selected" : ""}">
            <div class="role-card-top">
              <span class="role-icon"><i class="fa-solid ${getRoleIcon(roleId)}" aria-hidden="true"></i></span>
              <span class="pill">${roleItem.skills.length} skills</span>
            </div>
            <div class="role-card-body">
              <h3>${roleItem.title}</h3>
              <p>${roleItem.summary}</p>
              <div class="role-levels" aria-label="${roleItem.title} levels">
                ${LEVELS.map(level => `
                  <span>${level.label.replace("Level ", "L").split(":")[0]} <strong>${roleItem.skills.filter(item => item.level === level.key).length}</strong></span>
                `).join("")}
              </div>
            </div>
            <button class="primary-button" data-role-select="${roleId}" type="button" style="width: 100%;">
              <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
              Start ${roleItem.title}
            </button>
          </article>
        `).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-role-select]").forEach(button => {
    button.addEventListener("click", () => {
      selectedRoleId = button.dataset.roleSelect;
      saveUiState();
      renderConsultantDashboard(consultant.id, { roleId: selectedRoleId });
    });
  });
}

function renderConsultantDashboard(consultantId, options = {}) {
  clearCharts();
  const readOnly = options.readOnly === true;
  if (!readOnly && (!activeSession || activeSession.type !== "consultant" || activeSession.id !== consultantId)) {
    renderLogin();
    return;
  }
  if (readOnly && (!activeSession || activeSession.type !== "admin")) {
    renderLogin();
    return;
  }

  const consultant = getConsultant(consultantId);
  if (!readOnly) activeConsultantId = consultant.id;
  const roleId = options.roleId || (readOnly ? consultant.roleId : getActiveRoleId(consultant));
  if (!readOnly && !roleId) {
    renderRoleSelection();
    return;
  }
  const role = ROLES[roleId] || ROLES[consultant.roleId];
  const stats = getConsultantStats(consultant.id, roleId);
  setView(readOnly ? "admin" : "consultant");
  logoutButton.classList.remove("hide");

  app.innerHTML = `
    <section>
      <div class="view-header">
        <div>
          <p class="eyebrow">${readOnly ? "Admin read-only matrix" : "Consultant dashboard"}</p>
          <h2>${consultant.name} - ${role.title}</h2>
          <p>${role.summary}</p>
        </div>
        <div class="view-actions">
          ${!readOnly ? `<button class="secondary-button" id="changeRole" type="button"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Change role</button>` : `    <button class="secondary-button" id="backToAdmin" type="button"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to admin</button>`}
        </div>
      </div>
      ${readOnly ? `<div class="read-only-banner">Read-only academy lead view. Admin cannot edit consultant progress.</div>` : ""}
      ${renderStats(stats)}
      <div class="section-panel">
        <div class="view-header">
          <div>
            <h3>Skills by level</h3>
            <p>Track progress, open SMART targets, and use Learning Bridge resources.</p>
          </div>
        </div>
        ${renderSkillAccordions(consultant, readOnly, role)}
      </div>
    </section>
  `;

  if (readOnly) {
    document.getElementById("backToAdmin").addEventListener("click", () => {
      adminDrilldownId = null;
      saveUiState();
      renderAdmin();
    });
  } else {
    document.getElementById("changeRole").addEventListener("click", () => renderRoleSelection());
  }

  bindAccordionEvents();
  if (!readOnly) bindSkillEvents(consultant);
}

function renderProgressBar(percent, height = "12px", showLabel = false) {
  return `
    <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
      ${showLabel ? `<span style="font-size: 0.85rem; font-weight: 600; min-width: 35px; text-align: right;">${percent}%</span>` : ""}
      <div class="progress-track" style="height: ${height}; flex: 1; margin-bottom: 0;">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
    </div>
  `;
}

function getRoleIcon(roleId) {
  const icons = {
    manualTester: "fa-clipboard-check",
    automationTester: "fa-gears",
    javaDeveloper: "fa-code",
    businessAnalyst: "fa-chart-pie",
    projectManager: "fa-diagram-project",
    serviceDeskAnalyst: "fa-headset",
    softwareTester: "fa-bug-slash",
    rpaAnalyst: "fa-robot",
    devopsEngineer: "fa-cloud-arrow-up",
    cyberSecurityAnalyst: "fa-shield-halved"
  };
  return icons[roleId] || "fa-layer-group";
}

function renderStats(stats) {
  return `
    <div class="stats-grid" aria-label="Progress summary">
      <div class="stat-card">
        <span>Overall progress</span>
        <strong>${stats.progressPercent}%</strong>
        ${renderProgressBar(stats.progressPercent)}
      </div>
      <div class="stat-card"><span>Completed</span><strong>${stats.complete}</strong></div>
      <div class="stat-card"><span>In progress</span><strong>${stats.inProgress}</strong></div>
      <div class="stat-card"><span>SMART targets</span><strong>${stats.targetCount}</strong></div>
    </div>
  `;
}

function renderSkillAccordions(consultant, readOnly, role) {
  let previousLevelComplete = true;
  return `
    <div class="accordion">
      ${LEVELS.map((level, index) => {
        const levelSkills = role.skills.filter(item => item.level === level.key);
        const completeCount = levelSkills.filter(item => getStatus(consultant.id, item.id) === "complete").length;
        const levelProgress = Math.round((completeCount / levelSkills.length) * 100) || 0;

        const isLocked = !readOnly && !previousLevelComplete;
        previousLevelComplete = (levelProgress === 100);

        return `
        <div class="accordion-item ${index === 0 ? "open" : ""} ${isLocked ? "locked-level" : ""}">
          <button class="accordion-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}" ${isLocked ? "disabled" : ""}>
            <div style="display: flex; align-items: center; justify-content: space-between; flex: 1; margin-right: 1.5rem;">
              <span style="display: flex; align-items: center; gap: 8px;">
                ${isLocked ? '<i class="fa-solid fa-lock" aria-hidden="true"></i>' : ""}
                ${level.label}
              </span>
              <div style="width: 140px;">${renderProgressBar(levelProgress, "8px", true)}</div>
            </div>
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </button>
          <div class="accordion-content">
            ${isLocked 
              ? `<p class="muted" style="padding: 1.5rem; text-align: center;">Complete the previous level to 100% to unlock these skills.</p>` 
              : levelSkills.map(item => renderSkillCard(item, consultant.id, readOnly)).join("")}
          </div>
        </div>
      `}).join("")}
    </div>
  `;
}

function renderSkillCard(item, consultantId, readOnly) {
  const status = getStatus(consultantId, item.id);
  const existingTarget = appData.targets[consultantId][item.id];
  return `
    <article class="skill-card" data-skill-id="${item.id}">
      <div class="skill-head">
        <div>
          <span class="pill">${item.category}</span>
          <h3>${item.name}</h3>
        </div>
        <span class="pill">${STATUS_LABELS[status]}</span>
      </div>
      <p>${item.description}</p>
      <div class="status-row" aria-label="Skill status for ${item.name}">
        ${Object.entries(STATUS_LABELS).map(([key, label]) => `
          <button class="status-button ${status === key ? "active" : ""}" data-action="status" data-status="${key}" type="button" ${readOnly ? "disabled" : ""}>${label}</button>
        `).join("")}
      </div>
      <div>
        <strong>Learning Bridge</strong>
        <div class="resource-list">
          ${getResources(item.id).map((resource, index) => `
            <a class="resource-link" href="${resource.url}" target="_blank" rel="noreferrer">
              <i class="fa-solid ${index === 0 ? "fa-star" : "fa-link"}" aria-hidden="true"></i>
              ${resource.provider}: ${resource.title}
            </a>
          `).join("")}
        </div>
      </div>
      ${status !== "complete" && !readOnly ? `
        <button class="secondary-button" data-action="smart" type="button">
          <i class="fa-solid fa-bullseye" aria-hidden="true"></i>
          ${existingTarget ? "Edit SMART Target" : "Generate SMART Target"}
        </button>
      ` : ""}
      ${existingTarget && readOnly ? `
        <div class="smart-editor">
          <strong>Saved SMART target</strong>
          <p>${existingTarget.text}</p>
          <span class="pill"><i class="fa-solid fa-calendar" aria-hidden="true"></i> ${existingTarget.deadline}</span>
        </div>
      ` : ""}
      <div class="smart-host"></div>
    </article>
  `;
}

function bindAccordionEvents() {
  document.querySelectorAll(".accordion-trigger").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function bindSkillEvents(consultant) {
  document.querySelectorAll("[data-action='status']").forEach(button => {
    button.addEventListener("click", () => {
      const skillId = button.closest(".skill-card").dataset.skillId;
      appData.progress[consultant.id][skillId] = button.dataset.status;
      saveData();
      renderConsultantDashboard(consultant.id);
    });
  });

  document.querySelectorAll("[data-action='smart']").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".skill-card");
      const skillId = card.dataset.skillId;
      showSmartEditor(card, consultant.id, skillId);
    });
  });
}

function showSmartEditor(card, consultantId, skillId) {
  const item = getSkillById(skillId);
  const saved = appData.targets[consultantId][skillId];
  const deadline = saved?.deadline || getDefaultDeadline();
  const text = saved?.text || makeSmartTarget(item, deadline);
  const host = card.querySelector(".smart-host");
  host.innerHTML = `
    <div class="smart-editor">
      <div class="form-field">
        <label for="targetText-${skillId}">SMART target</label>
        <textarea id="targetText-${skillId}">${text}</textarea>
      </div>
      <div class="form-field">
        <label for="targetDate-${skillId}">Deadline</label>
        <input id="targetDate-${skillId}" type="date" value="${deadline}">
      </div>
      <div class="editor-actions">
        <button class="ghost-button" data-action="cancel-target" type="button">Cancel</button>
        <button class="primary-button" data-action="save-target" type="button">
          <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
          Save target
        </button>
      </div>
    </div>
  `;

  host.querySelector("[data-action='cancel-target']").addEventListener("click", () => {
    host.innerHTML = "";
  });
  host.querySelector("[data-action='save-target']").addEventListener("click", () => {
    const targetText = host.querySelector("textarea").value.trim();
    const targetDate = host.querySelector("input").value;
    if (!targetText || !targetDate) return;
    appData.targets[consultantId][skillId] = { text: targetText, deadline: targetDate };
    saveData();
    renderConsultantDashboard(consultantId);
  });
}
