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

  // Formulario de contacto — envío real vía Web3Forms.
  var form = document.getElementById('contact-form');
  if (form) {
    var ok = document.getElementById('form-ok');
    var err = document.getElementById('form-error');
    if (!err) {
      err = document.createElement('div');
      err.id = 'form-error';
      err.className = 'form-ok';
      err.style.background = '#FDECEC';
      err.style.borderColor = '#E5484D';
      err.style.color = '#8C1B1B';
      if (ok) ok.insertAdjacentElement('afterend', err);
      else form.appendChild(err);
    }
    var errorText = {
      es: 'No pudimos enviar tu consulta. Probá nuevamente o escribinos a info@netsupport.com.uy.',
      en: "We couldn't send your inquiry. Please try again or email us at info@netsupport.com.uy.",
      pt: 'Não conseguimos enviar sua consulta. Tente novamente ou escreva para info@netsupport.com.uy.'
    };
    var lang = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    var message = errorText[lang] || errorText.es;

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      if (ok) ok.classList.remove('show');
      err.classList.remove('show');
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success) {
            if (ok) ok.classList.add('show');
            form.reset();
          } else {
            err.textContent = message;
            err.classList.add('show');
            if (submitBtn) submitBtn.disabled = false;
          }
        })
        .catch(function () {
          err.textContent = message;
          err.classList.add('show');
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  // Año en el footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
