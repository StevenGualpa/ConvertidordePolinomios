let zoomFactor = 1;
let aActual, bActual, cActual, nActual, mActual, pActual;

function calcularEcuacionPolinomicaGeneral() {
    aActual = parseFloat(document.getElementById('a').value);
    nActual = parseFloat(document.getElementById('n').value);
    bActual = parseFloat(document.getElementById('b').value);
    mActual = parseFloat(document.getElementById('m').value);
    cActual = parseFloat(document.getElementById('c').value);
    pActual = parseFloat(document.getElementById('p').value);

    graficarEcuacionPolinomicaGeneral(aActual, nActual, bActual, mActual, cActual, pActual, zoomFactor);
}

function graficarEcuacionPolinomicaGeneral(a, n, b, m, c, p, zoom) {
    const canvas = document.getElementById('graficoCanvas');
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    dibujarEjesConValores(ctx, width, height, zoom);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let x = 0; x <= width; x++) {
        let xCalc = (x - width / 2) / (50 / zoom);
        let y = a * Math.pow(xCalc, n) + b * Math.pow(xCalc, m) + c * Math.pow(xCalc, p);
        ctx.lineTo(x, height / 2 - y * zoom * 50);
    }
    ctx.stroke();
}

function dibujarEjesConValores(ctx, width, height, zoom) {
    const paso = 50 * zoom;
    const valorMaximo = (width / 2) / paso;

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

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillStyle = "#000";
    for (let i = -valorMaximo; i <= valorMaximo; i++) {
        const x = width / 2 + i * paso;
        const y = height / 2 - i * paso;

        let valorEtiqueta = Math.round(i * 10 / zoom) / 10;
        if (i !== 0) {
            ctx.fillText(valorEtiqueta, x, height / 2 + 20);
            ctx.beginPath();
            ctx.moveTo(x, height / 2 - 10);
            ctx.lineTo(x, height / 2 + 10);
            ctx.stroke();
        }
        if (i !== 0) {
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
    graficarEcuacionPolinomicaGeneral(aActual, nActual, bActual, mActual, cActual, pActual, zoomFactor);
    actualizarNivelZoom();
}

function zoomOut() {
    zoomFactor /= 1.1;
    graficarEcuacionPolinomicaGeneral(aActual, nActual, bActual, mActual, cActual, pActual, zoomFactor);
    actualizarNivelZoom();
}

function actualizarNivelZoom() {
    document.getElementById('zoomLevel').textContent = `Zoom: ${zoomFactor.toFixed(1)}x`;
}
