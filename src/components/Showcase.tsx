import { useState, useRef, useCallback, useEffect } from "react";

const techStack = [
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/E76F00", color: "#E76F00" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", color: "#339933" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1" },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3", color: "#7952B3" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/FFFFFF", color: "#FFFFFF" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", color: "#F24E1E" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF", color: "#FFFFFF" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF", color: "#FFFFFF" },
  { name: "Netlify", icon: "https://cdn.simpleicons.org/netlify/00C7B7", color: "#00C7B7" },
];

const projects = [
  {
    tech: "Java + Spring/Servlet + MySQL",
    thumbnail: "/assets/project-event.png",
    github: "https://eventregistrationsystem-h7sl.onrender.com/",
  },
  {
    tech: "React + Three.js + Tailwind",
    thumbnail: "/assets/project-portfolio.png",
    github: "https://esakkirajaportfolio-kkzeyc29k-tcs8.vercel.app/",
  },
];

const certificates = [
  { title: "Advanced Diploma in Python Programming — CSC Computer Education", tech: "Jan – May 2024", thumbnail: "/assets/certificates/ADPP.jpeg" },
  { title: "Full Stack Web Development (React) — Online Course, Novitech R&D", tech: "Jul – Aug 2025", thumbnail: "/assets/certificates/FSD_2.jpeg" },
  { title: "Machine Learning — One Day Masterclass, Pantech E-Learning", tech: "Sep 2025", thumbnail: "/assets/certificates/ML_3.jpeg" },
  { title: "Full Stack Development — 30 Days Masterclass, Novitech R&D", tech: "Feb – Mar 2026", thumbnail: "/assets/certificates/MC_4.jpg" },
  { title: "Full Stack Development (React) — Internship, Novitech R&D", tech: "Feb – Mar 2026", thumbnail: "/assets/certificates/IN_5.jpg" },
  { title: "UI/UX Design — Internship, Novitech R&D", tech: "Feb – Mar 2026", thumbnail: "/assets/certificates/UI_6.jpg" },
  { title: "MERN Stack Development — 3 Month Internship, Novitech R&D", tech: "Feb – May 2026", thumbnail: "/assets/certificates/MS_7.jpg" },
  { title: "Full Stack Java Development — Offline Internship, Techvolt Software", tech: "Jun 2026", thumbnail: "/assets/certificates/IN_8.jpeg" },
  { title: "Full Stack Development Training, Techvolt Software", tech: "Jun 2026", thumbnail: "/assets/certificates/TR_9.jpeg" },
];

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-8 4h16v-2H4v2z" />
  </svg>
);

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 2v4m0 12v4m10-10h-4M6 12H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function ProjectCard({ item }: { item: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06] 
      hover:border-white/25 transition-all duration-500 
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 backdrop-blur-md"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={item.thumbnail}
          alt={item.tech}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
      </div>
      <div className="p-5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
          {item.tech}
        </span>
        <a
          href={item.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full 
          bg-white/5 border border-white/15 text-white/60 
          hover:bg-white/10 hover:text-white hover:border-white/30 
          transition-all duration-200 active:scale-95"
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  );
}

function CertCard({ item, onPreview }: { item: typeof certificates[0]; onPreview: () => void }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const response = await fetch(item.thumbnail, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
    setTimeout(() => setDownloading(false), 500);
  };

  return (
    <div
      onClick={onPreview}
      className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06]
      hover:border-white/25 transition-all duration-500 cursor-pointer
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 backdrop-blur-md"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <span className="flex items-center gap-2 text-white text-xs font-semibold tracking-wide border border-white/40 rounded-full px-4 py-2 bg-black/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            Preview
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{item.title}</p>
        </div>
      </div>
      <div className="px-5 py-4 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
          {item.tech}
        </span>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center w-8 h-8 rounded-full 
          bg-white/5 border border-white/15 text-white/60 
          hover:bg-white/10 hover:text-white hover:border-white/30 
          transition-all duration-200 active:scale-95"
        >
          {downloading ? <Spinner /> : <DownloadIcon />}
        </button>
      </div>
    </div>
  );
}

// ─── Certificate Lightbox ──────────────────────────────────────────────────
function CertLightbox({
  item,
  onClose,
}: {
  item: typeof certificates[0] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/85"
      style={{ backdropFilter: "blur(8px)", animation: "fadeSlideUp 0.25s ease forwards" }}
    >
      <button
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 flex items-center justify-center w-11 h-11 rounded-full
        bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40
        transition-all duration-200 active:scale-95 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="max-w-full max-h-[70vh] object-contain rounded-xl border border-white/15 shadow-2xl shadow-black/60 bg-white/5"
        />
        <div className="text-center px-4">
          <p className="text-white font-semibold text-sm sm:text-base">{item.title}</p>
          <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono mt-1">
            {item.tech}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── 3D Dome Sphere Tech Stack ────────────────────────────────────────────────
function TechGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rotX = useRef(0.3);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.004);
  const isDragging = useRef(false);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const dragVX = useRef(0);
  const dragVY = useRef(0);
  const rafId = useRef<number>();
  const itemEls = useRef<HTMLDivElement[]>([]);

  const RADIUS = 160;
  const n = techStack.length;

  // Fibonacci sphere positions
  const positions = useRef<{ x: number; y: number; z: number }[]>([]);
  useEffect(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    positions.current = Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, []);

  function project(pos: { x: number; y: number; z: number }, rx: number, ry: number) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = pos.y * cosX - z1 * sinX;
    const z2 = pos.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  useEffect(() => {
    const els = itemEls.current;

    function render() {
      if (!isDragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;
        velX.current *= 0.97;
        velY.current = velY.current * 0.99 + 0.004 * 0.01;
        if (rotX.current > 0.6) velX.current -= 0.0005;
        if (rotX.current < -0.1) velX.current += 0.0005;
      }

      const projected = positions.current.map((pos, i) => ({
        el: els[i],
        p: project(pos, rotX.current, rotY.current),
      }));

      projected
        .slice()
        .sort((a, b) => a.p.z - b.p.z)
        .forEach(({ el, p }, idx) => {
          if (!el) return;
          const x = p.x * RADIUS + 210 - 36;
          const y = p.y * RADIUS + 210 - 36;
          const depth = (p.z + 1) / 2;
          const opacity = 0.25 + depth * 0.75;
          const scale = 0.55 + depth * 0.55;
          el.style.cssText = `position:absolute;left:${x}px;top:${y}px;opacity:${opacity};transform:scale(${scale});z-index:${idx};width:72px;height:72px;`;
        });

      rafId.current = requestAnimationFrame(render);
    }

    rafId.current = requestAnimationFrame(render);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMX.current;
      const dy = e.clientY - lastMY.current;
      dragVX.current = dy * 0.005;
      dragVY.current = dx * 0.005;
      rotX.current += dragVX.current;
      rotY.current += dragVY.current;
      lastMX.current = e.clientX;
      lastMY.current = e.clientY;
    };
    const onMouseUp = () => {
      if (isDragging.current) {
        velX.current = dragVX.current;
        velY.current = dragVY.current || 0.004;
        isDragging.current = false;
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMX.current;
    const dy = e.touches[0].clientY - lastMY.current;
    dragVX.current = dy * 0.005;
    dragVY.current = dx * 0.005;
    rotX.current += dragVX.current;
    rotY.current += dragVY.current;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
  };
  const onTouchEnd = () => {
    velX.current = dragVX.current;
    velY.current = dragVY.current || 0.004;
    isDragging.current = false;
  };

  return (
    <div className="space-y-4">
      {/* Decorative header */}
      <div className="flex items-center justify-center gap-3 text-white/40">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/30" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono">
          {techStack.length} technologies · daily stack
        </span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/30" />
      </div>

      {/* Dome sphere */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center select-none"
        style={{ height: "460px", cursor: "grab" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Scene */}
        <div
          ref={sceneRef}
          className="relative"
          style={{ width: "420px", height: "420px" }}
        >
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              ref={(el) => { if (el) itemEls.current[i] = el; }}
              style={{ position: "absolute", width: 72, height: 72 }}
            >
              <div
                className="w-full h-full rounded-[18px] flex flex-col items-center justify-center gap-[5px] transition-[border-color] duration-200 hover:scale-110"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 0 20px -8px ${tech.color}55`,
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  style={{ width: 30, height: 30, objectFit: "contain" }}
                />
                <span
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fade edge overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{ boxShadow: "inset 0 0 80px 40px rgba(0,0,0,0.7)" }}
        />
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

type TabId = "projects" | "certificates" | "tech";

const tabs: { id: TabId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "tech", label: "Tech Stack" },
];

export default function ShowcaseSection() {
  const [active, setActive] = useState<TabId>("projects");
  const [animKey, setAnimKey] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<typeof certificates[0] | null>(null);
  const touchStartX = useRef<number | null>(null);

  const switchTab = useCallback(
    (id: TabId) => {
      if (id === active) return;
      setActive(id);
      setAnimKey((k) => k + 1);
    },
    [active]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    const order = tabs.map((t) => t.id);
    const idx = order.indexOf(active);
    if (dx < 0 && idx < order.length - 1) switchTab(order[idx + 1]);
    if (dx > 0 && idx > 0) switchTab(order[idx - 1]);
    touchStartX.current = null;
  };

  const activePillLeft =
    active === "projects"
      ? "8px"
      : active === "certificates"
      ? "calc(33.333% + 4px)"
      : "calc(66.666% + 0px)";

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen bg-black overflow-hidden text-white px-4 sm:px-8 md:px-16 lg:px-24 py-0 md:py-12 -mt-16 sm:mt-0 md:mt-12">
      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
        {/* Label */}
        <div className="relative flex items-center justify-center gap-4 mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">
            Showcase
          </span>
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </div>

        {/* Heading */}
        <div className="relative overflow-hidden mb-12">
          <h1
            className="text-center font-black tracking-tight leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white opacity-0 whitespace-nowrap animate-[headingReveal_1s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]"
            style={{ fontSize: "clamp(32px,6vw,80px)" }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent">
              Portfolio Showcase
            </span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div
          className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/[0.08] mb-14 w-full max-w-md opacity-0 animate-[fadeSlideUp_0.6s_ease_0.3s_forwards] shadow-2xl shadow-black/40"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white/20 border border-white/40 transition-[left] duration-300 ease-out shadow-xl shadow-white/10"
            style={{
              width: "calc(33.333% - 4px)",
              left: activePillLeft,
              backdropFilter: "blur(15px)",
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="relative z-10 flex-1 h-12 rounded-full text-xs font-medium tracking-wide transition-colors duration-200"
            >
              <span
                className={
                  active === tab.id
                    ? "text-white font-semibold"
                    : "text-white/35 hover:text-white/60"
                }
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content area with swipe */}
        <div
          key={animKey}
          className="w-full opacity-0 animate-[contentIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {active === "projects" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {projects.map((item, i) => (
                <div
                  key={i}
                  className="opacity-0"
                  style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s forwards` }}
                >
                  <ProjectCard item={item} />
                </div>
              ))}
            </div>
          )}

          {active === "certificates" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {certificates.map((item, i) => (
                <div
                  key={i}
                  className="opacity-0"
                  style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s forwards` }}
                >
                  <CertCard item={item} onPreview={() => setLightboxItem(item)} />
                </div>
              ))}
            </div>
          )}

          {active === "tech" && (
            <div
              className="opacity-0"
              style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
            >
              <TechGrid />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>

      <CertLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </section>
  );
}