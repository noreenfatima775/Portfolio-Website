// Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Typed effect
  const phrases = [
    'npm run dev',
    'building CollabFlow v2.0...',
    'const app = express()',
    'mongoose.connect(MONGO_URI)',
    'git push origin main',
  ];
  let pi = 0, ci = 0, deleting = false;
  const typedEl = document.getElementById('typedText');
  function typeLoop() {
    const phrase = phrases[pi];
    if (!deleting) {
      typedEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
    } else {
      typedEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }
  setTimeout(typeLoop, 1200);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const siblings = Array.from(e.target.parentNode.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add('visible'), idx * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'transparent';
      btn.style.color = 'var(--green)';
      btn.style.opacity = '1';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = 'var(--green)';
        btn.style.color = 'var(--bg)';
        e.target.reset();
      }, 3000);
    }, 1500);
  }

  // Smooth scroll for all nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });