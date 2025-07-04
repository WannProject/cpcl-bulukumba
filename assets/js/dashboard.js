/**
 * CPCL - Sistem Informasi Dinas Pertanian Kabupaten Bulukumba
 * Dashboard JavaScript for Kelompok Tani
 */

document.addEventListener('DOMContentLoaded', function() {
  // Status Chart
  const statusCtx = document.getElementById('statusChart');
  
  if (statusCtx) {
    new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Disetujui', 'Dalam Proses', 'Ditolak'],
        datasets: [{
          data: [60, 40, 0],
          backgroundColor: [
            '#198754', // success
            '#ffc107', // warning
            '#dc3545'  // danger
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }

  // Application filter functionality
  const searchApplication = document.getElementById('searchApplication');
  const filterStatus = document.getElementById('filterStatus');
  
  if (searchApplication) {
    searchApplication.addEventListener('input', filterApplications);
  }
  
  if (filterStatus) {
    filterStatus.addEventListener('change', filterApplications);
  }
  
  function filterApplications() {
    const searchValue = searchApplication.value.toLowerCase();
    const statusValue = filterStatus.value;
    
    // Demo implementation - in real app would filter backend data
    const tableRows = document.querySelectorAll('#history-tab table tbody tr');
    
    tableRows.forEach(row => {
      const id = row.cells[0].textContent.toLowerCase();
      const type = row.cells[1].textContent.toLowerCase();
      const date = row.cells[2].textContent.toLowerCase();
      const status = row.querySelector('.badge').textContent;
      
      const matchesSearch = id.includes(searchValue) || 
                           type.includes(searchValue) || 
                           date.includes(searchValue);
      
      const matchesStatus = statusValue === '' || status.includes(statusValue);
      
      if (matchesSearch && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
});