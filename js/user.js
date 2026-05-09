// user.js
document.addEventListener('DOMContentLoaded', () => {
  const userStr = localStorage.getItem('ph_user');
  if (!userStr) {
    window.location.href = 'login.html';
    return;
  }
  
  const user = JSON.parse(userStr);
  
  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const addressEl = document.getElementById('profile-address');
  
  if (nameEl) nameEl.textContent = user.name || 'Guest User';
  if (emailEl) emailEl.textContent = user.email || '';
  if (addressEl) addressEl.textContent = user.address || 'No address provided';
  
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('ph_user');
      window.location.href = 'index.html';
    });
  }
});
