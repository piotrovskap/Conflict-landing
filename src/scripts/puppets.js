import { visibleLoop } from "../components/visible-loop.js?v=20261113w";
// ===== Pajacyki: liny Verlet (wyginają się) + chwytanie myszką =====
const rig = document.querySelector(".puppets__rig");
const puppetEls = [...document.querySelectorAll(".puppet")];

if (rig && puppetEls.length) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const SVGNS = "http://www.w3.org/2000/svg";
  const N = 7;          // punktów na linę
  const GRAV = 1500;    // grawitacja (px/s²)
  const DAMP = 0.985;   // zachowanie prędkości (1 = brak tłumienia)
  const ITER = 28;      // iteracje więzów długości (sztywność liny)

  // warstwa SVG z linami (lokalne współrzędne = piksele rig)
  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("class", "puppets__ropes");
  rig.insertBefore(svg, rig.firstChild);

  // poziomy „ciąg" każdej liny → okna rozkładają się na boki (nie na środku)
  const PULLS = [-1250, 1350, -800, 1500, -1500, 900];
  const stage = document.querySelector(".puppets__stage");

  const items = puppetEls.map((el, idx) => {
    const baseLen = parseFloat(getComputedStyle(el).getPropertyValue("--len")) || 140;
    const L1 = baseLen; // długość skalowana później (fit do ekranu)
    const dir = idx % 2 ? 1 : -1; // kierunek startowego kopnięcia
    const pull = PULLS[idx % PULLS.length];
    // owijamy okno w „ciężarek" wiszący na końcu liny
    let weight = el.querySelector(".puppet__weight");
    if (!weight) {
      const win = el.querySelector(".win");
      weight = document.createElement("div");
      weight.className = "puppet__weight";
      el.insertBefore(weight, win);
      weight.appendChild(win);
    }
    const path = document.createElementNS(SVGNS, "path");
    svg.appendChild(path);

    const seg = L1 / (N - 1);
    const w = parseFloat(getComputedStyle(el).getPropertyValue("--w")) || 220;
    const px = el.offsetLeft;
    const py = el.offsetTop;
    const pts = Array.from({ length: N }, (_, i) => {
      const kick = dir * (i / (N - 1)) * 5; // startowe kopnięcie (ox≠x → prędkość)
      return { x: px, y: py + i * seg, ox: px - kick, oy: py + i * seg };
    });
    return { el, weight, win: el.querySelector(".win"), path, seg, w, baseLen, pts, phase: idx * 1.7, pull, ang: 0, dragging: false };
  });

  const mouse = { x: 0, y: 0 };
  let dragItem = null;
  let pullScale = 1; // na wąskich ekranach mniejszy rozrzut na boki

  function toLocal(cx, cy) {
    const r = rig.getBoundingClientRect();
    return { x: cx - r.left, y: cy - r.top };
  }

  items.forEach((it) => {
    it.win.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      dragItem = it;
      it.dragging = true;
      it.el.classList.add("is-dragging");
      mouse.x = e.clientX; mouse.y = e.clientY;
      it.win.setPointerCapture?.(e.pointerId);
    });
  });
  // dobierz długość lin tak, by NAJNIŻSZE okno zmieściło się w scenie (bez scrolla)
  function fitScale() {
    const stageH = stage ? stage.clientHeight : 800;
    const rigTop = rig.offsetTop;
    let s = Infinity;
    for (const it of items) {
      const pivotY = rigTop + it.el.offsetTop;
      const cardH = it.win.offsetHeight || 160;
      s = Math.min(s, (stageH - 18 - pivotY - cardH) / it.baseLen);
    }
    return Math.max(0.35, Math.min(2.6, s));
  }
  function relayout() {
    pullScale = Math.min(1, Math.max(0.3, (stage ? stage.clientWidth : window.innerWidth) / 1000));
    const s = fitScale();
    for (const it of items) {
      it.seg = (it.baseLen * s) / (N - 1);
      const px = it.el.offsetLeft, py = it.el.offsetTop;
      it.pts.forEach((p, i) => { p.x = px; p.y = py + i * it.seg; p.ox = p.x; p.oy = p.y; });
    }
  }
  requestAnimationFrame(relayout);
  window.addEventListener("resize", relayout);
  window.addEventListener("load", relayout);
  if (document.fonts?.ready) document.fonts.ready.then(relayout);

  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("pointerup", () => {
    if (dragItem) { dragItem.dragging = false; dragItem.el.classList.remove("is-dragging"); dragItem = null; }
  });

  let last = 0;
  function loop(t) {
    const dt = Math.min(0.03, (t - last) / 1000) || 0.016;
    last = t;
    const gy = GRAV * dt * dt;

    for (const it of items) {
      const pts = it.pts;
      const pivX = it.el.offsetLeft;
      const pivY = it.el.offsetTop;

      // poziomy ciąg (rozkłada okna na boki, mniej na wąskich ekranach) + „wiatr"
      const side = it.dragging ? 0 : (it.pull * pullScale * dt * dt + Math.sin(t * 0.0007 + it.phase) * 240 * dt * dt);

      // integracja Verlet (oprócz punktu 0 = palec)
      for (let i = 1; i < N; i++) {
        const p = pts[i];
        const vx = (p.x - p.ox) * DAMP;
        const vy = (p.y - p.oy) * DAMP;
        p.ox = p.x; p.oy = p.y;
        p.x += vx + side * (i / (N - 1));
        p.y += vy + gy;
      }

      // więzy: stała długość segmentów; punkt 0 przypięty do palca,
      // ostatni przypięty do myszy gdy ciągniemy — ale max do długości liny
      // (nie da się rozciągnąć → brak efektu procy przy puszczeniu)
      let end = toLocal(mouse.x, mouse.y);
      if (it.dragging) {
        let ex = end.x - pivX, ey = end.y - pivY;
        const maxLen = it.seg * (N - 1) * 0.99;
        const dist = Math.hypot(ex, ey) || 1;
        if (dist > maxLen) { ex = (ex / dist) * maxLen; ey = (ey / dist) * maxLen; }
        end = { x: pivX + ex, y: pivY + ey };
      }
      for (let k = 0; k < ITER; k++) {
        pts[0].x = pivX; pts[0].y = pivY;
        if (it.dragging) { pts[N - 1].x = end.x; pts[N - 1].y = end.y; }
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          let dx = b.x - a.x, dy = b.y - a.y;
          let d = Math.hypot(dx, dy) || 0.0001;
          const diff = (d - it.seg) / d * 0.5;
          const ox = dx * diff, oy = dy * diff;
          if (i !== 0) { a.x += ox; a.y += oy; }
          if (!(it.dragging && i + 1 === N - 1)) { b.x -= ox; b.y -= oy; }
        }
      }

      // ogranicz prędkość końca przy ciągnięciu → brak „wystrzału" po puszczeniu
      if (it.dragging) {
        const p = pts[N - 1];
        let vx = p.x - p.ox, vy = p.y - p.oy;
        const vmax = it.seg * 0.7;
        const vmag = Math.hypot(vx, vy);
        if (vmag > vmax) { p.ox = p.x - (vx / vmag) * vmax; p.oy = p.y - (vy / vmag) * vmax; }
      }

      // ścieżka liny — wygładzona krzywa przez punkty
      let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < N - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        d += `Q${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)} ${xc.toFixed(1)},${yc.toFixed(1)}`;
      }
      d += `L${pts[N - 1].x.toFixed(1)},${pts[N - 1].y.toFixed(1)}`;
      it.path.setAttribute("d", d);

      // karta — środek góry przyczepiony do końca liny; ZAWSZE poziomo (bez obrotu)
      const e = pts[N - 1];
      const halfW = (it.win.offsetWidth || it.w) / 2; // realna szerokość (uwzględnia --card-scale)
      it.weight.style.transform =
        `translate(${(e.x - pivX - halfW).toFixed(1)}px, ${(e.y - pivY).toFixed(1)}px)`;
    }
  }

  if (!reduce) visibleLoop(stage || rig, loop); // fizyka lin liczy się tylko, gdy sekcja jest widoczna
}
