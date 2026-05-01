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
    let offset = 0;
    let frameId = 0;
    const speed = 0.45;
    const originals = Array.from(cards);

    originals.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    const getLoopWidth = () => {
      const gapValue = Number.parseFloat(getComputedStyle(track).gap || "0");
      return originals.reduce((sum, card) => sum + card.offsetWidth, 0) + gapValue * originals.length;
    };

    let loopWidth = 0;

    const animate = () => {
      if (!pause) {
        if (!loopWidth) {
          loopWidth = getLoopWidth();
        }

        offset += speed;
        if (offset >= loopWidth) {
          offset = 0;
        }

        track.style.transform = `translateX(-${offset}px)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      pause = true;
    };

    const resume = () => {
      loopWidth = getLoopWidth();
      pause = false;
    };

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", resume);
    carousel.addEventListener("touchstart", stop, { passive: true });
    carousel.addEventListener("touchend", resume);
    window.addEventListener("resize", () => {
      loopWidth = getLoopWidth();
    });
    frameId = window.requestAnimationFrame(animate);
    window.addEventListener("beforeunload", () => window.cancelAnimationFrame(frameId));
  }
}
