(() => {
  /* ── Product tabs — scoped per tablist (supports nested sub-tabs) ── */
  document.querySelectorAll('[role="tablist"]').forEach(tablist => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all sibling tabs in this tablist
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        // Hide all panels controlled by this tablist
        tabs.forEach(t => {
          const panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.classList.add('product-panel--hidden');
        });
        // Activate clicked tab and show its panel
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const target = document.getElementById(tab.getAttribute('aria-controls'));
        if (target) target.classList.remove('product-panel--hidden');
      });
    });
  });

  /* ── Shade card image modal ── */

  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const closeImageModal = () => { if (modal.open) modal.close(); };

  document.querySelectorAll('.image-button').forEach(btn => {
    btn.addEventListener('click', () => {
      modalImage.src = btn.dataset.image;
      modalImage.alt = btn.dataset.title || 'Expanded Jee Saa shade card';
      modalTitle.textContent = btn.dataset.title || '';
      modal.showModal();
    });
  });
  document.querySelector('.modal-close').addEventListener('click', closeImageModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeImageModal(); });

  /* ── Business card modal ── */
  const bizModal = document.getElementById('biz-card-modal');
  const bizBtn = document.getElementById('view-biz-card-btn');
  const bizClose = document.querySelector('.biz-card-close');

  if (bizBtn && bizModal) {
    bizBtn.addEventListener('click', () => bizModal.showModal());
    bizClose && bizClose.addEventListener('click', () => bizModal.close());
    bizModal.addEventListener('click', e => { if (e.target === bizModal) bizModal.close(); });
  }

  /* Drawer business card button */
  const drawerBizBtn = document.getElementById('drawer-biz-card-btn');
  if (drawerBizBtn && bizModal) {
    drawerBizBtn.addEventListener('click', () => {
      closeDrawer();
      setTimeout(() => bizModal.showModal(), 320); // wait for drawer to close
    });
  }

  /* ── Hamburger / mobile drawer ── */
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close-btn');

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', openDrawer);
  drawerClose && drawerClose.addEventListener('click', closeDrawer);
  overlay && overlay.addEventListener('click', closeDrawer);

  /* Close drawer when a nav link is clicked */
  drawer && drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* Escape key closes any open modal or drawer */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeImageModal();
      closeDrawer();
      if (bizModal && bizModal.open) bizModal.close();
    }
  });
  /* ── Back-to-top FAB ── */
  const fabTop = document.getElementById('fab-top');
  if (fabTop) {
    const toggleFab = () => {
      fabTop.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleFab, { passive: true });
    toggleFab();
    fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();

