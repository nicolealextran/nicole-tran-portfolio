const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? '−' : '＋';
});
siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  const icon = menuToggle?.querySelector('span');
  if (icon) icon.textContent = '＋';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const photoCards = [...document.querySelectorAll('.photo-card')];
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('figcaption');
let currentPhoto = 0;
function openPhoto(index) {
  if (!photoCards.length || !lightboxImg) return;
  currentPhoto = (index + photoCards.length) % photoCards.length;
  const card = photoCards[currentPhoto];
  const img = card.querySelector('img');
  lightboxImg.src = card.dataset.full || img.src;
  lightboxImg.alt = img.alt || 'Portfolio photograph';
  lightboxCaption.textContent = card.dataset.caption || '';
  if (!lightbox.open) lightbox.showModal();
}
photoCards.forEach((card, index) => card.addEventListener('click', () => openPhoto(index)));
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => openPhoto(currentPhoto - 1));
lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => openPhoto(currentPhoto + 1));
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
document.addEventListener('keydown', event => {
  if (!lightbox?.open) return;
  if (event.key === 'ArrowLeft') openPhoto(currentPhoto - 1);
  if (event.key === 'ArrowRight') openPhoto(currentPhoto + 1);
});

// Hide missing images cleanly until the matching photo or cover is uploaded.
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });
});
