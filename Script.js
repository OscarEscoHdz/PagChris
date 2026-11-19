//Logica de la pagina
// Menú lateral
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const toggle = (open) => {
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
};
document.getElementById('menuBtn').onclick = () => toggle(true);
document.getElementById('closeBtn').onclick = () => toggle(false);
overlay.onclick = () => toggle(false);
document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));

// Slider
const slides = [...document.querySelectorAll('.slide')];
const dotsBox = document.querySelector('.dots');
let current = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.onclick = () => { go(i); restart(); };
  dotsBox.appendChild(b);
});
const dots = [...dotsBox.children];
function go(i) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function restart() { clearInterval(timer); timer = setInterval(() => go(current + 1), 5000); }
document.querySelector('.next').onclick = () => { go(current + 1); restart(); };
document.querySelector('.prev').onclick = () => { go(current - 1); restart(); };
go(0); restart();

// Animaciones al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));