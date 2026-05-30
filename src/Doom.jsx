import { useEffect, useRef, useState } from "react";

export default function DoomWindow() {
  const containerRef = useRef(null);
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) || window.innerWidth < 768;
  const dosboxRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [debug, setDebug] = useState("Initialisation...");

  useEffect(() => {
    let isMounted = true;

    const initDoom = () => {
      try {
        if (!window.Dosbox) {
          console.error("ERREUR: window.Dosbox not found");
          throw new Error("Dosbox class not found");
        }

        if (!containerRef.current) {
          throw new Error("containerRef.current is null");
        }

        containerRef.current.id = "DOOM";
        containerRef.current.className = "dosbox-default";

        const dosbox_DOOM = new window.Dosbox({
          id: "DOOM",
          onload: function (dosbox) {
            if (isMounted) {
              setDebug("Chargement...");
            }

            dosbox_DOOM.run(
              "/DOOM-dos.zip",
              "./DOOM/DOOM.EXE"
            );
          },
          onrun: function (dosbox, app) {
            if (isMounted) {
              setStatus("running");
              setDebug("DOOM is running!");
            }
          },
        });

        dosboxRef.current = dosbox_DOOM;

        setTimeout(() => {
          if (isMounted) {
            const startBtn = containerRef.current?.querySelector(".dosbox-start");
            if (startBtn) {
              startBtn.click();
            }
          }
        }, 500);

      } catch (err) {
        console.error("ERREUR:", err.message);
        if (isMounted) {
          setDebug(`Error: ${err.message}`);
          setStatus("error");
        }
      }
    };

    const timer = setTimeout(() => {
      if (isMounted) {
        initDoom();
      }
    }, 200);

    // Fermeture du jeu
    return () => {
      isMounted = false;
      clearTimeout(timer);

      try {
        const mod = dosboxRef.current?.module;
        if (mod) {
          if (typeof mod.pauseMainLoop === "function") mod.pauseMainLoop();
          if (typeof mod.exit === "function") mod.exit(0);
        }
      } catch (_) {}

      try {
        const mod = dosboxRef.current?.module;
        if (mod && typeof mod.ccall === "function") {
          try { mod.ccall("SDL_PauseAudio", null, ["number"], [1]); } catch (_) {}
        }
      } catch (_) {}

      try {
        if (containerRef.current) {
          const mediaElements = containerRef.current.querySelectorAll(
              "audio, video, canvas"
          );
          mediaElements.forEach((el) => {
            try {
              if (el.tagName === "CANVAS") {
                const ctx2d = el.getContext?.("2d");
                if (ctx2d) ctx2d.clearRect(0, 0, el.width, el.height);
              }
            } catch (_) {}
          });
          containerRef.current.innerHTML = "";
        }
      } catch (_) {}

      try {
        ["Module", "SDL"].forEach((key) => {
          const obj = window[key];
          if (obj?.audioContext) {
            try { obj.audioContext.close(); } catch (_) {}
          }
        });
      } catch (_) {}

      dosboxRef.current = null;
    };

  }, []);

  const handleFullscreen = () => {
    if (dosboxRef.current?.requestFullScreen) {
      dosboxRef.current.requestFullScreen();
    }
  };

  const handleRetry = () => {
    setStatus("loading");
    setDebug("Rechargement... (stp fonctionne)");
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    dosboxRef.current = null;
  };

  if (isMobile) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "#100c0c",
        fontFamily: "'JetBrains Mono'",
        textAlign: "center",
        padding: "32px"
      }}>
        <div style={{ fontSize: "48px" }}>🖥️</div>
        <div style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#e05c5c",
          fontFamily: "'Quantico'",
          letterSpacing: "0.05em"
        }}>
          DOOM
        </div>
        <div style={{
          fontSize: "13px",
          color: "#bb8888",
          lineHeight: "1.6",
          maxWidth: "260px"
        }}>
          DOOM n'est pas disponible sur mobile.<br />
          Version complète disponible sur PC.
        </div>
        <div style={{
          marginTop: "8px",
          fontSize: "11px",
          color: "#7a5555",
          fontFamily: "'JetBrains Mono'"
        }}>
          — PC ONLY —
        </div>
      </div>
    );
  }

  return (
    <div
      className="doom-wrap"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Canvas area */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          backgroundColor: "#000",
          position: "relative",
          minHeight: 0
        }}
      />

      {/* Controls bar - single line */}
      <div style={{
        backgroundColor: "#1a1212",
        borderTop: "1px solid rgba(210,90,90,0.15)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        fontFamily: "'JetBrains Mono'",
        fontSize: "11px",
        color: "#bb8888",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#e05c5c", fontWeight: "550" }}>↑ ↓ ← →</span>
          <span style={{ color: "#7a5555" }}>Mouvement</span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#c45fa0", fontWeight: "550" }}>S</span>
          <span style={{ color: "#7a5555" }}>Tirer</span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#c45fa0", fontWeight: "550" }}>W</span>
          <span style={{ color: "#7a5555" }}>Interagir</span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#c45fa0", fontWeight: "550" }}>Enter</span>
          <span style={{ color: "#7a5555" }}>Sélectionner</span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#f0a04a", fontWeight: "550" }}>1,2,3...</span>
          <span style={{ color: "#7a5555" }}>Armes</span>
        </div>
      </div>

      {/* Loading overlay */}
      {status === "loading" && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgb(0, 0, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          color: "#f0a04a",
          fontFamily: "'JetBrains Mono'",
          zIndex: 10,
          pointerEvents: "none"
        }}>
          <div style={{ fontSize: "48px", animation: "pulse 1s infinite" }}>💽</div>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>DOOM (1993)</div>
          <div style={{ fontSize: "12px" }}>{debug}</div>
        </div>
      )}

      {/* Error overlay */}
      {status === "error" && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          color: "#e05c5c",
          fontFamily: "'JetBrains Mono'",
          zIndex: 10
        }}>
          <div style={{ fontSize: "48px" }}>⚠️</div>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>ERROR</div>
          <div style={{ fontSize: "12px" }}>{debug}</div>
          <button
            className="btn-primary"
            onClick={handleRetry}
            style={{ marginTop: "16px" }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Fullscreen button */}
      {status === "running" && (
        <button
          onClick={handleFullscreen}
          title="Fullscreen"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            padding: 0,
            background: "rgba(224, 92, 92, 0.25)",
            color: "#fff",
            border: "1px solid rgba(224, 92, 92, 0.25)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            transition: "all 0.2s",
            backdropFilter: "blur(4px)"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(224, 92, 92, 0.75)";
            e.target.style.boxShadow = "0 0 12px rgba(224, 92, 92, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(224, 92, 92, 0.25)";
            e.target.style.boxShadow = "none";
          }}
        >
          ⛶
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}