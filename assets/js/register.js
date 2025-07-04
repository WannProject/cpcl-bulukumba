/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Registration JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  
  if (registrationForm) {
    // Password match validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (password && confirmPassword) {
      confirmPassword.addEventListener('input', validatePasswordMatch);
      password.addEventListener('input', validatePasswordMatch);
    }
    
    // Year validation
    const tahunBentuk = document.getElementById('tahunBentuk');
    if (tahunBentuk) {
      const currentYear = new Date().getFullYear();
      tahunBentuk.setAttribute('max', currentYear);
      
      tahunBentuk.addEventListener('input', function() {
        const year = parseInt(this.value, 10);
        if (year > currentYear) {
          this.value = currentYear;
        }
      });
    }
    
    // Password strength validation
    if (password) {
      password.addEventListener('input', validatePasswordStrength);
    }
  }
  
  // File input previews
  setupFileInputPreviews();
});

// Validate password match
function validatePasswordMatch() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords tidak cocok');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

// Validate password strength
function validatePasswordStrength() {
  const password = document.getElementById('password');
  const value = password.value;
  
  // Check for minimum length
  if (value.length < 8) {
    password.setCustomValidity('Password harus minimal 8 karakter');
    return;
  }
  
  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  
  if (!hasLetter || !hasNumber) {
    password.setCustomValidity('Password harus mengandung huruf dan angka');
  } else {
    password.setCustomValidity('');
  }
}

// Setup file input previews
function setupFileInputPreviews() {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    input.addEventListener('change', function(e) {
      // Would implement file preview here in a real application
      if (this.files && this.files[0]) {
        const fileName = this.files[0].name;
        const fileSize = Math.round(this.files[0].size / 1024); // KB
        
        // Show file info - in a real app would add a preview container
        console.log(`File selected: ${fileName} (${fileSize}KB)`);
      }
    });
  });
}