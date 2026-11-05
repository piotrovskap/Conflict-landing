// ===== CRT barrel distortion — mapa przemieszczenia dla feDisplacementMap =====
// Buduje normal-map „sfery": R = przemieszczenie X, G = przemieszczenie Y, rosnące ku brzegom.
const mapEl = document.getElementById("crt-barrel-map");
const desktop = window.matchMedia("(min-width: 861px)");

if (mapEl && desktop.matches) {
  const size = 300;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(size, size);
  const strength = 0.34; // < 0.5/√2 → brak clampu przy rogach (gładki barrel); siłę daje scale filtra

  const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x / (size - 1)) * 2 - 1; // -1..1
      const ny = (y / (size - 1)) * 2 - 1;
      const r = Math.sqrt(nx * nx + ny * ny);
      // przemieszczenie radialne na zewnątrz, mocniejsze ku brzegom (∝ r)
      const dx = nx * r * strength;
      const dy = ny * r * strength;
      const i = (y * size + x) * 4;
      img.data[i] = clamp255((0.5 + dx) * 255);     // R → X
      img.data[i + 1] = clamp255((0.5 + dy) * 255); // G → Y
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL();
  mapEl.setAttribute("href", url);
  mapEl.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
}
