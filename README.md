# Supermercado Felipe — Sistema de Gestión de Inventario

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **Vite**, **React Router** y **Tailwind CSS** como una Single Page Application (SPA).

**Evaluación Formativa — Desarrollo Frontend II (PFY2202), Semana 2**

## Sitio en línea

La aplicación está desplegada en GitHub Pages y disponible públicamente en:

**https://pipolio1.github.io/supermercado-felipe-gennari-Exp1S2/**

## Descripción

La aplicación gestiona el inventario de un supermercado mediante un **estado global** implementado con **Context API + useReducer**. El menú inferior permite navegar sin recargar la página entre todas las secciones del sitio:

- **Inventario** (`/`): lista de productos con marca, tipo, precio y stock, con botones para aumentar o disminuir unidades y alertas de stock bajo.
- **Agregar artículo** (`/agregar-articulo`): formulario controlado para ingresar nuevos artículos al inventario (nombre, marca, tipo, precio y stock inicial).
- **Listado** (`/listado-articulos`): tabla con todos los artículos actuales del inventario.
- **Quiénes somos** (`/quienes-somos`): misión, visión y valores del supermercado.
- **Nuestras tiendas** (`/nuestras-tiendas`): sucursales con dirección, ciudad y horario.
- **Contáctanos** (`/contactanos`): datos de contacto y formulario de mensajes.
- **Cómo comprar** (`/como-comprar`): pasos para realizar una compra.

## Tecnologías utilizadas

- React 19 (hooks: `useState`, `useReducer`, `useContext`)
- [Vite](https://vite.dev/) (entorno de desarrollo y build)
- React Router DOM (enrutamiento del lado del cliente)
- [Tailwind CSS 4](https://tailwindcss.com/) vía `@tailwindcss/vite` (framework CSS: todos los estilos son clases utilitarias)
- HTML, CSS y JavaScript
- GitHub Pages (despliegue)

## Desarrollo local

Para trabajar en el proyecto en tu propio computador necesitas [Node.js](https://nodejs.org/) instalado (versión 20.19 o superior, requerida por Vite 7).

En la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:5173](http://localhost:5173). Esta es una versión local solo para desarrollo: los cambios en el código se recargan automáticamente en el navegador (HMR). El sitio público en GitHub Pages no se ve afectado hasta que se publique una nueva versión (ver sección siguiente).

## Publicar cambios en GitHub Pages

Después de hacer cambios en el código, actualiza el sitio en línea con:

```bash
git add -A
git commit -m "descripción del cambio"
git push
npm run deploy
```

`npm run deploy` compila el proyecto y publica la carpeta `dist` en la rama `gh-pages`, actualizando el sitio en GitHub Pages. La opción `base` de `vite.config.js` está configurada con el nombre del repositorio para que los assets se resuelvan correctamente en ese entorno.

## Decisión de enrutamiento: HashRouter vs BrowserRouter

El proyecto usa `HashRouter` de React Router de forma deliberada. GitHub Pages es un alojamiento de archivos estáticos: no permite configurar el servidor para que todas las rutas respondan con `index.html`, que es el requisito de `BrowserRouter` en una SPA. Con `BrowserRouter`, visitar o recargar una URL como `/Supermercado-Felipe-Gennari-Exp1S1/contactanos` directamente produciría un error 404 del servidor.

Las alternativas evaluadas fueron:

- **Truco del `404.html`** (copiar `index.html` como `404.html`): funciona, pero es un parche frágil que depende del comportamiento de error de GitHub Pages.
- **Cambiar de alojamiento** (Netlify, Vercel): permite `BrowserRouter` con redirects, pero sale del alcance del curso, que exige GitHub Pages.

Dado que el despliegue debe mantenerse en GitHub Pages, `HashRouter` es la opción técnicamente correcta: la navegación ocurre después del `#` y nunca llega al servidor, a costa de tener `#` en la URL.

## Gestión de estado global

El inventario vive en un estado global (`src/context/InventoryContext.jsx`) implementado con Context API y `useReducer`:

- El reducer maneja tres acciones: `ADD_PRODUCT` (agregar artículo), `INCREMENT_STOCK` y `DECREMENT_STOCK` (ajustar unidades, sin bajar de cero).
- Cualquier página puede leer o modificar el inventario mediante el hook `useInventory()`, sin pasar props manualmente entre componentes.
- Por eso un artículo agregado en **Agregar artículo** aparece de inmediato en **Listado** y en **Inventario**.

## Otros comandos disponibles

### `npm run build`

Genera la versión optimizada para producción en la carpeta `dist`.

### `npm run preview`

Sirve localmente la build de producción para revisarla antes de desplegar.

## Estructura del proyecto

```
src/
├── main.jsx                    # Punto de entrada de la aplicación
├── App.jsx                     # Layout principal, React Router e InventoryProvider
├── index.css                   # Directiva de Tailwind CSS y estilos base
├── routes.js                   # Definición centralizada de rutas (path, etiqueta y componente)
├── constants.js                # Constantes compartidas (umbral de stock bajo)
├── context/
│   └── InventoryContext.jsx    # Estado global del inventario (Context API + useReducer)
├── components/
│   ├── BottomNav.jsx           # Menú inferior: genera los NavLink desde routes.js
│   ├── StatsCards.jsx          # Tarjetas de estadísticas del inventario
│   ├── InventoryTable.jsx      # Tabla de productos con control de stock
│   └── ProductRow.jsx          # Fila de producto con controles de stock
├── data/
│   ├── products.js             # Datos iniciales del inventario y tipos de producto
│   ├── tiendas.js              # Datos de las sucursales
│   └── pasosCompra.js          # Pasos del proceso de compra
└── pages/
    ├── Home.jsx                # Página principal: estadísticas y tabla de inventario
    ├── AgregarArticulo.jsx     # Formulario para ingresar nuevos artículos
    ├── ListadoArticulos.jsx    # Tabla con todos los artículos del inventario
    ├── QuienesSomos.jsx
    ├── NuestrasTiendas.jsx
    ├── Contactanos.jsx
    ├── ComoComprar.jsx
    └── NotFound.jsx            # Página para rutas no encontradas
```

## Decisiones de organización

- **Rutas centralizadas** (`src/routes.js`): `App.jsx` y `BottomNav.jsx` consumen el mismo arreglo de rutas, por lo que agregar o renombrar una sección solo requiere editar un lugar.
- **Estado global con Context API + useReducer** (`src/context/InventoryContext.jsx`): el inventario es compartido por todas las páginas y las actualizaciones siguen el patrón de acciones (type + payload), lo que mantiene la lógica de estado centralizada y predecible.
- **Separación de responsabilidades en el inventario**: `Home` calcula las estadísticas y despacha acciones; `StatsCards`, `InventoryTable` y `ProductRow` son componentes de presentación reutilizables que reciben datos por props.
- **Datos uniformes en `data/`**: productos, tiendas y pasos de compra viven fuera de las páginas, de modo que el contenido se actualiza sin tocar los componentes.
- **Estilos con Tailwind CSS**: todos los estilos son clases utilitarias aplicadas directamente en el JSX; no hay hojas de estilo personalizadas por componente.
