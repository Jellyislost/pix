import { useState, useEffect } from "react";

const MENU_ITEMS = [
  { id: "gallery", label: "GALLERY", fontSize: 130, offsetX: 0, offsetY: 0 },
  { id: "about",   label: "ABOUT",   fontSize: 108, offsetX: 38, offsetY: -8 },
  { id: "contact", label: "DOWNLOAD", fontSize: 88, offsetX: 14, offsetY: -6 },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px ${h*0.06}px, ${w - h*0.55}px 0px, ${w}px ${h*0.42}px, ${w - h*0.18}px ${h}px, 0px ${h*0.94}px)`,
  (w, h) => `polygon(${h*0.12}px 0px, ${w - h*0.3}px ${h*0.04}px, ${w}px ${h*0.5}px, ${w - h*0.08}px ${h}px, 0px ${h*0.88}px)`,
  (w, h) => `polygon(0px ${h*0.1}px, ${w - h*0.4}px 0px, ${w}px ${h*0.45}px, ${w - h*0.25}px ${h}px, ${h*0.05}px ${h*0.9}px)`,
];

const CATEGORIES = ["ALL", "NATURE", "URBAN", "PORTRAIT", "ABSTRACT"];

const PHOTOS = [
  { id:1,  src:"https://picsum.photos/seed/p3g1/900/675",  thumb:"https://picsum.photos/seed/p3g1/450/338",  category:"NATURE",   title:"FRAME_001", date:"2024.03.12" },
  { id:2,  src:"https://picsum.photos/seed/p3g2/900/675",  thumb:"https://picsum.photos/seed/p3g2/450/338",  category:"URBAN",    title:"FRAME_002", date:"2024.03.18" },
  { id:3,  src:"https://picsum.photos/seed/p3g3/900/675",  thumb:"https://picsum.photos/seed/p3g3/450/338",  category:"PORTRAIT", title:"FRAME_003", date:"2024.04.02" },
  { id:4,  src:"https://picsum.photos/seed/p3g4/900/675",  thumb:"https://picsum.photos/seed/p3g4/450/338",  category:"ABSTRACT", title:"FRAME_004", date:"2024.04.09" },
  { id:5,  src:"https://picsum.photos/seed/p3g5/900/675",  thumb:"https://picsum.photos/seed/p3g5/450/338",  category:"NATURE",   title:"FRAME_005", date:"2024.05.03" },
  { id:6,  src:"https://picsum.photos/seed/p3g6/900/675",  thumb:"https://picsum.photos/seed/p3g6/450/338",  category:"URBAN",    title:"FRAME_006", date:"2024.05.14" },
  { id:7,  src:"https://picsum.photos/seed/p3g7/900/675",  thumb:"https://picsum.photos/seed/p3g7/450/338",  category:"PORTRAIT", title:"FRAME_007", date:"2024.06.01" },
  { id:8,  src:"https://picsum.photos/seed/p3g8/900/675",  thumb:"https://picsum.photos/seed/p3g8/450/338",  category:"ABSTRACT", title:"FRAME_008", date:"2024.06.20" },
  { id:9,  src:"https://picsum.photos/seed/p3g9/900/675",  thumb:"https://picsum.photos/seed/p3g9/450/338",  category:"NATURE",   title:"FRAME_009", date:"2024.07.07" },
  { id:10, src:"https://picsum.photos/seed/p3g10/900/675", thumb:"https://picsum.photos/seed/p3g10/450/338", category:"URBAN",    title:"FRAME_010", date:"2024.07.22" },
  { id:11, src:"https://picsum.photos/seed/p3g11/900/675", thumb:"https://picsum.photos/seed/p3g11/450/338", category:"PORTRAIT", title:"FRAME_011", date:"2024.08.05" },
  { id:12, src:"https://picsum.photos/seed/p3g12/900/675", thumb:"https://picsum.photos/seed/p3g12/450/338", category:"ABSTRACT", title:"FRAME_012", date:"2024.08.19" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .p3-root {
    position: relative; width: 100%; min-height: 100svh;
    background: #04060f; overflow-x: hidden;
    font-family: 'Bebas Neue', sans-serif;
    color: #fff;
  }

  /* ── PERSISTENT CHROME ── */
  .p3-stripe  { position:fixed; right:0;  top:0; bottom:0; width:5px; background:#c4001a; z-index:200; pointer-events:none; }
  .p3-stripe2 { position:fixed; right:9px;top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:200; pointer-events:none; }
  .p3-scanlines {
    position:fixed; inset:0;
    background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px);
    z-index:199; pointer-events:none;
  }
  .p3-corner-tl { position:fixed; top:14px; left:14px; width:22px; height:22px; border-top:2px solid rgba(196,0,26,0.6); border-left:2px solid rgba(196,0,26,0.6); z-index:201; pointer-events:none; }
  .p3-corner-br { position:fixed; bottom:14px; right:20px; width:22px; height:22px; border-bottom:2px solid rgba(196,0,26,0.6); border-right:2px solid rgba(196,0,26,0.6); z-index:201; pointer-events:none; }
  .p3-logo {
    position:fixed; top:12px; left:44px; z-index:201;
    font-size:11px; letter-spacing:6px; color:rgba(196,0,26,0.65);
    pointer-events:none; user-select:none;
  }
  .p3-sys-time {
    position:fixed; top:12px; right:24px; z-index:201;
    font-family:'Share Tech Mono',monospace; font-size:10px;
    color:rgba(255,255,255,0.18); letter-spacing:2px;
    pointer-events:none;
  }

  /* ── MENU SCREEN ── */
  .p3-menu-screen {
    position:relative; width:100%; min-height:100svh;
    display:flex; align-items:center;
  }
  .p3-orb {
    position:absolute; right:-15vw; top:50%; transform:translateY(-50%);
    width:65vw; height:65vw; max-width:700px; max-height:700px;
    border-radius:50%;
    background:radial-gradient(circle, #0d2560 0%, #060d2a 60%, transparent 100%);
    z-index:1; pointer-events:none;
  }
  .p3-orb-ring {
    position:absolute; right:-15vw; top:50%; transform:translateY(-50%);
    width:65vw; height:65vw; max-width:700px; max-height:700px;
    border-radius:50%; border:1px solid rgba(42,92,168,0.12);
    z-index:2; pointer-events:none;
  }
  .p3-bg-text {
    position:absolute; bottom:-2vw; left:-1vw;
    font-size:clamp(120px,20vw,280px);
    color:rgba(255,255,255,0.022); letter-spacing:-8px;
    pointer-events:none; z-index:2; white-space:nowrap; user-select:none;
  }
  .p3-mask {
    position:absolute; inset:0;
    background:linear-gradient(to right, rgba(4,6,15,0.88) 0%, rgba(4,6,15,0.45) 55%, transparent 100%);
    z-index:3; pointer-events:none;
  }
  .p3-menu-nav {
    position:relative; z-index:20;
    padding:48px 0 48px 48px;
    display:flex; flex-direction:column;
  }
  .p3-row {
    position:relative; cursor:pointer;
    display:flex; align-items:center; line-height:1;
    text-decoration:none;
    opacity:0; transform:translateX(-36px);
    transition:opacity .38s ease, transform .38s cubic-bezier(.22,1,.36,1);
  }
  .p3-row.mounted { opacity:1; transform:translateX(0); }
  .p3-hi {
    position:absolute; left:-48px; top:50%;
    transform:translateY(-50%) scaleX(0);
    transform-origin:left center;
    background:#f38493; z-index:-1;
    transition:transform .22s cubic-bezier(.22,1,.36,1);
    pointer-events:none;
  }
  .p3-row.active .p3-hi { transform:translateY(-50%) scaleX(1); }
  .p3-lbl {
    font-family:'Bebas Neue',sans-serif;
    color:#2a5ca8; letter-spacing:2px; line-height:.85;
    position:relative; z-index:1;
    transition:color .12s ease, opacity .12s ease;
  }
  .p3-row.active .p3-lbl { color:#fff; }
  .p3-row:hover:not(.active) .p3-lbl { color:#4a82c8; }

  .p3-menu-deco {
    position:absolute; left:48px; bottom:48px; z-index:20;
    opacity:0; transition:opacity .5s ease 1s;
  }
  .p3-menu-deco.mounted { opacity:1; }
  .p3-deco-line { width:40px; height:2px; background:rgba(196,0,26,0.5); margin-bottom:6px; }
  .p3-deco-text { font-family:'Share Tech Mono',monospace; font-size:9px; letter-spacing:3px; color:rgba(255,255,255,0.2); }

  .p3-hint {
    position:fixed; bottom:22px; right:22px; z-index:202;
    display:flex; flex-direction:column; align-items:flex-end; gap:5px;
    opacity:0; transition:opacity .5s ease .9s;
  }
  .p3-hint.mounted { opacity:1; }
  .p3-hint-row { display:flex; align-items:center; gap:8px; font-size:12px; letter-spacing:2px; color:rgba(255,255,255,0.25); }
  .p3-hint-key { border:1px solid rgba(255,255,255,0.18); border-radius:3px; padding:1px 6px; font-size:10px; }

  /* ── GALLERY SCREEN ── */
  .p3-gallery-screen {
    position:relative; width:100%; min-height:100svh;
    padding:72px 44px 60px 44px;
  }
  .p3-gallery-screen .p3-bg-text { bottom:-4vw; right:0; left:auto; font-size:clamp(80px,14vw,180px); opacity:0.018; }
  
  .p3-gallery-head {
    display:flex; align-items:flex-end; justify-content:space-between;
    margin-bottom:6px;
  }
  .p3-gallery-title { font-size:clamp(52px,8vw,76px); letter-spacing:4px; line-height:.9; }
  .p3-gallery-title .accent { color:#c4001a; }
  .p3-gallery-sub {
    font-family:'Share Tech Mono',monospace; font-size:10px;
    color:rgba(196,0,26,0.55); letter-spacing:2px; margin-top:8px; margin-bottom:20px;
  }
  .p3-head-rule { width:100%; height:1px; background:linear-gradient(to right,rgba(42,92,168,.35),transparent); margin-bottom:20px; }
  
  .p3-back {
    font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:3px;
    color:rgba(255,255,255,.38); background:none;
    border:1px solid rgba(255,255,255,.14); padding:5px 14px; cursor:pointer;
    clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
    transition:color .15s,border-color .15s;
  }
  .p3-back:hover { color:#fff; border-color:rgba(196,0,26,.6); }

  .p3-cats { display:flex; gap:2px; margin-bottom:28px; flex-wrap:wrap; }
  .p3-cat {
    font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:3px;
    color:rgba(255,255,255,.32); background:none; border:none; cursor:pointer;
    padding:6px 16px; position:relative;
    clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
    transition:color .15s;
  }
  .p3-cat::before {
    content:''; position:absolute; inset:0;
    background:rgba(42,92,168,0);
    clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
    transition:background .15s;
  }
  .p3-cat:hover { color:rgba(255,255,255,.65); }
  .p3-cat:hover::before { background:rgba(42,92,168,.18); }
  .p3-cat.sel { color:#fff; }
  .p3-cat.sel::before { background:rgba(42,92,168,.38); }
  .p3-cat-bar {
    position:absolute; bottom:0; left:6px; right:6px;
    height:2px; background:#c4001a;
    transform:scaleX(0); transform-origin:left;
    transition:transform .2s ease;
  }
  .p3-cat.sel .p3-cat-bar { transform:scaleX(1); }

  .p3-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
    gap:14px;
  }
  .p3-card {
    position:relative; cursor:pointer; overflow:hidden;
    opacity:0; transform:translateY(18px);
    transition:opacity .4s ease, transform .4s cubic-bezier(.22,1,.36,1);
    clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
    background:#070c1c;
  }
  .p3-card.in { opacity:1; transform:translateY(0); }
  .p3-card::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(to bottom,transparent 45%,rgba(4,6,15,.96) 100%);
    z-index:2; pointer-events:none;
  }
  .p3-card::after {
    content:''; position:absolute; inset:0;
    border:1px solid rgba(42,92,168,.22);
    clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
    z-index:3; pointer-events:none;
    transition:border-color .2s;
  }
  .p3-card:hover::after { border-color:rgba(196,0,26,.55); }
  .p3-card-img {
    width:100%; aspect-ratio:4/3; object-fit:cover; display:block;
    transition:transform .45s ease;
  }
  .p3-card:hover .p3-card-img { transform:scale(1.05); }
  .p3-card-num {
    position:absolute; top:9px; right:12px; z-index:4;
    font-size:10px; letter-spacing:2px; color:rgba(255,255,255,.18);
  }
  .p3-card-info { position:absolute; bottom:0; left:0; right:0; padding:10px 12px; z-index:4; }
  .p3-card-title { font-size:17px; letter-spacing:3px; color:#fff; line-height:1; }
  .p3-card-meta { font-family:'Share Tech Mono',monospace; font-size:9px; color:rgba(196,0,26,.75); letter-spacing:1px; margin-top:4px; }
  /* red corner accent top-right */
  .p3-card-corner {
    position:absolute; top:0; right:0; z-index:4;
    width:14px; height:14px;
    background:#c4001a;
    clip-path:polygon(100% 0,0 0,100% 100%);
    pointer-events:none;
  }
  /* hover overlay tint */
  .p3-card-overlay {
    position:absolute; inset:0; z-index:1;
    background:rgba(42,92,168,0);
    transition:background .25s;
    pointer-events:none;
  }
  .p3-card:hover .p3-card-overlay { background:rgba(42,92,168,.06); }

  /* ── LIGHTBOX ── */
  .p3-lb {
    position:fixed; inset:0; z-index:500;
    background:rgba(4,6,15,.97);
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    animation:lbIn .25s ease;
  }
  @keyframes lbIn { from{opacity:0} to{opacity:1} }
  .p3-lb-wrap { position:relative; max-width:860px; width:100%; }
  .p3-lb-bar { position:absolute; left:-14px; top:0; bottom:0; width:4px; background:linear-gradient(to bottom,#c4001a,transparent); }
  .p3-lb-img {
    width:100%; max-height:68vh; object-fit:contain; display:block;
    clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px));
    border:1px solid rgba(42,92,168,.38);
  }
  .p3-lb-foot { display:flex; align-items:center; justify-content:space-between; margin-top:14px; }
  .p3-lb-title { font-size:28px; letter-spacing:4px; }
  .p3-lb-meta { font-family:'Share Tech Mono',monospace; font-size:10px; color:#c4001a; letter-spacing:1px; margin-top:3px; }
  .p3-lb-actions { display:flex; gap:10px; }
  .p3-lb-dl {
    font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:3px;
    color:#fff; background:rgba(196,0,26,.85); border:none;
    padding:7px 18px; cursor:pointer; text-decoration:none; display:inline-block;
    clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
    transition:background .15s;
  }
  .p3-lb-dl:hover { background:#c4001a; }
  .p3-lb-close {
    font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:3px;
    color:rgba(255,255,255,.38); background:none;
    border:1px solid rgba(255,255,255,.15); padding:7px 14px; cursor:pointer;
    clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
    transition:color .15s,border-color .15s;
  }
  .p3-lb-close:hover { color:#fff; border-color:rgba(196,0,26,.6); }
  /* nav arrows */
  .p3-lb-arrow {
    position:absolute; top:50%; transform:translateY(-50%);
    font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px;
    color:rgba(255,255,255,.22); background:none; border:none; cursor:pointer;
    padding:12px 8px; transition:color .15s;
    user-select:none;
  }
  .p3-lb-arrow:hover { color:rgba(255,255,255,.75); }
  .p3-lb-arrow.prev { left:-44px; }
  .p3-lb-arrow.next { right:-44px; }

  /* ── ABOUT SCREEN ── */
  .p3-about-screen {
    position:relative; width:100%; min-height:100svh;
    padding:80px 48px 60px;
    display:flex; flex-direction:column; justify-content:center;
  }
  .p3-about-screen .p3-bg-text { bottom:-4vw; right:-2vw; left:auto; font-size:clamp(80px,14vw,180px); opacity:0.02; }
  .p3-about-title { font-size:clamp(52px,9vw,80px); letter-spacing:4px; line-height:.9; }
  .p3-about-title .accent { color:#c4001a; }
  .p3-divider { width:56px; height:2px; background:linear-gradient(to right,#c4001a,transparent); margin:28px 0; }
  .p3-about-body { font-family:'Share Tech Mono',monospace; font-size:12px; color:rgba(255,255,255,.45); max-width:460px; line-height:2; letter-spacing:.5px; }
  .p3-stats { display:flex; gap:44px; margin-top:36px; flex-wrap:wrap; }
  .p3-stat-n { font-size:60px; color:#2a5ca8; line-height:1; }
  .p3-stat-l { font-family:'Share Tech Mono',monospace; font-size:9px; color:rgba(255,255,255,.28); letter-spacing:2px; margin-top:4px; }

  /* ── TRANSITIONS ── */
  .p3-screen-in { animation:screenIn .38s cubic-bezier(.22,1,.36,1); }
  @keyframes screenIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
`;

export default function P3Gallery() {
  const [screen, setScreen]       = useState("menu");    // menu | gallery | about | lightbox
  const [activeMenu, setActiveMenu] = useState(0);
  const [mounted, setMounted]     = useState(false);
  const [category, setCategory]   = useState("ALL");
  const [activePhoto, setActivePhoto] = useState(null);
  const [gridIn, setGridIn]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (screen === "gallery") {
      setGridIn(false);
      const t = setTimeout(() => setGridIn(true), 100);
      return () => clearTimeout(t);
    }
  }, [screen, category]);

  // Reset grid animation on category change
  const handleCatChange = (c) => {
    setGridIn(false);
    setCategory(c);
    setTimeout(() => setGridIn(true), 80);
  };

  useEffect(() => {
    const handler = (e) => {
      if (screen === "menu") {
        if (e.key === "ArrowUp")   setActiveMenu(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveMenu(i => Math.min(MENU_ITEMS.length - 1, i + 1));
        if (e.key === "Enter")     goTo(MENU_ITEMS[activeMenu].id);
      }
      if (screen === "lightbox") {
        if (e.key === "Escape") setScreen("gallery");
        if (e.key === "ArrowLeft")  navPhoto(-1);
        if (e.key === "ArrowRight") navPhoto(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, activeMenu, activePhoto, category]);

  const filtered = category === "ALL" ? PHOTOS : PHOTOS.filter(p => p.category === category);

  const goTo = (id) => setScreen(id);

  const openPhoto = (photo) => {
    setActivePhoto(photo);
    setScreen("lightbox");
  };

  const navPhoto = (dir) => {
    const idx = filtered.findIndex(p => p.id === activePhoto?.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    if (next) setActivePhoto(next);
  };

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

  return (
    <>
      <style>{CSS}</style>
      <div className="p3-root">
        {/* Persistent chrome */}
        <div className="p3-stripe" />
        <div className="p3-stripe2" />
        <div className="p3-scanlines" />
        <div className="p3-corner-tl" />
        <div className="p3-corner-br" />
        <div className="p3-logo">PHOTO//SYS</div>
        <div className="p3-sys-time">{timeStr}</div>

        {/* ── MENU SCREEN ── */}
        {screen === "menu" && (
          <div className="p3-menu-screen p3-screen-in">
            <div className="p3-orb" />
            <div className="p3-orb-ring" />
            <div className="p3-bg-text">GALLERY</div>
            <div className="p3-mask" />

            <nav className="p3-menu-nav">
              {MENU_ITEMS.map((item, i) => {
                const isActive = activeMenu === i;
                const dist = Math.abs(i - activeMenu);
                const opacity = isActive ? 1 : Math.max(0.18, 1 - dist * 0.38);
                const estW = item.label.length * item.fontSize * 0.58 + 80;
                const estH = item.fontSize * 0.94;
                const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];
                return (
                  <div
                    key={item.id}
                    className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                    style={{
                      marginLeft: item.offsetX,
                      marginTop: item.offsetY,
                      transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                    }}
                    onMouseEnter={() => setActiveMenu(i)}
                    onClick={() => goTo(item.id)}
                  >
                    <div
                      className="p3-hi"
                      style={{ width: estW, height: estH, clipPath: clipFn(estW, estH) }}
                    />
                    <span className="p3-lbl" style={{ fontSize: item.fontSize, opacity }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </nav>

            <div className={`p3-menu-deco ${mounted ? "mounted" : ""}`}>
              <div className="p3-deco-line" />
              <div className="p3-deco-text">SELECT WITH MOUSE OR ↑↓ + ENTER</div>
            </div>

            <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
              <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
              <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
            </div>
          </div>
        )}

        {/* ── GALLERY SCREEN ── */}
        {screen === "gallery" && (
          <div className="p3-gallery-screen p3-screen-in">
            <div className="p3-bg-text">PHOTOS</div>

            <div className="p3-gallery-head">
              <div>
                <div className="p3-gallery-title">
                  PHOTO<span className="accent">_</span>GALLERY
                </div>
                <div className="p3-gallery-sub">
                  {filtered.length} FILES FOUND &nbsp;//&nbsp; SELECT TO EXPAND &nbsp;//&nbsp; CLICK TO DOWNLOAD
                </div>
              </div>
              <button className="p3-back" onClick={() => goTo("menu")}>← MAIN MENU</button>
            </div>
            <div className="p3-head-rule" />

            <div className="p3-cats">
              {CATEGORIES.map(c => (
                <button key={c} className={`p3-cat ${category === c ? "sel" : ""}`} onClick={() => handleCatChange(c)}>
                  {c}<div className="p3-cat-bar" />
                </button>
              ))}
            </div>

            <div className="p3-grid">
              {filtered.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`p3-card ${gridIn ? "in" : ""}`}
                  style={{ transitionDelay: `${i * 45}ms` }}
                  onClick={() => openPhoto(photo)}
                >
                  <div className="p3-card-overlay" />
                  <img className="p3-card-img" src={photo.thumb} alt={photo.title} loading="lazy" />
                  <div className="p3-card-corner" />
                  <div className="p3-card-num">{String(photo.id).padStart(2,"0")}</div>
                  <div className="p3-card-info">
                    <div className="p3-card-title">{photo.title}</div>
                    <div className="p3-card-meta">{photo.category} // {photo.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABOUT SCREEN ── */}
        {screen === "about" && (
          <div className="p3-about-screen p3-screen-in">
            <div className="p3-bg-text">ABOUT</div>
            <button className="p3-back" style={{ alignSelf:"flex-start", marginBottom:36 }} onClick={() => goTo("menu")}>← MAIN MENU</button>
            <div className="p3-about-title">ABOUT<span className="accent">_</span>ME</div>
            <div className="p3-divider" />
            <div className="p3-about-body">
              A collection of moments captured through the lens.<br/>
              Each photograph tells a story — light, shadow, and stillness<br/>
              frozen in a single frame.<br/>
              <br/>
              Browse by category or scroll through everything.<br/>
              All images available for full-resolution free download.<br/>
              <br/>
              LOCATION: Bhubaneswar, Odisha
            </div>
            <div className="p3-stats">
              <div><div className="p3-stat-n">{PHOTOS.length}</div><div className="p3-stat-l">PHOTOS</div></div>
              <div><div className="p3-stat-n">04</div><div className="p3-stat-l">CATEGORIES</div></div>
              <div><div className="p3-stat-n">∞</div><div className="p3-stat-l">FREE DL</div></div>
            </div>
          </div>
        )}

        {/* ── DOWNLOAD SCREEN (redirect to gallery) ── */}
        {screen === "contact" && (() => { goTo("gallery"); return null; })()}

        {/* ── LIGHTBOX ── */}
        {screen === "lightbox" && activePhoto && (
          <div className="p3-lb" onClick={() => goTo("gallery")}>
            <div className="p3-lb-wrap" onClick={e => e.stopPropagation()}>
              <div className="p3-lb-bar" />
              <button className="p3-lb-arrow prev" onClick={() => navPhoto(-1)}>◀</button>
              <button className="p3-lb-arrow next" onClick={() => navPhoto(1)}>▶</button>
              <img className="p3-lb-img" src={activePhoto.src} alt={activePhoto.title} />
              <div className="p3-lb-foot">
                <div>
                  <div className="p3-lb-title">{activePhoto.title}</div>
                  <div className="p3-lb-meta">{activePhoto.category} // {activePhoto.date} // FULL_RES_AVAILABLE</div>
                </div>
                <div className="p3-lb-actions">
                  <a className="p3-lb-dl" href={activePhoto.src} download={activePhoto.title} target="_blank" rel="noreferrer">↓ DOWNLOAD</a>
                  <button className="p3-lb-close" onClick={() => goTo("gallery")}>✕ CLOSE</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
