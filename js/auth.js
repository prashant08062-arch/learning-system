/* ============================================================
   AUTH — Simple localStorage-based authentication
   ============================================================ */

(function() {
'use strict';

const USERS_KEY = 'learning_system_users';
const CURRENT_USER_KEY = 'learning_system_current_user';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function simpleHash(str) {
  let hash = 0;
  const salt = 'LSSalt_v1::';
  const salted = salt + str + salt;
  for (let i = 0; i < salted.length; i++) {
    hash = ((hash << 5) - hash) + salted.charCodeAt(i);
    hash |= 0;
  }
  let xored = '';
  for (let i = 0; i < str.length; i++) {
    xored += String.fromCharCode(str.charCodeAt(i) ^ ((hash >>> 0) % 251));
  }
  try {
    const bytes = new TextEncoder().encode(xored);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin) + '_' + (hash >>> 0).toString(16);
  } catch(e) {
    return String(hash >>> 0);
  }
}

function saveCurrentUser(user) {
  if (user) {
    var safe = Object.assign({}, user);
    delete safe.passwordHash;
    delete safe.parentPasswordHash;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safe));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function showToast(msg, type) {
  var t = document.getElementById('authToast');
  if (!t) return;
  t.textContent = msg;
  t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);' +
    'padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;z-index:100001;' +
    'background:' + (type === 'error' ? '#fca5a5' : type === 'success' ? '#86efac' : '#38bdf8') +
    ';color:' + (type === 'error' ? '#7f1d1d' : type === 'success' ? '#064e3b' : '#0a1326') + ';';
  setTimeout(function() { t.textContent = ''; t.style.cssText = ''; }, 3000);
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function isValidPhone(p) {
  var d = p.replace(/[^\d]/g, '');
  return /^[+]?[\d\s-]{7,20}$/.test(p) && d.length >= 8 && d.length <= 15;
}

function showOverlay() {
  var o = document.getElementById('authOverlay');
  if (o) o.style.display = 'flex';
  var hs = document.getElementById('homeScreen');
  if (hs) hs.style.opacity = '0.3';
}
function hideOverlay() {
  var o = document.getElementById('authOverlay');
  if (o) o.style.display = 'none';
  var hs = document.getElementById('homeScreen');
  if (hs) hs.style.opacity = '1';
  var lb = document.getElementById('logoutBtn');
  if (lb) lb.style.display = '';
}

function handleSignup() {
  var name = document.getElementById('suName').value.trim();
  var grade = document.getElementById('suGrade').value;
  var email = document.getElementById('suEmail').value.trim().toLowerCase();
  var password = document.getElementById('suPassword').value;
  var parentName = document.getElementById('suParentName').value.trim();
  var parentEmail = document.getElementById('suParentEmail').value.trim().toLowerCase();
  var parentPhone = document.getElementById('suParentPhone').value.trim();
  var parentPassword = document.getElementById('suParentPassword').value;

  if (!name) return showToast('Please enter student name', 'error');
  if (!isValidEmail(email)) return showToast('Invalid student email', 'error');
  if (password.length < 4) return showToast('Password must be at least 4 characters', 'error');
  if (!parentName) return showToast('Please enter parent name', 'error');
  if (!isValidEmail(parentEmail)) return showToast('Invalid parent email', 'error');
  if (!isValidPhone(parentPhone)) return showToast('Invalid parent phone', 'error');
  if (parentPassword.length < 4) return showToast('Parent password too short', 'error');

  var users = getUsers();
  if (users.find(function(u) { return u.email === email; }))
    return showToast('Account already exists', 'error');

  // Generate OTP
  var otp = String(Math.floor(100000 + Math.random() * 900000));
  var pending = { otp: otp, expires: Date.now() + 300000,
    data: { name: name, grade: grade, email: email, password: password,
            parentName: parentName, parentEmail: parentEmail,
            parentPhone: parentPhone, parentPassword: parentPassword } };

  // Show OTP section
  var otpSection = document.getElementById('otpSection');
  otpSection.style.display = 'block';
  otpSection.innerHTML = '<div style="margin-top:16px;padding:16px;background:rgba(56,189,248,0.08);' +
    'border:1px solid rgba(56,189,248,0.3);border-radius:10px;">' +
    '<h4 style="color:#38bdf8;font-size:14px;margin:0 0 8px;">🔐 Confirm Signup (Pilot Code)</h4>' +
    '<p style="color:#94a3b8;font-size:12px;margin:0 0 10px;">This is an offline pilot. Your code: ' +
    '<strong style="color:#fbbf24;font-size:24px;letter-spacing:8px;">' + otp + '</strong></p>' +
    '<input type="text" id="otpInput" placeholder="Enter 6-digit code" maxlength="6" ' +
    'style="width:100%;padding:10px;background:#1e293b;border:1px solid #334155;border-radius:8px;' +
    'color:#e2e8f0;font-size:16px;text-align:center;letter-spacing:4px;font-family:monospace;margin-bottom:10px;" />' +
    '<button id="otpVerifyBtn" style="width:100%;background:#0ea5e9;color:#fff;border:none;padding:10px;' +
    'border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">Verify &amp; Create Account</button></div>';

  document.getElementById('otpVerifyBtn').addEventListener('click', function() {
    var entered = document.getElementById('otpInput').value.trim();
    if (entered !== otp) return showToast('Wrong code', 'error');
    var d = pending.data;
    var user = {
      id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: d.name, grade: d.grade, email: d.email,
      passwordHash: simpleHash(d.password),
      parentName: d.parentName, parentEmail: d.parentEmail,
      parentPhone: d.parentPhone, parentPasswordHash: simpleHash(d.parentPassword),
      role: 'student', otpVerified: true,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    saveCurrentUser(user);
    otpSection.style.display = 'none';
    otpSection.innerHTML = '';
    showToast('Account created! Welcome, ' + d.name, 'success');
    setTimeout(hideOverlay, 500);
    if (typeof window.onAuthSuccess === 'function') window.onAuthSuccess();
  });
}

function handleLogin() {
  var email = document.getElementById('loginEmail').value.trim().toLowerCase();
  var password = document.getElementById('loginPassword').value;
  if (!email || !password) return showToast('Enter email and password', 'error');
  var users = getUsers();
  var user = users.find(function(u) { return u.email === email; });
  if (!user || user.passwordHash !== simpleHash(password))
    return showToast('Invalid credentials', 'error');
  saveCurrentUser(user);
  showToast('Welcome back, ' + user.name, 'success');
  setTimeout(hideOverlay, 500);
  if (typeof window.onAuthSuccess === 'function') window.onAuthSuccess();
}

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)); }
  catch(e) { return null; }
}

function isLoggedIn() {
  var u = getCurrentUser();
  return !!(u && u.role === 'student');
}

function logout() {
  saveCurrentUser(null);
  stopSpeaking();
  var hs = document.getElementById('homeScreen');
  var cs = document.getElementById('chapterScreen');
  if (hs) { hs.style.display = 'block'; hs.style.opacity = '1'; }
  if (cs) cs.style.display = 'none';
  showOverlay();
}

// Init
function init() {
  var user = getCurrentUser();
  if (user && user.role === 'student') {
    hideOverlay();
  } else {
    showOverlay();
  }

  // Wire auth tabs
  document.querySelectorAll('.auth-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.auth-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var mode = tab.dataset.mode;
      document.getElementById('loginForm').style.display = mode === 'login' ? 'block' : 'none';
      document.getElementById('signupForm').style.display = mode === 'signup' ? 'block' : 'none';
      var otpS = document.getElementById('otpSection');
      if (otpS) { otpS.style.display = 'none'; otpS.innerHTML = ''; }
    });
  });

  var loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', handleLogin);
  var signupBtn = document.getElementById('signupBtn');
  if (signupBtn) signupBtn.addEventListener('click', handleSignup);

  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

window.Auth = {
  getCurrentUser: getCurrentUser,
  isLoggedIn: isLoggedIn,
  logout: logout,
  _toast: showToast
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
