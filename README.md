# Portafolio — Héctor Ibáñez

Sitio web personal y portafolio de proyectos de software de Héctor Ibáñez (**HecAgus**).

- **URL de producción:** [https://portafolio-mu-dun.vercel.app/](https://portafolio-mu-dun.vercel.app/)

## Tecnologías

* **HTML5:** Marcado semántico, accesibilidad y optimización para lectores de pantalla.
* **CSS3:** Sistema de diseño editorial responsivo, CSS Grid, Flexbox, variables CSS y tipografía fluida.
* **JavaScript (ES6+):** Lógica interactiva nativa para navegación móvil y año dinámico, sin dependencias externas.

## Estructura del repositorio

```text
portafolio/
├── index.html       # Estructura principal del sitio y metadatos
├── index.css        # Sistema visual y estilos responsivos
├── index.js         # Lógica cliente (navegación y utilidades)
├── img/             # Activos gráficos, logos e íconos
├── girasol/         # Experiencia interactiva SVG procedural
└── README.md        # Documentación del proyecto
```

## Proyectos destacados

1. **Presupuesto Mensual:** PWA financiera offline-first con Firebase y Firestore.
2. **Pastalicious:** Menú digital interactivo para negocio local con pedidos por WhatsApp.
3. **πde otra vida:** Microapp matemática que busca fechas entre 10 millones de decimales de π.
4. **Apps Android:** Galería Luma, Archivos Luma y HecAgus Downloader.

## Previsualización local

Al ser un proyecto estático sin dependencias de compilación ni empaquetadores, puede ejecutarse con cualquier servidor local:

```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js
npx serve .
```

Abrir `http://localhost:8000` en el navegador.
