/* ============================================================
   LEARNING SYSTEM — Authentication & Account Management
   ============================================================
   This file manages:
     1. Student account creation (name, grade, email, password,
        parent name, parent email, parent phone)
     2. Student login (email + password)
     3. Parent login (parent email + password)
        → redirects to parent-dashboard.html
   All data is stored in localStorage (NO backend).

   Storage keys:
     - learning_system_users           : array of user objects
     - learning_system_current_user     : currently logged-in user
   ============================================================ */

(function() {
'use strict';

const USERS_KEY         = 'learning_system_users';
const CURRENT_USER_KEY  = 'learning_system_current_user';

/* ----------------------------------------------------------
   Simple password hash (NOT cryptographic — localStorage only)
   Uses an XOR salt + base64. Sufficient for an offline app
   where there is no server and no real password security.
   ---------------------------------------------------------- */
function simpleHash(str) {
  let hash = 0;
  const salt = 'LSSalt_v1::';
  const salted = salt + str + salt;
  for (let i = 0; i < salted.length; i++) {
    const ch = salted.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  // Mix with btoa for an extra layer of obfuscation
  let xored = '';
  for (let i = 0; i < str.length; i++) {
    xored += String.fromCharCode(str.charCodeAt(i) ^ ((hash >>> 0) % 251));
  }
  try {
    return btoa(unescape(encodeURIComponent(xored))) + '_' + (hash >>> 0).toString(16);
  } catch (e) {
    return String(hash >>> 0);
  }
}

/* ----------------------------------------------------------
   Storage helpers
   ---------------------------------------------------------- */
function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveCurrentUser(user) {
  if (user) {
    // Save a copy (without storing hashed password in session if you prefer)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

/* ----------------------------------------------------------
   Validation helpers
   ---------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showToast(message, type) {
  let toast = document.getElementById('authToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'authToast';
    toast.style.cssText = [
      'position:fixed','top:20px','left:50%','transform:translateX(-50%)',
      'z-index:100000','padding:12px 22px','border-radius:8px',
      'font-size:14px','font-weight:600','color:#0a1326',
      'background:#38bdf8','box-shadow:0 6px 18px rgba(0,0,0,0.4)',
      'max-width:90vw','text-align:center','transition:opacity .3s'
    ].join(';');
    document.body.appendChild(toast);
  }
  if (type === 'error') {
    toast.style.background = '#fca5a5';
    toast.style.color = '#7f1d1d';
  } else if (type === 'success') {
    toast.style.background = '#86efac';
    toast.style.color = '#064e3b';
  } else {
    toast.style.background = '#38bdf8';
    toast.style.color = '#0a1326';
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.display = 'block';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 350);
  }, 2600);
}

/* ----------------------------------------------------------
   Build the auth overlay (login / signup / parent login)
   ---------------------------------------------------------- */
function buildOverlay() {
  if (document.getElementById('authOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'authOverlay';
  overlay.innerHTML = `
    <style>
      #authOverlay {
        position: fixed; inset: 0;
        background: #0a1326;
        color: #e2e8f0;
        z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        padding: 24px; overflow-y: auto;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      #authOverlay * { box-sizing: border-box; }
      .auth-card {
        width: 100%; max-width: 440px;
        background: #0f172a;
        border: 1px solid #1e293b;
        border-radius: 16px;
        padding: 32px 28px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      }
      .auth-logo {
        text-align: center; margin-bottom: 18px;
      }
      .auth-logo h1 {
        color: #38bdf8; font-size: 26px; font-weight: 700;
        margin: 0 0 4px; letter-spacing: -0.5px;
      }
      .auth-logo p { color: #94a3b8; font-size: 13px; margin: 0; }
      .auth-tabs {
        display: flex; gap: 4px;
        background: #1e293b;
        padding: 4px; border-radius: 10px;
        margin: 20px 0;
      }
      .auth-tab {
        flex: 1; padding: 10px 8px; text-align: center;
        background: transparent; border: 0; cursor: pointer;
        color: #94a3b8; font-size: 13px; font-weight: 600;
        border-radius: 8px; transition: all .2s;
        font-family: inherit;
      }
      .auth-tab.active {
        background: #38bdf8; color: #0a1326;
      }
      .auth-tab:hover:not(.active) { color: #e2e8f0; }
      .auth-form { display: none; }
      .auth-form.active { display: block; }
      .auth-field { margin-bottom: 14px; }
      .auth-field label {
        display: block; font-size: 12px; color: #94a3b8;
        margin-bottom: 6px; font-weight: 600;
      }
      .auth-field input, .auth-field select {
        width: 100%; padding: 11px 14px;
        background: #1e293b; border: 1px solid #334155;
        border-radius: 8px; color: #e2e8f0; font-size: 14px;
        font-family: inherit; transition: border .2s;
      }
      .auth-field input:focus, .auth-field select:focus {
        outline: none; border-color: #38bdf8;
      }
      .auth-field-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
      }
      @media (max-width: 420px) {
        .auth-field-grid { grid-template-columns: 1fr; }
      }
      .auth-btn {
        width: 100%; padding: 13px; margin-top: 6px;
        background: #38bdf8; color: #0a1326;
        border: 0; border-radius: 8px;
        font-size: 15px; font-weight: 700; cursor: pointer;
        transition: transform .15s, background .2s;
        font-family: inherit;
      }
      .auth-btn:hover { background: #7dd3fc; transform: translateY(-1px); }
      .auth-btn:active { transform: translateY(0); }
      .auth-link {
        display: block; text-align: center; margin-top: 16px;
        color: #38bdf8; font-size: 13px; cursor: pointer;
        text-decoration: none; font-weight: 600;
      }
      .auth-link:hover { text-decoration: underline; }
      .auth-hint {
        font-size: 11px; color: #64748b; text-align: center;
        margin-top: 14px; line-height: 1.5;
      }
    </style>
    <div class="auth-card">
      <div class="auth-logo">
        <h1>🎓 Learning System</h1>
        <p>Sign in to continue your learning journey</p>
      </div>
      <div class="auth-tabs">
        <button class="auth-tab active" data-auth-tab="student">Student Login</button>
        <button class="auth-tab" data-auth-tab="signup">Create Account</button>
        <button class="auth-tab" data-auth-tab="parent">Parent Login</button>
      </div>

      <!-- STUDENT LOGIN -->
      <form class="auth-form active" id="studentLoginForm" autocomplete="off">
        <div class="auth-field">
          <label for="slEmail">Student Email</label>
          <input type="email" id="slEmail" placeholder="you@school.edu" required>
        </div>
        <div class="auth-field">
          <label for="slPassword">Password</label>
          <input type="password" id="slPassword" placeholder="••••••••" required>
        </div>
        <button type="submit" class="auth-btn">Login</button>
        <a class="auth-link" data-switch="signup">Need an account? Create one →</a>
      </form>

      <!-- SIGNUP -->
      <form class="auth-form" id="signupForm" autocomplete="off">
        <div class="auth-field">
          <label for="suName">Student Name</label>
          <input type="text" id="suName" placeholder="Full name" required>
        </div>
        <div class="auth-field-grid">
          <div class="auth-field">
            <label for="suGrade">Grade</label>
            <select id="suGrade" required>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
            </select>
          </div>
          <div class="auth-field">
            <label for="suEmail">Student Email</label>
            <input type="email" id="suEmail" placeholder="you@school.edu" required>
          </div>
        </div>
        <div class="auth-field">
          <label for="suPassword">Password</label>
          <input type="password" id="suPassword" placeholder="Choose a password" required>
        </div>
        <div class="auth-field-grid">
          <div class="auth-field">
            <label for="suParentName">Parent Name</label>
            <input type="text" id="suParentName" placeholder="Parent / Guardian" required>
          </div>
          <div class="auth-field">
            <label for="suParentEmail">Parent Email</label>
            <input type="email" id="suParentEmail" placeholder="parent@email.com" required>
          </div>
        </div>
        <div class="auth-field">
          <label for="suParentPhone">Parent Phone</label>
          <input type="tel" id="suParentPhone" placeholder="+91 98765 43210" required>
        </div>
        <div class="auth-field">
          <label for="suParentPassword">Parent Password</label>
          <input type="password" id="suParentPassword" placeholder="For parent dashboard access" required>
        </div>
        <button type="submit" class="auth-btn">Create Account</button>
        <a class="auth-link" data-switch="student">Already have an account? Login →</a>
        <p class="auth-hint">Your parent will use their email + this parent password to view your progress from the Parent Dashboard.</p>
      </form>

      <!-- PARENT LOGIN -->
      <form class="auth-form" id="parentLoginForm" autocomplete="off">
        <div class="auth-field">
          <label for="plEmail">Parent Email</label>
          <input type="email" id="plEmail" placeholder="parent@email.com" required>
        </div>
        <div class="auth-field">
          <label for="plPassword">Parent Password</label>
          <input type="password" id="plPassword" placeholder="••••••••" required>
        </div>
        <button type="submit" class="auth-btn">Parent Login</button>
        <p class="auth-hint">Parents can view their child's progress, time spent, scores and proctor logs.</p>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  // Tab switching
  overlay.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.authTab));
  });
  overlay.querySelectorAll('[data-switch]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthTab(link.dataset.switch);
    });
  });

  // Form handlers
  document.getElementById('studentLoginForm').addEventListener('submit', handleStudentLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
  document.getElementById('parentLoginForm').addEventListener('submit', handleParentLogin);
}

function switchAuthTab(name) {
  document.querySelectorAll('#authOverlay .auth-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.authTab === name);
  });
  document.querySelectorAll('#authOverlay .auth-form').forEach(f => {
    f.classList.remove('active');
  });
  const map = { student: 'studentLoginForm', signup: 'signupForm', parent: 'parentLoginForm' };
  const form = document.getElementById(map[name]);
  if (form) form.classList.add('active');
}

/* ----------------------------------------------------------
   SIGNUP — with OTP verification
   ---------------------------------------------------------- */

// Store pending OTPs temporarily (in-memory, cleared on page reload)
var pendingOTPs = {};

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function handleSignup(e) {
  e.preventDefault();
  const name         = document.getElementById('suName').value.trim();
  const grade        = document.getElementById('suGrade').value;
  const email        = document.getElementById('suEmail').value.trim().toLowerCase();
  const password     = document.getElementById('suPassword').value;
  const parentName   = document.getElementById('suParentName').value.trim();
  const parentEmail  = document.getElementById('suParentEmail').value.trim().toLowerCase();
  const parentPhone  = document.getElementById('suParentPhone').value.trim();
  const parentPassword = document.getElementById('suParentPassword').value;

  if (!name) return showToast('Please enter student name', 'error');
  if (!isValidEmail(email)) return showToast('Invalid student email', 'error');
  if (password.length < 4) return showToast('Password must be at least 4 characters', 'error');
  if (!parentName) return showToast('Please enter parent name', 'error');
  if (!isValidEmail(parentEmail)) return showToast('Invalid parent email', 'error');
  if (!parentPhone) return showToast('Please enter parent phone', 'error');
  if (parentPassword.length < 4) return showToast('Parent password must be at least 4 characters', 'error');

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return showToast('An account with this student email already exists', 'error');
  }

  // Generate OTP and show OTP verification step
  var otp = generateOTP();
  pendingOTPs[email] = {
    otp: otp,
    expires: Date.now() + 5 * 60 * 1000, // 5 minute expiry
    userData: { name, grade, email, password, parentName, parentEmail, parentPhone, parentPassword }
  };

  // Show OTP input UI
  showOTPStep(email, otp);
}

function showOTPStep(email, otp) {
  // Create or update OTP verification section in the signup form
  var form = document.getElementById('signupForm');
  if (!form) return;

  // Remove any existing OTP section
  var existingOTP = document.getElementById('otpSection');
  if (existingOTP) existingOTP.remove();

  // Create OTP verification section
  var otpHTML = '<div id="otpSection" style="margin-top:16px;padding:16px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.3);border-radius:10px;">' +
    '<h4 style="color:#38bdf8;font-size:14px;margin:0 0 8px;">🔐 OTP Verification</h4>' +
    '<p style="color:#94a3b8;font-size:12px;margin:0 0 10px;">A 6-digit OTP has been generated for <strong>' + email + '</strong>. ' +
    'For this pilot version, the OTP is shown below. In production, it would be sent via email/SMS.</p>' +
    '<div style="background:rgba(251,191,36,0.15);border:1px solid #fbbf24;border-radius:8px;padding:8px 12px;margin:0 0 12px;text-align:center;">' +
    '<span style="color:#fbbf24;font-size:24px;font-weight:700;letter-spacing:8px;">' + otp + '</span>' +
    '</div>' +
    '<input type="text" id="otpInput" placeholder="Enter 6-digit OTP" maxlength="6" style="width:100%;padding:10px 12px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:#e2e8f0;font-size:16px;text-align:center;letter-spacing:4px;font-family:monospace;margin-bottom:10px;" />' +
    '<div style="display:flex;gap:8px;">' +
    '<button type="button" id="otpVerifyBtn" style="flex:1;background:#0ea5e9;color:#fff;border:none;padding:10px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">Verify OTP &amp; Create Account</button>' +
    '<button type="button" id="otpResendBtn" style="background:#334155;color:#94a3b8;border:none;padding:10px 14px;border-radius:8px;font-size:12px;cursor:pointer;">Resend</button>' +
    '<button type="button" id="otpCancelBtn" style="background:#334155;color:#94a3b8;border:none;padding:10px 14px;border-radius:8px;font-size:12px;cursor:pointer;">Cancel</button>' +
    '</div>' +
    '<p style="color:#64748b;font-size:10px;margin:8px 0 0;text-align:center;">OTP expires in 5 minutes</p>' +
    '</div>';

  form.insertAdjacentHTML('beforeend', otpHTML);

  // Wire buttons
  document.getElementById('otpVerifyBtn').addEventListener('click', verifyOTP);
  document.getElementById('otpResendBtn').addEventListener('click', function() {
    var newOTP = generateOTP();
    pendingOTPs[email].otp = newOTP;
    pendingOTPs[email].expires = Date.now() + 5 * 60 * 1000;
    // Update the displayed OTP
    var otpDisplay = document.querySelector('#otpSection span[style*="letter-spacing"]');
    if (otpDisplay) otpDisplay.textContent = newOTP;
    showToast('New OTP generated!', 'info');
  });
  document.getElementById('otpCancelBtn').addEventListener('click', function() {
    delete pendingOTPs[email];
    var otpSection = document.getElementById('otpSection');
    if (otpSection) otpSection.remove();
    showToast('OTP cancelled', 'info');
  });

  // Focus the OTP input
  setTimeout(function() { document.getElementById('otpInput').focus(); }, 100);
}

function verifyOTP() {
  var email = document.getElementById('suEmail').value.trim().toLowerCase();
  var enteredOTP = document.getElementById('otpInput').value.trim();

  if (!enteredOTP) return showToast('Please enter the OTP', 'error');
  if (enteredOTP.length !== 6) return showToast('OTP must be 6 digits', 'error');

  var pending = pendingOTPs[email];
  if (!pending) return showToast('OTP expired or not found. Please try again.', 'error');
  if (Date.now() > pending.expires) {
    delete pendingOTPs[email];
    return showToast('OTP has expired. Please request a new one.', 'error');
  }
  if (enteredOTP !== pending.otp) {
    return showToast('Incorrect OTP. Please check and try again.', 'error');
  }

  // OTP verified — create the account
  var d = pending.userData;
  delete pendingOTPs[email];

  var user = {
    id: 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    name: d.name,
    grade: d.grade,
    email: d.email,
    passwordHash: simpleHash(d.password),
    parentName: d.parentName,
    parentEmail: d.parentEmail,
    parentPhone: d.parentPhone,
    parentPasswordHash: simpleHash(d.parentPassword),
    role: 'student',
    otpVerified: true,
    createdAt: new Date().toISOString()
  };
  var users = getUsers();
  users.push(user);
  saveUsers(users);

  // Auto-login after signup
  saveCurrentUser(user);
  showToast('Account created & verified! Welcome, ' + d.name, 'success');
  hideOverlay();
  buildUserBar();
  updateUserBar();

  // Lock grade to student's registered grade
  if (d.grade) {
    localStorage.setItem('selectedGrade', String(d.grade));
    var sb = document.querySelector('.class-selector-bar');
    if (sb) sb.style.display = 'none';
    var btns = document.querySelectorAll('.class-btn');
    btns.forEach(function(b) { b.classList.toggle('active', b.dataset.grade === String(d.grade)); });
    // Dispatch a custom event that app.js listens for to re-render
    setTimeout(function() {
      window.dispatchEvent(new CustomEvent('auth-grade-change', { detail: { grade: String(d.grade) } }));
    }, 100);
  }
}

/* ----------------------------------------------------------
   STUDENT LOGIN
   ---------------------------------------------------------- */
function handleStudentLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('slEmail').value.trim().toLowerCase();
  const password = document.getElementById('slPassword').value;

  if (!isValidEmail(email)) return showToast('Invalid email', 'error');
  if (!password) return showToast('Please enter password', 'error');

  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return showToast('No account found with this email', 'error');
  if (user.passwordHash !== simpleHash(password)) {
    return showToast('Incorrect password', 'error');
  }

  saveCurrentUser(user);
  showToast('Welcome back, ' + user.name, 'success');
  hideOverlay();
  buildUserBar();
  updateUserBar();

  // Lock grade to student's registered grade
  if (user.grade) {
    localStorage.setItem('selectedGrade', String(user.grade));
    var sb = document.querySelector('.class-selector-bar');
    if (sb) sb.style.display = 'none';
    var btns = document.querySelectorAll('.class-btn');
    btns.forEach(function(b) { b.classList.toggle('active', b.dataset.grade === String(user.grade)); });
    setTimeout(function() {
      window.dispatchEvent(new CustomEvent('auth-grade-change', { detail: { grade: String(user.grade) } }));
    }, 100);
  }
}

/* ----------------------------------------------------------
   PARENT LOGIN
   ---------------------------------------------------------- */
function handleParentLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('plEmail').value.trim().toLowerCase();
  const password = document.getElementById('plPassword').value;

  if (!isValidEmail(email)) return showToast('Invalid email', 'error');
  if (!password) return showToast('Please enter password', 'error');

  const users = getUsers();
  // Find any user whose parentEmail matches AND parent password matches
  const matched = users.filter(u =>
    u.parentEmail === email &&
    u.parentPasswordHash === simpleHash(password)
  );
  if (matched.length === 0) {
    return showToast('No matching parent account. Check email/password.', 'error');
  }
  // Store parent session
  const parentSession = {
    role: 'parent',
    parentEmail: email,
    parentName: matched[0].parentName,
    studentIds: matched.map(u => u.id),
    loggedInAt: new Date().toISOString()
  };
  saveCurrentUser(parentSession);
  showToast('Parent login successful — redirecting…', 'success');
  setTimeout(() => {
    window.location.href = 'parent-dashboard.html';
  }, 600);
}

/* ----------------------------------------------------------
   OVERLAY VISIBILITY
   ---------------------------------------------------------- */
function showOverlay() {
  buildOverlay();
  const o = document.getElementById('authOverlay');
  if (o) {
    o.style.display = 'flex';
    // Reset to student tab
    switchAuthTab('student');
  }
  document.body.style.overflow = 'hidden';
}

function hideOverlay() {
  const o = document.getElementById('authOverlay');
  if (o) o.style.display = 'none';
  document.body.style.overflow = '';
}

/* ----------------------------------------------------------
   USER BAR (top of page after login)
   ---------------------------------------------------------- */
function buildUserBar() {
  if (document.getElementById('userBar')) return;
  const bar = document.createElement('div');
  bar.id = 'userBar';
  bar.innerHTML = `
    <style>
      #userBar {
        position: sticky; top: 0; z-index: 9000;
        background: rgba(10, 19, 38, 0.96);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid #1e293b;
        padding: 8px 20px;
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; flex-wrap: wrap;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      #userBar .ub-user {
        display: flex; align-items: center; gap: 10px;
        font-size: 14px; color: #e2e8f0;
      }
      #userBar .ub-avatar {
        width: 28px; height: 28px; border-radius: 50%;
        background: #38bdf8; color: #0a1326;
        display: flex; align-items: center; justify-content: center;
        font-size: 13px; font-weight: 700;
      }
      #userBar .ub-meta { line-height: 1.2; }
      #userBar .ub-meta small { color: #94a3b8; font-size: 11px; }
      #userBar .ub-logout {
        background: transparent; color: #94a3b8;
        border: 1px solid #334155;
        padding: 6px 14px; border-radius: 6px;
        font-size: 12px; font-weight: 600; cursor: pointer;
        transition: all .2s; font-family: inherit;
      }
      #userBar .ub-logout:hover {
        border-color: #fca5a5; color: #fca5a5;
      }
    </style>
    <div class="ub-user">
      <div class="ub-avatar" id="ubAvatar">S</div>
      <div class="ub-meta">
        <div id="ubName">Student</div>
        <small id="ubGrade">Class —</small>
      </div>
    </div>
    <button class="ub-logout" id="ubLogoutBtn">Logout</button>
  `;
  // Insert at top of body
  document.body.insertBefore(bar, document.body.firstChild);
  document.getElementById('ubLogoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
      window.Auth.logout();
    }
  });
}

function updateUserBar() {
  const user = window.Auth.getCurrentUser();
  if (!user || user.role === 'parent') {
    const bar = document.getElementById('userBar');
    if (bar) bar.style.display = 'none';
    return;
  }
  buildUserBar();
  const bar = document.getElementById('userBar');
  bar.style.display = 'flex';
  const initials = (user.name || 'S').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  document.getElementById('ubAvatar').textContent = initials || 'S';
  document.getElementById('ubName').textContent = user.name || 'Student';
  document.getElementById('ubGrade').textContent = 'Class ' + (user.grade || '—');
}

/* ----------------------------------------------------------
   PROCTOR BADGE
   ---------------------------------------------------------- */
function buildProctorBadge() {
  if (document.getElementById('proctorBadge')) return;
  const badge = document.createElement('div');
  badge.id = 'proctorBadge';
  badge.innerHTML = `
    <style>
      #proctorBadge {
        position: fixed; bottom: 20px; right: 20px; z-index: 9500;
        background: #7f1d1d; color: #fef2f2;
        border: 1px solid #fca5a5;
        padding: 8px 14px; border-radius: 20px;
        font-size: 12px; font-weight: 700;
        display: none; align-items: center; gap: 8px;
        box-shadow: 0 6px 18px rgba(127, 29, 29, 0.5);
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      #proctorBadge .pb-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: #f87171; animation: pb-pulse 1.5s infinite;
      }
      @keyframes pb-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.4); }
      }
    </style>
    <span class="pb-dot"></span>
    <span>Proctoring Active</span>
  `;
  document.body.appendChild(badge);
}

function showProctorBadge() {
  buildProctorBadge();
  const b = document.getElementById('proctorBadge');
  if (b) b.style.display = 'flex';
}
function hideProctorBadge() {
  const b = document.getElementById('proctorBadge');
  if (b) b.style.display = 'none';
}

/* ----------------------------------------------------------
   PUBLIC API
   ---------------------------------------------------------- */
window.Auth = {
  signup: handleSignup,
  login: handleStudentLogin,
  logout: function() {
    saveCurrentUser(null);
    showToast('Logged out', 'success');
    // Stop proctoring
    if (window.Proctor && window.Proctor.stopProctoring) {
      window.Proctor.stopProctoring();
    }
    hideProctorBadge();
    // Hide user bar
    const bar = document.getElementById('userBar');
    if (bar) bar.style.display = 'none';

    // FULL TEARDOWN of the active lecture player.
    // This stops timers, TTS voice, globe/webgl render loops,
    // removes immersive overlay DOM nodes, and resets chapter
    // tracking. Without this, the player stays alive (and the
    // voice keeps reading) after the auth overlay appears.
    if (window.App && typeof window.App.teardownActiveContent === 'function') {
      window.App.teardownActiveContent();
    } else {
      // Fallback path if app.js hasn't loaded yet — partial cleanup
      try { if (window.TTS && TTS.stopSpeaking) TTS.stopSpeaking(); } catch(e) {}
      const im = document.querySelector('.immersive-overlay.active');
      if (im) im.classList.remove('active');
      document.body.style.overflow = '';
      const hs = document.getElementById('homeScreen');
      const cs = document.getElementById('chapterScreen');
      if (hs) hs.style.display = 'block';
      if (cs) cs.style.display = 'none';
    }

    // Now show the auth overlay (slight delay to let DOM settle)
    setTimeout(function() { showOverlay(); }, 100);
  },
  getCurrentUser: function() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },
  isLoggedIn: function() {
    const u = this.getCurrentUser();
    return !!u && u.role === 'student';
  },

  // Internal helpers exposed for proctor.js
  _showOverlay: showOverlay,
  _hideOverlay: hideOverlay,
  _updateUserBar: updateUserBar,
  _showProctorBadge: showProctorBadge,
  _hideProctorBadge: hideProctorBadge,
  _getUsers: getUsers
};

/* ----------------------------------------------------------
   INITIALIZATION — runs on page load
   ---------------------------------------------------------- */
function init() {
  const user = window.Auth.getCurrentUser();
  if (user && user.role === 'student') {
    // Logged in as student — show app + user bar
    hideOverlay();
    buildUserBar();
    updateUserBar();
    buildProctorBadge();
  } else if (user && user.role === 'parent') {
    // Parent landed on student app — redirect to dashboard
    window.location.href = 'parent-dashboard.html';
  } else {
    // Not logged in — show overlay
    showOverlay();
  }
}

// Wait for the entire page (including app.js) to finish loading
if (document.readyState === 'complete') {
  setTimeout(init, 100);
} else {
  window.addEventListener('load', function() { setTimeout(init, 100); });
}

})();
