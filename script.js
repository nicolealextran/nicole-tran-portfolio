// Small interactions: mobile navigation, gallery filters, and photo lightbox.
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("span").textContent = isOpen ? "−" : "＋";
});
siteNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  siteNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) menuToggle.querySelector("span").textContent = "＋";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll(".filter-button");
const photoCards = [...document.querySelectorAll(".photo-card")];
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  const filter = button.dataset.filter;
  photoCards.forEach(card => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
}));

const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("figcaption");
const closeLightbox = lightbox?.querySelector(".lightbox-close");
const previous = lightbox?.querySelector(".lightbox-prev");
const next = lightbox?.querySelector(".lightbox-next");
let currentPhoto = 0;

function openPhoto(index) {
  const visibleCards = photoCards.filter(card => !card.hidden);
  if (!visibleCards.length) return;
  currentPhoto = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentPhoto];
  const img = card.querySelector("img");
  const source = card.dataset.full || img?.getAttribute("src");
  if (!source || !lightboxImg) return;
  lightboxImg.src = source;
  lightboxImg.alt = img?.alt || "Portfolio photograph";
  lightboxCaption.textContent = card.dataset.caption || "";
  if (!lightbox.open) lightbox.showModal();
}
photoCards.forEach((card, index) => card.addEventListener("click", () => {
  const visibleCards = photoCards.filter(item => !item.hidden);
  openPhoto(visibleCards.indexOf(card));
}));
closeLightbox?.addEventListener("click", () => lightbox.close());
previous?.addEventListener("click", () => openPhoto(currentPhoto - 1));
next?.addEventListener("click", () => openPhoto(currentPhoto + 1));
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener("keydown", event => {
  if (!lightbox?.open) return;
  if (event.key === "ArrowLeft") openPhoto(currentPhoto - 1);
  if (event.key === "ArrowRight") openPhoto(currentPhoto + 1);
});
