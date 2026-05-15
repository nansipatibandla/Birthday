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
  burst(el) {
  // ✨ Step 1: Show popup first
  Swal.fire({
    title: "Make a wish 🎂✨",
    text: "Close your eyes and make a birthday wish!",
    icon: "info",
    confirmButtonText: "I made my wish 💖",
    background: "#1e293b",
    color: "#fff",
    confirmButtonColor: "#ff69b4",
  }).then(() => {
    
    // 💥 Step 2: After popup → trigger explosion
    const sparkLayer = el.querySelector(".spark-layer");

    for (let i = 0; i < 25; i++) {
      const spark = document.createElement("div");
      spark.className = "spark";

      const x = (Math.random() - 0.5) * 220;
      const y = (Math.random() - 0.5) * 150;

      spark.style.setProperty("--x", `${x}px`);
      spark.style.setProperty("--y", `${y}px`);

      sparkLayer.appendChild(spark);

      setTimeout(() => spark.remove(), 1200);
    }

    // ✨ glow effect
    el.classList.add("burst");
    setTimeout(() => el.classList.remove("burst"), 600);
  });
  }
};
