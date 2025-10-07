// Obtener elementos clave del DOM
const filterContainer = document.querySelector(".gallery__categories");
const gallery = document.querySelector(".proyect__gallery");
const projectCards = gallery.querySelectorAll(".project__card");

// ==============================================
// 1. Función para el scroll suave de navegación
// ==============================================
/**
 * Desplaza la vista a una sección específica de la página.
 * @param {string} id - El ID de la sección de destino.
 * @param {boolean} [closeSubmenu=false] - Indica si el submenú de escritorio debe cerrarse.
 */
function scrollToSection(id, closeSubmenu = false) {
    const section = document.getElementById(id);
    if (section) {
        // Cierra el submenú de Portafolio (útil para navegación en escritorio)
        if (closeSubmenu) {
            const submenu = document.querySelector('.submenu');
            if (submenu) {
                // Para escritorio, se cierra el hover, pero esto asegura el cierre
                submenu.style.maxHeight = '0';
            }
        }
        
        // Cierra el menú hamburguesa móvil si está abierto
        const checkbox = document.querySelector('.checkbox');
        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
        }

        // Realiza el scroll suave
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==============================================
// 2. Función para alternar el submenú (Móvil)
// ==============================================
/**
 * Alterna la visibilidad del submenú de Portafolio en pantallas pequeñas.
 * Usa max-height para una animación CSS suave.
 * @param {Event} event - El evento de clic.
 */
function toggleSubmenu(event) {
    // Solo aplica la lógica de toggle en pantallas pequeñas (donde el hover no es suficiente)
    if (window.innerWidth < 1200) { 
        const dropdown = event.target.closest('.portfolio-dropdown');
        const submenu = dropdown.querySelector('.submenu');
        
        // Alternar el estado del submenú
        if (submenu.style.maxHeight && submenu.style.maxHeight !== '0px') {
            submenu.style.maxHeight = '0'; // Ocultar
        } else {
            // Mostrar: usa scrollHeight para obtener la altura necesaria
            submenu.style.maxHeight = submenu.scrollHeight + "px"; 
        }
    }
}

// ==============================================
// 3. Función de Filtro/Navegación del Portafolio
// ==============================================
/**
 * Desplaza a la sección de portafolio y aplica el filtro.
 * Si el elemento tiene un 'data-link', navega a esa URL en lugar de filtrar.
 * @param {string} filterClass - La clase de filtro a aplicar (e.g., 'encripta', 'all').
 */
function scrollToFilter(filterClass) {
    const section = document.getElementById('portfolio');
    if (section) {
        // 1. Obtener el elemento que disparó el evento para revisar el data-link
        const element = event.target;
        const link = element.getAttribute('data-link');

        // Cierra el menú hamburguesa móvil si está abierto (después del clic en un enlace de menú)
        const checkbox = document.querySelector('.checkbox');
        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
        }

        // Cierra el submenú si está abierto
        const submenu = document.querySelector('.submenu');
        if (submenu) {
            submenu.style.maxHeight = '0';
        }
        
        // 2. Comportamiento condicional: Navegación vs. Filtrado
        if (link) {
            // Si tiene un data-link, navega directamente a esa URL en una nueva pestaña
            window.open(link, '_blank');
        } 
        
        // Realiza el scroll a la sección del portafolio (siempre se desplaza)
        section.scrollIntoView({ behavior: 'smooth' });
        
        // 3. Lógica de filtrado (solo se ejecuta si NO es un enlace directo)
        if (!link) {
            projectCards.forEach(card => {
                const isMatch = filterClass === 'all' || card.classList.contains(filterClass);
                // Muestra u oculta la tarjeta
                card.style.display = isMatch ? 'block' : 'none';
            });

            // Actualiza la clase 'active' en la barra de categorías para resaltar el filtro
            const activeFilter = filterContainer.querySelector('.active');
            if (activeFilter) {
                activeFilter.classList.remove('active');
            }
            // Busca y activa el filtro que corresponde al elemento de la barra
            const newActiveFilter = filterContainer.querySelector(`[data-filter="${filterClass}"]`);
            if (newActiveFilter) {
                newActiveFilter.classList.add('active');
            }
        }
    }
}

// ==============================================
// 4. Inicializar el evento de filtro (Categorías de la Galería)
// ==============================================
if (filterContainer) {
    filterContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === 'LI') {
            const filterValue = target.getAttribute('data-filter');
            // Llama a scrollToFilter (que ahora también se encarga del scroll y cierre de menú)
            scrollToFilter(filterValue);
        }
    });
}
