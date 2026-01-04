"use client";

import { useEffect, useMemo, useState } from "react";

// langues
import fr from "./languages/fr.json";
import en from "./languages/en.json";
import es from "./languages/es.json";


type Lang = "fr" | "en" | "es";

/** Dictionnaire générique profondément imbriqué */
type Dict = Record<string, unknown>;

/** Tous les messages, sans any */
const MESSAGES: Record<Lang, Dict> = {
  fr: fr as unknown as Dict,
  en: en as unknown as Dict,
  es: es as unknown as Dict,
};

/** Getter sûr pour un chemin "a.b.c" */
function pick(obj: Dict, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const k of parts) {
    if (typeof cur === "object" && cur !== null && k in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return cur;
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (localStorage.getItem("site_lang") as Lang) || "fr";
    setLang(saved);

    const onChange = (e: Event) => {
      const next = (e as CustomEvent).detail as Lang;
      setLang(next || ((localStorage.getItem("site_lang") as Lang) || "fr"));
    };
    window.addEventListener("site_lang_changed", onChange);
    return () => window.removeEventListener("site_lang_changed", onChange);
  }, []);

  // fonction de traduction
  const t = useMemo(() => {
    const dict = MESSAGES[lang];
    return (key: string) => {
      const v = pick(dict, key);
      return typeof v === "string" ? v : key; // fallback: affiche la clé si manquante
    };
  }, [lang]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div className="avatar-rect">
            <img src="/moi.jpg" alt={t("hero.name")} />
          </div>
          <div style={{ flex: "1 1 360px" }}>
            <span className="small">{t("hero.status")}</span>
            <h1><span style={{ color: "var(--accent)" }}>{t("hero.name")}</span></h1>
            <p className="lead">{t("hero.lead")}</p>
            <div className="socials">
              {/* Email */}
              <a href="mailto:victorienthomas71@gmail.com" className="icon-link" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 13.065L.015 6h23.97L12 13.065zM0 7.5v10.5h24V7.5l-12 6.75L0 7.5z"/>
                </svg>
                {t("contact.email")}
              </a>

              {/* Téléphone */}
              <a href="tel:+33640227176" className="icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.11.33.03.7-.24 1.01l-2.21 2.2z"/>
                </svg>
                {t("contact.phone")}
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/victorien-thomas-855776306" target="_blank" rel="noreferrer" className="icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.228.792 24 1.771 24h20.451C23.2 24 24 23.228 24 22.277V1.723C24 .771 23.2 0 22.225 0zM7.114 20.452H3.56V9h3.554v11.452zM5.337 7.433A2.07 2.07 0 013.27 5.366c0-1.142.924-2.066 2.067-2.066 1.14 0 2.066.924 2.066 2.066 0 1.141-.926 2.067-2.066 2.067zm15.11 13.019h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.455v6.288z"/>
                </svg>
                {t("contact.linkedin")}
              </a>

              {/* CV */}
              <a className="btn" href="/CV_VictorienThomas.pdf" target="_blank" rel="noreferrer">
                {t("contact.cv")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap grid grid-2">
          <div className="card">
            <h2>{t("about.title")}</h2>
            <p>{t("about.text")}</p>
          </div>
          <div className="card" id="contact">
            <h2>{t("contact.title")}</h2>
            <div className="stack">
              <a href="mailto:victorienthomas71@gmail.com" className="icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 13.065L.015 6h23.97L12 13.065zM0 7.5v10.5h24V7.5l-12 6.75L0 7.5z"/>
                </svg>
                victorienthomas71@gmail.com
              </a>
              <a href="tel:+33640227176" className="icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.11.33.03.7-.24 1.01l-2.21 2.2z"/>
                </svg>
                +33 6 40 22 71 76
              </a>
              <a href="https://www.linkedin.com/in/victorien-thomas-855776306" target="_blank" rel="noreferrer" className="icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.228.792 24 1.771 24h20.451C23.2 24 24 23.228 24 22.277V1.723C24 .771 23.2 0 22.225 0zM7.114 20.452H3.56V9h3.554v11.452zM5.337 7.433A2.07 2.07 0 013.27 5.366c0-1.142.924-2.066 2.067-2.066 1.14 0 2.066.924 2.066 2.066 0 1.141-.926 2.067-2.066 2.067zm15.11 13.019h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.455v6.288z"/>
                </svg>
                linkedin.com/in/victorien-thomas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCES */}
      <section id="experience">
        <div className="wrap">
          <h2>{t("experience.title")}</h2>
          <div className="grid grid-2">
            <article className="card">
              <h3>{t("experience.esa")}</h3>
              <p>{t("experience.esaDesc")}</p>
            </article>
            <article className="card">
              <h3>{t("experience.ipsaF1")}</h3>
              <p>{t("experience.ipsaF1Desc1")}</p>
              <p>{t("experience.ipsaF1Desc2")}</p>
            </article>
            <article className="card">
              <h3>{t("experience.schneider")}</h3>
              <p>{t("experience.schneiderDesc")}</p>
            </article>
            <article className="card">
              <h3>{t("experience.meteo")}</h3>
              <p>{t("experience.meteoDesc")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* FORMATION */}
      <section id="education">
        <div className="wrap">
          <h2>{t("education.title")}</h2>
          <ul className="list">
            <li>{t("education.ipsa")}</li>
            <li>{t("education.lycee")}</li>
          </ul>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section id="skills">
        <div className="wrap grid grid-2">
          <div className="card">
            <h3>{t("skills.techniques")}</h3>
            <ul className="list">
              <li>{t("skills.techList1")}</li>
              <li>{t("skills.techList2")}</li>
            </ul>
          </div>
          <div className="card">
            <h3>{t("skills.languages")}</h3>
            <ul className="list">
              <li>{t("skills.langList1")}</li>
              <li>{t("skills.langList2")}</li>
              <li>{t("skills.langList3")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projects">
        <div className="wrap">
          <h2>{t("projects.title")}</h2>
          <div className="projects-grid">
            <article className="card">
              <img src="/esa.png" alt={t("projects.esa")} className="project-img" />
              <h3>{t("projects.esa")}</h3>
              <p>{t("projects.esaDesc1")}</p>
              <p>{t("projects.esaDesc2")}</p>
            </article>

            <article className="card">
              <img src="/f1.png" alt={t("projects.ipsaF1")} className="project-img" />
              <h3>{t("projects.ipsaF1")}</h3>
              <p>{t("projects.ipsaF1Desc1")}</p>
              <p>{t("projects.ipsaF1Desc2")}</p>
            </article>

            <article className="card">
              <img src="/aero.png" alt={t("projects.aeroport")} className="project-img" />
              <h3>{t("projects.aeroport")}</h3>
              <p>{t("projects.aeroportDesc1")}</p>
              <p>{t("projects.aeroportDesc2")}</p>
              <a href="/aeroport_vert.pdf" target="_blank" rel="noreferrer" className="btn">
                {t("projects.aeroportCta")}
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT (formulaire) */}
      <section id="contact">
        <div className="wrap">
          <h2>{t("contact.title")}</h2>
          <form
            className="card"
            style={{ display: "grid", gap: "10px" }}
            action={t("contact.formActionHint")}
            method="POST"
          >
            <input className="input" name="name" placeholder={t("contact.formName")} required />
            <input className="input" name="email" type="email" placeholder={t("contact.formEmail")} required />
            <textarea className="textarea" name="message" placeholder={t("contact.formMessage")} required />
            <button className="btn" type="submit">{t("contact.send")}</button>
            <span className="small">{t("contact.alt")}</span>
          </form>
        </div>
      </section>
    </>
  );
}
