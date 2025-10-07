// Obtener elementos clave del DOM
const filterContainer = document.querySelector(".gallery__categories");
const gallery = document.querySelector(".proyect__gallery");
const projectCards = gallery.querySelectorAll(".project__card");

// ==============================================
// 1. Función para el scroll suave de navegación
// ==============================================
function scrollToSection(id, closeSubmenu = false) {
    const section = document.getElementById(id);
    if (section) {
        // Realiza el scroll suave
        section.scrollIntoView({ behavior: 'smooth' });
    }

    // Lógica para cerrar el menú hamburguesa después de la navegación en móviles
    const checkbox = document.querySelector('.checkbox');
    if (checkbox && window.innerWidth < 1200 && checkbox.checked) {
        checkbox.checked = false;
    }
    
    // Cierra el submenú si es necesario
    if (closeSubmenu) {
        document.querySelectorAll('.submenu').forEach(sub => {
            sub.style.maxHeight = '0';
        });
    }
}

// ==============================================
// 2. Lógica para el submenú de Portafolio (Dropdown)
// ==============================================

/**
 * Muestra u oculta el submenú de Portafolio.
 * @param {Event} event - El evento de click.
 */
function toggleSubmenu(event) {
    // Evita que el click en el span dispare la acción principal (solo para el móvil)
    event.stopPropagation(); 
    
    const submenu = event.currentTarget.nextElementSibling;
    
    if (window.innerWidth < 1200) {
        // Lógica para menú móvil (animación con max-height)
        if (submenu.style.maxHeight && submenu.style.maxHeight !== '0px') {
            submenu.style.maxHeight = '0';
        } else {
            // Cierra otros submenús si los hubiera
            document.querySelectorAll('.submenu').forEach(sub => {
                if (sub !== submenu) {
                    sub.style.maxHeight = '0';
                }
            });
            // Abre el submenú
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    }
    // En escritorio, la visibilidad se maneja con CSS a través de `:hover`
}

// ==============================================
// 3. Lógica para scroll y activar el filtro del portafolio
// ==============================================

/**
 * Navega a la sección de portafolio y activa un filtro específico.
 * @param {string} filterValue - El valor del data-filter a activar.
 */
function scrollToFilter(filterValue) {
    // 1. Navega a la sección Portafolio
    scrollToSection('portfolio', true);

    // Espera un momento para que el scroll termine antes de filtrar (opcional pero ayuda)
    setTimeout(() => {
        const targetElement = document.querySelector(`.filter-item[data-filter="${filterValue}"]`);
        
        if (targetElement) {
            // Simula el clic en el filtro
            targetElement.click();
        }
    }, 400); // 400ms después del scroll

    // Lógica para cerrar el menú hamburguesa
    const checkbox = document.querySelector('.checkbox');
    if (checkbox && window.innerWidth < 1200 && checkbox.checked) {
        checkbox.checked = false;
    }
}


// ==============================================
// 4. Lógica de Filtrado del Portafolio (Original)
// ==============================================
filterContainer.addEventListener("click", (event) => {
    // Verificar si el elemento clickeado es un filtro
    if (event.target.classList.contains("filter-item")) {
        // 1. Manejo de la clase 'active'
        const currentActive = filterContainer.querySelector(".active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        // Añadir la clase 'active' al elemento que se ha hecho clic
        event.target.classList.add("active");

        // 2. Obtener el valor del filtro (ej. "encripta", "tours__Web", "all")
        const filterValue = event.target.getAttribute("data-filter");

        // 3. Iterar sobre todas las tarjetas de proyectos para ocultar/mostrar
        projectCards.forEach((card) => {
            // Comprobar si es el filtro "all" o si la tarjeta contiene la clase del filtro
            if (filterValue === "all" || card.classList.contains(filterValue)) {
                // Mostrar la tarjeta
                card.style.display = "block";
            } else {
                // Ocultar la tarjeta
                card.style.display = "none";
            }
        });
    }
});
