/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Admin Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Application Chart
  const applicationCtx = document.getElementById('applicationChart');
  
  if (applicationCtx) {
    new Chart(applicationCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Pengajuan',
            data: [15, 22, 18, 25, 30, 28, 35, 32, 28, 25, 35, 42],
            borderColor: '#198754',
            backgroundColor: 'rgba(25, 135, 84, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Disetujui',
            data: [12, 18, 15, 20, 22, 25, 30, 28, 24, 20, 30, 36],
            borderColor: '#0dcaf0',
            backgroundColor: 'rgba(13, 202, 240, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
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
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }

  // Distribution Chart
  const distributionCtx = document.getElementById('distributionChart');
  
  if (distributionCtx) {
    new Chart(distributionCtx, {
      type: 'pie',
      data: {
        labels: ['Bibit Padi', 'Bibit Jagung', 'Pupuk', 'Pestisida', 'Alat Pertanian'],
        datasets: [{
          data: [40, 20, 25, 10, 5],
          backgroundColor: [
            '#198754', // success
            '#0dcaf0', // info
            '#ffc107', // warning
            '#6c757d', // secondary
            '#dc3545'  // danger
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12
            }
          }
        }
      }
    });
  }

  // Setup action buttons for demo
  setupVerificationButtons();
  setupActionButtonsDemo();
});

// Setup verification buttons for demo
function setupVerificationButtons() {
  const verifyButtons = document.querySelectorAll('button.btn-outline-primary:not(.dropdown-toggle)');
  
  verifyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Show verification modal (would implement in real app)
      alert('Membuka form verifikasi pengajuan...');
    });
  });
}

// Setup action buttons for demo
function setupActionButtonsDemo() {
  // Example function for demo purposes
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.textContent.trim();
      const row = this.closest('tr');
      const id = row ? row.cells[0].textContent : 'Unknown';
      
      alert(`Aksi ${action} pada pengajuan ${id}`);
    });
  });
}