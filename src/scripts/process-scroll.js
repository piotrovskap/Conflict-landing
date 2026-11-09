// Trzy etapy współpracy: duże frazy przechodzą jedna w drugą podczas scrolla.
const section = document.getElementById("process");
const scroll = document.getElementById("process-scroll");
const steps = [...(section?.querySelectorAll(".process__step") || [])];
const enhanced = window.matchMedia("(prefers-reduced-motion: no-preference)"); // efekt scrolla także na telefonach

if (section && scroll && steps.length === 3) {
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const smoothstep = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  let ticking = false;

  function update() {
    ticking = false;
    section.classList.toggle("is-enhanced", enhanced.matches);
    if (!enhanced.matches) {
      steps.forEach((step) => {
        step.style.opacity = "";
        step.style.transform = "";
        step.style.removeProperty("--detail");
        step.style.removeProperty("--cue-offset");
        step.style.removeProperty("--detail-blur");
        step.style.removeProperty("--detail-offset");
      });
      return;
    }

    const distance = scroll.offsetHeight - window.innerHeight;
    const p = distance > 0 ? clamp(-scroll.getBoundingClientRect().top / distance) : 0;
    steps.forEach((step, index) => {
      const start = index / 3;
      const end = (index + 1) / 3;
      const enter = index === 0 ? 1 : smoothstep(start - 0.025, start + 0.025, p);
      const leave = index === steps.length - 1 ? 1 : 1 - smoothstep(end - 0.045, end + 0.005, p);
      const visibility = enter * leave;
      const detail = smoothstep(start + 0.085, start + 0.18, p);
      const cueOffset = Math.max(70, Math.min(150, window.innerHeight * 0.12));

      step.style.opacity = visibility.toFixed(3);
      step.style.transform = `translate3d(0, ${((1 - enter) * 32 - (1 - leave) * 32).toFixed(1)}px, 0)`;
      step.style.setProperty("--detail", detail.toFixed(3));
      step.style.setProperty("--cue-offset", `${((1 - detail) * cueOffset).toFixed(1)}px`);
      step.style.setProperty("--detail-blur", `${((1 - detail) * 18).toFixed(1)}px`);
      step.style.setProperty("--detail-offset", `${((1 - detail) * 34).toFixed(1)}px`);
    });
  }

  function scheduleUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  enhanced.addEventListener?.("change", scheduleUpdate);
  update();
}
