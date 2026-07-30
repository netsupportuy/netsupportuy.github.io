// NetSupport — interacciones mínimas, sin dependencias
(function () {
  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Aparición al hacer scroll (respeta reduced motion)
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Formulario de contacto — modo demostración.
  // En producción este submit hace POST al flujo de Power Automate
  // que crea el lead en Dynamics 365 y notifica por Teams.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = document.getElementById('form-ok');
      if (ok) ok.classList.add('show');
      form.querySelector('button[type="submit"]').disabled = true;
    });
  }

  // Año en el footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
