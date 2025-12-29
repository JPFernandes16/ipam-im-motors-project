(() => {
  const mv = document.getElementById("carViewer");
  const debugPanel = document.getElementById("debugPanel");
  const scaleRange = document.getElementById("scaleRange");
  const scaleValue = document.getElementById("scaleValue");

  if (!mv) return;

  // Pause auto-rotate on interaction (premium feel)
  let resumeTimer;
  const pauseAutoRotate = () => {
    mv.autoRotate = false;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => (mv.autoRotate = true), 2500);
  };

  ["pointerdown", "wheel", "touchstart", "keydown"].forEach((evt) => {
    mv.addEventListener(evt, pauseAutoRotate, { passive: true });
  });

  // Reduced motion
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  if (reduceMotion?.matches) mv.autoRotate = false;

  // Debug slider only when ?debug=1
  const params = new URLSearchParams(window.location.search);
  const debug = params.get("debug") === "1";

  if (debugPanel && scaleRange && scaleValue) {
    debugPanel.hidden = !debug;

    const applyScale = (n) => {
      const v = Number(n);
      mv.setAttribute("scale", `${v} ${v} ${v}`);
      scaleValue.textContent = v.toFixed(1);
    };

    // init from current scale (if present)
    applyScale(scaleRange.value);

    scaleRange.addEventListener("input", (e) => {
      applyScale(e.target.value);
    });
  }
})();
