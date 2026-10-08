// Globe 3D de l'intro (three.js) : Terre en points, satellites en orbite avec traînée,
// liaisons laser sol-satellite quand le satellite est en vue. Rotation à la souris.

function createGlobe(host) {
  if (typeof THREE === "undefined") return false; // three.js non chargé : on garde l'orbite SVG

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = getComputedStyle(document.documentElement);
  const col = (name, fallback) => new THREE.Color(css.getPropertyValue(name).trim() || fallback);
  const INK = col("--ink", "#1a2230");
  const ACCENT = col("--accent", "#0f766e");
  const BG = col("--bg", "#ffffff");
  const BLUE = new THREE.Color("#5b8cff");

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 5.7);

  // Groupe incliné (axe terrestre) puis groupe qui tourne.
  const tilt = new THREE.Group();
  tilt.rotation.z = 0.41;
  scene.add(tilt);
  const earth = new THREE.Group();
  tilt.add(earth);

  // Sphère pleine pour masquer les points de la face cachée.
  earth.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.985, 48, 48),
    new THREE.MeshBasicMaterial({ color: BG.clone().lerp(ACCENT, 0.07) })
  ));

  // Points répartis sur la sphère (spirale de Fibonacci), plus denses dans des « continents » pseudo-aléatoires.
  const N = 5200;
  const positions = [];
  const colors = [];
  const land = (v) =>
    Math.sin(v.x * 3.1 + 1.2) * Math.cos(v.y * 2.7) + Math.sin(v.z * 3.7 + v.x * 1.3) * 0.8 + Math.cos(v.y * 5.1 + v.z) * 0.4;
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    const v = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
    const isLand = land(v) > 0.15;
    if (!isLand && Math.random() > 0.3) continue;
    positions.push(v.x, v.y, v.z);
    const c = isLand ? INK.clone().lerp(ACCENT, Math.random() * 0.35) : INK.clone().lerp(BG, 0.45);
    colors.push(c.r, c.g, c.b);
  }
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  dotsGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  earth.add(new THREE.Points(dotsGeo, new THREE.PointsMaterial({ size: 0.02, vertexColors: true })));

  // Halo d'atmosphère : dégradé radial dans une texture.
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 256;
  const g = glowCanvas.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 60, 128, 128, 128);
  grad.addColorStop(0, `rgba(${ACCENT.r * 255},${ACCENT.g * 255},${ACCENT.b * 255},0.35)`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(glowCanvas), depthWrite: false }));
  glow.scale.set(3.1, 3.1, 1);
  scene.add(glow);
  glow.renderOrder = -1;

  // Stations au sol (fixées sur la Terre).
  const stations = [
    new THREE.Vector3(0.55, 0.62, 0.56),
    new THREE.Vector3(-0.7, 0.3, 0.65),
    new THREE.Vector3(0.2, -0.45, 0.87),
  ].map((v) => v.normalize());
  stations.forEach((v) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), new THREE.MeshBasicMaterial({ color: ACCENT }));
    m.position.copy(v);
    earth.add(m);
  });

  // Satellites sur orbites inclinées, avec traînée.
  const TRAIL = 40;
  const sats = [
    { r: 1.45, inc: 0.9, raan: 0.2, speed: 0.55, phase: 0 },
    { r: 1.68, inc: -0.35, raan: 1.7, speed: 0.38, phase: 2 },
    { r: 1.9, inc: 1.35, raan: 2.9, speed: 0.28, phase: 4 },
  ].map((o) => {
    const orbit = new THREE.Group();
    orbit.rotation.set(o.inc, o.raan, 0);
    tilt.add(orbit);

    const ringPts = [];
    for (let k = 0; k <= 128; k++) {
      const a = (k / 128) * Math.PI * 2;
      ringPts.push(new THREE.Vector3(Math.cos(a) * o.r, 0, Math.sin(a) * o.r));
    }
    orbit.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(ringPts),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18 })
    ));

    const body = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.07), new THREE.MeshBasicMaterial({ color: INK }));
    const panelMat = new THREE.MeshBasicMaterial({ color: BLUE, side: THREE.DoubleSide });
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.05), panelMat);
    const p2 = p1.clone();
    p1.position.x = 0.13;
    p2.position.x = -0.13;
    body.add(box, p1, p2);
    body.scale.setScalar(0.75);
    orbit.add(body);

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Array(TRAIL * 3).fill(0), 3));
    const trailCol = [];
    for (let k = 0; k < TRAIL; k++) {
      const c = ACCENT.clone().lerp(BG, k / TRAIL);
      trailCol.push(c.r, c.g, c.b);
    }
    trailGeo.setAttribute("color", new THREE.Float32BufferAttribute(trailCol, 3));
    const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 }));
    orbit.add(trail);

    return { ...o, orbit, body, trail, history: [] };
  });

  // Liaisons laser : une ligne par couple station/satellite, visible seulement si le satellite est au-dessus de l'horizon.
  const links = [];
  stations.forEach((st) => sats.forEach((sat) => {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
    scene.add(line);
    links.push({ st, sat, line });
  }));

  // Interaction : glisser pour faire tourner, avec inertie.
  let rotY = 0, velY = 0.12, rotX = 0, targetX = 0, dragging = false, lastX = 0, lastY = 0;
  const el = renderer.domElement;
  el.style.touchAction = "pan-y";
  el.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); host.classList.add("is-dragging"); });
  el.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    velY = (e.clientX - lastX) * 0.35;
    targetX = Math.max(-0.6, Math.min(0.6, targetX + (e.clientY - lastY) * 0.004));
    lastX = e.clientX; lastY = e.clientY;
  });
  const stop = () => { dragging = false; host.classList.remove("is-dragging"); };
  el.addEventListener("pointerup", stop);
  el.addEventListener("pointercancel", stop);

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);

  const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();
  let t = 0, last = performance.now(), intro = 0;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!reduceMotion) t += dt;

    // Apparition : le globe grossit en douceur.
    intro = Math.min(1, intro + dt * 0.8);
    const s = reduceMotion ? 1 : 0.6 + 0.4 * (1 - Math.pow(1 - intro, 3));
    tilt.scale.setScalar(s);

    if (!dragging) velY += (0.12 - velY) * 0.02; // retour à la rotation lente
    if (!reduceMotion || dragging) rotY += velY * dt;
    rotX += (targetX - rotX) * 0.08;
    earth.rotation.y = rotY;
    tilt.rotation.x = rotX;

    sats.forEach((sat) => {
      const a = sat.phase + t * sat.speed;
      sat.body.position.set(Math.cos(a) * sat.r, 0, Math.sin(a) * sat.r);
      sat.body.rotation.y = -a;
      sat.history.unshift(sat.body.position.clone());
      if (sat.history.length > TRAIL) sat.history.pop();
      const arr = sat.trail.geometry.attributes.position.array;
      for (let k = 0; k < TRAIL; k++) {
        const p = sat.history[Math.min(k, sat.history.length - 1)];
        arr[k * 3] = p.x; arr[k * 3 + 1] = p.y; arr[k * 3 + 2] = p.z;
      }
      sat.trail.geometry.attributes.position.needsUpdate = true;
    });

    scene.updateMatrixWorld(true);
    links.forEach((lk, i) => {
      tmpA.copy(lk.st).applyMatrix4(earth.matrixWorld);            // station (monde)
      lk.sat.body.getWorldPosition(tmpB);                           // satellite (monde)
      const normal = tmpA.clone().sub(tilt.position).normalize();
      const toSat = tmpB.clone().sub(tmpA).normalize();
      const elev = normal.dot(toSat);                               // > 0 : au-dessus de l'horizon
      const facing = tmpA.z > 0.1;                                  // station du côté visible
      const target = elev > 0.25 && facing ? 0.55 + 0.3 * Math.sin(t * 6 + i) : 0;
      lk.line.material.opacity += (target - lk.line.material.opacity) * 0.1;
      const pos = lk.line.geometry.attributes.position.array;
      pos[0] = tmpA.x; pos[1] = tmpA.y; pos[2] = tmpA.z;
      pos[3] = tmpB.x; pos[4] = tmpB.y; pos[5] = tmpB.z;
      lk.line.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
  }

  function loop(now) {
    if (visible) frame(now);
    else last = now;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  return true;
}
