// Coordonnées : un seul endroit à modifier.
const CONTACT = {
  email: "victorienthomas71@gmail.com",
  phone: "+33640227176",
  phoneDisplay: "+33 6 40 22 71 76",
  linkedin: "https://www.linkedin.com/in/victorien-thomas-855776306",
  linkedinDisplay: "linkedin.com/in/victorien-thomas",
  // Un CV par langue : le bouton ouvre un petit menu pour choisir.
  cv: [
    { code: "FR", label: "Français", href: "docs/CV_VictorienThomas_FR.pdf" },
    { code: "EN", label: "English", href: "docs/CV_VictorienThomas_EN.pdf" },
    { code: "ES", label: "Español", href: "docs/CV_VictorienThomas_ES.pdf" },
  ],
};

const LANGS = ["fr", "en", "es"];
const STORAGE_KEY = "site_lang";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// État de l'interface, conservé quand on change de langue.
const state = { lang: "fr", pathFilter: "all", category: "all" };

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (sel) => document.querySelector(sel);

const ICONS = {
  mail: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
  phone: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
  linkedin: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55v11.45z"/></svg>',
  copy: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
};

// Satellite en orbite, à côté du nom.
const ORBIT = `
  <svg class="orbit" viewBox="0 0 320 320" aria-hidden="true">
    <circle cx="160" cy="160" r="104" class="orbit__path orbit__path--faint"/>
    <circle cx="160" cy="160" r="62" class="orbit__earth"/>
    <g transform="rotate(-24 160 160)">
      <path id="orbit-path" d="M20 160 A140 58 0 1 0 300 160 A140 58 0 1 0 20 160" class="orbit__path"/>
      <g class="orbit__sat">
        <rect x="-5" y="-4" width="10" height="8" rx="1.5"/>
        <rect x="-19" y="-2.5" width="11" height="5" class="orbit__panel"/>
        <rect x="8" y="-2.5" width="11" height="5" class="orbit__panel"/>
        ${reduceMotion
          ? '<animateMotion dur="1s" fill="freeze" keyPoints="0.3;0.3" keyTimes="0;1" calcMode="linear"><mpath href="#orbit-path"/></animateMotion>'
          : '<animateMotion dur="14s" repeatCount="indefinite"><mpath href="#orbit-path"/></animateMotion>'}
      </g>
    </g>
  </svg>`;

const chips = (options, active, group) =>
  `<div class="chips" role="group" aria-label="${esc(group)}">${options
    .map((o) => `<button type="button" class="chip" data-value="${esc(o.value)}" aria-pressed="${o.value === active}">${esc(o.label)}</button>`)
    .join("")}</div>`;

// ----- Rendu des sections -----

// Découpe un texte en lettres animables (le h1 garde un aria-label lisible).
function splitLetters(text) {
  let i = 0;
  return text.split(" ").map((word) =>
    `<span class="word" aria-hidden="true">${[...word].map((ch) => `<span class="letter" style="--l:${i++}">${esc(ch)}</span>`).join("")}</span>`
  ).join(" ");
}

// Découpe un titre en mots qui glissent depuis un masque.
function splitWords(text) {
  return text.split(" ").map((w, i) => `<span class="mask"><span style="--w:${i}">${esc(w)}</span></span>`).join(" ");
}

function renderHero(t) {
  $("#hero-text").innerHTML = `
    <div class="hero__photo reveal" style="--i:0"><img src="images/moi.jpg" alt="${esc(t.hero.photoAlt)}"></div>
    <h1 class="hero__name" aria-label="Victorien THOMAS">${splitLetters("Victorien THOMAS")}</h1>
    <p class="hero__role reveal" style="--i:2">${esc(t.hero.role)}</p>
    <p class="hero__lead reveal" style="--i:3">${esc(t.hero.lead)}</p>
    <div class="actions reveal" style="--i:4">
      <div class="cv-bubble">
        <button type="button" class="button cv-bubble__toggle" aria-expanded="false" aria-controls="cv-langs">${esc(t.hero.cv)}</button>
        <div class="cv-bubble__pop" id="cv-langs" role="group" aria-label="${esc(t.hero.cv)}" hidden>
          ${CONTACT.cv.map((c) => `<a href="${c.href}" target="_blank" rel="noreferrer" title="${esc(c.label)}">${esc(c.code)}</a>`).join("")}
        </div>
      </div>
      <a class="button button--ghost" href="#projects">${esc(t.nav.projects)}</a>
    </div>`;
}

function renderPhd(t) {
  $("#phd .container").innerHTML = `
    <div class="phd">
      <div>
        <h2 id="phd-title" class="section__title">${esc(t.phd.title)}</h2>
        <p class="phd__heading words">${splitWords(t.phd.heading)}</p>
        <p class="phd__text">${esc(t.phd.text)}</p>
      </div>
      <a class="button" href="mailto:${CONTACT.email}">${esc(t.phd.cta)}</a>
    </div>`;
  $("#phd").setAttribute("aria-labelledby", "phd-title");
}

function renderProjects(t) {
  const P = t.projects;
  const f = P.featured;
  const show = (cat) => state.category === "all" || state.category === cat;

  $("#projects-head").innerHTML = `
    <h2 id="projects-title" class="section__title">${esc(P.title)}</h2>
    ${chips(Object.entries(P.categories).map(([value, label]) => ({ value, label })), state.category, P.filter)}`;
  $("#projects-head .chips").addEventListener("click", (e) => {
    const v = e.target.closest(".chip")?.dataset.value;
    if (v) { state.category = v; renderProjects(MESSAGES[state.lang]); bindEffects(); }
  });

  // Stage de recherche mis en avant.
  const featured = $("#featured");
  featured.hidden = !show(f.category);
  featured.classList.remove("enter");
  void featured.offsetWidth; // relance l'animation
  featured.classList.add("enter");
  $("#featured-text").innerHTML = `
    <div class="card__label">${f.logo ? `<img class="org-logo" src="${f.logo}" alt="">` : ""}<p class="featured__tag">${esc(P.categories[f.category])}</p></div>
    <h3 class="feature__heading words">${splitWords(f.title)}</h3>
    <p class="muted">${esc(f.context)}</p>
    ${f.tools && f.tools.length ? `<ul class="tags tags--small featured__tools">${f.tools.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${f.image ? `<figure class="featured__media"><img src="${f.image}" alt="${esc(f.title)}" loading="lazy" decoding="async"></figure>` : ""}`;
  $("#featured-cols").innerHTML = `
    <div class="stack">${f.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    <div>
      <p class="label">${esc(f.pointsTitle)}</p>
      <ul class="checklist">${f.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>`;

  // Autres projets. Avec un nombre impair, le premier prend toute la largeur.
  const items = P.items.filter((p) => show(p.category));
  $("#projects-grid").innerHTML = `
    <div class="projects${items.length % 2 === 1 ? " projects--featured" : ""}">
      ${items.map((p, i) => `
        <article class="project enter" style="--i:${i}">
          ${p.image ? `<div class="project__media"><img src="${p.image}" alt="" loading="lazy" decoding="async"></div>` : ""}
          <div class="project__body">
            <div class="card__label">${p.logo ? `<img class="org-logo" src="${p.logo}" alt="">` : ""}<p class="featured__tag">${esc(P.categories[p.category])}</p></div>
            <h3>${esc(p.title)}</h3>
            <p class="muted">${esc(p.context)}</p>
            <p>${esc(p.text)}</p>
            ${p.tools.length ? `<ul class="tags tags--small">${p.tools.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
            ${p.link ? `<a class="text-link" href="${p.link.href}" target="_blank" rel="noreferrer">${esc(p.link.label)}</a>` : ""}
          </div>
        </article>`).join("")}
    </div>`;
}

function renderPath(t) {
  const items = t.path.items.filter((it) => state.pathFilter === "all" || it.type === state.pathFilter);
  $("#path .container").innerHTML = `
    <div class="section__head">
      <h2 id="path-title" class="section__title">${esc(t.path.title)}</h2>
      ${chips(
        [
          { value: "all", label: t.path.all },
          { value: "work", label: t.path.work },
          { value: "study", label: t.path.study },
        ],
        state.pathFilter,
        t.projects.filter
      )}
    </div>
    <ol class="timeline">
      ${items.map((it, i) => `
        <li class="timeline__item timeline__item--${it.type} enter" style="--i:${i}">
          <div class="timeline__period">${esc(it.period)}</div>
          <div class="timeline__body">
            <div class="timeline__head">
              <span class="logo" aria-hidden="true">${esc(it.short || "")}${it.logo ? `<img src="${it.logo}" alt="" loading="lazy" decoding="async">` : ""}</span>
              <div>
                <p class="timeline__type">${esc(it.type === "study" ? t.path.study : t.path.work)}</p>
                <h3>${esc(it.title)}</h3>
                <p class="muted">${esc(it.org)}</p>
              </div>
            </div>
            ${it.text ? `<p class="timeline__text">${esc(it.text)}</p>` : ""}
          </div>
        </li>`).join("")}
    </ol>`;
  $("#path").setAttribute("aria-labelledby", "path-title");
  $("#path .chips").addEventListener("click", (e) => {
    const v = e.target.closest(".chip")?.dataset.value;
    if (v) { state.pathFilter = v; renderPath(MESSAGES[state.lang]); bindEffects(); }
  });
}

function renderSkills(t) {
  const s = t.skills;
  $("#skills .container").innerHTML = `
    <h2 id="skills-title" class="section__title">${esc(s.title)}</h2>
    <div class="skills">
      ${s.groups.map((g) => `
        <div class="skills__group">
          <h3>${esc(g.name)}</h3>
          <ul class="tags">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
        </div>`).join("")}
      <div class="skills__group">
        <h3>${esc(s.languagesTitle)}</h3>
        <ul class="plain">${s.languages.map((l) => `<li>${esc(l.name)} <span class="muted">${esc(l.level)}</span></li>`).join("")}</ul>
      </div>
    </div>`;
  $("#skills").setAttribute("aria-labelledby", "skills-title");
}

function renderContact(t) {
  $("#contact .container").innerHTML = `
    <h2 id="contact-title" class="section__title">${esc(t.contact.title)}</h2>
    <ul class="contact">
      <li>
        <a href="mailto:${CONTACT.email}">${ICONS.mail}${CONTACT.email}</a>
        <button type="button" class="copy" id="copy-email">${ICONS.copy}<span>${esc(t.contact.copy)}</span></button>
      </li>
      <li><a href="tel:${CONTACT.phone}">${ICONS.phone}${CONTACT.phoneDisplay}</a></li>
      <li><a href="${CONTACT.linkedin}" target="_blank" rel="noreferrer">${ICONS.linkedin}${CONTACT.linkedinDisplay}</a></li>
    </ul>
    <p class="sr-only" aria-live="polite" id="copy-status"></p>`;
  $("#contact").setAttribute("aria-labelledby", "contact-title");
  $("#copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      const label = $("#copy-email span");
      label.textContent = t.contact.copied;
      $("#copy-status").textContent = t.contact.copied;
      $("#copy-email").classList.add("copy--done");
      setTimeout(() => {
        label.textContent = MESSAGES[state.lang].contact.copy;
        $("#copy-email")?.classList.remove("copy--done");
      }, 2000);
    } catch {}
  });
}

function render(lang) {
  state.lang = lang;
  const t = MESSAGES[lang];
  document.documentElement.lang = lang;
  document.title = t.meta.title;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = el.dataset.i18n.split(".").reduce((o, k) => o[k], t);
  });
  $(".lang").setAttribute("aria-label", t.nav.language);
  document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));

  renderHero(t);
  renderPhd(t);
  renderProjects(t);
  renderPath(t);
  renderSkills(t);
  renderContact(t);
  $("#footer").textContent = `© ${new Date().getFullYear()} ${t.footer}`;

  // Titres géants derrière les sections
  [["projects", t.nav.projects], ["path", t.nav.path], ["skills", t.nav.skills], ["contact", t.nav.contact]].forEach(([id, label]) => {
    const sec = document.getElementById(id);
    let big = sec.querySelector(":scope > .bigword");
    if (!big) { sec.insertAdjacentHTML("afterbegin", '<div class="bigword" aria-hidden="true"></div>'); big = sec.firstElementChild; }
    big.textContent = label;
  });

  bindEffects();

  // Si une image manque, on laisse le cadre vide plutôt qu'une icône cassée.
  document.querySelectorAll("main img").forEach((img) => img.addEventListener("error", () => img.remove()));
}


// ----- Effets -----

// Cartes projets : inclinaison 3D et reflet qui suivent le curseur.
function bindTilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
  document.querySelectorAll(".project, .featured").forEach((card) => {
    if (card.dataset.tilt) return;
    card.dataset.tilt = "1";
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const strength = card.classList.contains("featured") ? 2 : 5;
      card.style.setProperty("--rx", `${(0.5 - y) * strength}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * strength}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

// Apparition des blocs au défilement.
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); }
  }),
  { rootMargin: "0px 0px -10% 0px" }
);
function bindReveal() {
  document.querySelectorAll("main .section .container > *, .tags li").forEach((el) => {
    if (el.dataset.reveal) return;
    el.dataset.reveal = "1";
    el.classList.add("scroll-reveal");
    revealObserver.observe(el);
  });
}

// Titres en mots, images de projets : révélés quand ils entrent à l'écran.
function bindWordsAndMedia() {
  document.querySelectorAll(".words, .project__media").forEach((el) => {
    if (el.dataset.reveal) return;
    el.dataset.reveal = "1";
    revealObserver.observe(el);
  });
}

function bindEffects() {
  bindTilt();
  bindReveal();
  bindWordsAndMedia();
  updateScroll();
}

// Barre de progression, ombre de l'en-tête, remplissage de la chronologie.
function updateScroll() {
  // Intro : s'estompe et remonte moins vite que la page, l'orbite tourne.
  if (!reduceMotion && innerWidth > 760 && scrollY < innerHeight * 1.2) {
    const k = scrollY / innerHeight;
    const text = $(".hero__text");
    if (text) {
      text.style.transform = `translateY(${scrollY * 0.25}px)`;
      text.style.opacity = String(Math.max(0, 1 - k * 1.3));
    }
    const visual = $("#hero-visual");
    if (visual) visual.style.setProperty("--scroll-scale", String(1 + k * 0.25));
  }

  // Titres géants : glissent horizontalement, un sens sur deux.
  document.querySelectorAll(".bigword").forEach((big, i) => {
    const r = big.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (innerHeight - r.top) / (innerHeight + r.height);
    big.style.transform = `translateX(${(i % 2 ? 1 : -1) * (p - 0.5) * 30}%)`;
  });

  const max = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  $(".header").classList.toggle("header--scrolled", scrollY > 8);
  const tl = $(".timeline");
  if (tl) {
    const r = tl.getBoundingClientRect();
    const done = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    tl.style.setProperty("--fill", done);
  }
}
window.addEventListener("scroll", () => requestAnimationFrame(updateScroll), { passive: true });

// Orbite de l'intro : légère parallaxe avec la souris.
if (!reduceMotion) {
  document.querySelector(".hero-wrap").addEventListener("pointermove", (e) => {
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    $("#hero-visual").style.setProperty("--px", `${x * -18}px`);
    $("#hero-visual").style.setProperty("--py", `${y * -14}px`);
  });
}

createOrbitalField($("#field"));
if (!createGlobe($("#hero-visual"))) $("#hero-visual").innerHTML = ORBIT;

// L'intro ne démarre qu'une fois la police chargée et le globe prêt : tout le travail lourd
// (compilation WebGL, mise en page) est fait avant, donc l'animation ne fige plus.
function startIntro() {
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  const timeout = new Promise((r) => setTimeout(r, 1200));
  Promise.race([fonts, timeout]).then(() =>
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $("#hero").classList.add("is-ready");
      $("#hero-visual").startGlobe?.();
      // Après l'intro, on retire la classe pour que les changements de langue ne rejouent pas l'animation.
      setTimeout(() => $("#hero").classList.remove("hero--intro"), 2200);
    }))
  );
}

// ----- Navigation : section active et ombre de l'en-tête -----

const navLinks = [...document.querySelectorAll(".header__nav a")];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === `#${entry.target.id}`));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
["projects", "path", "skills", "contact"].forEach((id) => observer.observe(document.getElementById(id)));


// ----- Langue -----

function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {}
  return "fr";
}

document.querySelectorAll(".lang button").forEach((b) =>
  b.addEventListener("click", () => {
    render(b.dataset.lang);
    try { localStorage.setItem(STORAGE_KEY, b.dataset.lang); } catch {}
  })
);
render(initialLang());
startIntro();

// ----- Bulle de choix de la langue du CV -----
function closeCvBubble() {
  const t = $(".cv-bubble__toggle"), pop = $(".cv-bubble__pop");
  if (t && pop) { t.setAttribute("aria-expanded", "false"); pop.hidden = true; }
}
document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".cv-bubble__toggle");
  if (toggle) {
    const pop = toggle.nextElementSibling;
    pop.hidden = !pop.hidden;
    toggle.setAttribute("aria-expanded", String(!pop.hidden));
    return;
  }
  if (!e.target.closest(".cv-bubble__pop")) closeCvBubble();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCvBubble(); });
