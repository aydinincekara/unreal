/* ========================================================
   UnrealAkademi — Main
   Genel sayfa yönetimi, sidebar, navigasyon
   ======================================================== */

const App = {
  init() {
    this.setupSidebar();
    this.setupCompleteButton();
    this.highlightCurrentPage();
  },

  /**
   * Mobil sidebar toggle
   */
  setupSidebar() {
    const toggle = document.querySelector('.mobile-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
      });

      // Bir nav linkine tıklanınca sidebar'ı kapat (mobilde)
      sidebar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
          }
        });
      });

      // Backdrop'a tıklayınca kapat
      document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !toggle.contains(e.target)) {
          sidebar.classList.remove('open');
          document.body.classList.remove('sidebar-open');
        }
      });
    }
  },

  /**
   * "Bu Bölümü Tamamladım" butonu
   */
  setupCompleteButton() {
    const btn = document.querySelector('.btn-complete');
    if (!btn) return;

    const sectionId = btn.dataset.section;
    if (!sectionId) return;

    btn.addEventListener('click', () => {
      Progress.toggle(sectionId);
    });
  },

  /**
   * Mevcut sayfayı sidebar'da işaretle
   */
  highlightCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkFile = href.split('/').pop().replace('.html', '');
        if (linkFile === filename || (filename === '' && href.includes('index'))) {
          link.classList.add('active');
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
