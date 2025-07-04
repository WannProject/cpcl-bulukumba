/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Kepala Dinas Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Trend Chart
  const trendCtx = document.getElementById('trendChart');
  
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Pengajuan',
            data: [65, 78, 90, 105, 120, 135, 150, 145, 138, 155, 168, 180],
            backgroundColor: 'rgba(25, 135, 84, 0.8)',
            borderColor: '#198754',
            borderWidth: 1
          },
          {
            label: 'Disetujui',
            data: [50, 60, 70, 85, 95, 105, 120, 115, 110, 125, 140, 150],
            backgroundColor: 'rgba(13, 202, 240, 0.8)',
            borderColor: '#0dcaf0',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  // Distribution Chart
  const distributionCtx = document.getElementById('distributionChart');
  
  if (distributionCtx) {
    new Chart(distributionCtx, {
      type: 'bar',
      data: {
        labels: ['Ujung Bulu', 'Gantarang', 'Ujung Loe', 'Bontobahari', 'Bontotiro', 'Herlang', 'Kajang', 'Bulukumpa', 'Rilau Ale', 'Kindang'],
        datasets: [{
          label: 'Jumlah Bantuan (Ton)',
          data: [150, 235, 180, 205, 120, 135, 190, 210, 180, 145],
          backgroundColor: 'rgba(25, 135, 84, 0.8)',
          borderColor: '#198754',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: true
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Setup approval buttons for demo
  setupApprovalButtons();
});

// Setup approval buttons for demo
function setupApprovalButtons() {
  const approveButtons = document.querySelectorAll('button.btn-success');
  const rejectButtons = document.querySelectorAll('button.btn-danger');
  
  approveButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const id = row.cells[0].textContent;
      const kelompok = row.cells[1].textContent;
      
      if (confirm(`Apakah Anda yakin ingin menyetujui pengajuan ${id} dari ${kelompok}?`)) {
        // Show success message
        showAlert(`Pengajuan ${id} telah disetujui!`, 'success');
        
        // Remove row (for demo)
        setTimeout(() => {
          row.remove();
        }, 1000);
      }
    });
  });
  
  rejectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const id = row.cells[0].textContent;
      const kelompok = row.cells[1].textContent;
      
      if (confirm(`Apakah Anda yakin ingin menolak pengajuan ${id} dari ${kelompok}?`)) {
        // Show rejection message
        showAlert(`Pengajuan ${id} telah ditolak!`, 'danger');
        
        // Remove row (for demo)
        setTimeout(() => {
          row.remove();
        }, 1000);
      }
    });
  });
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