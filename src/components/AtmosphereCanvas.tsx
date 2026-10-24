import React, { useEffect, useRef } from 'react';

interface AtmosphereCanvasProps {
  showFinaleConfetti: boolean;
  themeColor?: string;
}

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  showFinaleConfetti,
}) => {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse tracking for candlelight sway & stardust
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const candleOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mousePosRef.current = { x: clientX, y: clientY };

      // Spawn stardust on cursor move
      if (cursorSpawnFn.current) {
        cursorSpawnFn.current(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  // 1. Ambient Background Canvas (Stars, Bokeh Orbs, Rose Petals)
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars
    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      phase: number;
      color: string;
    }
    const stars: Star[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '#fff5db' : '#fed7aa',
    }));

    // Floating Bokeh Orbs
    interface Bokeh {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }
    const bokehColors = ['#f43f5e', '#fb7185', '#e11d48', '#d97706', '#a855f7'];
    const bokehs: Bokeh[] = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 45 + 25,
      color: bokehColors[Math.floor(Math.random() * bokehColors.length)],
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.3 - 0.1,
      alpha: Math.random() * 0.08 + 0.03,
    }));

    // Drifting Rose Petals
    interface Petal {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      angle: number;
      angularSpeed: number;
      flip: number;
      flipSpeed: number;
      color: string;
    }
    const petalColors = [
      '#e11d48', // deep crimson
      '#be123c', // antique rose
      '#fb7185', // soft blush
      '#9f1239', // burgundy
      '#f43f5e', // coral red
    ];
    const petals: Petal[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 9,
      vx: Math.random() * 0.6 - 0.2,
      vy: Math.random() * 0.8 + 0.6,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.015,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(t * star.speed * 60 + star.phase);
        const currentAlpha = Math.max(0.1, star.alpha + twinkle * 0.25);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Bokeh Orbs
      bokehs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'transparent');

        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Drifting Rose Petals with realistic rocking curve
      petals.forEach((p) => {
        p.x += p.vx + Math.sin(t * 1.5 + p.y * 0.01) * 0.8;
        p.y += p.vy;
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, Math.cos(p.flip));

        ctx.globalAlpha = 0.82;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Organic heart-teardrop petal silhouette
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
        ctx.fill();

        // Delicate inner petal vein highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.lineTo(0, p.size * 0.6);
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 2. Interactive Cursor Trail (Golden Stardust & Sparkles)
  const cursorSpawnFn = useRef<((x: number, y: number) => void) | null>(null);

  useEffect(() => {
    const canvas = cursorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Sparkle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      color: string;
      rotation: number;
      rotSpeed: number;
    }
    const sparkles: Sparkle[] = [];
    const colors = ['#fde047', '#fbbf24', '#f59e0b', '#fef08a', '#ffffff'];

    cursorSpawnFn.current = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        sparkles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6 - 0.4,
          size: Math.random() * 3.5 + 1.2,
          alpha: 1.0,
          decay: Math.random() * 0.03 + 0.018,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;

        // 4-point golden star flare
        ctx.beginPath();
        const r = s.size;
        ctx.moveTo(0, -r * 2);
        ctx.quadraticCurveTo(0, 0, r * 2, 0);
        ctx.quadraticCurveTo(0, 0, 0, r * 2);
        ctx.quadraticCurveTo(0, 0, -r * 2, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3. Grand Finale Confetti (Metallic foil ribbons & fluttering hearts)
  useEffect(() => {
    if (!showFinaleConfetti) return;

    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface ConfettiPiece {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      isHeart: boolean;
      rotX: number;
      rotY: number;
      rotZ: number;
      speedRotX: number;
      speedRotY: number;
      speedRotZ: number;
      opacity: number;
    }

    const foilColors = [
      '#ffd700', // Gold foil
      '#f59e0b', // Amber foil
      '#e11d48', // Crimson
      '#fb7185', // Rose
      '#f43f5e', // Coral
      '#c084fc', // Lilac
      '#ffffff', // Pearl
    ];

    const pieces: ConfettiPiece[] = [];
    const count = 220;

    // Burst from center-bottom of screen outwards
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      const speed = Math.random() * 14 + 8;
      pieces.push({
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height * 0.65 + (Math.random() - 0.5) * 100,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed - Math.random() * 6,
        w: Math.random() * 12 + 6,
        h: Math.random() * 8 + 4,
        color: foilColors[Math.floor(Math.random() * foilColors.length)],
        isHeart: Math.random() < 0.35,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedRotX: (Math.random() - 0.5) * 0.15,
        speedRotY: (Math.random() - 0.5) * 0.15,
        speedRotZ: (Math.random() - 0.5) * 0.08,
        opacity: 1,
      });
    }

    let startTime = performance.now();
    const renderConfetti = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      pieces.forEach((p) => {
        // Gravity & air resistance
        p.vy += 0.28;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        p.rotX += p.speedRotX;
        p.rotY += p.speedRotY;
        p.rotZ += p.speedRotZ;

        if (elapsed > 4.5) {
          p.opacity -= 0.012;
        }

        if (p.opacity > 0 && p.y < height + 50) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotZ);
          ctx.scale(Math.cos(p.rotX), Math.cos(p.rotY));
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.isHeart) {
            const hs = p.w * 0.8;
            ctx.beginPath();
            ctx.moveTo(0, -hs * 0.3);
            ctx.bezierCurveTo(hs * 0.5, -hs, hs, -hs * 0.3, 0, hs * 0.8);
            ctx.bezierCurveTo(-hs, -hs * 0.3, -hs * 0.5, -hs, 0, -hs * 0.3);
            ctx.fill();
          } else {
            // Foil rectangle
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }

          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animId = requestAnimationFrame(renderConfetti);
      }
    };

    renderConfetti();

    return () => {
      cancelAnimationFrame(animId);
      if (ctx) ctx.clearRect(0, 0, width, height);
    };
  }, [showFinaleConfetti]);

  // Flickering candlelight overlay math
  const candleSwayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let animId: number;
    let t = 0;
    const animateCandle = () => {
      t += 0.05;
      if (candleSwayRef.current) {
        // Organic multi-harmonic flicker
        const flickerScale = 1 + Math.sin(t * 3.7) * 0.025 + Math.sin(t * 11.3) * 0.015;
        const flickerOpacity = 0.85 + Math.sin(t * 5.1) * 0.08 + Math.cos(t * 13.9) * 0.04;
        const swayX = Math.sin(t * 0.8) * 15;
        const swayY = Math.cos(t * 0.6) * 10;

        candleSwayRef.current.style.transform = `translate(${swayX}px, ${swayY}px) scale(${flickerScale})`;
        candleSwayRef.current.style.opacity = `${flickerOpacity}`;
      }
      animId = requestAnimationFrame(animateCandle);
    };
    animateCandle();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* 1. Ambient Background Canvas */}
      <canvas
        ref={bgCanvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />

      {/* 2. Interactive Cursor Stardust Canvas */}
      <canvas
        ref={cursorCanvasRef}
        className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      />

      {/* 3. Grand Finale Confetti Canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />

      {/* 4. Flickering Candlelight Radial Glow Overlay */}
      <div
        ref={candleSwayRef}
        className="pointer-events-none fixed -inset-20 z-10 transition-transform duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 48%, rgba(254, 215, 170, 0.22) 0%, rgba(249, 115, 22, 0.08) 35%, rgba(136, 19, 55, 0.06) 60%, transparent 85%)`,
        }}
      />
    </>
  );
};
