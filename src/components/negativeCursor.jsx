import React, { useEffect, useRef } from 'react';

const lerp = (a, b, n) => a + (b - a) * n;

const NegativeCursor = () => {
  const cursorRef = useRef(null);
  const state = useRef({
    isHovering: false,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    cursorState: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 10,
    },
    target: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 10,
    },
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (cursor) {
      cursor.style.display = isMobile ? "none" : "none";
    }

    const handleMouseMove = (e) => {
      const s = state.current;
      
      if (cursor && cursor.style.display === "none" && !isMobile) {
        cursor.style.display = "block";
        s.target.x = e.clientX;
        s.target.y = e.clientY;
        s.cursorState.x = e.clientX;
        s.cursorState.y = e.clientY;
      }

      if (isMobile) return;

      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
      if (!s.isHovering) {
        s.target.x = s.mouse.x;
        s.target.y = s.mouse.y;
        s.target.size = 10;
      } else {
        s.target.x = s.mouse.x;
        s.target.y = s.mouse.y;
      }
    };

    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }

    window.addEventListener('mousemove', handleMouseMove);

    const handleMobileHide = () => {
      if (isMobile && cursor) {
        cursor.style.display = "none";
      }
    };

    if (isMobile) {
      document.addEventListener("touchstart", handleMobileHide);
      document.addEventListener("click", handleMobileHide);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (isMobile) {
        document.removeEventListener("touchstart", handleMobileHide);
        document.removeEventListener("click", handleMobileHide);
      }
    };
  }, []);

  useEffect(() => {
    const handleEnter = (e) => {
      const s = state.current;
      s.isHovering = true;
      s.target.size = 50;
      if (cursorRef.current) {
        cursorRef.current.classList.add('negative');
      }
    };

    const handleLeave = () => {
      const s = state.current;
      s.isHovering = false;
      s.target.size = 10;
      if (cursorRef.current) {
        cursorRef.current.classList.remove('negative');
      }
    };

    const hoverables = document.querySelectorAll(".target-btn, button, a, .pc-card, .pc-contact-btn, .select , input, textarea");
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    let running = true;
    
    function animateCursor() {
      if (!running) return;
      const s = state.current;
      const speed = 0.5;
      s.cursorState.x = lerp(s.cursorState.x, s.target.x, speed);
      s.cursorState.y = lerp(s.cursorState.y, s.target.y, speed);
      s.cursorState.size = lerp(s.cursorState.size, s.target.size, speed);

      let offsetX = 0, offsetY = 0;
      if (s.isHovering) {
        const maxOffset = 5;
        const relX = s.mouse.x - s.cursorState.x;
        const relY = s.mouse.y - s.cursorState.y;
        offsetX = Math.max(-maxOffset, Math.min(relX * 0.1, maxOffset));
        offsetY = Math.max(-maxOffset, Math.min(relY * 0.1, maxOffset));
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) translate(${s.cursorState.x + offsetX}px, ${s.cursorState.y + offsetY}px)`;
        cursorRef.current.style.width = `${s.cursorState.size}px`;
        cursorRef.current.style.height = `${s.cursorState.size}px`;
      }

      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    return () => { running = false; };
  }, []);

  return (
    <>
      <style global>{`
        * { cursor: none !important; }
        .negative-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffffff; /* Warna putih untuk efek negatif yang lebih baik */
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.25s cubic-bezier(.22,1,.36,1), height 0.25s cubic-bezier(.22,1,.36,1);
        }
        .negative-cursor.negative {
          background: #ffffff; /* Tetap putih untuk konsistensi efek negatif */
        }
      `}</style>
      <div ref={cursorRef} className="negative-cursor" />
    </>
  );
};

export default NegativeCursor;
