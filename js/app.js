// Devuelve un entero aleatorio entre min y max, ambos incluidos
function numeroEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Genera un color mate: matiz libre, saturación y luminosidad acotadas
function generarColorMate() {
    return {
        h: numeroEntre(0, 359),
        s: numeroEntre(25, 60),
        l: numeroEntre(55, 75)
    };
}


function aHex(color) {
    const h = color.h;
    const s = color.s / 100;
    const l = color.l / 100;

    // Croma: qué tan "puro" es el color
    const c = (1 - Math.abs(2 * l - 1)) * s;

    // Componente intermedio, según en qué sexto de la rueda cae el matiz
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));

    // Ajuste para subir o bajar el brillo al nivel correcto
    const m = l - c / 2;

    let r, g, b;

    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    // Pasar de 0-1 a 0-255 y luego a dos dígitos hexadecimales
    const aDosDigitos = (valor) => {
        const entero = Math.round((valor + m) * 255);
        return entero.toString(16).padStart(2, '0');
    };

    return `#${aDosDigitos(r)}${aDosDigitos(g)}${aDosDigitos(b)}`;
}


function aHsl(color) {
    return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

// Estado: la paleta que se está mostrando ahora
let paletaActual = [];

// Llena el estado con la cantidad de colores pedida
function generarPaleta(cantidad) {
    paletaActual = [];
    for (let i = 0; i < cantidad; i++) {
        paletaActual.push(generarColorMate());
    }
}

// Referencias al DOM
const contenedorPaleta = document.getElementById('contenedor-paleta');
const selectTamano = document.getElementById('tamano');
const selectFormato = document.getElementById('formato');
const botonGenerar = document.getElementById('generar');

// Pinta el estado actual en el DOM, según el formato elegido
function renderizarPaleta() {
    contenedorPaleta.innerHTML = '';

    paletaActual.forEach(function (color) {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'color';
        tarjeta.style.backgroundColor = aHsl(color);

        const codigo = document.createElement('span');
        codigo.className = 'color__codigo';
        codigo.textContent = selectFormato.value === 'hex' ? aHex(color) : aHsl(color);

        tarjeta.appendChild(codigo);
        contenedorPaleta.appendChild(tarjeta);
    });
}

generarPaleta(6);
renderizarPaleta();