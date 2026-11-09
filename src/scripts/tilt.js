// ===== fx-tilt — element pochyla się w 3D za kursorem (reużywalne: [data-tilt]) =====
// data-tilt="14" — maks. kąt w stopniach (domyślnie 14). Tylko precyzyjny kursor, bez reduced-motion.
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fine && !reduce) {
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const max = Number(el.dataset.tilt) || 14;
    const glare = document.createElement("span");
    glare.className = "fx-tilt__glare";
    glare.setAttribute("aria-hidden", "true");
    el.prepend(glare);

    let raf = 0;
    let last = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const r = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (last.clientX - r.left) / r.width)) - 0.5;  // -0.5 … 0.5
      const py = Math.min(1, Math.max(0, (last.clientY - r.top) / r.height)) - 0.5;
      // „dociśnięcie" w miejscu kursora: ta krawędź odchodzi w głąb
      el.style.setProperty("--ry", `${(px * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-py * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--ts", "1.04");
      el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--sx", `${(-px * 24).toFixed(1)}px`);
      el.style.setProperty("--sy", `${(18 - py * 16).toFixed(1)}px`);
    };

    el.addEventListener("pointerenter", () => el.classList.add("is-tilting"));
    el.addEventListener("pointermove", (e) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    el.addEventListener("pointerleave", () => {
      last = null;
      el.classList.remove("is-tilting");
      ["--rx", "--ry", "--ts", "--sx", "--sy"].forEach((v) => el.style.removeProperty(v));
    });
  });
}
