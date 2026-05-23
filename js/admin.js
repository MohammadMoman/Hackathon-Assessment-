// Renders the admin dashboard tabs, consultant table, comparisons, heatmap charts, and saved targets.
function renderAdmin() {
  if (!activeSession || activeSession.type !== "admin") {
    renderLogin();
    return;
  }

  setView("admin");
  logoutButton.classList.remove("hide");
  if (adminDrilldownId) {
    const drilldownConsultant = getConsultant(adminDrilldownId);
    renderConsultantDashboard(adminDrilldownId, { readOnly: true, roleId: drilldownConsultant?.roleId || null });
    return;
  }
  app.innerHTML = `
    <section>
      <div class="view-header">
        <div>
          <p class="eyebrow">Academy lead view</p>
          <h2>Team skills dashboard</h2>
          <p>Read-only analytics for consultants, skill gaps, and saved SMART targets.</p>
        </div>
      </div>
      <nav class="tabs" aria-label="Admin sections">
        ${[
          ["overview", "Overview", "fa-gauge"],
          ["consultants", "Consultants", "fa-users"],
          ["heatmap", "Heatmap", "fa-fire"],
          ["targets", "SMART Targets", "fa-bullseye"]
        ].map(([key, label, icon]) => `
          <button class="tab-button ${selectedAdminTab === key ? "active" : ""}" data-tab="${key}" type="button">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>${label}
          </button>
        `).join("")}
      </nav>
      <div id="adminContent"></div>
    </section>
  `;
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => {
      selectedAdminTab = button.dataset.tab;
      consultantSearchQuery = "";
      adminDrilldownId = null;
      renderAdmin();
    });
  });
  renderAdminTab();
}

function renderAdminTab() {
  clearCharts();
  const host = document.getElementById("adminContent");
  if (selectedAdminTab === "overview") host.innerHTML = renderAdminOverview();
  if (selectedAdminTab === "consultants") {
    host.innerHTML = renderConsultantTable() + renderComparison();
    bindConsultantTable();
    bindComparison();
  }
  if (selectedAdminTab === "heatmap") {
    host.innerHTML = renderHeatmap();
    drawHeatCharts();
  }
  if (selectedAdminTab === "targets") host.innerHTML = renderAdminTargets();
}

function renderAdminOverview() {
  const teamStats = getTeamStats();
  return `
    <div class="admin-grid">
      <div class="stat-card"><span>Registered consultants</span><strong>${CONSULTANTS.length}</strong></div>
      <div class="stat-card"><span>Average progress</span><strong>${teamStats.averageProgress}%</strong></div>
      <div class="stat-card"><span>Saved SMART targets</span><strong>${teamStats.targetCount}</strong></div>
    </div>
    <div class="section-panel" style="margin-top:16px">
      <h3>Academy lead summary</h3>
      <p class="muted">Use the tabs to review all consultants, identify common completed skills, spot missing skills, and inspect saved SMART goals.</p>
    </div>
  `;
}

function renderConsultantTable() {
  const filtered = CONSULTANTS.filter(person => 
    person.name.toLowerCase().includes(consultantSearchQuery.toLowerCase())
  );

  return `
    <div class="search-container" style="margin-bottom: 1.5rem;">
      <div class="form-field" style="max-width: 400px;">
        <label for="consultantSearch">Search consultants</label>
        <input type="text" id="consultantSearch" placeholder="Filter by name..." value="${consultantSearchQuery}" autocomplete="off">
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Role</th><th>Progress</th><th>Complete</th><th>In Progress</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(person => {
            const stats = getConsultantStats(person.id);
            return `
              <tr>
                <td>
                  <a href="#" class="consultant-link" data-view-consultant="${person.id}">
                    ${person.name}
                  </a>
                </td>
                <td>${person.roleId ? ROLES[person.roleId].title : '<span class="muted">Not selected</span>'}</td>
                <td>${stats.progressPercent}%</td>
                <td>${stats.complete}</td>
                <td>${stats.inProgress}</td>
              </tr>
            `;
          }).join("")}
          ${filtered.length === 0 ? '<tr><td colspan="5" style="text-align: center; padding: 2rem;"><p class="muted">No consultants found matching your search.</p></td></tr>' : ''}
        </tbody>
      </table>
    </div>
  `;
}

function bindConsultantTable() {
  const searchInput = document.getElementById("consultantSearch");
  if (searchInput) {
    // Maintain focus and cursor position if user was typing
    if (consultantSearchQuery !== "") {
      searchInput.focus();
      const len = searchInput.value.length;
      searchInput.setSelectionRange(len, len);
    }

    searchInput.addEventListener("input", (e) => {
      consultantSearchQuery = e.target.value;
      renderAdminTab();
    });
  }

  document.querySelectorAll("[data-view-consultant]").forEach(element => {
    element.addEventListener("click", (e) => {
      if (element.tagName === "A") e.preventDefault();
      adminDrilldownId = element.dataset.viewConsultant;
      saveUiState();
      renderAdmin();
    });
  });
}

function renderComparison() {
  normalizeComparisonState();
  const comparableRoleIds = getComparableRoleIds();
  const rolePeople = getConsultantsByRole(comparisonRoleId);
  const comparedPeople = comparisonConsultantIds.map(id => getConsultant(id)).filter(Boolean);

  if (comparableRoleIds.length === 0) {
    return `
      <div class="section-panel" style="margin-top:16px">
        <h3>Same-role comparison</h3>
        <p class="muted">Add at least two consultants to the same role to compare progress.</p>
      </div>
    `;
  }

  return `
    <div class="section-panel" style="margin-top:16px">
      <div class="view-header">
        <div>
          <h3>Same-role comparison</h3>
          <p>Choose any two consultants from the same role and compare progress at summary level.</p>
        </div>
      </div>
      <div class="comparison-controls">
        <div class="form-field">
          <label for="comparisonRole">Role</label>
          <select id="comparisonRole">
            ${comparableRoleIds.map(roleId => `
              <option value="${roleId}" ${roleId === comparisonRoleId ? "selected" : ""}>${ROLES[roleId].title}</option>
            `).join("")}
          </select>
        </div>
        ${[0, 1].map(index => `
          <div class="form-field">
            <label for="comparisonPerson${index}">Consultant ${index + 1}</label>
            <select id="comparisonPerson${index}" data-comparison-person="${index}">
              ${rolePeople.map(person => `
                <option value="${person.id}" ${person.id === comparisonConsultantIds[index] ? "selected" : ""} ${person.id === comparisonConsultantIds[1 - index] ? "disabled" : ""}>
                  ${person.name}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="compare-grid">
        ${comparedPeople.map(person => {
          const stats = getConsultantStats(person.id);
          return `
            <div class="stat-card">
              <span>${person.roleId ? ROLES[person.roleId].title : "No pathway selected"}</span>
              <h3>${person.name}</h3>
              <strong>${stats.progressPercent}%</strong>
              <p class="muted">${stats.complete} complete, ${stats.inProgress} in progress, ${stats.notStarted} not started</p>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function bindComparison() {
  const roleSelect = document.getElementById("comparisonRole");
  if (!roleSelect) return;

  roleSelect.addEventListener("change", () => {
    comparisonRoleId = roleSelect.value;
    comparisonConsultantIds = getDefaultComparisonPair(comparisonRoleId);
    saveUiState();
    renderAdmin();
  });

  document.querySelectorAll("[data-comparison-person]").forEach(select => {
    select.addEventListener("change", () => {
      const index = Number(select.dataset.comparisonPerson);
      comparisonConsultantIds[index] = select.value;
      normalizeComparisonState();
      saveUiState();
      renderAdmin();
    });
  });
}

function renderHeatmap() {
  const complete = getSkillRanking("complete");
  const missing = getSkillRanking("not-started");
  return `
    <div class="heat-grid">
      <div class="heat-card">
        <div class="heat-card-header">
          <div>
            <h3><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Top Proficiencies</h3>
            <p class="muted">Skills with the strongest completion rates among relevant consultants.</p>
          </div>
          <span class="heat-summary-pill">Complete</span>
        </div>
        <div class="chart-panel">
          <canvas id="completeChart" height="240"></canvas>
        </div>
        ${renderRankList(complete)}
      </div>
      <div class="heat-card">
        <div class="heat-card-header">
          <div>
            <h3><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Capability Gaps</h3>
            <p class="muted">Skills most frequently marked as not started within their role group.</p>
          </div>
          <span class="heat-summary-pill">Not started</span>
        </div>
        <div class="chart-panel">
          <canvas id="missingChart" height="240"></canvas>
        </div>
        ${renderRankList(missing)}
      </div>
    </div>
  `;
}

function renderRankList(items) {
  const max = Math.max(...items.map(item => item.count), 1);
  return `
    <div class="rank-list">
      ${items.map(item => `
        <div class="rank-row">
          <div class="rank-meta">
            <strong>${item.name}</strong>
            <span>${ROLES[item.roleId].title} &middot; ${item.category}</span>
          </div>
          <div class="rank-bar" aria-hidden="true"><span style="width:${Math.round((item.count / max) * 100)}%"></span></div>
          <span class="rank-count">${item.count}/${item.applicableCount}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function drawHeatCharts() {
  if (!window.Chart) return;
  const complete = getSkillRanking("complete");
  const missing = getSkillRanking("not-started");
  charts.push(makeBarChart("completeChart", complete, "#5b3baa"));
  charts.push(makeBarChart("missingChart", missing, "#b73554"));
}

function makeBarChart(canvasId, items, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const fontStack = "'Inter', system-ui, sans-serif";

  return new Chart(canvas, {
    type: "bar",
    data: {
      labels: items.map(item => item.name),
      datasets: [{ 
        data: items.map(item => item.count), 
        backgroundColor: color, 
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1500, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => {
              const item = items[context.dataIndex];
              return `${item.count} of ${item.applicableCount} relevant consultants`;
            }
          }
        }
      },
      scales: {
        x: { 
          beginAtZero: true,
          precision: 0,
          grid: { color: 'rgba(95, 100, 109, 0.12)', drawBorder: false },
          ticks: { color: '#5f646d', stepSize: 1, font: { size: 11, family: fontStack } }
        },
        y: { 
          grid: { display: false, drawBorder: false },
          ticks: { color: '#44546a', font: { size: 11, family: fontStack } }
        }
      }
    }
  });
}

function clearCharts() {
  charts.filter(Boolean).forEach(chart => chart.destroy());
  charts = [];
}
function renderAdminTargets() {
  const groups = CONSULTANTS.map(person => {
    const targets = Object.entries(appData.targets[person.id] || {});
    return { person, targets };
  }).filter(group => group.targets.length > 0);

  if (groups.length === 0) {
    return `<div class="empty-state">No SMART targets have been saved yet.</div>`;
  }

  return `
    <div class="target-grid">
      ${groups.map(group => `
        <div class="target-card">
          <h3>${group.person.name}</h3>
          <p class="muted">${group.person.roleId ? ROLES[group.person.roleId].title : "No pathway selected"}</p>
          ${group.targets.map(([skillId, saved]) => {
            const item = getSkillById(skillId);
            return `
              <div class="smart-target-item" data-consultant-id="${group.person.id}" data-skill-id="${skillId}">
                <strong>${item.name}</strong>
                <p>${saved.text}</p>
                <span class="pill"><i class="fa-solid fa-calendar" aria-hidden="true"></i> ${saved.deadline}</span>
              </div>
            `;
          }).join("")}
        </div>
      `).join("")}
    </div>
  `;
}
