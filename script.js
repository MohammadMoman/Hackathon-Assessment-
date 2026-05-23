// Bootstraps the app by creating shared runtime state, caching DOM nodes, and starting initial render.
var appData = null;
var authData = null;
var activeView = "login";
var activeConsultantId = null;
var selectedRoleId = null;
var selectedAdminTab = "overview";
var adminDrilldownId = null;
var comparisonRoleId = getDefaultComparisonRoleId();
var comparisonConsultantIds = getDefaultComparisonPair(comparisonRoleId);
var consultantSearchQuery = "";
var activeSession = null;
var charts = [];

var app = document.getElementById("app");
var logoutButton = document.getElementById("logoutButton");
var resetDemoButton = document.getElementById("resetDemo");
var themeToggleButton = document.getElementById("themeToggle");
var brandHome = document.getElementById("brandHome");

init();

function init() {
  try {
    CONSULTANTS = loadConsultantDatabase();
    authData = loadAuthData();
    appData = loadSavedData();
    loadSavedUiState();
    activeSession = null;
    activeView = "login";
    bindShellActions();
    renderLogin();
    loadCourseData();
  } catch (error) {
    console.error("Ten10 Skills Matrix failed to start", error);
    app.innerHTML = `
      <section class="section-panel">
        <h2>Unable to start Skills Matrix</h2>
        <p class="muted">Refresh the page. If the problem continues, check that every file in the js folder is present.</p>
      </section>
    `;
  }
}

