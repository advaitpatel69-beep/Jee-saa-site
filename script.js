(() => {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const close = () => { if (modal.open) modal.close(); };
  document.querySelectorAll('.image-button').forEach(btn => {
    btn.addEventListener('click', () => {
      modalImage.src = btn.dataset.image;
      modalImage.alt = btn.dataset.title || 'Expanded Jee Saa shade card';
      modalTitle.textContent = btn.dataset.title || '';
      modal.showModal();
    });
  });
  document.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 720 && a.closest('.desktop-nav')) document.querySelector('.desktop-nav')?.classList.remove('open');
  }));
})();
