document.documentElement.classList.add("has-js");

const revealItems = [
  ...document.querySelectorAll("main > section:not(.hero):not(.screen-gallery)"),
  ...document.querySelectorAll(".screen-story"),
];

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 55}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const canTilt =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canTilt) {
  document.querySelectorAll(".tilt-surface").forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const bounds = surface.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      surface.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
      surface.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
    });

    surface.addEventListener("pointerleave", () => {
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
    });
  });

  document.querySelectorAll(".hero-product").forEach((stage) => {
    const device = stage.querySelector(".device-hero");
    if (!device) return;

    stage.addEventListener("pointermove", (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      device.style.setProperty("--stage-x", `${(x * 13).toFixed(2)}px`);
      device.style.setProperty("--stage-y", `${(y * 9).toFixed(2)}px`);
    });

    stage.addEventListener("pointerleave", () => {
      device.style.setProperty("--stage-x", "0px");
      device.style.setProperty("--stage-y", "0px");
    });
  });
}
