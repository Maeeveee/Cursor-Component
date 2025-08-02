import React, { useEffect, useRef } from 'react';

const lerp = (a, b, n) => a + (b - a) * n;

const CrosshairCursor = () => {
  const cursorRef = useRef(null);
  const verticalLineRef = useRef(null);
  const horizontalLineRef = useRef(null);
  const state = useRef({
    isHovering: false,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    cursorState: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 4,
      opacity: 0.8,
    },
    target: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 4,
      opacity: 0.8,
    },
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    const verticalLine = verticalLineRef.current;
    const horizontalLine = horizontalLineRef.current;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (cursor) {
      cursor.style.display = isMobile ? "none" : "none";
    }
    if (verticalLine) {
      verticalLine.style.display = isMobile ? "none" : "none";
    }
    if (horizontalLine) {
      horizontalLine.style.display = isMobile ? "none" : "none";
    }

    const handleMouseMove = (e) => {
      const s = state.current;
      
      if (cursor && cursor.style.display === "none" && !isMobile) {
        cursor.style.display = "block";
        verticalLine.style.display = "block";
        horizontalLine.style.display = "block";
        s.target.x = e.clientX;
        s.target.y = e.clientY;
        s.cursorState.x = e.clientX;
        s.cursorState.y = e.clientY;
      }

      if (isMobile) return;

      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
      s.target.x = s.mouse.x;
      s.target.y = s.mouse.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleMobileHide = () => {
      if (isMobile && cursor) {
        cursor.style.display = "none";
        verticalLine.style.display = "none";
        horizontalLine.style.display = "none";
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
      s.target.size = 6;
      s.target.opacity = 1;
    };

    const handleLeave = () => {
      const s = state.current;
      s.isHovering = false;
      s.target.size = 4;
      s.target.opacity = 0.8;
    };

    const hoverables = document.querySelectorAll(".target-btn, button, a, .pc-card, .pc-contact-btn, .select, input, textarea");
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
      const speed = 0.15;
      
      s.cursorState.x = lerp(s.cursorState.x, s.target.x, speed);
      s.cursorState.y = lerp(s.cursorState.y, s.target.y, speed);
      s.cursorState.size = lerp(s.cursorState.size, s.target.size, speed);
      s.cursorState.opacity = lerp(s.cursorState.opacity, s.target.opacity, speed);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${s.cursorState.x}px`;
        cursorRef.current.style.top = `${s.cursorState.y}px`;
        cursorRef.current.style.width = `${s.cursorState.size}px`;
        cursorRef.current.style.height = `${s.cursorState.size}px`;
        cursorRef.current.style.opacity = s.cursorState.opacity;
      }

      if (verticalLineRef.current) {
        verticalLineRef.current.style.left = `${s.cursorState.x}px`;
        verticalLineRef.current.style.opacity = s.cursorState.opacity * 0.6;
      }

      if (horizontalLineRef.current) {
        horizontalLineRef.current.style.top = `${s.cursorState.y}px`;
        horizontalLineRef.current.style.opacity = s.cursorState.opacity * 0.6;
      }

      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    return () => { 
      running = false;
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        
        .crosshair-cursor {
          position: fixed;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff4757;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease-out;
          box-shadow: 
            0 0 6px rgba(255, 71, 87, 0.6),
            0 0 12px rgba(255, 71, 87, 0.3),
            inset 0 0.5px 1px rgba(255, 255, 255, 0.3);
        }
        
        .crosshair-vertical {
          position: fixed;
          top: 0;
          width: 3px;
          height: 100vh;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 71, 87, 0.4) 15%,
            rgba(255, 71, 87, 0.8) 50%,
            rgba(255, 71, 87, 0.4) 85%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 9998;
          transform: translateX(-50%);
          transition: all 0.1s ease-out;
        }
        
        .crosshair-horizontal {
          position: fixed;
          left: 0;
          width: 100vw;
          height: 3px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 71, 87, 0.4) 15%,
            rgba(255, 71, 87, 0.8) 50%,
            rgba(255, 71, 87, 0.4) 85%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 9998;
          transform: translateY(-50%);
          transition: all 0.1s ease-out;
        }
      `}</style>
      
      <div ref={cursorRef} className="crosshair-cursor" />
      
      <div ref={verticalLineRef} className="crosshair-vertical" />
      
      <div ref={horizontalLineRef} className="crosshair-horizontal" />
    </>
  );
};

export default CrosshairCursor;