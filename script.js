document.addEventListener("DOMContentLoaded", () => {
  // Google Calendar appointment schedule
  const CALENDAR_BOOKING_URL = "https://calendar.app.google/mpgkVYMs6ri6fu1r7";
  document.querySelectorAll(".calendar-link").forEach(link => {
    link.href = CALENDAR_BOOKING_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Responsive navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.innerHTML = open ? "CLOSE −" : "MENU <span>＋</span>";
    });
    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "MENU <span>＋</span>";
      });
    });
  }

  // Gallery pagination and accessible lightbox
  const grid = document.getElementById("photo-grid");
  if (grid) {
    const allCards = Array.from(grid.querySelectorAll(".photo-card"));
    const perPage = 8;
    const totalPages = Math.ceil(allCards.length / perPage);
    let page = 0;
    let activeIndex = 0;
    const pageLabel = document.getElementById("gallery-page-label");
    const prev = document.getElementById("gallery-prev");
    const next = document.getElementById("gallery-next");
    const dialog = document.querySelector(".lightbox");
    const image = dialog?.querySelector("figure img");
    const caption = dialog?.querySelector("figcaption");

    function render() {
      allCards.forEach((card, i) => {
        card.hidden = i < page * perPage || i >= (page + 1) * perPage;
      });
      if (pageLabel) pageLabel.textContent = `${page + 1} / ${totalPages}`;
      if (prev) prev.disabled = page === 0;
      if (next) next.disabled = page === totalPages - 1;
    }

    function showPhoto(index) {
      if (!dialog || !image) return;
      activeIndex = (index + allCards.length) % allCards.length;
      const card = allCards[activeIndex];
      const source = card.dataset.full || card.querySelector("img")?.src;
      image.src = source;
      image.alt = card.querySelector("img")?.alt || "Nicole Tran photograph";
      if (caption) caption.textContent = `NICOLE TRAN · ${String(activeIndex + 1).padStart(2, "0")}`;
      if (!dialog.open) dialog.showModal();
    }

    allCards.forEach((card, index) => {
      card.addEventListener("click", () => showPhoto(index));
    });
    prev?.addEventListener("click", () => { if (page > 0) { page--; render(); } });
    next?.addEventListener("click", () => { if (page < totalPages - 1) { page++; render(); } });
    dialog?.querySelector(".lightbox-close")?.addEventListener("click", () => dialog.close());
    dialog?.querySelector(".lightbox-prev")?.addEventListener("click", () => showPhoto(activeIndex - 1));
    dialog?.querySelector(".lightbox-next")?.addEventListener("click", () => showPhoto(activeIndex + 1));
    dialog?.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    document.addEventListener("keydown", event => {
      if (!dialog?.open) return;
      if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
      if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
    });
    render();
  }

  // Subtle pink star cursor on mouse/trackpad devices
  if (window.matchMedia("(pointer: fine)").matches) {
    const star = document.createElement("span");
    star.className = "star-cursor";
    star.textContent = "✦";
    star.setAttribute("aria-hidden", "true");
    document.body.appendChild(star);
    document.addEventListener("mousemove", event => {
      star.style.left = `${event.clientX}px`;
      star.style.top = `${event.clientY}px`;
    });
    document.addEventListener("mousedown", () => {
      star.style.transform = "translate(-50%, -50%) scale(1.45) rotate(25deg)";
    });
    document.addEventListener("mouseup", () => {
      star.style.transform = "translate(-50%, -50%) scale(1) rotate(0)";
    });
  }
});
