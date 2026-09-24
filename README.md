# Generador de Paletas Interactivo

Aplicación web que genera paletas de colores aleatorias para propuestas de branding. Permite elegir cuántos colores quieres (6, 8 o 9), verlos en formato HSL o HEX, y alternar entre ambos formatos sin perder la paleta que ya generaste.

**Demo:** https://andresjmnz92-jpg.github.io/ProyectoM1_AndresJimenez/

Proyecto Integrador del Módulo 1 de Henry — Andrés Jiménez, cohorte Webpt38. El cliente del enunciado es Colorfly Studio, una agencia de branding ficticia que necesita generar propuestas de color rápido.

---

## Qué hace

- Genera paletas de 6, 8 o 9 colores aleatorios con un solo botón
- Muestra el código de cada color en **HSL** o en **HEX**
- Al cambiar de formato, mantiene los mismos colores y solo cambia el código
- Confirma con un mensaje temporal en pantalla cuando se genera una paleta nueva
- Funciona en escritorio y se adapta a pantallas pequeñas

---

## Cómo usarla

1. Abre el demo: https://andresjmnz92-jpg.github.io/ProyectoM1_AndresJimenez/
2. Al cargar ya verás una paleta generada.
3. Elige el tamaño en **Tamaño de la paleta** (6, 8 o 9 colores). La paleta se regenera sola.
4. Elige el formato en **Formato del código** (HSL o HEX). Los colores no cambian, solo su código.
5. Pulsa **Generar Paleta** para obtener una paleta nueva.

---

## Cómo ejecutarla en tu computadora

**Opción A — clonar el repositorio**

1. Abre una terminal en la carpeta donde quieras guardar el proyecto.
2. Clona el repositorio:
   ```
   git clone https://github.com/andresjmnz92-jpg/ProyectoM1_AndresJimenez.git
   ```
3. Entra a la carpeta:
   ```
   cd ProyectoM1_AndresJimenez
   ```
4. Abre `index.html` haciendo doble clic desde el explorador de archivos.

**Opción B — descargar el ZIP**

1. En la página del repositorio, pulsa el botón verde **Code** y luego **Download ZIP**.
2. Descomprime el archivo.
3. Entra a la carpeta y haz doble clic en `index.html`.

No necesitas instalar nada ni levantar un servidor: es HTML, CSS y JavaScript puro.

Si usas Visual Studio Code, la extensión **Live Server** te deja abrirlo con clic derecho sobre `index.html` → *Open with Live Server*, y recarga sola cada vez que guardas.

---

## Estructura del proyecto

```
ProyectoM1_AndresJimenez/
├── index.html          Estructura de la página
├── css/style.css       Estilos y sistema de diseño
├── js/app.js           Lógica de generación y render
└── README.md
```

---

## Cómo se desplegó

El sitio está publicado con GitHub Pages. Los pasos:

1. En el repositorio, ir a **Settings**.
2. En el menú lateral izquierdo, elegir **Pages**.
3. En *Build and deployment*, dejar **Source** en `Deploy from a branch`.
4. Elegir la rama **main** y la carpeta **/ (root)**.
5. Pulsar **Save**.
6. Esperar entre 1 y 3 minutos. Cuando el build termina, aparece el mensaje *"Your site is live at..."* con la URL.

Cada vez que se hace `git push` a `main`, GitHub reconstruye el sitio automáticamente.

---

## Decisiones técnicas

**Colores mate en lugar de aleatorios sin límite.**
El matiz se genera libre (0 a 359), pero la saturación queda entre 25% y 60% y la luminosidad entre 55% y 75%. Esto sirve para dos cosas: los colores salen apagados y utilizables para propuestas de branding en vez de fluorescentes, y al no generar nunca colores casi negros ni casi blancos, el código de cada color siempre se lee sobre su fondo. Resuelve el contraste por diseño, sin necesidad de calcular el color del texto para cada caso.

**HEX como segundo formato, no RGBA.**
La consigna pide HSL obligatorio más uno de los otros dos. Elegí HEX porque el proyecto no usa transparencias, y RGBA habría obligado a manejar un canal alpha que no aporta nada aquí. Además es el formato estándar en herramientas de diseño como Figma.

**Cada color se guarda como objeto `{h, s, l}`, no como texto.**
Si guardara el color ya formateado (`"hsl(200, 40%, 60%)"`), para mostrarlo en HEX tendría que descomponer ese texto. Guardando los tres valores por separado, el mismo color se puede mostrar en cualquier formato sin regenerarlo. Esto es lo que permite que el selector de formato cambie solo el código y no la paleta.

**Separación entre generar y renderizar.**
`generarPaleta()` crea colores nuevos y los guarda en el estado. `renderizarPaleta()` lee ese estado y lo dibuja. Por eso el botón y el selector de tamaño llaman a las dos funciones, mientras el selector de formato llama solo a la segunda.

**Tema oscuro con tokens en variables CSS.**
Los colores, espaciados y radios están definidos como variables en `:root`. Cambiar la paleta de la interfaz es editar una línea en lugar de buscar el mismo valor repetido por todo el archivo.

**Estilos en `style` solo para valores calculados.**
El color de fondo de cada tarjeta se asigna con `element.style.backgroundColor` porque es un valor distinto en cada caso. El resto de estilos, incluida la visibilidad del mensaje de confirmación, se maneja con clases CSS.

---

## Mejoras futuras

- **Copiar el código al portapapeles** al hacer clic sobre un color, reutilizando el mensaje de confirmación que ya existe.
- **Bloquear colores** individuales para que no cambien al generar una paleta nueva.
- **Guardar paletas favoritas** en el navegador con `localStorage`, para que sigan ahí al volver a abrir la página.
- **Armonías cromáticas**: generar paletas monocromáticas, complementarias, análogas o triádicas en lugar de colores independientes.
- **Exportar la paleta** como imagen o como variables CSS listas para pegar en un proyecto.

---

## Tecnologías

HTML5 · CSS3 (Grid y variables) · JavaScript (DOM y eventos) · Git · GitHub Pages
