import React, { useEffect, useRef } from 'react';

const lerp = (a, b, n) => a + (b - a) * n;

const RainCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const state = useRef({
    mouse: { x: null, y: null },
    rainDrops: [],
    lastSpawnTime: 0,
    isRaining: false,
    lightningEffect: { active: false, startTime: 0, duration: 500, isHeld: false }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (canvas) {
      canvas.style.display = "none";
    }

    const handleMouseMove = (e) => {
      if (isMobile) return;

      const s = state.current;
      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
      s.isRaining = true;

      if (canvas && canvas.style.display === "none") {
        canvas.style.display = "block";
      }
    };

    const handleClick = (e) => {
      if (isMobile) return;
    };

    const handleMouseDown = (e) => {
      if (isMobile) return;

      const s = state.current;
      s.lightningEffect.active = true;
      s.lightningEffect.isHeld = true;
      s.lightningEffect.startTime = Date.now();
      
      for (let i = 0; i < 12; i++) {
        if (s.mouse.x !== null && s.mouse.y !== null) {
          const rainDrop = createRainDrop(s.mouse.x, s.mouse.y);
          rainDrop.vy += 3;
          s.rainDrops.push(rainDrop);
        }
      }
    };

    const handleMouseUp = (e) => {
      if (isMobile) return;

      const s = state.current;
      s.lightningEffect.isHeld = false;
      s.lightningEffect.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleMobileHide = () => {
      if (isMobile && canvas) {
        canvas.style.display = "none";
      }
    };

    if (isMobile) {
      document.addEventListener("touchstart", handleMobileHide);
      document.addEventListener("click", handleMobileHide);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (isMobile) {
        document.removeEventListener("touchstart", handleMobileHide);
        document.removeEventListener("click", handleMobileHide);
      }
    };
  }, []);

  useEffect(() => {
    let running = true;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createRainDrop(x, y) {
      return {
        x: x + (Math.random() - 0.5) * 80,
        y: y + 20 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 1,
        vy: Math.random() * 2 + 3,
        size: Math.random() * 4 + 2,
        life: 1,
        decay: Math.random() * 0.015 + 0.005,
        color: {
          h: Math.random() * 40 + 200,
          s: Math.random() * 40 + 60,
          l: Math.random() * 30 + 40
        },
        bounce: 0.6 + Math.random() * 0.3,
        gravity: 0.1 + Math.random() * 0.1,
        friction: 0.98
      };
    }
    
    function animateRain() {
      if (!running) return;
      
      const s = state.current;
      const now = Date.now();
      
      if (s.lightningEffect.isHeld) {
        s.lightningEffect.active = true;
        
        if (now - s.lastSpawnTime > 15) {
          for (let i = 0; i < 6; i++) {
            if (s.mouse.x !== null && s.mouse.y !== null) {
              const rainDrop = createRainDrop(s.mouse.x, s.mouse.y);
              rainDrop.vy += 2;
              s.rainDrops.push(rainDrop);
            }
          }
          s.lastSpawnTime = now;
        }
      }
      
      if (s.isRaining && s.mouse.x !== null && s.mouse.y !== null && now - s.lastSpawnTime > 25 && !s.lightningEffect.isHeld) {
        for (let i = 0; i < 4; i++) {
          s.rainDrops.push(createRainDrop(s.mouse.x, s.mouse.y));
        }
        s.lastSpawnTime = now;
      }

      if (now - s.lastSpawnTime > 2000) {
        s.isRaining = false;
      }

      const hitElements = document.querySelectorAll('.target-btn, button, .pc-card, .pc-contact-btn, .select, input, textarea, [data-bounce="true"]');
      const elementBounds = Array.from(hitElements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        };
      });

      s.rainDrops = s.rainDrops.filter(drop => {
        drop.vy += drop.gravity;
        
        drop.x += drop.vx;
        drop.y += drop.vy;
        
        elementBounds.forEach(bound => {
          const dropLeft = drop.x - drop.size;
          const dropRight = drop.x + drop.size;
          const dropTop = drop.y - drop.size;
          const dropBottom = drop.y + drop.size;
          
          if (dropRight > bound.left && 
              dropLeft < bound.right && 
              dropBottom > bound.top && 
              dropTop < bound.bottom) {
            
            const overlapLeft = dropRight - bound.left;
            const overlapRight = bound.right - dropLeft;
            const overlapTop = dropBottom - bound.top;
            const overlapBottom = bound.bottom - dropTop;
            
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            
            if (minOverlap === overlapTop) {
              drop.y = bound.top - drop.size;
              drop.vy = -Math.abs(drop.vy) * drop.bounce;
            } else if (minOverlap === overlapBottom) {
              drop.y = bound.bottom + drop.size;
              drop.vy = Math.abs(drop.vy) * drop.bounce;
            } else if (minOverlap === overlapLeft) {
              drop.x = bound.left - drop.size;
              drop.vx = -Math.abs(drop.vx) * drop.bounce;
            } else if (minOverlap === overlapRight) {
              drop.x = bound.right + drop.size;
              drop.vx = Math.abs(drop.vx) * drop.bounce;
            }
            
            drop.vx *= drop.friction;
            drop.vy *= drop.friction;
            
            for (let i = 0; i < 2; i++) {
              s.rainDrops.push({
                x: drop.x + (Math.random() - 0.5) * 10,
                y: drop.y,
                vx: (Math.random() - 0.5) * 3,
                vy: -(Math.random() * 2 + 1),
                size: Math.random() * 2 + 1,
                life: 0.5,
                decay: 0.02,
                color: drop.color,
                bounce: 0.3,
                gravity: 0.15,
                friction: 0.95
              });
            }
          }
        });
        
        if (drop.x - drop.size <= 0) {
          drop.x = drop.size;
          drop.vx = Math.abs(drop.vx) * drop.bounce;
        } else if (drop.x + drop.size >= canvas.width) {
          drop.x = canvas.width - drop.size;
          drop.vx = -Math.abs(drop.vx) * drop.bounce;
        }
        
        if (drop.y + drop.size >= canvas.height) {
          drop.y = canvas.height - drop.size;
          drop.vy = -Math.abs(drop.vy) * drop.bounce;
        }
        
        drop.vx *= drop.friction;
        drop.vy *= drop.friction;
        
        if (drop.x < -50 || drop.x > canvas.width + 50 || drop.y < -50) {
          drop.life = 0;
        }
        
        drop.life -= drop.decay;
        
        return drop.life > 0;
      });

      drawRain(ctx, s.rainDrops);
      requestAnimationFrame(animateRain);
    }

    function drawRain(ctx, rainDrops) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const s = state.current;
      
      if (s.mouse.x !== null && s.mouse.y !== null) {
        drawCloud(ctx, s.mouse.x, s.mouse.y);
      }
      
      rainDrops.forEach(drop => {
        const alpha = drop.life;
        
        ctx.save();
        
        const gradient = ctx.createRadialGradient(
          drop.x, drop.y, 0,
          drop.x, drop.y, drop.size
        );
        
        gradient.addColorStop(0, `hsla(${drop.color.h}, ${drop.color.s}%, ${drop.color.l + 20}%, ${alpha})`);
        gradient.addColorStop(0.6, `hsla(${drop.color.h}, ${drop.color.s}%, ${drop.color.l}%, ${alpha * 0.9})`);
        gradient.addColorStop(1, `hsla(${drop.color.h}, ${drop.color.s}%, ${drop.color.l - 20}%, ${alpha * 0.7})`);
        
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(drop.x - drop.size * 0.3, drop.y - drop.size * 0.3, drop.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 100%, 90%, ${alpha * 0.6})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${drop.color.h}, ${drop.color.s + 30}%, ${drop.color.l + 15}%, ${alpha * 0.8})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(drop.x + drop.size * 0.2, drop.y + drop.size * 0.2, drop.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${drop.color.h}, ${drop.color.s}%, ${drop.color.l + 40}%, ${alpha * 0.3})`;
        ctx.fill();
        
        ctx.restore();
      });
    }

    function drawCloud(ctx, x, y) {
      ctx.save();
      
      const s = state.current;
      const isLightning = s.lightningEffect.active;
      
      const cloudSize = 30;
      const cloudOpacity = 0.8;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, cloudSize * 1.5);
      
      if (isLightning) {
        gradient.addColorStop(0, `rgba(140, 140, 140, ${cloudOpacity})`);
        gradient.addColorStop(0.4, `rgba(110, 110, 110, ${cloudOpacity * 0.95})`);
        gradient.addColorStop(0.7, `rgba(80, 80, 80, ${cloudOpacity * 0.9})`);
        gradient.addColorStop(1, `rgba(60, 60, 60, ${cloudOpacity * 0.7})`);
      } else {
        gradient.addColorStop(0, `rgba(240, 248, 255, ${cloudOpacity})`);
        gradient.addColorStop(0.4, `rgba(220, 230, 240, ${cloudOpacity * 0.9})`);
        gradient.addColorStop(0.7, `rgba(180, 200, 220, ${cloudOpacity * 0.7})`);
        gradient.addColorStop(1, `rgba(140, 160, 180, ${cloudOpacity * 0.3})`);
      }
      
      const cloudCircles = [
        { offsetX: 0, offsetY: 0, size: cloudSize },
        { offsetX: -15, offsetY: 5, size: cloudSize * 0.8 },
        { offsetX: 15, offsetY: 5, size: cloudSize * 0.8 },
        { offsetX: -25, offsetY: 10, size: cloudSize * 0.6 },
        { offsetX: 25, offsetY: 10, size: cloudSize * 0.6 },
        { offsetX: 0, offsetY: 15, size: cloudSize * 0.7 },
        { offsetX: -10, offsetY: -10, size: cloudSize * 0.5 },
        { offsetX: 10, offsetY: -10, size: cloudSize * 0.5 }
      ];
      
      ctx.fillStyle = isLightning ? 'rgba(180, 180, 180, 0.3)' : 'rgba(100, 120, 140, 0.2)';
      cloudCircles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(x + circle.offsetX + 2, y + circle.offsetY + 2, circle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      if (isLightning) {
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.lineWidth = 2;
        cloudCircles.forEach(circle => {
          ctx.beginPath();
          ctx.arc(x + circle.offsetX, y + circle.offsetY, circle.size, 0, Math.PI * 2);
          ctx.stroke();
        });
      }
      
      if (isLightning) {
        ctx.fillStyle = 'rgba(160, 160, 160, 0.2)';
        cloudCircles.forEach(circle => {
          ctx.beginPath();
          ctx.arc(x + circle.offsetX, y + circle.offsetY, circle.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      
      ctx.fillStyle = gradient;
      cloudCircles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(x + circle.offsetX, y + circle.offsetY, circle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      if (!isLightning) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(x - 8, y - 8, cloudSize * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + 12, y - 5, cloudSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      if (isLightning) {
        for (let bolt = 0; bolt < 5; bolt++) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${1.0 - bolt * 0.15})`;
          ctx.lineWidth = 4 - bolt * 0.5;
          ctx.beginPath();
          
          const startX = x + (Math.random() - 0.5) * 30;
          const startY = y + 20;
          
          let currentX = startX;
          let currentY = startY;
          
          ctx.moveTo(currentX, currentY);
          
          const segments = Math.floor((window.innerHeight - startY) / 50);
          
          for (let i = 0; i < segments; i++) {
            currentX += (Math.random() - 0.5) * 25;
            currentY += 40 + Math.random() * 20;
            
            if (i === segments - 1) {
              currentY = window.innerHeight - 10;
            }
            
            ctx.lineTo(currentX, currentY);
          }
          
          ctx.stroke();
          
          if (bolt < 2) {
            ctx.strokeStyle = `rgba(200, 200, 255, ${0.6 - bolt * 0.2})`;
            ctx.lineWidth = 2 - bolt * 0.5;
            ctx.beginPath();
            
            const branchStartX = startX + (Math.random() - 0.5) * 15;
            const branchStartY = startY + (window.innerHeight - startY) / 3;
            
            ctx.moveTo(branchStartX, branchStartY);
            
            let branchX = branchStartX;
            let branchY = branchStartY;
            
            for (let j = 0; j < 3; j++) {
              branchX += (Math.random() - 0.5) * 40;
              branchY += 30 + Math.random() * 20;
              ctx.lineTo(branchX, branchY);
            }
            
            ctx.stroke();
          }
        }
        
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 25;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.shadowColor = 'rgba(150, 100, 255, 0.6)';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = 'rgba(150, 100, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        if (s.isRaining && s.rainDrops.length > 20 && Math.random() < 0.05) {
          ctx.strokeStyle = 'rgba(255, 255, 150, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x - 5, y + 20);
          ctx.lineTo(x + 2, y + 35);
          ctx.lineTo(x - 3, y + 35);
          ctx.lineTo(x + 5, y + 50);
          ctx.stroke();
        }
      }
      
      if (s.isRaining) {
        ctx.fillStyle = isLightning ? 'rgba(120, 120, 120, 0.8)' : 'rgba(180, 200, 220, 0.3)';
        ctx.beginPath();
        ctx.ellipse(x, y + 25, 40, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        if (isLightning) {
          ctx.strokeStyle = 'rgba(160, 160, 160, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        for (let i = 0; i < 5; i++) {
          const dropX = x + (Math.random() - 0.5) * 60;
          const dropY = y + 20 + Math.random() * 15;
          ctx.fillStyle = isLightning ? 'rgba(160, 160, 160, 0.9)' : 'rgba(180, 220, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(dropX, dropY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        
        if (isLightning) {
          ctx.fillStyle = 'rgba(100, 100, 100, 0.6)';
          ctx.beginPath();
          ctx.ellipse(x, y + 35, 60, 15, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = 'rgba(140, 140, 140, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      ctx.restore();
    }
    
    animateRain();
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

export default RainCursor;