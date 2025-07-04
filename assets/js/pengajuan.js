/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Pengajuan JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Handle jenis bantuan changes
  const jenisBantuan = document.getElementById('jenisBantuan');
  const satuanBantuan = document.getElementById('satuanBantuan');
  
  if (jenisBantuan && satuanBantuan) {
    jenisBantuan.addEventListener('change', function() {
      // Change satuan based on selected bantuan
      const selectedValue = this.value;
      
      if (selectedValue === 'Bibit Padi' || selectedValue === 'Bibit Jagung' || selectedValue === 'Bibit Kedelai' || selectedValue === 'Pupuk Subsidi') {
        satuanBantuan.textContent = 'Kg';
      } else if (selectedValue === 'Pestisida') {
        satuanBantuan.textContent = 'Liter';
      } else if (selectedValue === 'Alat Pertanian') {
        satuanBantuan.textContent = 'Unit';
      } else {
        satuanBantuan.textContent = 'Item';
      }
    });
  }
  
  // Setup file input validations and previews
  setupFileValidations();
  
  // Handle tab changes
  const navTabs = document.querySelectorAll('.nav-link');
  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Store active tab in sessionStorage
      sessionStorage.setItem('activeTab', this.getAttribute('href'));
    });
  });
  
  // Restore active tab from sessionStorage
  const activeTab = sessionStorage.getItem('activeTab');
  if (activeTab) {
    const tab = document.querySelector(`.nav-link[href="${activeTab}"]`);
    if (tab) {
      const bsTab = new bootstrap.Tab(tab);
      bsTab.show();
    }
  }
  
  // Handle detail modal
  setupDetailModal();
  
  // Handle cancel modal
  setupCancelModal();
});

// Setup file validations
function setupFileValidations() {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    input.addEventListener('change', function(e) {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        const fileSize = Math.round(file.size / 1024); // KB
        
        // Validate file size (max 5MB)
        if (fileSize > 5120) {
          alert('Ukuran file terlalu besar. Maksimal 5MB.');
          this.value = '';
          return;
        }
        
        // Validate file type for images
        if (this.accept.includes('image') && !file.type.startsWith('image/')) {
          alert('File harus berupa gambar (JPG, PNG, GIF).');
          this.value = '';
          return;
        }
        
        // Validate file type for documents
        if (this.accept.includes('.pdf') && !file.type.includes('pdf') && 
            this.accept.includes('.doc') && !file.type.includes('word')) {
          alert('File harus berupa dokumen (PDF, DOC, DOCX).');
          this.value = '';
          return;
        }
      }
    });
  });
}

// Setup detail modal
function setupDetailModal() {
  const detailModal = document.getElementById('detailModal');
  
  if (detailModal) {
    detailModal.addEventListener('show.bs.modal', function(event) {
      // Button that triggered the modal
      const button = event.relatedTarget;
      
      // In a real app, we would fetch data based on the pengajuan ID
      // For demo, we'll use static data
      
      // Update modal title with pengajuan ID from closest table row
      const row = button.closest('tr');
      if (row) {
        const id = row.cells[0].textContent;
        const modalTitle = this.querySelector('.modal-title');
        modalTitle.textContent = `Detail Pengajuan ${id}`;
      }
    });
  }
}

// Setup cancel modal
function setupCancelModal() {
  const cancelModal = document.getElementById('cancelModal');
  
  if (cancelModal) {
    cancelModal.addEventListener('show.bs.modal', function(event) {
      // Button that triggered the modal
      const button = event.relatedTarget;
      
      // Get pengajuan ID from closest table row
      const row = button.closest('tr');
      if (row) {
        const id = row.cells[0].textContent;
        const modalBody = this.querySelector('.modal-body p:first-child');
        modalBody.textContent = `Apakah Anda yakin ingin membatalkan pengajuan bantuan ${id}?`;
      }
    });
    
    // Handle confirmation button
    const confirmButton = cancelModal.querySelector('.btn-danger');
    if (confirmButton) {
      confirmButton.addEventListener('click', function() {
        // In a real app, we would send a request to cancel the application
        // For demo, just close the modal and show a success message
        const modal = bootstrap.Modal.getInstance(cancelModal);
        modal.hide();
        
        // Show success message
        showAlert('Pengajuan bantuan berhasil dibatalkan!', 'success');
      });
    }
  }
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
    alertDiv.classList.remove('show');
    setTimeout(() => {
      alertDiv.remove();
    }, 150);
  }, 5000);
}