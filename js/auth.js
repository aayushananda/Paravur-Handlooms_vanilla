// auth.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      
      const errorMsg = document.getElementById('error-msg');
      
      // Strict validation: no spaces in password/email
      if (email.includes(' ') || password.includes(' ')) {
        errorMsg.classList.remove('hidden');
        return;
      }
      
      // Setup mock user
      const user = {
        name: name,
        email: email,
        address: address,
        token: 'mock_token_' + Date.now()
      };
      
      localStorage.setItem('ph_user', JSON.stringify(user));
      
      // Check for redirect param
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      if (redirect === 'checkout') {
        window.location.href = 'checkout.html';
      } else {
        window.location.href = 'user.html';
      }
    });
  }
});
