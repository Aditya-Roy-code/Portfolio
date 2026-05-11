/* ── THREE.JS HERO CANVAS ── */
(function() {
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 0, 5);
 
  /* Torus knot — geometric, premium, unique */
  const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 16);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6C63FF,
    emissive: 0x2a2470,
    emissiveIntensity: 0.4,
    metalness: 0.7,
    roughness: 0.2,
    wireframe: false,
  });
  const knot = new THREE.Mesh(geo, mat);
  knot.position.set(3.5, -0.5, -1);
  scene.add(knot);
 
  /* Wireframe overlay */
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x00D4FF, wireframe: true, opacity: 0.08, transparent: true });
  const wireKnot = new THREE.Mesh(geo, wireMat);
  wireKnot.position.copy(knot.position);
  scene.add(wireKnot);
 
  /* Floating particles */
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x6C63FF, size: 0.025, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(pGeo, pMat));
 
  /* Lights */
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const dirLight = new THREE.DirectionalLight(0x6C63FF, 2);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0x00D4FF, 1.5, 10);
  pointLight.position.set(-3, 2, 2);
  scene.add(pointLight);
 
  function resize() {
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);
 
  /* Mouse parallax */
  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
 
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    knot.rotation.x = t * 0.18 + my * 0.15;
    knot.rotation.y = t * 0.25 + mx * 0.15;
    wireKnot.rotation.copy(knot.rotation);
    camera.position.x += (mx * 0.3 - camera.position.x) * 0.04;
    camera.position.y += (my * 0.2 - camera.position.y) * 0.04;
    renderer.render(scene, camera);
  }
  animate();
})();
 
/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  mobileMenu.classList.remove('open');
}
 
/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ── SKILL BAR ANIMATION ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.3 });
 
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));
 
/* ── FORM SUBMIT (mailto fallback) ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const msg = form.querySelector('textarea').value;
  window.location.href = `mailto:youremail@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`;
  document.getElementById('form-success').style.display = 'block';
  form.reset();
}
 
/* ── SMOOTH NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}, { passive: true });