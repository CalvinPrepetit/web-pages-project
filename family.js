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
  const track = carousel.querySelector("[data-carousel-track]");
  const cards = Array.from(carousel.querySelectorAll(".wheel-card"));
  if (!track || !cards.length) {
    // no-op
  } else {
  let pause = false;
  let index = 0;

  const goToCard = (nextIndex) => {
    index = nextIndex >= cards.length ? 0 : nextIndex;
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const step = () => {
    if (pause) {
      return;
    }
    goToCard(index + 1);
  };

  const timer = window.setInterval(step, 3200);

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
}
