const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const carousel = document.querySelector("[data-carousel]");

if (carousel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let pause = false;
  const step = () => {
    if (pause) {
      return;
    }

    const limit = carousel.scrollWidth - carousel.clientWidth;
    const next = carousel.scrollLeft + 1.1;

    if (next >= limit) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    carousel.scrollLeft = next;
  };

  const timer = window.setInterval(step, 24);

  const stop = () => {
    pause = true;
  };

  const resume = () => {
    pause = false;
  };

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", resume);
  carousel.addEventListener("touchstart", stop, { passive: true });
  carousel.addEventListener("touchend", resume);
  window.addEventListener("beforeunload", () => window.clearInterval(timer));
}
