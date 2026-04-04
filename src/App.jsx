import { useState, useEffect, useRef } from "react";
import "./App.css";
import avatarImage from "./assets/me.webp";
import projet1Image from "./assets/projet1.webp";
import projet2Image from "./assets/projet2.webp";
import projet3Image from "./assets/projet3.webp";
import projet4Image from "./assets/projet4.webp";
import projet5Image from "./assets/projet5.webp";
import projet6Image from "./assets/projet6.webp";

// -- INFORMATION --

const PROFILE = {
  username: "Lorenzo",
  fullname: "Lorenzo NOCCHI",
  title: "UX/UI Designer & Chef de Projet Digital",
  avatar: avatarImage,
  email: "lorenzo.nocchi13@gmail.com",
  phone: "07.76.57.71.97",
  linkedin: "linkedin.com/in/lorenzo-nocchi",
  location: "Bordeaux, France",
  status: "online",
  badges: ["💻", "🗂️", "📊", "🎸", "🎥"],
  skills: {
    "UX/UI Design": ["Figma", "Illustrator", "Prototypage", "Design System", "UX Writing", "Audit UX"],
    "Front-End": ["React", "JavaScript", "Tailwind", "HTML/CSS"],
    "Back-End & Tools": ["n8n", "C++", "C#", "Odoo", "SQL", "Node.js", "Python"],
    "DevOps & Outils": ["VSCode", "WebStorm", "Git", "After Effects"],
  },
  languages: ["Anglais B2", "Espagnol A2"],
  interests: ["Guitare · Batterie · Basse · Piano", "Jeux vidéo (Godot/Unity)", "Voiture (Permis B)"],
};

const EXPERIENCES = [
  {
    date: "Oct. 2025 – Aujourd'hui",
    title: "Alternant Chargé de Projet Digital",
    company: "Autopartspro · Gimont (32)",
    tags: ["Projet Digital", "n8n", "Figma"],
    desc: [
      "Gestion de projet web et coordination des besoins métiers",
      "Automatisation de processus via Odoo et n8n",
      "Exploitation et analyse de données en SQL",
      "Conception et prototypage d'interfaces sur Figma",
    ],
  },
  {
    date: "Mai 2025 – Sept. 2025",
    title: "Stagiaire UX/UI Design",
    company: "Fondation Inria (Startup Allendia) · Talence (33)",
    tags: ["UX/UI", "IA", "Prototypage"],
    desc: [
      "Développement d'interfaces IA pour musiciens",
      "Conception / prototypage d'interfaces utilisateur",
      "Intégration de visualisations interactives",
      "Tests et itérations UX avec utilisateurs cibles",
    ],
  },
  {
    date: "Avr. 2022",
    title: "Employé à la plonge",
    company: "Restaurant Le Mille Pâtes · Biscarrosse (40)",
    tags: ["Travail d'équipe", "Rigueur"],
    desc: ["Rigueur, travail en équipe et gestion du rythme en environnement exigeant."],
  },
];

const EDUCATION = [
  {
    date: "À partir d'Oct. 2026",
    title: "Master 1 User Experience & Interface",
    school: "ESD Bordeaux",
    desc: "Design System · Audit UX · UI Design · UX Writing · Recherche utilisateurs · Code & No Code",
  },
  {
    date: "Oct. 2024 – Aujourd'hui",
    title: "Bachelor Création Digitale – 3ème année",
    school: "ESD Bordeaux",
    desc: "Développement Web · Design UI/UX · Webmarketing · SEO/SEA · Conduite de projets",
  },
  {
    date: "Sept. 2023 – Juill. 2024",
    title: "BUT Informatique – 1ère année",
    school: "IUT de Bayonne et du Pays basque",
    desc: "Développement d'applications · Gestion des données · Administration systèmes",
  },
  {
    date: "Sept. 2021 – Juill. 2023",
    title: "Baccalauréat Général – Mention Assez Bien",
    school: "Lycée Saint-Exupéry · Parentis en Born (40)",
    desc: "Spécialités NSI et Sciences de l'Ingénieur · Option Maths Complémentaires",
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Portfolio",
    subtitle: "Webdesign & Développement Web",
    tags: ["UX/UI", "React", "Figma", "HTML/CSS", "Design System"],
    color: "#6c63ff",
    img: projet1Image,
    desc: "Portfolio interactif conçu comme un système d'exploitation, permettant d'explorer mon profil à travers une interface immersive et ludique.\n\nProjet personnel réalisé dans le cadre de ma recherche d'alternance en UX/UI et gestion de projet, avec l'objectif de proposer une expérience utilisateur originale et mémorable.\n\nJe me suis occupé de la conception UX/UI et du développement front-end en React, avec la création d'un système de fenêtres dynamiques (drag, resize, focus), de composants réutilisables et d'interactions en temps réel pour simuler un environnement OS complet.\n\nPS : Ce Portfolio n'a pas été fait en vibe coding, mais avec amour et beaucoup de RedBull !",
    links: [
      { label: "🖥️ Voir le code source", url: "https://github.com/lorenzo-nocchi/portfolio" },
    ],
  },
  {
    id: 2,
    title: "Digital Event 2026",
    subtitle: "Journée portes ouvertes de l'ESD Bordeaux",
    tags: ["C++", "Backend", "Électronique", "Arduino", "Postman"],
    color: "#00d4aa",
    img: projet2Image,
    desc: "Jeu immersif 2v2 inspiré de Simon et Twister, basé sur la mémoire et la coordination physique.\n\nNous étions un groupe de plus de 15 étudiants, allant du B1 au Master 2, issus de filières totalement différentes et nous avions deux semaines pour réaliser ce projet à l'occasion d'une soirée vernissage et de journées portes ouvertes de l'ESD Bordeaux.\n\nJe me suis occupé du développement des systèmes Arduino en C++, et des interactions lumineuses en temps réel, avec communication WebSocket et installation complète dans la scénographie.",
  },
  {
    id: 3,
    title: "Unchained",
    subtitle: "Création de marque et campagne marketing",
    tags: ["Design System", "Figma", "UI", "Webmarketing"],
    color: "#ff6b6b",
    img: projet3Image,
    desc: "Création d'une marque de claviers engagée au ton hacktiviste, avec une identité visuelle forte et une communication provocatrice autour des enjeux de sécurité numérique.\n\nProjet réalisé dans le cadre d'un exercice de création de marque à partir d'un thème imposé, avec l'objectif de se différencier en proposant un positionnement radical et des messages impactants, inspirés notamment de l'actualité (vol au musée du Louvre).\n\nJ'ai créé la marque de A à Z, de la direction artistique à la conception de la marque, avec la création de la charte graphique, du ton éditorial et d'une campagne de communication basée sur des messages courts, bruts et mémorables (\"Le Louvre protège ses œuvres. Mais qui protège vos données ?\").",
    links: [
      { label: "📽️ Voir la présentation", url: "/presentation-unchained.pdf" },
    ],
  },
  {
    id: 4,
    title: "Orchestre à l'école",
    subtitle: "Campagne de communication digitale",
    tags: ["Webmarketing", "Réseaux sociaux", "Emailing", "Storytelling"],
    color: "#ffd93d",
    img: projet4Image,
    desc: "Conception d'une campagne marketing complète pour l'association Orchestre à l'École, visant à accroître sa notoriété et générer des dons.\n\nProjet réalisé en une semaine en groupe de 9 étudiants (du B3 au Master 2), avec l'objectif de structurer une stratégie de communication efficace incluant une identité de campagne, une présence digitale et des supports d'acquisition.\n\nJe me suis occupé de la création de la charte graphique, du design de la campagne emailing et de l'élaboration du rétroplanning, en assurant la cohérence visuelle et l'organisation du projet.",
    links: [
      { label: "📽️ Voir la présentation", url: "/presentation-oae.pdf" },
    ],
  },
  {
    id: 5,
    title: "Loc'Art",
    subtitle: "Design UX",
    tags: ["UX Research", "Prototypage", "Figma"],
    color: "#4ecdc4",
    img: projet5Image,
    desc: "Conception d'un site de location de vêtements et robes de luxe (Loc'Art), pensé comme une expérience fluide et premium inspirée de plateformes comme Une Robe Un Soir.\n\nProjet réalisé en groupe avec un focus sur l'UX, avec l'objectif de concevoir un parcours utilisateur complet, de la découverte produit jusqu'au paiement, en mettant l'accent sur la simplicité.\n\nJe me suis occupé du prototypage sur Figma, avec la création des pages clés (produits, tunnel de commande, paiement) et la structuration d'une interface claire et cohérente orientée conversion.",
    links: [
      { label: "🎨 Voir le Figma", url: "https://www.figma.com/design/SX6BM199DlIU3nOutGkn4V/Loc-Art?node-id=1-2&p=f" },
      { label: "📄 Voir le livrable", url: "/livrable-locart.pdf" },
    ],
  },
  {
    id: 6,
    title: "Spellwar",
    subtitle: "Jeu sur terminal en C++",
    tags: ["C++", "Game Design", "Documentation technique"],
    color: "#a855f7",
    img: projet6Image,
    desc: "Développement d'un jeu tour par tour en C++ jouable en interface terminal, où le joueur contrôle un vaisseau et affronte des ennemis dans un système de combat simple et stratégique.\n\nProjet réalisé en binôme dans le cadre de ma première année de BUT, avec l'objectif de maîtriser les bases du C++, de structurer un projet informatique et de formaliser les mécaniques à travers de la documentation technique.\n\nJe me suis occupé du développement des mécaniques de jeu et de la logique en C++, ainsi que de la rédaction des algorithmes et de la documentation technique pour structurer et expliquer le fonctionnement du projet.",
    links: [
      { label: "🖥️ Voir le code source", url: "https://github.com/lorenzo-nocchi/spellwar" },
      { label: "📄 Voir la documentation", url: "/documentation-spellwar.pdf" },
    ],
  },
];

// -- BACKGROUND --

function GridCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const CELL = 80;
    const ATTRACT_RADIUS = 140;
    const ATTRACT_STRENGTH = 5;
    const LINE_COLOR_BASE = "rgba(355, 355, 355,";
    const NODE_COLOR_BASE = "rgba(355, 355, 355,";

    let W, H, cols, rows, nodes;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.ceil(W / CELL) + 1;
      rows = Math.ceil(H / CELL) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({ rx: c * CELL, ry: r * CELL, cx: c, cr: r });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const displaced = nodes.map((n) => {
        const dx = mx - n.rx;
        const dy = my - n.ry;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let px = n.rx, py = n.ry;
        if (dist < ATTRACT_RADIUS && dist > 0) {
          const factor = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
          px -= (dx / dist) * factor;
          py -= (dy / dist) * factor;
        }
        return { x: px, y: py };
      });

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const pa = displaced[r * cols + c];
          const pb = displaced[r * cols + c + 1];
          const midX = (pa.x + pb.x) / 2, midY = (pa.y + pb.y) / 2;
          const d = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
          const boost = d < ATTRACT_RADIUS ? (1 - d / ATTRACT_RADIUS) * 0.20 : 0;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `${LINE_COLOR_BASE}${(0.10 + boost).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const pa = displaced[r * cols + c];
          const pb = displaced[(r + 1) * cols + c];
          const midX = (pa.x + pb.x) / 2, midY = (pa.y + pb.y) / 2;
          const d = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
          const boost = d < ATTRACT_RADIUS ? (1 - d / ATTRACT_RADIUS) * 0.15 : 0;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `${LINE_COLOR_BASE}${(0.06 + boost).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      for (let i = 0; i < displaced.length; i++) {
        const p = displaced[i];
        const d = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2);
        if (d < ATTRACT_RADIUS) {
          const alpha = (1 - d / ATTRACT_RADIUS) * 0.35;
          const radius = (1 - d / ATTRACT_RADIUS) * 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${NODE_COLOR_BASE}${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="grid-canvas" />;
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="clock">
      {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
    </span>
  );
}

// -- WINDOWS --

const MIN_W = 400;
const MIN_H = 480;

function Window({ id, title, children, initialPos, initialPosFn, initialSize, initialSizeFn, onFocus, focused, minimized, onClose }) {
  const initSize = (() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    if (initialSizeFn) return initialSizeFn(vw, vh);
    if (initialSize) return initialSize;
    return { w: 420, h: 520 };
  })();
  const [pos, setPos] = useState(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    if (initialPos) return initialPos;
    if (initialPosFn) return initialPosFn(vw, vh, initSize.w, initSize.h);
    return { x: Math.max(0, (vw - initSize.w) / 2), y: Math.max(0, (vh - initSize.h) / 2) };
  });
  const [size, setSize] = useState({ w: initSize.w, h: initSize.h });
  const dragRef = useRef(null);
  const stateRef = useRef({ pos, size });

  useEffect(() => { stateRef.current = { pos, size }; }, [pos, size]);

  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      setPos((p) => ({
        x: Math.min(Math.max(0, p.x), Math.max(0, vw - stateRef.current.size.w)),
        y: Math.min(Math.max(0, p.y), Math.max(0, vh - stateRef.current.size.h - 58)),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function onBarMouseDown(e) {
    if (e.target.closest(".win-close") || e.target.closest(".win-resize")) return;
    onFocus(id);
    const start = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    const move = (ev) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const { w, h } = stateRef.current.size;
      setPos({
        x: Math.min(Math.max(0, start.px + ev.clientX - start.mx), vw - w),
        y: Math.min(Math.max(0, start.py + ev.clientY - start.my), vh - h - 58),
      });
    };
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  function onResizeMouseDown(e, direction) {
    e.stopPropagation();
    onFocus(id);
    const start = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y, pw: size.w, ph: size.h };
    const move = (ev) => {
      const dx = ev.clientX - start.mx, dy = ev.clientY - start.my;
      const vw = window.innerWidth, vh = window.innerHeight - 58;
      let nx = start.px, ny = start.py, nw = start.pw, nh = start.ph;
      if (direction.includes("e")) nw = Math.max(MIN_W, start.pw + dx);
      if (direction.includes("s")) nh = Math.max(MIN_H, start.ph + dy);
      if (direction.includes("w")) { nw = Math.max(MIN_W, start.pw - dx); nx = start.px + (start.pw - nw); }
      if (direction.includes("n")) { nh = Math.max(MIN_H, start.ph - dy); ny = start.py + (start.ph - nh); }
      if (nx < 0) { nw += nx; nx = 0; }
      if (ny < 0) { nh += ny; ny = 0; }
      if (nx + nw > vw) nw = vw - nx;
      if (ny + nh > vh) nh = vh - ny;
      setPos({ x: nx, y: ny });
      setSize({ w: nw, h: nh });
    };
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  const HANDLES = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];

  return (
    <div
      ref={dragRef}
      className={`window${focused ? " focused" : ""}${minimized ? " minimized" : ""}`}
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: focused ? 100 : 10 }}
      onMouseDown={() => onFocus(id)}
    >
      {HANDLES.map((dir) => (
        <div key={dir} className={`win-resize ${dir}`} onMouseDown={(e) => onResizeMouseDown(e, dir)} />
      ))}
      <div className="window-bar" onMouseDown={onBarMouseDown}>
        <div style={{ width: 26 }} />
        <span className="win-title">{title}</span>
        <button className="win-close" onClick={(e) => { e.stopPropagation(); onClose(id); }}>✕</button>
      </div>
      <div className="window-body">{children}</div>
      <div className="win-grip">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="13" y1="5"  x2="5"  y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13" y1="9"  x2="9"  y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

function ProfilWindow() {
  return (
    <div className="profil-wrap">
      <div className="profil-header">
        <div className="profil-avatar-wrap">
          <div className="profil-avatar">
            <img src={PROFILE.avatar} alt="Avatar" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="profil-status" />
        </div>
        <div className="profil-info">
          <div className="profil-name">{PROFILE.fullname}</div>
          <div className="profil-role">{PROFILE.title}</div>
          <div className="profil-badges">
            {PROFILE.badges.map((b, i) => <div key={i} className="badge-item">{b}</div>)}
          </div>
        </div>
      </div>

      <div className="profil-contact">
        <div className="contact-row"><span>📧</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
        <div className="contact-row"><span>📞</span><span>{PROFILE.phone}</span></div>
        <div className="contact-row"><span>🔗</span><a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer">{PROFILE.linkedin}</a></div>
        <div className="contact-row"><span>📍</span><span>{PROFILE.location}</span></div>
      </div>

      <div className="skills-section">
        <div className="skills-title">Technologies</div>
        <div className="skills-grid">
          {Object.entries(PROFILE.skills).map(([cat, tags]) => (
            <div key={cat} className="skill-card">
              <div className="skill-card-title">{cat}</div>
              <div className="skill-tags">{tags.map((t, i) => <span key={i} className="skill-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section">
        <div className="skills-title">Langues & Intérêts</div>
        <div className="profil-list">
          {PROFILE.languages.map((l, i) => (
            <div key={i} className="profil-list-item">
              <span className="icon-accent">🌐</span>{l}
            </div>
          ))}
          {PROFILE.interests.map((l, i) => (
            <div key={i} className="profil-list-item">
              <span className="icon-accent2">✦</span>{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjetsWindow() {
  const [selected, setSelected] = useState(null);
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <>
      {selected && (
        <div className="proj-modal-overlay" onClick={() => setSelected(null)}>
          <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selected.img} alt={selected.title} className="proj-modal-img" />
            <div className="proj-modal-body">
              <div className="proj-modal-title">{selected.title}</div>
              <div className="proj-modal-sub">{selected.subtitle}</div>
              <div className="proj-modal-desc">
                {selected.desc?.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </div>
              <div className="proj-modal-tags" style={{ marginBottom: 14 }}>
                {selected.tags.map((t, i) => <span key={i} className="proj-modal-tag">{t}</span>)}
              </div>
              {selected.links?.length > 0 && (
                <div className="proj-modal-links">
                  {selected.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noreferrer" className="proj-modal-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
              <button className="proj-modal-close" onClick={() => setSelected(null)}>✕ Fermer</button>
            </div>
          </div>
        </div>
      )}
      <div className="projets-wrap">
        <div className="projets-featured" onClick={() => setSelected(featured)}>
          <img src={featured.img} alt={featured.title} />
          <div className="projets-featured-overlay">
            <div className="feat-title">{featured.title}</div>
            <div className="feat-sub">{featured.subtitle}</div>
            <div className="feat-tags">{featured.tags.map((t, i) => <span key={i} className="feat-tag">{t}</span>)}</div>
          </div>
        </div>
        <div className="projets-sub-grid">
          {rest.map((p) => (
            <div key={p.id} className="proj-card" onClick={() => setSelected(p)}>
              <img src={p.img} alt={p.title} />
              <div className="proj-card-overlay">
                <div className="proj-title">{p.title}</div>
                <div className="proj-sub">{p.subtitle}</div>
                <div className="proj-tags">{p.tags.map((t, i) => <span key={i} className="proj-tag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ExperienceWindow() {
  const [tab, setTab] = useState("xp");
  return (
    <>
      <div className="win-tabs">
        <div className={`win-tab${tab === "xp" ? " active" : ""}`} onClick={() => setTab("xp")}>Expériences</div>
        <div className={`win-tab${tab === "edu" ? " active" : ""}`} onClick={() => setTab("edu")}>Formation</div>
      </div>
      {tab === "xp" && (
        <div className="xp-wrap">
          {EXPERIENCES.map((e, i) => (
            <div key={i} className="xp-item">
              <div className="xp-date">{e.date}</div>
              <div className="xp-title">{e.title}</div>
              <div className="xp-company">{e.company}</div>
              <div className="xp-tags">{e.tags.map((t, j) => <span key={j} className="xp-tag">{t}</span>)}</div>
              <ul className="xp-list">{e.desc.map((d, j) => <li key={j}>{d}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {tab === "edu" && (
        <div className="edu-wrap">
          {EDUCATION.map((e, i) => (
            <div key={i} className="edu-item">
              <div className="edu-date">{e.date}</div>
              <div className="edu-title">{e.title}</div>
              <div className="edu-school">{e.school}</div>
              <div className="edu-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function TerminalWindow() {
  const lines = [
    { type: "prompt", text: "whoami" },
    { type: "white", text: "Lorenzo NOCCHI" },
    { type: "prompt", text: "cat role.txt" },
    { type: "yellow", text: "UX/UI Designer · Chef de Projet Digital · Développeur Full-Stack" },
    { type: "prompt", text: "cat about.txt" },
    { type: "gray", text: "Étudiant en Bachelor Création Digitale à l'ESD, actuellement en" },
    { type: "gray", text: "alternance chez Autopartspro. Passionné par la conception" },
    { type: "gray", text: "d'interfaces centrées utilisateur, l'automatisation et le" },
    { type: "gray", text: "développement web moderne." },
    { type: "prompt", text: "ls skills/" },
    { type: "purple", text: "figma/  react/  n8n/  sql/  godot/  logiciels-adobe/  ux-writing/" },
    { type: "prompt", text: "cat hobbies.json" },
    { type: "white", text: '{ "musique": ["guitare","batterie","basse","piano"],' },
    { type: "white", text: '  "voiture": "permis B",' },
    { type: "white", text: '  "gamedev": "Godot 4 - Unity" }' },
    { type: "prompt", text: "echo $STATUS" },
    { type: "green", text: "🟢 Ouvert aux opportunités · Bordeaux et alentours" },
    { type: "cursor", text: "" },
  ];

  return (
    <div className="terminal-wrap">
      {lines.map((l, i) => (
        <div key={i} className="term-line">
          {l.type === "prompt"  && <><span className="term-prompt">lorenzo@portfolio:~$ </span><span className="term-white">{l.text}</span></>}
          {l.type === "white"   && <span className="term-white">{l.text}</span>}
          {l.type === "gray"    && <span className="term-gray">{l.text}</span>}
          {l.type === "yellow"  && <span className="term-yellow">{l.text}</span>}
          {l.type === "purple"  && <span className="term-purple">{l.text}</span>}
          {l.type === "green"   && <span className="term-green">{l.text}</span>}
          {l.type === "cursor"  && <><span className="term-prompt">lorenzo@portfolio:~$ </span><span className="term-cursor" /></>}
        </div>
      ))}
    </div>
  );
}

function SnakeWindow() {
  const GRID_SIZE = 19;
  const CELL_SIZE = 19;
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [fruit, setFruit] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef(null);

  function generateFruit(snake, gridSize) {
    let newFruit;
    do {
      newFruit = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    } while (snake.some(seg => seg.x === newFruit.x && seg.y === newFruit.y));
    return newFruit;
  }

  useEffect(() => {
    if (gameOver) return;
    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
        };
        if (prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }
        let newSnake = [newHead, ...prevSnake];
        if (newHead.x === fruit.x && newHead.y === fruit.y) {
          setScore(s => s + 10);
          setFruit(generateFruit(newSnake, GRID_SIZE));
        } else {
          newSnake.pop();
        }
        setDirection(nextDirection);
        return newSnake;
      });
    }, 150);
    return () => clearInterval(gameLoopRef.current);
  }, [gameOver, nextDirection, fruit, snake]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':    e.preventDefault(); setNextDirection(prev => prev.y === 0 ? { x: 0, y: -1 } : prev); break;
        case 'ArrowDown':  e.preventDefault(); setNextDirection(prev => prev.y === 0 ? { x: 0, y: 1 }  : prev); break;
        case 'ArrowLeft':  e.preventDefault(); setNextDirection(prev => prev.x === 0 ? { x: -1, y: 0 } : prev); break;
        case 'ArrowRight': e.preventDefault(); setNextDirection(prev => prev.x === 0 ? { x: 1, y: 0 }  : prev); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleArrowClick = (dir) => {
    setNextDirection(prev => {
      if (direction.x === -dir.x || direction.y === -dir.y) return prev;
      return dir;
    });
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFruit({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="snake-wrap">
      <div className="snake-score">Score: <span>{score}</span></div>

      <div
        className="snake-board"
        style={{ width: GRID_SIZE * CELL_SIZE + 2, height: GRID_SIZE * CELL_SIZE + 2 }}
      >
        {snake.map((seg, i) => (
          <div
            key={i}
            className={`snake-segment ${i === 0 ? "head" : "body"}`}
            style={{
              left: seg.x * CELL_SIZE + 1,
              top: seg.y * CELL_SIZE + 1,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}
        <div
          className="snake-fruit"
          style={{
            left: fruit.x * CELL_SIZE + 1,
            top: fruit.y * CELL_SIZE + 1,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />
        {gameOver && (
          <div className="snake-gameover">
            <div className="snake-gameover-title">GAME OVER</div>
            <button className="btn-primary" onClick={resetGame}>Recommencer</button>
          </div>
        )}
      </div>

      <div className="snake-controls">
        <button className="btn-primary snake-arrow-btn" onClick={() => handleArrowClick({ x: 0, y: -1 })}>▲</button>
        <div className="snake-controls-row">
          <button className="btn-primary snake-arrow-btn" onClick={() => handleArrowClick({ x: -1, y: 0 })}>◄</button>
          <button className="btn-primary snake-arrow-btn" onClick={() => handleArrowClick({ x: 0, y: 1 })}>▼</button>
          <button className="btn-primary snake-arrow-btn" onClick={() => handleArrowClick({ x: 1, y: 0 })}>►</button>
        </div>
      </div>
    </div>
  );
}

function MinesweeperWindow() {
  const COLS = 9;
  const ROWS = 9;
  const MINES = 10;
  const CELL = 34;

  const createBoard = () =>
    Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => ({
        r, c, mine: false, revealed: false, flagged: false, adjacent: 0,
      }))
    );

  const [board, setBoard] = useState(() => createBoard());
  const [gameState, setGameState] = useState("idle");
  const [minesLeft, setMinesLeft] = useState(MINES);
  const [flagMode, setFlagMode] = useState(false);

  const placeMines = (initBoard, safeR, safeC) => {
    const b = initBoard.map(row => row.map(cell => ({ ...cell })));
    const positions = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (r === safeR && c === safeC) continue;
        positions.push([r, c]);
      }
    }

    for (let i = positions.length - 1; i > 0; i--) {
      const randomValue = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
      const j = Math.floor(randomValue * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    for (let i = 0; i < MINES; i++) {
      const [r, c] = positions[i];
      b[r][c].mine = true;
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (b[r][c].mine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && b[nr][nc].mine) count++;
          }
        b[r][c].adjacent = count;
      }
    }
    return b;
  };

  const reveal = (b, r, c) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return b;
    if (b[r][c].revealed || b[r][c].flagged) return b;
    b = b.map(row => row.map(cell => ({ ...cell })));
    b[r][c].revealed = true;
    if (b[r][c].adjacent === 0 && !b[r][c].mine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr !== 0 || dc !== 0) b = reveal(b, r + dr, c + dc);
    }
    return b;
  };

  const checkWin = (b) => {
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (!b[r][c].mine && !b[r][c].revealed) return false;
    return true;
  };

  const handleFlag = (r, c) => {
    if (gameState === "won" || gameState === "lost") return;
    if (board[r][c].revealed) return;
    const b = board.map(row => row.map(cell => ({ ...cell })));
    b[r][c].flagged = !b[r][c].flagged;
    setBoard(b);
    setMinesLeft(m => b[r][c].flagged ? m - 1 : m + 1);
  };

  const handleCellClick = (r, c) => {
    if (gameState === "won" || gameState === "lost") return;
    const cell = board[r][c];
    if (cell.revealed) return;
    if (flagMode) { handleFlag(r, c); return; }
    if (cell.flagged) return;
    let b = board;
    if (gameState === "idle") { b = placeMines(createBoard(), r, c); setGameState("playing"); }
    if (b[r][c].mine) {
      const lost = b.map(row => row.map(cell => cell.mine ? { ...cell, revealed: true } : { ...cell }));
      lost[r][c] = { ...lost[r][c], boom: true };
      setBoard(lost);
      setGameState("lost");
      return;
    }
    b = reveal(b, r, c);
    if (checkWin(b)) { setBoard(b); setGameState("won"); }
    else setBoard(b);
  };

  const reset = () => {
    setBoard(createBoard());
    setGameState("idle");
    setMinesLeft(MINES);
    setFlagMode(false);
  };

  const ADJACENT_COLORS = ["", "#6eb5ff", "#7ecf7e", "#ff7070", "#b388ff", "#ffb347", "#80deea", "#f48fb1", "#ccc"];

  return (
    <div className="minesweeper-wrap">
      <div className="minesweeper-header">
        <span className="minesweeper-counter">💣 {minesLeft}</span>
        <button className="btn-primary" style={{ fontSize: 18, padding: "4px 12px" }} onClick={reset}>
          {gameState === "won" ? "😎" : gameState === "lost" ? "😵" : "🙂"}
        </button>
        <button
          className={`btn-primary minesweeper-flag-btn${flagMode ? " active" : ""}`}
          onClick={() => setFlagMode(f => !f)}
        >
          🚩 {flagMode ? "ON" : "OFF"}
        </button>
      </div>

      <div className="minesweeper-grid" style={{ gridTemplateColumns: `repeat(${COLS}, ${CELL}px)` }}>
        {board.flat().map((cell) => {
          const isRevealed = cell.revealed;
          const isMine = cell.mine && isRevealed;
          const isBoom = cell.boom;
          const isDone = gameState === "won" || gameState === "lost";
          return (
            <div
              key={`${cell.r}-${cell.c}`}
              className={`minesweeper-cell${isRevealed ? " revealed" : ""}${isBoom ? " boom" : ""}${isDone ? " done" : ""}`}
              style={{
                width: CELL,
                height: CELL,
                color: cell.flagged ? "#fff" : isMine ? "#fff" : ADJACENT_COLORS[cell.adjacent] || "transparent",
              }}
              onClick={() => handleCellClick(cell.r, cell.c)}
              onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); handleFlag(cell.r, cell.c); }}
            >
              {cell.flagged ? "🚩" : isMine ? "💣" : isRevealed && cell.adjacent > 0 ? cell.adjacent : ""}
            </div>
          );
        })}
      </div>

      {(gameState === "won" || gameState === "lost") && (
        <div className="minesweeper-status">
          <div className={`minesweeper-status-text ${gameState}`}>
            {gameState === "won" ? "Gagné !" : "Perdu !"}
          </div>
          <button className="btn-primary" onClick={reset}>Recommencer</button>
        </div>
      )}

      {gameState === "idle" && (
        <div className="minesweeper-hint">Clic droit ou 🚩 pour drapeau</div>
      )}
    </div>
  );
}

// -- DESKTOP ICONS --

const WINDOWS_DEF = [
  { id: "profil", title: "Profil", icon: "👤",
    initialPosFn: (vw, vh) => { const l = getResponsiveDesktopLayout(vw, vh); return { x: l.profil.x, y: l.profil.y }; },
    initialSizeFn: (vw, vh) => { const l = getResponsiveDesktopLayout(vw, vh); return { w: l.profil.w, h: l.profil.h }; },
    content: <ProfilWindow /> },
  { id: "projets", title: "Projets", icon: "📁",
    initialPosFn: (vw, vh) => { const l = getResponsiveDesktopLayout(vw, vh); return { x: l.projets.x, y: l.projets.y }; },
    initialSizeFn: (vw, vh) => { const l = getResponsiveDesktopLayout(vw, vh); return { w: l.projets.w, h: l.projets.h }; },
    content: <ProjetsWindow /> },
  { id: "xp", title: "Expériences & Formation", icon: "🎓",
    initialPosFn: (vw, vh, w, h) => ({
      x: clamp(Math.round(vw * 0.15), 10, Math.max(0, vw - w - 10)),
      y: clamp(Math.round(vh * 0.12), 10, Math.max(0, vh - h - 68)),
    }),
    initialSizeFn: (vw, vh) => ({
      w: clamp(Math.round(vw * 0.38), 320, 460),
      h: clamp(Math.round((vh - 58) * 0.74), 320, 560),
    }),
    content: <ExperienceWindow /> },
  { id: "terminal", title: "À Propos · Terminal", icon: "🖥️",
    initialPosFn: (vw, vh, w, h) => ({
      x: clamp(Math.round(vw * 0.28), 10, Math.max(0, vw - w - 10)),
      y: clamp(Math.round(vh * 0.2), 10, Math.max(0, vh - h - 68)),
    }),
    initialSizeFn: (vw, vh) => ({
      w: clamp(Math.round(vw * 0.42), 320, 500),
      h: clamp(Math.round((vh - 58) * 0.58), 300, 460),
    }),
    content: <TerminalWindow /> },
  { id: "snake", title: "Snake", icon: "🐍", desktopOnly: true,
    initialPosFn: (vw, vh, w, h) => ({
      x: clamp(Math.round(vw * 0.65), 10, Math.max(0, vw - w - 10)),
      y: clamp(Math.round(vh * 0.15), 10, Math.max(0, vh - h - 68)),
    }),
    initialSizeFn: () => ({ w: 400, h: 600 }),
    content: <SnakeWindow /> },
  { id: "minesweeper", title: "Démineur", icon: "💣", desktopOnly: true,
    initialPosFn: (vw, vh, w, h) => ({
      x: clamp(Math.round(vw * 0.55), 10, Math.max(0, vw - w - 10)),
      y: clamp(Math.round(vh * 0.15), 10, Math.max(0, vh - h - 68)),
    }),
    initialSizeFn: () => ({ w: 400, h: 600 }),
    content: <MinesweeperWindow /> },
];

// -- UTILS --

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

// -- RENDER & RESPONSIVE --

function getResponsiveDesktopLayout(vw, vh) {
  const taskbarH = 58;
  const top = clamp(Math.round(vh * 0.045), 24, 56);
  const left = clamp(Math.round(vw * 0.03), 20, 64);
  const right = clamp(Math.round(vw * 0.03), 20, 72);
  const bottom = clamp(Math.round(vh * 0.055), 20, 56);
  const gap = clamp(Math.round(vw * 0.02), 14, 32);
  const stackGap = clamp(Math.round(vh * 0.02), 12, 24);
  const minStartWindowW = 400;

  const availableW = Math.max(360, vw - left - right - gap);
  const availableH = Math.max(320, vh - taskbarH - top - bottom);
  const canSplitHorizontally = availableW >= (minStartWindowW * 2);

  if (canSplitHorizontally) {
    let profilW = clamp(Math.round(availableW * 0.3), minStartWindowW, 600);
    let projetsW = availableW - profilW;
    if (projetsW < minStartWindowW) { projetsW = minStartWindowW; profilW = availableW - projetsW; }
    const sharedH = clamp(availableH, 320, 760);
    return {
      profil:  { x: left, y: top, w: profilW, h: sharedH },
      projets: { x: left + profilW + gap, y: top, w: projetsW, h: sharedH },
    };
  }

  const stackedW = Math.max(320, vw - left - right);
  const profilH = clamp(Math.round((availableH - stackGap) * 0.4), 240, 420);
  const projetsH = Math.max(220, availableH - profilH - stackGap);
  return {
    profil:  { x: left, y: top, w: stackedW, h: profilH },
    projets: { x: left, y: top + profilH + stackGap, w: stackedW, h: projetsH },
  };
}

// -- TASKBAR ICONS --

const TASKBAR_ICONS = [
  { id: "profil",   icon: "👤", label: "Profil" },
  { id: "projets",  icon: "📁", label: "Projets" },
  { id: "xp",       icon: "🎓", label: "Expériences" },
  { id: "terminal", icon: "🖥️", label: "À Propos" },
];

// -- APP ENGINE --

export default function App() {
  const [openWindows, setOpenWindows] = useState(["profil", "projets"]);
  const [minimized, setMinimized] = useState([]);
  const [focused, setFocused] = useState("projets");

  const toggleWindow = (id) => {
    if (!openWindows.includes(id)) {
      setOpenWindows((p) => [...p, id]);
      setMinimized((p) => p.filter((w) => w !== id));
      setFocused(id);
    } else if (minimized.includes(id)) {
      setMinimized((p) => p.filter((w) => w !== id));
      setFocused(id);
    } else {
      setMinimized((p) => [...p, id]);
    }
  };

  const closeWindow = (id) => {
    setOpenWindows((p) => p.filter((w) => w !== id));
    setMinimized((p) => p.filter((w) => w !== id));
  };

  const focusWindow = (id) => setFocused(id);

  const openGame = (id) => {
    setOpenWindows(p => p.includes(id) ? p : [...p, id]);
    setMinimized(p => p.filter(w => w !== id));
    setFocused(id);
  };

  return (
    <div className="desktop">
      <GridCanvas />

      <div className="desktop-icons">
        {TASKBAR_ICONS.map((ic) => (
          <div key={ic.id} className="desktop-icon" onDoubleClick={() => toggleWindow(ic.id)}>
            <div className="desktop-icon-img">{ic.icon}</div>
            <div className="desktop-icon-label">{ic.label}</div>
          </div>
        ))}
        <div className="desktop-icon" onDoubleClick={() => openGame("snake")}>
          <div className="desktop-icon-img">🐍</div>
          <div className="desktop-icon-label">Snake</div>
        </div>
        <div className="desktop-icon" onDoubleClick={() => openGame("minesweeper")}>
          <div className="desktop-icon-img">💣</div>
          <div className="desktop-icon-label">Démineur</div>
        </div>
      </div>

      {WINDOWS_DEF.filter((w) => openWindows.includes(w.id)).map((w) => (
        <Window
          key={w.id}
          id={w.id}
          title={w.title}
          icon={w.icon}
          initialPos={w.initialPos}
          initialPosFn={w.initialPosFn}
          initialSize={w.initialSize}
          initialSizeFn={w.initialSizeFn}
          focused={focused === w.id}
          minimized={minimized.includes(w.id)}
          onFocus={focusWindow}
          onClose={closeWindow}
          onMinimize={(id) => setMinimized((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])}
        >
          {w.content}
        </Window>
      ))}

      <div className="taskbar">
        <div className="taskbar-left">
          <div className="taskbar-brand">lorenzOS</div>
        </div>
        <div className="taskbar-center">
          {TASKBAR_ICONS.map((ic) => (
            <div
              key={ic.id}
              className={`tb-icon${openWindows.includes(ic.id) && !minimized.includes(ic.id) ? " active" : ""}`}
              title={ic.label}
              onClick={() => toggleWindow(ic.id)}
            >
              {ic.icon}
            </div>
          ))}
        </div>
        <div className="taskbar-right">
          <Clock />
        </div>
      </div>
    </div>
  );
}