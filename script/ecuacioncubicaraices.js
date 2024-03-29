let zoomFactor = 1; // Factor inicial de zoom
let aActual, bActual, cActual, dActual, eActual, fActual; // Valores actuales de los coeficientes
let desplazamientoX = 0;
let desplazamientoY = 0;
let isDragging = false;
let lastMouseX, lastMouseY;

function calcularEcuacionCubica() {
    aActual = parseFloat(document.getElementById('a').value);
    bActual = parseFloat(document.getElementById('b').value);
    cActual = parseFloat(document.getElementById('c').value);
    dActual = parseFloat(document.getElementById('d').value);
    eActual = parseFloat(document.getElementById('e').value);
    fActual = parseFloat(document.getElementById('f').value);

    // Validar campos vacíos
    if ( !aActual || !bActual || !cActual || !dActual || !eActual || !fActual) {
        alert("Por favor, completa todos los campos con valores numéricos.");
        return;
    }

    // Validar si son números reales
    if (isNaN(aActual) || isNaN(bActual) || isNaN(cActual) || isNaN(dActual) || isNaN(eActual) || isNaN(fActual)) {
        alert("Ingresa valores numéricos válidos en todos los campos.");
        return;
    }

    // Limitar los valores numéricos hasta 1000
    if (Math.abs(aActual) > 1000 || Math.abs(bActual) > 1000 || Math.abs(cActual) > 1000 || Math.abs(eActual) > 1000 || Math.abs(fActual) > 1000) {
        alert("Ingresa valores numéricos menores o iguales a 1000 en todos los campos.");
        return;
    }

    document.getElementById('opened-bloc').toggleAttribute('hidden', false)

    graficarEcuacionCubica();
}

function graficarEcuacionCubica() {
    const canvas = document.getElementById('graficoCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(desplazamientoX, desplazamientoY);
    dibujarEjesConValores(ctx, width, height, zoomFactor);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let x = -width; x <= width; x++) {
        let xReal = (x - desplazamientoX) / (50 / zoomFactor);
        if (xReal < 0) continue; // Evita calcular raíces de números negativos
        let y = aActual * Math.pow(xReal, 3) + bActual * Math.pow(xReal, 2) + cActual * xReal + dActual + eActual * Math.sqrt(xReal) + fActual * Math.cbrt(xReal);
        ctx.lineTo(width / 2 + x, height / 2 - y * zoomFactor * 50);
    }
    ctx.stroke();
    ctx.restore();
}

function dibujarEjesConValores(ctx, width, height, zoom) {
    const paso = 50 * zoom;
    const rangoExtraX = Math.max(Math.abs(desplazamientoX), width);
    const rangoExtraY = Math.max(Math.abs(desplazamientoY), height);
    const valorMaximoX = rangoExtraX / paso;
    const valorMaximoY = rangoExtraY / paso;

    ctx.strokeStyle = "#ddd";
    ctx.beginPath();

    for (let x = -valorMaximoX; x <= valorMaximoX; x++) {
        ctx.moveTo(width / 2 + x * paso, -rangoExtraY);
        ctx.lineTo(width / 2 + x * paso, height + rangoExtraY);
    }

    for (let y = -valorMaximoY; y <= valorMaximoY; y++) {
        ctx.moveTo(-rangoExtraX, height / 2 + y * paso);
        ctx.lineTo(width + rangoExtraX, height / 2 + y * paso);
    }
    ctx.stroke();

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-rangoExtraX, height / 2);
    ctx.lineTo(width + rangoExtraX, height / 2);
    ctx.moveTo(width / 2, -rangoExtraY);
    ctx.lineTo(width / 2, height + rangoExtraY);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillStyle = "#000";
    for (let i = -valorMaximoX; i <= valorMaximoX; i++) {
        if (i !== 0) {
            const x = width / 2 + i * paso;
            ctx.fillText(Math.round(i * 10 / zoom) / 10, x, height / 2 + 20);
            ctx.beginPath();
            ctx.moveTo(x, height / 2 - 10);
            ctx.lineTo(x, height / 2 + 10);
            ctx.stroke();
        }
    }

    for (let i = -valorMaximoY; i <= valorMaximoY; i++) {
        if (i !== 0) {
            const y = height / 2 - i * paso;
            ctx.fillText(-Math.round(i * 10 / zoom) / 10, width / 2 + 5, y);
            ctx.beginPath();
            ctx.moveTo(width / 2 - 10, y);
            ctx.lineTo(width / 2 + 10, y);
            ctx.stroke();
        }
    }
}

// Funciones para manejar el zoom
function zoomIn() {
    zoomFactor *= 1.1;
    graficarEcuacionCubica();
    actualizarNivelZoom();
}

function zoomOut() {
    zoomFactor /= 1.1;
    graficarEcuacionCubica();
    actualizarNivelZoom();
}

function actualizarNivelZoom() {
    document.getElementById('zoomLevel').textContent = `Zoom: ${zoomFactor.toFixed(1)}x`;
}

function actualizarZoomManual() {
    const zoomInputValue = parseFloat(document.getElementById('zoomInput').value);
    if (!isNaN(zoomInputValue) && zoomInputValue > 0) {
        zoomFactor = zoomInputValue;
        graficarEcuacionCubica();
        actualizarNivelZoom();
    }
}

// Funciones para manejar el arrastre del gráfico
function iniciarArrastre(event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function arrastrar(event) {
    if (!isDragging) return;
    desplazamientoX += event.clientX - lastMouseX;
    desplazamientoY += event.clientY - lastMouseY;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    graficarEcuacionCubica();
}

function detenerArrastre() {
    isDragging = false;
}

// Event listeners para el arrastre
const canvas = document.getElementById('graficoCanvas');
canvas.addEventListener('mousedown', iniciarArrastre);
canvas.addEventListener('mousemove', arrastrar);
canvas.addEventListener('mouseup', detenerArrastre);
canvas.addEventListener('mouseleave', detenerArrastre);
