/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Login JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Handle user type selection changes
  const userType = document.getElementById('userType');
  const loginForm = document.getElementById('loginForm');
  
  if (userType) {
    userType.addEventListener('change', function() {
      // Could customize login form based on user type if needed
      const selectedType = this.value;
      console.log(`Selected user type: ${selectedType}`);
      
      // Example: Change form placeholder based on user type
      const usernameField = document.getElementById('username');
      if (usernameField) {
        if (selectedType === 'kelompok-tani') {
          usernameField.placeholder = 'Masukkan ID Kelompok Tani';
        } else if (selectedType === 'admin') {
          usernameField.placeholder = 'Masukkan Username Admin';
        } else if (selectedType === 'kepala-dinas') {
          usernameField.placeholder = 'Masukkan Username Kepala Dinas';
        } else {
          usernameField.placeholder = 'Masukkan username';
        }
      }
    });
  }
  
  // Additional login form validation
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Additional validation if needed
      if (username && password) {
        // This is just for demonstration
        // In a real app, this would be handled by the main.js handleLogin function
      }
    });
  }
});