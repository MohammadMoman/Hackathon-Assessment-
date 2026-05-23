// Owns global navigation, shell button actions, persisted UI state, logout, and view routing.
function bindShellActions() {
  logoutButton.addEventListener("click", logout);
  brandHome.addEventListener("click", event => {
    event.preventDefault();
    logout();
  });
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  resetDemoButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all consultant demo data?")) {
      appData = createSeedData();
      saveData();
      renderCurrentView();
    }
  });
}

function renderCurrentView() {
  if (activeView !== "login" && !activeSession) {
    renderLogin();
    return;
  }

  if (activeView === "login") renderLogin();
  else if (activeView === "role") renderRoleSelection();
  else if (activeView === "consultant") renderConsultantDashboard(activeConsultantId);
  else if (activeView === "admin") renderAdmin();
  else renderLogin();
}

function setView(view) {
  activeView = view;
  saveUiState();
  app.focus();
}

function loadSavedUiState() {
  const saved = localStorage.getItem(UI_STORAGE_KEY);
  if (!saved) return;

  try {
    const state = JSON.parse(saved);
    const views = ["login", "role", "consultant", "admin"];
    if (views.includes(state.activeView)) activeView = state.activeView;
    if (getConsultant(state.activeConsultantId)) activeConsultantId = state.activeConsultantId;
    if (state.selectedRoleId && Object.keys(ROLES).includes(state.selectedRoleId)) selectedRoleId = state.selectedRoleId;
    if (ADMIN_TABS.includes(state.selectedAdminTab)) selectedAdminTab = state.selectedAdminTab;
    adminDrilldownId = getConsultant(state.adminDrilldownId) ? state.adminDrilldownId : null;
    if (getComparableRoleIds().includes(state.comparisonRoleId)) comparisonRoleId = state.comparisonRoleId;
    if (Array.isArray(state.comparisonConsultantIds)) comparisonConsultantIds = state.comparisonConsultantIds;
    activeSession = isValidSession(state.activeSession) ? state.activeSession : null;
    normalizeComparisonState();
  } catch (error) {
    localStorage.removeItem(UI_STORAGE_KEY);
  }
}

function saveUiState() {
  localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({
    activeView,
    activeConsultantId,
    selectedRoleId,
    selectedAdminTab,
    adminDrilldownId,
    comparisonRoleId,
    comparisonConsultantIds,
    activeSession
  }));
}

function logout() {
  activeSession = null;
  activeView = "login";
  activeConsultantId = CONSULTANTS[0]?.id || null;
  selectedRoleId = null;
  adminDrilldownId = null;
  saveUiState();
  renderLogin();
}

