import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const lerp = (a, b, n) => a + (b - a) * n;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const location = useLocation();
  const activeHoverEl = useRef(null);
  const state = useRef({
    isHovering: false,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    cursorState: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: 15,
      height: 15,
    },
    target: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: 15,
      height: 15,
    },
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (cursor) {
      cursor.style.display = "none";
    }

    let isCursorVisible = false;

    function moveCursor(e) {
      const s = state.current;

      if (!isCursorVisible && cursor) {
        cursor.style.display = "block";
        isCursorVisible = true;
        s.target.x = e.clientX;
        s.target.y = e.clientY;
        s.cursorState.x = e.clientX;
        s.cursorState.y = e.clientY;
      }

      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
      if (!s.isHovering) {
        s.target.x = s.mouse.x;
        s.target.y = s.mouse.y;
      }
    }

    function handleEnter(e) {
      const s = state.current;
      s.isHovering = true;
      s.hoveredElem = e.target;
      const rect = e.target.getBoundingClientRect();
      const margin = 15;

      s.target.x = rect.left + rect.width / 2;
      s.target.y = rect.top + rect.height / 2;
      s.target.width = rect.width + margin;
      s.target.height = rect.height + margin;
      s.targetBorderRadius = window.getComputedStyle(e.target).borderRadius;
    }

    function handleLeave() {
      const s = state.current;
      s.isHovering = false;
      s.hoveredElem = null;
      s.target.width = 15;
      s.target.height = 15;
      s.targetBorderRadius = "50%";
    }

    function animateCursor() {
      const s = state.current;
      const speed = 0.1;
      s.cursorState.x = lerp(s.cursorState.x, s.target.x, speed);
      s.cursorState.y = lerp(s.cursorState.y, s.target.y, speed);
      s.cursorState.width = lerp(s.cursorState.width, s.target.width, speed);
      s.cursorState.height = lerp(s.cursorState.height, s.target.height, speed);

      let offsetX = 0,
        offsetY = 0;
      if (s.isHovering && s.hoveredElem) {
        const rect = s.hoveredElem.getBoundingClientRect();
        const relX = s.mouse.x - (rect.left + rect.width / 2);
        const relY = s.mouse.y - (rect.top + rect.height / 2);
        const maxOffset = 10;
        offsetX = Math.max(-maxOffset, Math.min(relX * 0.25, maxOffset));
        offsetY = Math.max(-maxOffset, Math.min(relY * 0.25, maxOffset));
      }

      if (cursor) {
        cursor.style.left = `${s.cursorState.x + offsetX}px`;
        cursor.style.top = `${s.cursorState.y + offsetY}px`;
        cursor.style.width = `${s.cursorState.width}px`;
        cursor.style.height = `${s.cursorState.height}px`;
        cursor.style.borderRadius = s.isHovering ? s.targetBorderRadius : "50%";

        if (s.isHovering) {
          cursor.style.background = "rgba(255,255,255,0.2)";
          cursor.style.boxShadow = "0 0 12px 2px rgba(255,255,255,0.25), 0 0 0 2px rgba(255,255,255,0.08)";
        } else {
          cursor.style.background = "rgba(255,255,255,0.5)";
          cursor.style.boxShadow = "0 0 20px 4px rgba(255,255,255,0.5), 0 0 0 2px rgba(255,255,255,0.1)";
        }
      }

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.addEventListener("mousemove", moveCursor);

    const hoverables = document.querySelectorAll(
      ".target-btn, button, a, .pc-card, .pc-contact-btn, .select , input, textarea"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    function handleMobileHide() {
      if (isMobile && cursor) {
        cursor.style.display = "none";
      }
    }

    if (isMobile && cursor) {
      cursor.style.display = "none";
    }

    document.addEventListener("touchstart", handleMobileHide);
    document.addEventListener("click", handleMobileHide);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      document.removeEventListener("touchstart", handleMobileHide);
      document.removeEventListener("click", handleMobileHide);
    };
  }, [location]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 15,
        height: 15,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition:
          "width 0.25s cubic-bezier(.4,2,.6,1), height 0.25s cubic-bezier(.4,2,.6,1), border-radius 0.25s cubic-bezier(.4,2,.6,1), background 0.18s, transform 0.25s cubic-bezier(.4,2,.6,1)",
        mixBlendMode: "difference",
        boxShadow: "0 0 12px 2px rgba(255,255,255,0.25), 0 0 0 2px rgba(255,255,255,0.08)",
        pointerEvents: "none",
      }}
    />
  );
}