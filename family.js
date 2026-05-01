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
  const cards = Array.from(carousel.querySelectorAll(".wheel-card"));
  let index = 0;

  const goToCard = (nextIndex) => {
    if (!cards.length) {
      return;
    }

    index = nextIndex >= cards.length ? 0 : nextIndex;
    const card = cards[index];

    carousel.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
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
  carousel.addEventListener("scroll", () => {
    if (pause) {
      const nearest = cards.reduce(
        (best, card, cardIndex) => {
          const distance = Math.abs(carousel.scrollLeft - card.offsetLeft);
          return distance < best.distance ? { distance, index: cardIndex } : best;
        },
        { distance: Number.POSITIVE_INFINITY, index: 0 }
      );
      index = nearest.index;
    }
  });
  window.addEventListener("beforeunload", () => window.clearInterval(timer));
}
