import React, { useEffect, useRef } from 'react';

const lerp = (a, b, n) => a + (b - a) * n;

const TargetCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const state = useRef({
    cursorRotation: 0,
    isHovering: false,
    hoveredElem: null,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    mouseInElem: { x: 0, y: 0 },
    cursorState: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: 48,
      height: 48
    },
    target: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: 48,
      height: 48
    }
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const s = state.current;

      // Menampilkan cursor dan mengatur posisi awal berdasarkan mouse
      if (cursorRef.current && cursorRef.current.style.display === "none") {
        cursorRef.current.style.display = "block";
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
        s.target.width = 48;
        s.target.height = 48;
        if (cursorRef.current) cursorRef.current.classList.remove('expand');
      } else if (s.hoveredElem) {
        const rect = s.hoveredElem.getBoundingClientRect();
        const dotRadius = dotRef.current?.offsetWidth / 2 || 5;
        s.mouseInElem.x = e.clientX - rect.left;
        s.mouseInElem.y = e.clientY - rect.top;
        s.mouseInElem.x = Math.max(dotRadius, Math.min(s.mouseInElem.x, rect.width - dotRadius));
        s.mouseInElem.y = Math.max(dotRadius, Math.min(s.mouseInElem.y, rect.height - dotRadius));
      }
    };

    // Menyembunyikan cursor secara default
    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEnter = (e) => {
      const s = state.current;
      s.isHovering = true;
      s.hoveredElem = e.currentTarget;
      const rect = s.hoveredElem.getBoundingClientRect();
      s.target.x = rect.left + rect.width / 2 + window.scrollX;
      s.target.y = rect.top + rect.height / 2 + window.scrollY;
      const padding = 12;
      s.target.width = rect.width + padding;
      s.target.height = rect.height + padding;
      s.mouseInElem.x = rect.width / 2;
      s.mouseInElem.y = rect.height / 2;
      if (cursorRef.current) cursorRef.current.classList.add('expand');
      if (dotRef.current) dotRef.current.style.transition = 'transform 0.35s cubic-bezier(.22,1,.36,1), background 0.25s';
      if (cursorRef.current) cursorRef.current.style.transition = 'width 0.35s cubic-bezier(.22,1,.36,1), height 0.35s cubic-bezier(.22,1,.36,1), top 0.35s, left 0.35s';
    };
    const handleLeave = () => {
      const s = state.current;
      s.isHovering = false;
      s.hoveredElem = null;
      if (cursorRef.current) cursorRef.current.classList.remove('expand');
      s.target.width = 48;
      s.target.height = 48;
      s.mouseInElem.x = 0;
      s.mouseInElem.y = 0;
      if (dotRef.current) dotRef.current.style.transition = 'transform 0.35s cubic-bezier(.22,1,.36,1), background 0.25s';
      if (cursorRef.current) cursorRef.current.style.transition = 'width 0.35s cubic-bezier(.22,1,.36,1), height 0.35s cubic-bezier(.22,1,.36,1), top 0.35s, left 0.35s';
    };
    const btns = document.querySelectorAll('.target-btn, input, textarea');
    btns.forEach(btn => {
      btn.addEventListener('mouseenter', handleEnter);
      btn.addEventListener('mouseleave', handleLeave);
    });
    return () => {
      btns.forEach(btn => {
        btn.removeEventListener('mouseenter', handleEnter);
        btn.removeEventListener('mouseleave', handleLeave);
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
      s.cursorState.width = lerp(s.cursorState.width, s.target.width, speed);
      s.cursorState.height = lerp(s.cursorState.height, s.target.height, speed);

      let offsetX = 0, offsetY = 0;
      let rotate = 0;
      if (s.isHovering && s.hoveredElem) {
        const maxOffset = 7;
        offsetX = ((s.mouseInElem.x - s.cursorState.width / 2) / (s.cursorState.width / 2)) * maxOffset;
        offsetY = ((s.mouseInElem.y - s.cursorState.height / 2) / (s.cursorState.height / 2)) * maxOffset;
        rotate = 0;
      } else {
        s.cursorRotation += 1.2;
        rotate = s.cursorRotation;
      }

      if (cursorRef.current) {
        cursorRef.current.style.width = s.cursorState.width + 'px';
        cursorRef.current.style.height = s.cursorState.height + 'px';
        cursorRef.current.style.transform = `translate(-50%, -50%) translate(${s.cursorState.x + offsetX}px, ${s.cursorState.y + offsetY}px) rotate(${rotate}deg)`;
      }
      if (dotRef.current) {
        if (s.isHovering && s.hoveredElem) {
          const dotX = s.mouseInElem.x - s.target.width / 2;
          const dotY = s.mouseInElem.y - s.target.height / 2;
          dotRef.current.style.transform = `translate(-50%, -50%) scale(1) translate(${dotX}px, ${dotY}px)`;
        } else {
          dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    return () => { running = false; };
  }, []);

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 48px;
          height: 48px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s cubic-bezier(.22,1,.36,1), height 0.2s cubic-bezier(.22,1,.36,1), top 0.2s, left 0.2s;
          background: none;
        }
        .custom-cursor.expand .cursor-dot {
          transform: translate(-50%, -50%) scale(0.6);
          background: #fff;
        }
        .cursor-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 7px;
          height: 7px;
          background: #ffffff;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(1);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), background 0.25s;
          pointer-events: none;
          z-index: 2;
        }
        .custom-cursor .corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 2px solid #ffffff;
          border-radius: 3px;
          background: none;
        }
        .custom-cursor .corner.tl {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }
        .custom-cursor .corner.tr {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }
        .custom-cursor .corner.bl {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }
        .custom-cursor .corner.br {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }
      `}</style>
      <div ref={cursorRef} className="custom-cursor">
        <div ref={dotRef} className="cursor-dot" />
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
      </div>
    </>
  );
};

export default TargetCursor;
