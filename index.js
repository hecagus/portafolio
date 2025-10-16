document.addEventListener("DOMContentLoaded", () => {
  // ==============================================
  // 1. Navegación y Scroll Suave
  // ==============================================
  // Asignar eventos a los enlaces de navegación principal
  document.querySelectorAll('li[onclick^="scrollToSection"]').forEach(item => {
    const sectionId = item.getAttribute('onclick').match(/'([^']+)'/)[1];
    item.addEventListener('click', () => scrollToSection(sectionId));
  });

  // Asignar evento al botón "Mi trabajo"
  const workButton = document.querySelector('button[onclick="scrollToSection(\\'portfolio\\')"]');
  if (workButton) {
    workButton.addEventListener('click', () => scrollToSection('portfolio'));
  }

  /**
   * Desplaza la vista a una sección específica de la página.
   * @param {string} id - El ID de la sección de destino.
   */
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      closeMobileMenu(); // Cierra el menú móvil si está abierto
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ==============================================
  // 2. Submenú de Portafolio (Móvil y Escritorio)
  // ==============================================
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const submenu = document.querySelector('.submenu');

  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (event) => {
      // Solo aplica la lógica de toggle en pantallas pequeñas
      if (window.innerWidth < 1200) {
        event.stopPropagation(); // Evita que otros clics se disparen
        if (submenu.style.maxHeight && submenu.style.maxHeight !== '0px') {
          submenu.style.maxHeight = '0'; // Ocultar
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + "px"; // Mostrar
        }
      }
    });
  }

  // ==============================================
  // 3. Lógica de Filtro del Portafolio
  // ==============================================
  const filterContainer = document.querySelector(".gallery__categories");
  const projectCards = document.querySelectorAll(".project__card");

  // Asignar eventos a los filtros del submenú
  document.querySelectorAll('.submenu li[onclick^="scrollToFilter"]').forEach(item => {
    const filterValue = item.getAttribute('onclick').match(/'([^']+)'/)[1];
    item.addEventListener('click', (event) => {
      event.preventDefault(); // Prevenir comportamiento por defecto
      // Si el elemento tiene un data-link, ábrelo en una nueva pestaña
      const link = item.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank');
      }
      scrollToSection('portfolio');
      filterProjects(filterValue);
      closeMobileMenu();
    });
  });

  // Asignar eventos a los filtros de la barra de categorías
  if (filterContainer) {
    filterContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName === 'LI') {
        const filterValue = target.getAttribute('data-filter');
        filterProjects(filterValue);
      }
    });
  }

  /**
   * Filtra los proyectos en la galería.
   * @param {string} filterClass - La clase de filtro a aplicar (e.g., 'encripta', 'all').
   */
  function filterProjects(filterClass) {
    projectCards.forEach(card => {
      const isMatch = filterClass === 'all' || card.classList.contains(filterClass);
      // *** LA CORRECCIÓN CLAVE ESTÁ AQUÍ ***
      // Usamos una clase para ocultar, en lugar de cambiar el display
      if (isMatch) {
        card.classList.remove('oculto');
      } else {
        card.classList.add('oculto');
      }
    });

    // Actualiza la clase 'active' en la barra de categorías
    const activeFilter = filterContainer.querySelector('.active');
    if (activeFilter) {
      activeFilter.classList.remove('active');
    }
    const newActiveFilter = filterContainer.querySelector(`[data-filter="${filterClass}"]`);
    if (newActiveFilter) {
      newActiveFilter.classList.add('active');
    }
  }

  // ==============================================
  // 4. Funciones Auxiliares
  // ==============================================

  /**
   * Cierra el menú hamburguesa si está abierto.
   */
  function closeMobileMenu() {
    const checkbox = document.querySelector('.checkbox');
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
    // También cierra el submenú en móvil
    if (window.innerWidth < 1200 && submenu) {
      submenu.style.maxHeight = '0';
    }
  }
});
