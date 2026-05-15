window.Components = window.Components || {};

window.Components.cake = {
  render(container, section) {
    const el = document.createElement("div");
    el.className = "birthday-cake";

    const candles = Array(section.candles || 5)
      .fill('<span></span>')
      .join("");

    el.innerHTML = `
      <div class="candles">${candles}</div>

      <div class="cake-top"></div>
      <div class="cake-middle"></div>
      <div class="cake-bottom"></div>

      <p class="cake-message">${section.message}</p>
    `;

    container.appendChild(el);
    return el;
  },

  animate(tl, el) {
    tl.from(el, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  },
};
