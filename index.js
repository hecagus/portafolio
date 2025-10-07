// Obtener elementos clave del DOM
const filterContainer = document.querySelector(".gallery__categories");
const gallery = document.querySelector(".proyect__gallery");
const projectCards = gallery.querySelectorAll(".project__card");

// ==============================================
// 1. Función para el scroll suave de navegación
// ==============================================
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        // Realiza el scroll suave
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Lógica para cerrar el menú hamburguesa después de la navegación en móviles
    const checkbox = document.querySelector('.checkbox');
    // Si la pantalla es pequeña y el checkbox está marcado (menú abierto), lo desmarca.
    if (checkbox && window.innerWidth < 1200 && checkbox.checked) {
        checkbox.checked = false;
    }
}

// Para que la función sea accesible desde el HTML, debe estar en el scope global.
// Ya está en el scope global por defecto, pero si usaras módulos, necesitarías exportarla.

// ==============================================
// 2. Lógica de Filtrado del Portafolio
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
