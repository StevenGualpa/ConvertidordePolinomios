let zoomFactor = 1; // Factor inicial de zoom
let aActual, bActual, nActual; // Valores actuales de a, b y n

function calcularEcuacionPolinomica() {
    aActual = parseFloat(document.getElementById('a').value);
    bActual = parseFloat(document.getElementById('b').value);
    nActual = parseInt(document.getElementById('n').value);

    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
}

function graficarEcuacionPolinomica(a, b, n, zoom) {
    const canvas = document.getElementById('graficoCanvas');
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    dibujarEjesConValores(ctx, width, height, zoom);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let x = -width / 2; x <= width / 2; x++) {
        let xReal = x / (50 / zoom);
        let yReal = a * Math.pow(xReal, n) + b * Math.pow(xReal, n);
        ctx.lineTo(width / 2 + x, height / 2 - yReal * zoom * 50);
    }
    ctx.stroke();
}

function dibujarEjesConValores(ctx, width, height, zoom) {
    const paso = 50 * zoom; // Distancia entre las marcas de los ejes
    const valorMaximo = (width / 2) / paso; // Valor máximo en el eje x

    // Dibujar líneas de cuadrícula
    ctx.strokeStyle = "#ddd";
    ctx.beginPath();
    for (let x = paso; x < width / 2; x += paso) {
        ctx.moveTo(width / 2 + x, 0);
        ctx.lineTo(width / 2 + x, height);
        ctx.moveTo(width / 2 - x, 0);
        ctx.lineTo(width / 2 - x, height);
    }
    for (let y = paso; y < height / 2; y += paso) {
        ctx.moveTo(0, height / 2 + y);
        ctx.lineTo(width, height / 2 + y);
        ctx.moveTo(0, height / 2 - y);
        ctx.lineTo(width, height / 2 - y);
    }
    ctx.stroke();

    // Dibujar los ejes X e Y
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Restaurar el ancho de línea para las marcas y valores
    ctx.lineWidth = 1;
    ctx.fillStyle = "#000";
    for (let i = -valorMaximo; i <= valorMaximo; i++) {
        const x = width / 2 + i * paso;
        const y = height / 2 - i * paso;

        // Redondear los valores a un máximo de dos decimales
        let valorEtiqueta = Math.round(i * 10 / zoom) / 10;

        // Dibujar marcas y valores en el eje X
        if (i !== 0) { // Evitar el origen
            ctx.fillText(valorEtiqueta, x, height / 2 + 20);
            ctx.beginPath();
            ctx.moveTo(x, height / 2 - 10);
            ctx.lineTo(x, height / 2 + 10);
            ctx.stroke();
        }
        // Dibujar marcas y valores en el eje Y
        if (i !== 0) { // Evitar el origen
            ctx.fillText(-valorEtiqueta, width / 2 + 5, y);
            ctx.beginPath();
            ctx.moveTo(width / 2 - 10, y);
            ctx.lineTo(width / 2 + 10, y);
            ctx.stroke();
        }
    }
}

function zoomIn() {
    zoomFactor *= 1.1;
    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
    actualizarNivelZoom();
}

function zoomOut() {
    zoomFactor /= 1.1;
    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
    actualizarNivelZoom();
}

function actualizarNivelZoom() {
    document.getElementById('zoomLevel').textContent = `Zoom: ${zoomFactor.toFixed(1)}x`;
}