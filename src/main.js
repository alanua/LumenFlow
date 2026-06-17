(() => {
  "use strict";

  const canvas = document.getElementById("lumenflow");
  const ctx = canvas.getContext("2d", { alpha: false });
  const help = document.getElementById("help");
  const status = document.getElementById("status");

  const palettes = [
    ["#78f0ff", "#4f8dff", "#a56cff", "#ffffff"],
    ["#b8fff3", "#64d8ff", "#6d7bff", "#f4ccff"],
    ["#3bf7ff", "#245bff", "#bd38ff", "#ff6fd8"],
    ["#f7fbff", "#98e7ff", "#7aa2ff", "#c88cff"],
  ];

  const presets = {
    1: {
      name: "calm / laminar",
      particles: 9000,
      fade: 0.075,
      speed: 0.62,
      fieldScale: 0.0018,
      swirl: 0.12,
      wave: 0.82,
      pointSize: 0.82,
      glow: 0.38,
    },
    2: {
      name: "vortex",
      particles: 12000,
      fade: 0.055,
      speed: 0.86,
      fieldScale: 0.0026,
      swirl: 0.92,
      wave: 0.38,
      pointSize: 0.78,
      glow: 0.52,
    },
    3: {
      name: "bright / neon",
      particles: 15000,
      fade: 0.042,
      speed: 1.05,
      fieldScale: 0.003,
      swirl: 0.62,
      wave: 0.7,
      pointSize: 1.05,
      glow: 0.78,
    },
  };

  let width = 1;
  let height = 1;
  let dpr = 1;
  let particles = [];
  let presetId = 1;
  let preset = { ...presets[presetId] };
  let paletteId = 0;
  let targetParticleCount = preset.particles;
  let frame = 0;
  let lastTime = performance.now();
  let fps = 0;

  class Particle {
    constructor(resetAge = true) {
      this.reset(resetAge);
    }

    reset(randomAge = true) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = 0;
      this.vy = 0;
      this.age = randomAge ? Math.random() * 700 : 0;
      this.life = 500 + Math.random() * 900;
      this.colorIndex = Math.floor(Math.random() * palettes[paletteId].length);
      this.weight = 0.55 + Math.random() * 0.8;
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#02030a";
    ctx.fillRect(0, 0, width, height);
    particles.forEach((particle) => particle.reset(true));
  }

  function applyPreset(id) {
    presetId = id;
    preset = { ...presets[presetId] };
    targetParticleCount = preset.particles;
    reconcileParticles();
    updateStatus();
  }

  function reconcileParticles() {
    const maxStep = 900;
    if (particles.length < targetParticleCount) {
      const add = Math.min(maxStep, targetParticleCount - particles.length);
      for (let index = 0; index < add; index += 1) {
        particles.push(new Particle(true));
      }
    } else if (particles.length > targetParticleCount) {
      particles.length = Math.max(targetParticleCount, particles.length - maxStep);
    }
  }

  function resetParticles() {
    ctx.fillStyle = "#02030a";
    ctx.fillRect(0, 0, width, height);
    particles.forEach((particle) => particle.reset(true));
  }

  function waveNoise(x, y, t) {
    const a = Math.sin(x * 0.0027 + t * 0.31);
    const b = Math.cos(y * 0.0031 - t * 0.23);
    const c = Math.sin((x + y) * 0.0014 + t * 0.17);
    const d = Math.cos((x - y) * 0.0011 - t * 0.19);
    return (a + b + c + d) * 0.25;
  }

  function flowAt(x, y, t) {
    const cx = width * 0.5;
    const cy = height * 0.52;
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.hypot(dx, dy) + 0.0001;
    const nx = dx / distance;
    const ny = dy / distance;

    const s = preset.fieldScale;
    const n1 = Math.sin(x * s + Math.cos(y * s * 0.72 + t * 0.32) * 2.3 + t * 0.18);
    const n2 = Math.cos(y * s * 1.18 + Math.sin(x * s * 0.86 - t * 0.24) * 2.1 - t * 0.13);
    const n3 = waveNoise(x, y, t);

    const laminarAngle = Math.sin(y * 0.0032 + t * 0.34) * 0.55 + n3 * preset.wave;
    const vortexAngle = Math.atan2(dy, dx) + Math.PI * 0.5;
    const vortexStrength = preset.swirl * Math.min(1, 240 / distance);

    const angle = laminarAngle * (1 - vortexStrength) + vortexAngle * vortexStrength + n1 * 0.75 + n2 * 0.5;
    const pull = preset.swirl * 0.018;

    return {
      x: Math.cos(angle) - nx * pull,
      y: Math.sin(angle) - ny * pull,
    };
  }

  function drawBackgroundFade() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(2, 3, 10, ${preset.fade})`;
    ctx.fillRect(0, 0, width, height);
  }

  function drawParticles(now) {
    const t = now * 0.001;
    const colors = palettes[paletteId];
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    for (const particle of particles) {
      const oldX = particle.x;
      const oldY = particle.y;
      const flow = flowAt(particle.x, particle.y, t + particle.age * 0.0007);

      particle.vx = particle.vx * 0.78 + flow.x * preset.speed;
      particle.vy = particle.vy * 0.78 + flow.y * preset.speed;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.age += 1;

      if (
        particle.x < -40 ||
        particle.x > width + 40 ||
        particle.y < -40 ||
        particle.y > height + 40 ||
        particle.age > particle.life
      ) {
        particle.reset(false);
        if (Math.random() < 0.55) {
          particle.x = Math.random() < 0.5 ? -10 : width + 10;
          particle.y = Math.random() * height;
        }
        continue;
      }

      const color = colors[particle.colorIndex % colors.length];
      const alpha = 0.12 + preset.glow * 0.24 * particle.weight;
      ctx.strokeStyle = hexToRgba(color, alpha);
      ctx.lineWidth = preset.pointSize * particle.weight;
      ctx.beginPath();
      ctx.moveTo(oldX, oldY);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
    }
  }

  function hexToRgba(hex, alpha) {
    const normalized = hex.replace("#", "");
    const value = Number.parseInt(normalized, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function updateStatus() {
    status.textContent = `Preset ${presetId} · ${preset.name} · ${particles.length}/${targetParticleCount} particles · ${Math.round(fps)} FPS`;
  }

  function animate(now) {
    const delta = Math.max(1, now - lastTime);
    lastTime = now;
    fps = fps * 0.92 + (1000 / delta) * 0.08;
    frame += 1;

    reconcileParticles();
    drawBackgroundFade();
    drawParticles(now);

    if (frame % 24 === 0) {
      updateStatus();
    }

    requestAnimationFrame(animate);
  }

  function requestFullscreen() {
    const target = document.documentElement;
    if (!document.fullscreenElement && target.requestFullscreen) {
      target.requestFullscreen().catch(() => {});
    }
  }

  function adjustParticles(direction) {
    const step = direction > 0 ? 1000 : -1000;
    targetParticleCount = Math.min(30000, Math.max(2000, targetParticleCount + step));
    updateStatus();
  }

  function cyclePalette() {
    paletteId = (paletteId + 1) % palettes.length;
    particles.forEach((particle) => {
      particle.colorIndex = Math.floor(Math.random() * palettes[paletteId].length);
    });
  }

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    if (event.key === "1" || event.key === "2" || event.key === "3") {
      applyPreset(Number(event.key));
    } else if (event.key === " ") {
      event.preventDefault();
      cyclePalette();
    } else if (event.key === "ArrowUp") {
      adjustParticles(1);
    } else if (event.key === "ArrowDown") {
      adjustParticles(-1);
    } else if (event.key.toLowerCase() === "f") {
      requestFullscreen();
    } else if (event.key.toLowerCase() === "h") {
      help.classList.toggle("hidden");
    } else if (event.key.toLowerCase() === "r") {
      resetParticles();
    }
  });

  resize();
  applyPreset(1);
  requestAnimationFrame(animate);
})();
