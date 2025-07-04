/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Toggle sidebar
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
    });
  }

  // Form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // For demo purposes - prevent actual form submission
        event.preventDefault();
        if (form.id === 'loginForm') {
          handleLogin();
        } else if (form.id === 'registrationForm') {
          handleRegistration();
        } else if (form.id === 'applicationForm') {
          handleApplicationSubmit();
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Toggle password visibility
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const password = document.getElementById('password');
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      
      // Toggle icon
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }
  
  if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener('click', function() {
      const confirmPassword = document.getElementById('confirmPassword');
      const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPassword.setAttribute('type', type);
      
      // Toggle icon
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Handle login (demo)
function handleLogin() {
  const userType = document.getElementById('userType').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (userType && username && password) {
    // Simple validation for demo
    if (password.length < 4) {
      showAlert('Password terlalu pendek.', 'danger');
      return;
    }
    
    // Redirect based on user type (for demo purposes)
    switch(userType) {
      case 'kelompok-tani':
        window.location.href = 'kelompok-tani/dashboard.html';
        break;
      case 'admin':
        window.location.href = 'admin/dashboard.html';
        break;
      case 'kepala-dinas':
        window.location.href = 'kepala-dinas/dashboard.html';
        break;
      default:
        showAlert('Tipe pengguna tidak valid.', 'danger');
    }
  }
}

// Handle registration (demo)
function handleRegistration() {
  // Show success message
  showAlert('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.', 'success');
  
  // Redirect after delay
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 3000);
}

// Handle application submit (demo)
function handleApplicationSubmit() {
  // Show success message
  showAlert('Pengajuan bantuan berhasil dikirim! Silakan pantau status pengajuan Anda.', 'success');
  
  // Redirect after delay
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 3000);
}

// Show alert function
function showAlert(message, type) {
  // Create alert element
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4 shadow-sm`;
  alertDiv.style.zIndex = '9999';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  // Append to body
  document.body.appendChild(alertDiv);
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    const bsAlert = new bootstrap.Alert(alertDiv);
    bsAlert.close();
  }, 5000);
}