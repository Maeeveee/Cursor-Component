import React, { useEffect, useRef } from 'react';

const lerp = (a, b, n) => a + (b - a) * n;

const RibbonCursor = () => {
  const trailRef = useRef([]);
  const canvasRef = useRef(null);
  const state = useRef({
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    trail: []
  });

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const handleMouseMove = (e) => {
      if (isMobile) return;

      const s = state.current;
      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleMobileHide = () => {
      if (isMobile) {
        document.querySelectorAll('.ribbon-segment').forEach(el => el.remove());
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
    let running = true;
    const maxTrailPoints = 40;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function animateRibbon() {
      if (!running) return;
      
      const s = state.current;
      
      s.trail.unshift({
        x: s.mouse.x,
        y: s.mouse.y,
        timestamp: Date.now(),
        lifetime: 2000
      });

      s.trail = s.trail.filter((point, index) => {
        const age = Date.now() - point.timestamp;
        return index < maxTrailPoints && age < point.lifetime;
      });

      let smoothedTrail = [...s.trail];
      
      for (let pass = 0; pass < 3; pass++) {
        const newTrail = [];
        for (let i = 0; i < smoothedTrail.length; i++) {
          if (i === 0) {
            newTrail.push(smoothedTrail[i]);
          } else if (i === smoothedTrail.length - 1) {
            newTrail.push(smoothedTrail[i]);
          } else {
            const prev = smoothedTrail[i - 1];
            const current = smoothedTrail[i];
            const next = smoothedTrail[i + 1];
            
            const elasticity = 0.8;
            const avgX = (prev.x + next.x) / 2;
            const avgY = (prev.y + next.y) / 2;
            const smoothX = lerp(current.x, avgX, elasticity);
            const smoothY = lerp(current.y, avgY, elasticity);
            
            newTrail.push({
              x: smoothX,
              y: smoothY,
              timestamp: current.timestamp,
              lifetime: current.lifetime
            });
          }
        }
        smoothedTrail = newTrail;
      }

      drawRibbonTrail(ctx, smoothedTrail);
      requestAnimationFrame(animateRibbon);
    }

    function drawRibbonTrail(ctx, trail) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (trail.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      
      for (let i = 1; i < trail.length - 1; i++) {
        const current = trail[i];
        const next = trail[i + 1];
        const controlX = (current.x + next.x) / 2;
        const controlY = (current.y + next.y) / 2;
        ctx.quadraticCurveTo(current.x, current.y, controlX, controlY);
      }
      
      for (let i = 0; i < trail.length - 1; i++) {
        const current = trail[i];
        const next = trail[i + 1];
        
        const age = (Date.now() - current.timestamp) / current.lifetime;
        const indexAge = i / trail.length;
        const combinedAge = Math.min(age, indexAge);
        
        const opacity = Math.max(0.2, 1 - Math.pow(combinedAge, 0.7) * 0.6);
        const baseWidth = 40;
        const width = Math.max(12, (1 - Math.pow(combinedAge, 0.8) * 0.5) * baseWidth);

        const gradient = ctx.createRadialGradient(
          current.x, current.y, 0,
          current.x, current.y, width / 2
        );
        gradient.addColorStop(0, `hsla(220, 70%, 50%, ${opacity})`);
        gradient.addColorStop(0.7, `hsla(220, 65%, 40%, ${opacity * 0.9})`);
        gradient.addColorStop(1, `hsla(220, 60%, 30%, ${opacity * 0.7})`);
        
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        if (i < trail.length - 2) {
          const nextNext = trail[i + 2];
          const controlX = (next.x + nextNext.x) / 2;
          const controlY = (next.y + nextNext.y) / 2;
          ctx.quadraticCurveTo(next.x, next.y, controlX, controlY);
        } else {
          ctx.lineTo(next.x, next.y);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }
    
    animateRibbon();
    return () => { 
      running = false;
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9997
        }}
      />
      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
};

export default RibbonCursor;