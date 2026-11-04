(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const panels = document.querySelectorAll(".panel");
  const hero = document.querySelector(".hero img");

  if (reduced) {
    panels.forEach((panel) => panel.classList.add("is-in"));
    return;
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.32 });

  panels.forEach((panel) => reveal.observe(panel));

  if (!hero) return;
  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      hero.style.transform = `translateY(${progress * 36}px) scale(${1 + progress * 0.045})`;
      hero.style.opacity = String(1 - progress * 0.38);
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
