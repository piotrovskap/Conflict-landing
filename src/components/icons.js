// ===== Komponent: ikony liniowe (SVG, stroke = currentColor, bez gradientów) =====
// Użycie: icon("car") → string <svg>. Rozmiar i kolor sterowane z CSS (.ico).
const P = {
  building: '<path d="M4 21V5l8-3 8 3v16"/><path d="M9 21v-4h6v4"/><path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01"/>',
  car: '<path d="M5 17h14l-1.5-6.5A2 2 0 0 0 15.6 9H8.4a2 2 0 0 0-1.9 1.5L5 17z"/><path d="M3 17h18v2H3z"/><circle cx="7.5" cy="19.5" r="1.5"/><circle cx="16.5" cy="19.5" r="1.5"/><path d="M8 13h8"/>',
  handshake: '<path d="M2 12l4-4 4 2 3-2 4 1 5 3"/><path d="M6 8l-4 4 6 6 2-2"/><path d="M22 12l-5 5-3-1-2 2-4-4"/><path d="M11 13l2 2M13 11l3 3"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5" opacity=".55"/>',
  code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  record: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 17c.8-1.8 2-2.6 3.5-2.6s2.7.8 3.5 2.6"/><path d="M15 9h3M15 12h3M15 15h2"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c.8-3.4 3-5 6-5s5.2 1.6 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16.5 14.2c2.3.2 3.9 1.8 4.5 4.8"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  cube: '<path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
  check: '<path d="M12 2l2.4 2 3.1-.3.9 3 2.7 1.6-1 3 1 3-2.7 1.6-.9 3-3.1-.3L12 22l-2.4-2-3.1.3-.9-3L2.9 15.7l1-3-1-3 2.7-1.6.9-3 3.1.3L12 2z"/><path d="M8.5 12l2.3 2.3 4.7-4.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  plug: '<path d="M9 2v5M15 2v5"/><path d="M6 7h12v4a6 6 0 0 1-12 0V7z"/><path d="M12 17v5"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  replay: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v5h5"/><path d="M10 9l5 3-5 3V9z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/><path d="M9.5 9a1.8 1.8 0 1 1 2.3 1.7c-.5.2-.8.6-.8 1.1v.4M11 14.5h.01"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.2a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.5M12 16.5h.01"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'
};
export const icon = (name) =>
  P[name] ? `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>` : "";
