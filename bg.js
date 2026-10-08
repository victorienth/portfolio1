// Fond de l'intro : des points qui circulent sur des orbites elliptiques,
// reliés quand ils sont proches, et repoussés doucement par la souris.

function createOrbitalField(canvas) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = getComputedStyle(document.documentElement);
  const accent = css.getPropertyValue("--accent").trim() || "#0f766e";
  const ink = css.getPropertyValue("--ink").trim() || "#1a2230";

  let W = 0, H = 0, points = [], orbits = [];
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let visible = true;

  function build() {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Orbites centrées à droite, derrière le visuel de l'intro.
    const cx = W * (W > 760 ? 0.72 : 0.5);
    const cy = H * 0.5;
    const base = Math.max(W, H);
    orbits = Array.from({ length: 6 }, (_, i) => ({
      cx, cy,
      rx: base * (0.18 + i * 0.11),
      ry: base * (0.07 + i * 0.05),
      tilt: -0.42 + i * 0.05,
      speed: (0.00012 + Math.random() * 0.00012) * (i % 2 ? 1 : -1),
    }));

    const count = Math.round(Math.min(90, (W * H) / 11000));
    points = Array.from({ length: count }, () => {
      const o = orbits[Math.floor(Math.random() * orbits.length)];
      return { o, a: Math.random() * Math.PI * 2, jitter: (Math.random() - 0.5) * 18, x: 0, y: 0, ox: 0, oy: 0, size: 1 + Math.random() * 1.6 };
    });
    frame(0, true);
  }

  function position(p) {
    const { cx, cy, rx, ry, tilt } = p.o;
    const ex = Math.cos(p.a) * (rx + p.jitter);
    const ey = Math.sin(p.a) * (ry + p.jitter * 0.4);
    return {
      x: cx + ex * Math.cos(tilt) - ey * Math.sin(tilt),
      y: cy + ex * Math.sin(tilt) + ey * Math.cos(tilt),
    };
  }

  let last = 0;
  function frame(now, force) {
    const dt = Math.min(40, now - last || 16);
    last = now;
    if (!visible && !force) return;

    // La souris suit avec un léger retard.
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    ctx.clearRect(0, 0, W, H);

    // Trajectoires
    ctx.lineWidth = 1;
    ctx.strokeStyle = accent;
    orbits.forEach((o) => {
      ctx.globalAlpha = 0.09;
      ctx.beginPath();
      ctx.ellipse(o.cx, o.cy, o.rx, o.ry, o.tilt, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Points : avance sur l'orbite + répulsion de la souris
    points.forEach((p) => {
      if (!reduceMotion) p.a += p.o.speed * dt;
      const pos = position(p);
      const dx = pos.x - mouse.x, dy = pos.y - mouse.y;
      const d = Math.hypot(dx, dy);
      const push = d < 140 ? (1 - d / 140) * 28 : 0;
      p.ox += ((d ? (dx / d) * push : 0) - p.ox) * 0.1;
      p.oy += ((d ? (dy / d) * push : 0) - p.oy) * 0.1;
      p.x = pos.x + p.ox;
      p.y = pos.y + p.oy;
    });

    // Liaisons entre points proches (plus visibles près de la souris)
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > 110) continue;
        const near = Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) / 220);
        ctx.globalAlpha = (1 - d / 110) * (0.12 + near * 0.45);
        ctx.strokeStyle = accent;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    points.forEach((p) => {
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = p.size > 2.2 ? accent : ink;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    frame(now);
    requestAnimationFrame(loop);
  }

  const host = canvas.parentElement;
  host.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = e.clientX - r.left;
    mouse.ty = e.clientY - r.top;
  });
  host.addEventListener("pointerleave", () => { mouse.tx = mouse.ty = -9999; });

  // Pas de calcul quand l'intro n'est plus à l'écran.
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(canvas);
  new ResizeObserver(build).observe(canvas);
  requestAnimationFrame(loop);
}
