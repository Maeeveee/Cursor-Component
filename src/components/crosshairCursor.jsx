import React, { useEffect, useRef } from 'react';

const lerp = (a, b, n) => a + (b - a) * n;

const CrosshairCursor = () => {
  const cursorRef = useRef(null);
  const verticalLineRef = useRef(null);
  const horizontalLineRef = useRef(null);
  const state = useRef({
    isHovering: false,
    isGlitching: false,
    mouse: { x: null, y: null },
    cursorState: {
      x: null,
      y: null,
      size: 4,
      opacity: 0.8,
    },
    target: {
      x: null,
      y: null,
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
      cursor.style.display = "none";
    }
    if (verticalLine) {
      verticalLine.style.display = "none";
    }
    if (horizontalLine) {
      horizontalLine.style.display = "none";
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
      s.isGlitching = true;
      s.target.size = 6;
      s.target.opacity = 1;

      if (verticalLineRef.current) {
        verticalLineRef.current.classList.add('glitch-active');
      }
      if (horizontalLineRef.current) {
        horizontalLineRef.current.classList.add('glitch-active');
      }

      setTimeout(() => {
        s.isGlitching = false;
        if (verticalLineRef.current) {
          verticalLineRef.current.classList.remove('glitch-active');
        }
        if (horizontalLineRef.current) {
          horizontalLineRef.current.classList.remove('glitch-active');
        }
      }, 600);
    };

    const handleLeave = () => {
      const s = state.current;
      s.isHovering = false;
      s.isGlitching = false;
      s.target.size = 4;
      s.target.opacity = 0.8;
      
      if (verticalLineRef.current) {
        verticalLineRef.current.classList.remove('glitch-active');
      }
      if (horizontalLineRef.current) {
        horizontalLineRef.current.classList.remove('glitch-active');
      }
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
      
      if (s.target.x !== null && s.target.y !== null) {
        s.cursorState.x = lerp(s.cursorState.x || s.target.x, s.target.x, speed);
        s.cursorState.y = lerp(s.cursorState.y || s.target.y, s.target.y, speed);
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
          background: #ffffff;
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
            rgba(255, 255, 255, 0.4) 15%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.4) 85%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 9998;
          transform: translateX(-50%);
          transition: all 0.1s ease-out;
        }
        
        .crosshair-vertical.glitch-active {
          animation: glitchVertical 0.6s ease-out;
        }
        
        .crosshair-vertical.glitch-active::before,
        .crosshair-vertical.glitch-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          opacity: 0.8;
        }
        
        .crosshair-vertical.glitch-active::before {
          animation: glitchVerticalClone1 0.6s ease-out;
          z-index: -1;
        }
        
        .crosshair-vertical.glitch-active::after {
          animation: glitchVerticalClone2 0.6s ease-out;
          z-index: -2;
        }
        
        .crosshair-horizontal {
          position: fixed;
          left: 0;
          width: 100vw;
          height: 3px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 15%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.4) 85%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 9998;
          transform: translateY(-50%);
          transition: all 0.1s ease-out;
        }
        
        .crosshair-horizontal.glitch-active {
          animation: glitchHorizontal 0.6s ease-out;
        }
        
        .crosshair-horizontal.glitch-active::before,
        .crosshair-horizontal.glitch-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          opacity: 0.8;
        }
        
        .crosshair-horizontal.glitch-active::before {
          animation: glitchHorizontalClone1 0.6s ease-out;
          z-index: -1;
        }
        
        .crosshair-horizontal.glitch-active::after {
          animation: glitchHorizontalClone2 0.6s ease-out;
          z-index: -2;
        }
        
        @keyframes glitchVertical {
          0% { 
            transform: translateX(-50%);
            opacity: 1;
            filter: blur(0px);
          }
          5% { 
            transform: translateX(-50%) translateX(8px);
            opacity: 0.3;
            filter: blur(2px) saturate(2);
            width: 1px;
          }
          10% { 
            transform: translateX(-50%) translateX(-6px);
            opacity: 0.7;
            filter: blur(1px) hue-rotate(180deg);
            width: 6px;
          }
          15% { 
            transform: translateX(-50%) translateX(12px);
            opacity: 0.2;
            filter: blur(3px) contrast(2);
            width: 2px;
          }
          25% { 
            transform: translateX(-50%) translateX(-8px);
            opacity: 0.8;
            filter: blur(0.5px) hue-rotate(90deg);
            width: 4px;
          }
          35% { 
            transform: translateX(-50%) translateX(5px);
            opacity: 0.4;
            filter: blur(2.5px) brightness(2);
            width: 1px;
          }
          45% { 
            transform: translateX(-50%) translateX(-10px);
            opacity: 0.6;
            filter: blur(1.5px) hue-rotate(270deg);
            width: 7px;
          }
          55% { 
            transform: translateX(-50%) translateX(3px);
            opacity: 0.9;
            filter: blur(0.8px);
            width: 2px;
          }
          65% { 
            transform: translateX(-50%) translateX(-4px);
            opacity: 0.5;
            filter: blur(2px) saturate(0.5);
            width: 5px;
          }
          75% { 
            transform: translateX(-50%) translateX(2px);
            opacity: 0.8;
            filter: blur(1px);
            width: 3px;
          }
          85% { 
            transform: translateX(-50%) translateX(-1px);
            opacity: 0.9;
            filter: blur(0.5px);
            width: 3px;
          }
          95% { 
            transform: translateX(-50%);
            opacity: 1;
            filter: blur(0.2px);
            width: 3px;
          }
          100% { 
            transform: translateX(-50%);
            opacity: 1;
            filter: blur(0px);
            width: 3px;
          }
        }
        
        @keyframes glitchHorizontal {
          0% { 
            transform: translateY(-50%);
            opacity: 1;
            filter: blur(0px);
          }
          5% { 
            transform: translateY(-50%) translateY(8px);
            opacity: 0.3;
            filter: blur(2px) saturate(2);
            height: 1px;
          }
          10% { 
            transform: translateY(-50%) translateY(-6px);
            opacity: 0.7;
            filter: blur(1px) hue-rotate(180deg);
            height: 6px;
          }
          15% { 
            transform: translateY(-50%) translateY(12px);
            opacity: 0.2;
            filter: blur(3px) contrast(2);
            height: 2px;
          }
          25% { 
            transform: translateY(-50%) translateY(-8px);
            opacity: 0.8;
            filter: blur(0.5px) hue-rotate(90deg);
            height: 4px;
          }
          35% { 
            transform: translateY(-50%) translateY(5px);
            opacity: 0.4;
            filter: blur(2.5px) brightness(2);
            height: 1px;
          }
          45% { 
            transform: translateY(-50%) translateY(-10px);
            opacity: 0.6;
            filter: blur(1.5px) hue-rotate(270deg);
            height: 7px;
          }
          55% { 
            transform: translateY(-50%) translateY(3px);
            opacity: 0.9;
            filter: blur(0.8px);
            height: 2px;
          }
          65% { 
            transform: translateY(-50%) translateY(-4px);
            opacity: 0.5;
            filter: blur(2px) saturate(0.5);
            height: 5px;
          }
          75% { 
            transform: translateY(-50%) translateY(2px);
            opacity: 0.8;
            filter: blur(1px);
            height: 3px;
          }
          85% { 
            transform: translateY(-50%) translateY(-1px);
            opacity: 0.9;
            filter: blur(0.5px);
            height: 3px;
          }
          95% { 
            transform: translateY(-50%);
            opacity: 1;
            filter: blur(0.2px);
            height: 3px;
          }
          100% { 
            transform: translateY(-50%);
            opacity: 1;
            filter: blur(0px);
            height: 3px;
          }
        }
        
        @keyframes glitchVerticalClone1 {
          0% { transform: translateX(0px); opacity: 0; }
          10% { transform: translateX(-15px); opacity: 0.7; filter: blur(1px) hue-rotate(120deg); }
          20% { transform: translateX(10px); opacity: 0.4; filter: blur(2px) hue-rotate(240deg); }
          30% { transform: translateX(-8px); opacity: 0.8; filter: blur(0.5px); }
          50% { transform: translateX(5px); opacity: 0.3; filter: blur(3px); }
          70% { transform: translateX(-3px); opacity: 0.6; filter: blur(1px); }
          90% { transform: translateX(1px); opacity: 0.2; filter: blur(0.5px); }
          100% { transform: translateX(0px); opacity: 0; filter: blur(0px); }
        }
        
        @keyframes glitchVerticalClone2 {
          0% { transform: translateX(0px); opacity: 0; }
          15% { transform: translateX(20px); opacity: 0.5; filter: blur(2px) hue-rotate(60deg); }
          25% { transform: translateX(-12px); opacity: 0.7; filter: blur(1.5px) hue-rotate(300deg); }
          40% { transform: translateX(7px); opacity: 0.3; filter: blur(2.5px); }
          60% { transform: translateX(-5px); opacity: 0.8; filter: blur(1px); }
          80% { transform: translateX(2px); opacity: 0.4; filter: blur(0.8px); }
          95% { transform: translateX(-1px); opacity: 0.1; filter: blur(0.3px); }
          100% { transform: translateX(0px); opacity: 0; filter: blur(0px); }
        }
        
        @keyframes glitchHorizontalClone1 {
          0% { transform: translateY(0px); opacity: 0; }
          10% { transform: translateY(-15px); opacity: 0.7; filter: blur(1px) hue-rotate(120deg); }
          20% { transform: translateY(10px); opacity: 0.4; filter: blur(2px) hue-rotate(240deg); }
          30% { transform: translateY(-8px); opacity: 0.8; filter: blur(0.5px); }
          50% { transform: translateY(5px); opacity: 0.3; filter: blur(3px); }
          70% { transform: translateY(-3px); opacity: 0.6; filter: blur(1px); }
          90% { transform: translateY(1px); opacity: 0.2; filter: blur(0.5px); }
          100% { transform: translateY(0px); opacity: 0; filter: blur(0px); }
        }
        
        @keyframes glitchHorizontalClone2 {
          0% { transform: translateY(0px); opacity: 0; }
          15% { transform: translateY(20px); opacity: 0.5; filter: blur(2px) hue-rotate(60deg); }
          25% { transform: translateY(-12px); opacity: 0.7; filter: blur(1.5px) hue-rotate(300deg); }
          40% { transform: translateY(7px); opacity: 0.3; filter: blur(2.5px); }
          60% { transform: translateY(-5px); opacity: 0.8; filter: blur(1px); }
          80% { transform: translateY(2px); opacity: 0.4; filter: blur(0.8px); }
          95% { transform: translateY(-1px); opacity: 0.1; filter: blur(0.3px); }
          100% { transform: translateY(0px); opacity: 0; filter: blur(0px); }
        }
      `}</style>
      
      <div ref={cursorRef} className="crosshair-cursor" />
      
      <div ref={verticalLineRef} className="crosshair-vertical" />
      
      <div ref={horizontalLineRef} className="crosshair-horizontal" />
    </>
  );
};

export default CrosshairCursor;