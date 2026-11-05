// ===== Pasek logo (marquee) — duplikacja zestawu dla bezszwowej pętli =====
const track = document.getElementById("logos-track");
if (track) {
  track.append(...[...track.children].map((n) => n.cloneNode(true)));
}
