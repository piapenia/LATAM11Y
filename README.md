# latama11y — Web de la consultora de accesibilidad digital

Sitio construido con [Astro](https://astro.build/) v4.  
Bilingüe (español / inglés) con detección automática de idioma vía `localStorage`.

---

## Estructura del proyecto

```
latama11y/
├── astro.config.mjs          # Config de Astro: i18n, URL del sitio
├── package.json              # Dependencias y scripts
│
├── public/                   # Archivos estáticos (favicon, imágenes, robots.txt)
│
└── src/
    ├── styles/
    │   └── global.css        # ★ Fuente única de tokens de diseño y estilos base
    │
    ├── layouts/
    │   └── Base.astro        # Layout raíz: <html>, header, nav, footer, skip link
    │
    ├── components/
    │   └── Newsletter.astro  # Formulario de suscripción (bilingüe, accesible)
    │
    ├── pages/
    │   ├── index.astro       # Selector de idioma (punto de entrada del sitio)
    │   ├── es/
    │   │   └── index.astro   # Inicio en español
    │   └── en/
    │       └── index.astro   # Home in English
    │
    └── content/
        └── blog/             # (vacío — futuras entradas en Markdown/MDX)
```

---

## Arquitectura de estilos

| Nivel         | Archivo                | Contenido                                      |
|---------------|------------------------|------------------------------------------------|
| Tokens base   | `styles/global.css`    | Custom properties, reset, tipografía, utilidades |
| Layout        | `layouts/Base.astro`   | Header, footer, skip link (scoped `<style>`)   |
| Componentes   | `components/*.astro`   | Estilos de cada componente (scoped `<style>`)  |
| Páginas       | `pages/**/*.astro`     | Estilos de sección específicos de cada página  |

> **Regla clave:** los tokens de diseño viven **sólo** en `global.css`.  
> Los componentes los consumen via `var(--*)` — nunca repiten valores hardcodeados.

---

## Internacionalización (i18n)

- `defaultLocale: 'es'` → la ruta `/es/` es la raíz semántica en español
- `prefixDefaultLocale: false` → `/es/` y `/` son distintas; `/` muestra el selector
- El selector de idioma persiste la elección en `localStorage('latama11y-lang')`
- Los textos del layout (nav, footer) se resuelven en `Base.astro` con un objeto `nav[lang]`

---

## Accesibilidad (WCAG 2.1 / 2.2)

### Implementado

| Criterio  | Qué se hizo                                                                 |
|-----------|-----------------------------------------------------------------------------|
| 1.1.1     | `aria-label="latama11y"` en el logo para evitar lectura "lata m a 1 1 y"   |
| 1.3.1     | Labels asociados por `for`/`id`; `aria-describedby` en inputs              |
| 2.1.1     | Todos los interactivos son alcanzables y operables con teclado              |
| 2.3.3     | Animaciones dentro de `@media (prefers-reduced-motion: no-preference)`     |
| 2.4.1     | Skip link "Saltar al contenido" / "Skip to main content"                   |
| 2.4.7     | `:focus-visible` global con outline 2px, nunca oculto                      |
| 3.1.1     | `lang` correcto en cada `<html>`                                           |
| 3.1.2     | `lang` + `hreflang` en enlaces de selección de idioma                      |
| 4.1.2     | `aria-required`, `role`, `aria-expanded` en todos los controles            |
| 4.1.3     | `role="status"` + `aria-live="polite"` en mensajes de formulario           |

### Pendiente / TODOs

- [ ] Agregar `manifest.webmanifest` y favicon SVG en `public/`
- [ ] Completar páginas: `/es/servicios/`, `/es/sobre-nosotras/`, `/es/contacto/`, `/es/accesibilidad/` (ídem en `/en/`)
- [ ] Implementar listado dinámico de blog con `getCollection('blog')` (Astro Content Collections)
- [ ] Configurar endpoint real de Brevo en `Newsletter.astro`
- [ ] Agregar `<meta property="og:*">` para redes sociales
- [ ] Validar contraste de color — `--color-muted: #71717a` sobre `#0a0a0a` da ~4.6:1 (AA ✓ normal, AA✗ grande)
- [ ] Test con lector de pantalla (NVDA / VoiceOver)
- [ ] Agregar `aria-current="page"` dinámicamente en los links de navegación

---

## Scripts

```bash
npm install       # instala dependencias
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera el sitio estático en dist/
npm run preview   # preview del build
```
