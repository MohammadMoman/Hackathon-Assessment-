// Renders and controls login, first-login password changes, and session activation.
function renderLogin(message = "") {
  activeSession = null;
  adminDrilldownId = null;
  setView("login");
  clearCharts();
  logoutButton.classList.add("hide");
  app.innerHTML = `
    <section class="hero">
      <div class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">Ten10 Academy Skills Platform</p>
          <h1>Skills Matrix</h1>
          <p>Sign in as a consultant or academy lead to track role progress, skill gaps, SMART goals, and team capability.</p>
        </div>
        <div class="hero-metrics" aria-label="Demo platform metrics">
          <div class="metric-tile"><strong>${Object.keys(ROLES).length}</strong><span>Roles</span></div>
          <div class="metric-tile"><strong>${getTotalSkillCount()}</strong><span>Mapped skills</span></div>
          <div class="metric-tile"><strong>${CONSULTANTS.length}</strong><span>Consultants</span></div>
        </div>
      </div>
      <div class="login-panel">
        <div>
          <p class="eyebrow">Demo login</p>
          <h2>Sign in</h2>
          <p class="muted">Consultants can register a new account, while academy leads use their admin credentials.</p>
        </div>
        ${message ? `<div class="form-message error">${message}</div>` : ""}
        <div class="login-grid">
          <div class="login-choice">
            <h3><i class="fa-solid fa-user-check" aria-hidden="true"></i> Consultant</h3>
            <form id="consultantLoginForm">
              <div class="form-field">
                <label for="consultantUsername">Username</label>
                <input id="consultantUsername" type="text" autocomplete="username">
              </div>
              <div class="form-field">
                <label for="consultantPassword">Password</label>
                <input id="consultantPassword" type="password" autocomplete="current-password">
              </div>
              <button class="primary-button" type="submit">
                <i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i>
                Sign in as Consultant
              </button>
            </form>
            <button class="ghost-button register-link-button" id="showRegister" type="button">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
              Register as a consultant
            </button>
          </div>
          <div class="login-choice">
            <h3><i class="fa-solid fa-chart-line" aria-hidden="true"></i> Academy Lead</h3>
            <form id="adminLoginForm">
              <div class="form-field">
                <label for="adminUsername">Username</label>
                <input id="adminUsername" type="text" autocomplete="username">
              </div>
              <div class="form-field">
                <label for="adminPassword">Password</label>
                <input id="adminPassword" type="password" autocomplete="current-password">
              </div>
              <button class="primary-button" type="submit">
                <i class="fa-solid fa-chart-simple" aria-hidden="true"></i>
                Sign in as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById("consultantLoginForm").addEventListener("submit", event => {
    event.preventDefault();
    handleLogin("consultant", document.getElementById("consultantUsername").value, document.getElementById("consultantPassword").value);
  });
  document.getElementById("adminLoginForm").addEventListener("submit", event => {
    event.preventDefault();
    handleLogin("admin", document.getElementById("adminUsername").value, document.getElementById("adminPassword").value);
  });
  document.getElementById("showRegister").addEventListener("click", renderConsultantRegister);
}

function handleLogin(type, usernameValue, passwordValue) {
  const account = authenticateAccount(type, usernameValue, passwordValue);

  if (!account) {
    renderLogin("Username or password is incorrect.");
    return;
  }

  if (!authData.changed[account.key]) {
    renderPasswordChange(account);
    return;
  }

  completeLogin(account);
}

function authenticateAccount(type, usernameValue, passwordValue) {
  const username = normalizeUsername(usernameValue);
  const account = getAuthAccounts().find(item => item.type === type && item.username === username);
  if (!account || authData.passwords[account.key] !== passwordValue) return null;
  return account;
}

function renderConsultantRegister(message = "") {
  activeSession = null;
  setView("login");
  clearCharts();
  logoutButton.classList.add("hide");
  app.innerHTML = `
    <section class="hero register-hero">
      <div class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">Consultant registration</p>
          <h1>Create your account</h1>
          <p>Register once, then choose any skills pathway you want to build toward. Your account is saved in this browser's local database.</p>
        </div>
        <div class="hero-metrics" aria-label="Registration facts">
          <div class="metric-tile"><strong>${Object.keys(ROLES).length}</strong><span>Pathways</span></div>
          <div class="metric-tile"><strong>${getTotalSkillCount()}</strong><span>Skills</span></div>
          <div class="metric-tile"><strong><i class="fa-solid fa-database" aria-hidden="true"></i></strong><span>Local DB</span></div>
        </div>
      </div>
      <div class="login-panel register-panel">
        <div>
          <p class="eyebrow">New consultant</p>
          <h2>Register</h2>
          <p class="muted">Use these credentials for the consultant login form after registration.</p>
        </div>
        ${message ? `<div class="form-message error">${message}</div>` : ""}
        <form id="consultantRegisterForm">
          <div class="form-field">
            <label for="registerName">Full name</label>
            <input id="registerName" type="text" autocomplete="name">
          </div>
          <div class="form-field">
            <label for="registerUsername">Username</label>
            <input id="registerUsername" type="text" autocomplete="username" placeholder="e.g. alex.morgan">
          </div>
          <div class="form-field">
            <label for="registerPassword">Password</label>
            <input id="registerPassword" type="password" autocomplete="new-password">
          </div>
          <div class="form-field">
            <label for="registerConfirmPassword">Confirm password</label>
            <input id="registerConfirmPassword" type="password" autocomplete="new-password">
          </div>
          <div class="editor-actions">
            <button class="ghost-button" id="backToLogin" type="button">
              <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
              Back
            </button>
            <button class="primary-button" type="submit">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  `;

  document.getElementById("backToLogin").addEventListener("click", () => renderLogin());
  document.getElementById("consultantRegisterForm").addEventListener("submit", event => {
    event.preventDefault();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (password !== confirmPassword) {
      renderConsultantRegister("The two passwords do not match.");
      return;
    }

    const result = registerConsultant(
      document.getElementById("registerName").value,
      document.getElementById("registerUsername").value,
      password
    );

    if (!result.ok) {
      renderConsultantRegister(result.message);
      return;
    }

    completeLogin({
      type: "consultant",
      id: result.consultant.id,
      name: result.consultant.name,
      username: result.consultant.username
    });
  });
}

function getActiveRoleId(consultant) {
  if (selectedRoleId && ROLES[selectedRoleId]) return selectedRoleId;
  return null;
}

function renderPasswordChange(account, message = "") {
  setView("login");
  clearCharts();
  logoutButton.classList.add("hide");
  app.innerHTML = `
    <section class="hero">
      <div class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">First login security</p>
          <h1>Change Password</h1>
          <p>Create a new password for ${account.name}. It will be saved locally in this browser for the demo.</p>
        </div>
        <div class="hero-metrics" aria-label="Password rules">
          <div class="metric-tile"><strong>1</strong><span>Local account</span></div>
          <div class="metric-tile"><strong>8+</strong><span>Characters</span></div>
          <div class="metric-tile"><strong><i class="fa-solid fa-lock" aria-hidden="true"></i></strong><span>Stored locally</span></div>
        </div>
      </div>
      <div class="login-panel">
        <div>
          <p class="eyebrow">${account.type === "admin" ? "Academy Lead" : "Consultant"} account</p>
          <h2>${account.username}</h2>
          <p class="muted">This replaces the default first-login password for this browser.</p>
        </div>
        ${message ? `<div class="form-message error">${message}</div>` : ""}
        <form id="changePasswordForm">
          <div class="form-field">
            <label for="newPassword">New password</label>
            <input id="newPassword" type="password" autocomplete="new-password">
          </div>
          <div class="form-field">
            <label for="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" autocomplete="new-password">
          </div>
          <button class="primary-button" type="submit">
            <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
            Save password and continue
          </button>
        </form>
      </div>
    </section>
  `;

  document.getElementById("changePasswordForm").addEventListener("submit", event => {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.length < 8) {
      renderPasswordChange(account, "Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      renderPasswordChange(account, "The two passwords do not match.");
      return;
    }

    authData.passwords[account.key] = newPassword;
    authData.changed[account.key] = true;
    saveAuthData();
    completeLogin(account);
  });
}

function completeLogin(account) {
  activeSession = {
    type: account.type,
    id: account.id
  };
  adminDrilldownId = null;

  if (account.type === "admin") {
    selectedAdminTab = "overview";
    saveUiState();
    renderAdmin();
    return;
  }

  activeConsultantId = account.id;
  selectedRoleId = null;
  saveUiState();
  renderRoleSelection();
}

