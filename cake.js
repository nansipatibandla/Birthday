window.Components = window.Components || {};

window.Components.cake = {
  render(container, section) {
    const el = document.createElement("div");
    el.className = "section section-cake";

    // Build candles with flames
    const candles = Array(section.candles || 5)
      .fill(null)
      .map(() => `<div class="candle"><div class="flame"></div></div>`)
      .join("");

    el.innerHTML = `
      <div class="birthday-cake" id="cake-main">
        <div class="candles">${candles}</div>
        <div class="cake-top"></div>
        <div class="cake-middle"></div>
        <div class="cake-bottom"></div>
        <div class="spark-layer"></div>
      </div>
      <p class="cake-message">${section.message || "Make a wish 🎂✨"}</p>
    `;

    container.appendChild(el);

    // Click on cake triggers wish popup + sparks
    const cakeEl = el.querySelector("#cake-main");
    cakeEl.style.cursor = "pointer";
    cakeEl.addEventListener("click", () => {
      window.Components.cake.burst(el);
    });

    return el;
  },

  animate(tl, el) {
    tl.from(el, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    tl.to(
      el.querySelector(".cake-message"),
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  },

  exit(tl, el) {
    tl.to(el, { opacity: 0, duration: 0.5, ease: "power2.in" });
  },

  burst(el) {
    Swal.fire({
      title: "Make a wish 🎂✨",
      text: "Close your eyes and make a birthday wish!",
      icon: "info",
      confirmButtonText: "I made my wish 💖",
      background: "#1e293b",
      color: "#fff",
      confirmButtonColor: "#ff69b4",
    }).then(() => {
      const sparkLayer = el.querySelector(".spark-layer");

      for (let i = 0; i < 30; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";

        const x = (Math.random() - 0.5) * 260;
        const y = (Math.random() - 0.5) * 180;

        spark.style.setProperty("--x", `${x}px`);
        spark.style.setProperty("--y", `${y}px`);
        spark.style.background = `hsl(${Math.random() * 360}, 100%, 65%)`;

        sparkLayer.appendChild(spark);
        setTimeout(() => spark.remove(), 1200);
      }

      const cakeEl = el.querySelector("#cake-main");
      cakeEl.classList.add("burst");
      setTimeout(() => cakeEl.classList.remove("burst"), 600);
    });
  },
};
