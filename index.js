(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const year = document.querySelector('#year');

  if (year) year.textContent = String(new Date().getFullYear());
  if (!toggle || !nav) return;

  const setMenuOpen = (open) => {
    if ((toggle.getAttribute('aria-expanded') === 'true') === open) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.innerHTML = open ? 'Cerrar <span aria-hidden="true">×</span>' : 'Menú <span aria-hidden="true">+</span>';
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });
  const mediaQuery = window.matchMedia('(min-width: 761px)');
  const handleBreakpoint = (e) => {
    if (e.matches && toggle.getAttribute('aria-expanded') === 'true') setMenuOpen(false);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleBreakpoint);
  } else {
    mediaQuery.addListener(handleBreakpoint);
  }
})();
