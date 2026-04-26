// =============================================
//  PHOTO//SYS — React App
//  js/app.js  (compiled in-browser by Babel)
//  Data lives in js/data.js
// =============================================

const { useState, useEffect } = React;

function P3Gallery() {
  const [screen,      setScreen]      = useState("menu");
  const [activeMenu,  setActiveMenu]  = useState(0);
  const [mounted,     setMounted]     = useState(false);
  const [category,    setCategory]    = useState("ALL");
  const [activePhoto, setActivePhoto] = useState(null);
  const [gridIn,      setGridIn]      = useState(false);

  // Fade in root + mount menu animations
  useEffect(() => {
    document.getElementById("root").classList.add("ready");
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Trigger stagger animation on gallery enter
  useEffect(() => {
    if (screen === "gallery") {
      setGridIn(false);
      const t = setTimeout(() => setGridIn(true), 100);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleCatChange = (c) => {
    setGridIn(false);
    setCategory(c);
    setTimeout(() => setGridIn(true), 80);
  };

  const filtered = category === "ALL"
    ? PHOTOS
    : PHOTOS.filter(p => p.category === category);

  const navPhoto = (dir) => {
    const idx  = filtered.findIndex(p => p.id === activePhoto?.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    if (next) setActivePhoto(next);
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (screen === "menu") {
        if (e.key === "ArrowUp")   setActiveMenu(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveMenu(i => Math.min(MENU_ITEMS.length - 1, i + 1));
        if (e.key === "Enter")     setScreen(MENU_ITEMS[activeMenu].id);
      }
      if (screen === "lightbox") {
        if (e.key === "Escape")     setScreen("gallery");
        if (e.key === "ArrowLeft")  navPhoto(-1);
        if (e.key === "ArrowRight") navPhoto(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, activeMenu, activePhoto, filtered]);

  const now     = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

  return (
    <div className="p3-root">

      {/* ── Persistent UI Chrome ── */}
      <div className="p3-stripe" />
      <div className="p3-stripe2" />
      <div className="p3-scanlines" />
      <div className="p3-corner-tl" />
      <div className="p3-corner-br" />
      <div className="p3-logo">PHOTO//SYS</div>
      <div className="p3-sys-time">{timeStr}</div>

      {/* ── MENU ── */}
      {screen === "menu" && (
        <div className="p3-menu-screen p3-screen-in">
          <div className="p3-orb" />
          <div className="p3-orb-ring" />
          <div className="p3-bg-text">GALLERY</div>
          <div className="p3-mask" />

          <nav className="p3-menu-nav">
            {MENU_ITEMS.map((item, i) => {
              const isActive = activeMenu === i;
              const op       = isActive ? 1 : Math.max(0.18, 1 - Math.abs(i - activeMenu) * 0.38);
              const estW     = item.label.length * item.fontSize * 0.58 + 80;
              const estH     = item.fontSize * 0.94;
              return (
                <div
                  key={item.id}
                  className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                  style={{
                    marginLeft:      item.offsetX,
                    marginTop:       item.offsetY,
                    transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                  }}
                  onMouseEnter={() => setActiveMenu(i)}
                  onClick={() => setScreen(item.id)}
                >
                  <div className="p3-hi" style={{ width: estW, height: estH, clipPath: CLIP_SHAPES[i]?.(estW, estH) }} />
                  <span className="p3-lbl" style={{ fontSize: item.fontSize, opacity: op }}>
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

      {/* ── GALLERY ── */}
      {screen === "gallery" && (
        <div className="p3-gallery-screen p3-screen-in">
          <div className="p3-bg-text-r">PHOTOS</div>

          <div className="p3-gallery-head">
            <div>
              <div className="p3-gallery-title">
                PHOTO<span className="accent">_</span>GALLERY
              </div>
              <div className="p3-gallery-sub">
                {filtered.length} FILES &nbsp;//&nbsp; CLICK TO EXPAND &nbsp;//&nbsp; FULL RES DOWNLOAD AVAILABLE
              </div>
            </div>
            <button className="p3-back" onClick={() => setScreen("menu")}>← MAIN MENU</button>
          </div>
          <div className="p3-head-rule" />

          <div className="p3-cats">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`p3-cat ${category === c ? "sel" : ""}`}
                onClick={() => handleCatChange(c)}
              >
                {c}<div className="p3-cat-bar" />
              </button>
            ))}
          </div>

          <div className="p3-grid">
            {filtered.map((photo, i) => (
              <div
                key={photo.id}
                className={`p3-card ${gridIn ? "in" : ""}`}
                style={{ transitionDelay: `${Math.min(i, 12) * 45}ms` }}
                onClick={() => { setActivePhoto(photo); setScreen("lightbox"); }}
              >
                <div className="p3-card-overlay" />
                <img className="p3-card-img" src={photo.thumb} alt={photo.title} loading="lazy" />
                <div className="p3-card-corner" />
                <div className="p3-card-num">{String(photo.id).padStart(2, "0")}</div>
                <div className="p3-card-info">
                  <div className="p3-card-title">{photo.title}</div>
                  <div className="p3-card-meta">{photo.category} // {photo.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      {screen === "about" && (
        <div className="p3-about-screen p3-screen-in">
          <button
            className="p3-back"
            style={{ alignSelf: "flex-start", marginBottom: 36 }}
            onClick={() => setScreen("menu")}
          >
            ← MAIN MENU
          </button>
          <div className="p3-about-title">ABOUT<span className="accent">_</span>ME</div>
          <div className="p3-divider" />
          <div className="p3-about-body">
            A collection of moments captured through the lens.<br />
            Each photograph tells a story — light, shadow, and stillness<br />
            frozen in a single frame.<br /><br />
            Browse by category or scroll through everything.<br />
            All images available for full-resolution free download.<br /><br />
            LOCATION :: Bhubaneswar, Odisha<br />
            GEAR &nbsp;&nbsp;&nbsp;&nbsp; :: Redmi Note 12 Pro
          </div>
          <div className="p3-stats">
            <div><div className="p3-stat-n">{PHOTOS.length}</div><div className="p3-stat-l">PHOTOS</div></div>
            <div><div className="p3-stat-n">3</div><div className="p3-stat-l">CATEGORIES</div></div>
            <div><div className="p3-stat-n">∞</div><div className="p3-stat-l">FREE DL</div></div>
          </div>
        </div>
      )}

      {/* DOWNLOAD → bounce to gallery */}
      {screen === "download" && (() => { setScreen("gallery"); return null; })()}

      {/* ── LIGHTBOX ── */}
      {screen === "lightbox" && activePhoto && (
        <div className="p3-lb" onClick={() => setScreen("gallery")}>
          <div className="p3-lb-wrap" onClick={e => e.stopPropagation()}>
            <div className="p3-lb-bar" />
            <button className="p3-lb-arrow prev" onClick={() => navPhoto(-1)}>◀</button>
            <button className="p3-lb-arrow next" onClick={() => navPhoto(1)}>▶</button>
            <img className="p3-lb-img" src={activePhoto.thumb} alt={activePhoto.title} />
            <div className="p3-lb-foot">
              <div>
                <div className="p3-lb-title">{activePhoto.title}</div>
                <div className="p3-lb-meta">
                  {activePhoto.category} // {activePhoto.date} // FULL_RES_JPEG
                </div>
              </div>
              <div className="p3-lb-actions">
                <a className="p3-lb-dl" href={activePhoto.download} target="_blank" rel="noreferrer">
                  ↓ DOWNLOAD RAW
                </a>
                <button className="p3-lb-close" onClick={() => setScreen("gallery")}>✕ CLOSE</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<P3Gallery />);
