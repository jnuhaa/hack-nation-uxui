export function initCountdown() {
  const countdownValue = document.getElementById("countdown-value");
  if (!countdownValue) return () => {};

  const targetDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 59 * 60 * 60 * 1000 + 30 * 60 * 1000);
  const timer = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date();
    const ms = Math.max(targetDate.getTime() - now.getTime(), 0);
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    const dd = String(days).padStart(2, "0");
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    countdownValue.textContent = `${dd}d:${hh}h:${mm}m:${ss}s`;
  }

  updateCountdown();
  return () => clearInterval(timer);
}

export function initNavScrollState() {
  const hero = document.querySelector(".hero");
  if (!hero) return () => {};

  function updateNavState() {
    const threshold = hero.offsetTop + hero.offsetHeight - 88;
    document.body.classList.toggle("scrolled-past-hero", window.scrollY > threshold);
  }

  updateNavState();
  window.addEventListener("scroll", updateNavState, { passive: true });
  window.addEventListener("resize", updateNavState);

  return () => {
    window.removeEventListener("scroll", updateNavState);
    window.removeEventListener("resize", updateNavState);
  };
}

export function initLaunchpadStat() {
  const valueEl = document.getElementById("global-builders-value");
  if (!valueEl) return () => {};

  const target = Number(valueEl.dataset.target || "1700");
  let rafId = 0;
  let hasAnimated = false;

  const renderValue = (num) => {
    if (num >= 1000) {
      valueEl.textContent = `${(num / 1000).toFixed(1)}k+`;
      return;
    }
    valueEl.textContent = `${Math.round(num)}+`;
  };

  const animateCount = () => {
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      renderValue(target * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        renderValue(target);
      }
    };
    rafId = requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry || !entry.isIntersecting || hasAnimated) return;
      hasAnimated = true;
      animateCount();
      observer.disconnect();
    },
    { threshold: 0.4 }
  );

  observer.observe(valueEl);

  return () => {
    observer.disconnect();
    cancelAnimationFrame(rafId);
  };
}

export function initFluidBackground() {
  const canvas = document.getElementById("fluid-bg");
  if (!canvas) return () => {};

  const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
  if (!gl) return () => {};

  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    vec3 palette(float t) {
      // Palette sampled from media/backgrounds/hero-bg.png:
      // deep navy, indigo, violet, cyan edge, warm amber fringe.
      vec3 c1 = vec3(0.03, 0.04, 0.09);
      vec3 c2 = vec3(0.14, 0.22, 0.43);
      vec3 c3 = vec3(0.32, 0.18, 0.55);
      vec3 c4 = vec3(0.24, 0.68, 0.80);
      vec3 c5 = vec3(0.82, 0.60, 0.30);

      vec3 a = mix(c1, c2, smoothstep(0.05, 0.45, t));
      vec3 b = mix(c3, c4, smoothstep(0.35, 0.80, t));
      vec3 col = mix(a, b, smoothstep(0.2, 0.75, t));
      col += c5 * pow(max(0.0, t - 0.78), 2.0) * 0.7;
      return col;
    }

    float planetCurve(vec2 uv, float radius, float offsetY) {
      // Signed distance to a large circle creating the planet horizon.
      vec2 c = vec2(0.0, -radius + offsetY);
      return length(uv - c) - radius;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

      float t = u_time * 0.07;
      vec2 m = (u_mouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

      // Responsive "sun rise/fall" horizon motion with subtle cursor influence.
      float rise = sin(t) * 0.12;
      float horizonShift = 0.26 + rise + m.y * 0.03;
      float radius = 1.36 + m.x * 0.03;

      float d = planetCurve(uv, radius, horizonShift);
      float limb = exp(-pow(d / 0.016, 2.0));      // sharper blue-violet edge
      float halo = exp(-pow(d / 0.09, 2.0));       // tight atmospheric halo
      float upperSky = smoothstep(-0.65, 0.42, uv.y + 0.24);
      float lowerShadow = smoothstep(0.23, -0.54, uv.y);

      // Exoplanet observational haze and texture drift.
      float haze = fbm(uv * 2.6 + vec2(0.0, t * 0.45));
      float cloud = fbm(uv * 3.8 + vec2(t * 0.22, -t * 0.15));
      float scatter = clamp(haze * 0.65 + cloud * 0.35, 0.0, 1.0);

      // Palette pushed toward provided reference:
      // black space + cobalt/violet edge + pale lavender/ice interior glow.
      vec3 col = vec3(0.0, 0.01, 0.05);
      col += vec3(0.02, 0.05, 0.22) * upperSky * 0.44;
      col += vec3(0.11, 0.16, 0.55) * halo * 0.45;
      col += vec3(0.14, 0.18, 0.84) * limb * 1.18;
      col += vec3(0.34, 0.26, 0.86) * pow(limb, 1.8) * 0.35;
      col += vec3(0.78, 0.74, 0.86) * smoothstep(0.12, -0.20, d) * 0.46;
      col += vec3(0.90, 0.92, 0.98) * smoothstep(0.0, -0.45, d) * 0.56;
      col += vec3(0.66, 0.78, 0.96) * scatter * upperSky * 0.16;
      col -= vec3(0.0, 0.01, 0.05) * lowerShadow * 0.95;

      float vignette = smoothstep(1.34, 0.22, length(uv));
      col *= vignette;
      col = pow(col, vec3(0.92));

      gl_FragColor = vec4(col, 0.96);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vert = compile(gl.VERTEX_SHADER, vertexSource);
  const frag = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vert || !frag) return () => {};

  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return () => {};
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const posLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
  const timeLoc = gl.getUniformLocation(program, "u_time");
  const mouseLoc = gl.getUniformLocation(program, "u_mouse");

  let mouseX = 0.5;
  let mouseY = 0.5;
  let smoothMouseX = 0.5;
  let smoothMouseY = 0.5;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
  }

  function onPointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / rect.width;
    mouseY = (event.clientY - rect.top) / rect.height;
    mouseX = Math.max(0, Math.min(1, mouseX));
    mouseY = Math.max(0, Math.min(1, mouseY));
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let rafId = 0;
  function render(ms) {
    smoothMouseX += (mouseX - smoothMouseX) * 0.08;
    smoothMouseY += (mouseY - smoothMouseY) * 0.08;
    gl.uniform1f(timeLoc, ms * 0.001);
    gl.uniform2f(mouseLoc, smoothMouseX, 1.0 - smoothMouseY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);
  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    cancelAnimationFrame(rafId);
  };
}
