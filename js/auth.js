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
          <p style="font-size: 1.15rem; line-height: 1.6; opacity: 0.9;">Sign in as a consultant or academy lead to track role progress, skill gaps, SMART goals, and team capability.</p>
          <div style="margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2.5rem;">
            <p style="font-weight: 600; margin-bottom: 1.5rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.85;">Platform Highlights</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 1.5rem; font-size: 1.05rem; opacity: 0.95; line-height: 1.5;">
              <div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fa-solid fa-graduation-cap" style="margin-top: 4px; font-size: 1.2rem;"></i> <span>Curated Learning Bridge resources mapped to every skill.</span></div>
              <div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fa-solid fa-route" style="margin-top: 4px; font-size: 1.2rem;"></i> <span>Clear progression from Foundational to Expert levels.</span></div>
              <div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fa-solid fa-fire-flame-curved" style="margin-top: 4px; font-size: 1.2rem;"></i> <span>Identify team capability gaps with real-time heatmaps.</span></div>
              <div style="display: flex; align-items: flex-start; gap: 12px;"><i class="fa-solid fa-crosshairs" style="margin-top: 4px; font-size: 1.2rem;"></i> <span>Generate and track SMART targets to accelerate growth.</span></div>
            </div>
          </div>
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
          <p class="muted">Enter your assigned consultant or academy lead credentials.</p>
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
            <button class="secondary-button" id="showRegister" type="button" style="width: 100%; margin-top: 1rem;">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
              Register as Consultant
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
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.05); font-size: 0.85rem; color: #666; line-height: 1.5;">
          <p><strong><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Demo Environment:</strong> This platform stores all progress, password changes, and SMART targets locally within your browser's storage. No data is sent to a server, ensuring total privacy during your evaluation.</p>
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
  document.getElementById("showRegister").addEventListener("click", () => renderRegister());
}

function handleLogin(type, usernameValue, passwordValue) {
  const username = normalizeUsername(usernameValue);
  const account = getAuthAccounts().find(item => item.type === type && item.username === username);

  if (!account || authData.passwords[account.key] !== passwordValue) {
    renderLogin("Username or password is incorrect.");
    return;
  }

  if (!authData.changed[account.key]) {
    renderPasswordChange(account);
    return;
  }

  completeLogin(account);
}

function renderRegister(message = "") {
  setView("login");
  app.innerHTML = `
    <section class="hero">
      <div class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">Join the platform</p>
          <h1>Consultant Registration</h1>
          <p>Create your profile to start tracking your skills and career progression.</p>
        </div>
      </div>
      <div class="login-panel">
        <div>
          <p class="eyebrow">New account</p>
          <h2>Sign up</h2>
          <p class="muted">Enter your details to register as a consultant.</p>
        </div>
        ${message ? `<div class="form-message error">${message}</div>` : ""}
        <form id="registerForm">
          <div class="form-field">
            <label for="regName">Full Name</label>
            <input id="regName" type="text" required autocomplete="name">
          </div>
          <div class="form-field">
            <label for="regPassword">Password</label>
            <input id="regPassword" type="password" required autocomplete="new-password" minlength="8">
          </div>
          <div class="form-field">
            <label for="regConfirm">Confirm Password</label>
            <input id="regConfirm" type="password" required autocomplete="new-password">
          </div>
          <button class="primary-button" type="submit" style="width: 100%;">
            <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
            Create Account
          </button>
          <button class="ghost-button" id="backToLogin" type="button" style="width: 100%; margin-top: 10px;">
            Back to sign in
          </button>
        </form>
      </div>
    </section>
  `;

  document.getElementById("backToLogin").addEventListener("click", () => renderLogin());
  document.getElementById("registerForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (password !== confirm) {
      renderRegister("Passwords do not match.");
      return;
    }

    const username = makeUsername(name);
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    
    if (CONSULTANTS.some(c => c.id === id)) {
      renderRegister("A consultant with this name already exists.");
      return;
    }

    const newConsultant = { id, name, roleId: null };
    CONSULTANTS.push(newConsultant);
    saveConsultantDatabase();

    const accountKey = `consultant:${id}`;
    authData.passwords[accountKey] = password;
    authData.changed[accountKey] = true;
    saveAuthData();

    appData.progress[id] = {};
    appData.targets[id] = {};
    saveData();

    completeLogin({ type: "consultant", id, name, username });
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
