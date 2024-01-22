let zoomFactor = 1; // Factor inicial de zoom
let mActual, bActual; // Valores actuales de m y b

// Esta función se llama cuando se hace clic en "Calcular"
function calcularEcuacionLineal() {
    mActual = parseFloat(document.getElementById('m').value);
    bActual = parseFloat(document.getElementById('b').value);

    graficarEcuacionLineal(mActual, bActual, zoomFactor);
}

// Función para graficar la ecuación lineal
function graficarEcuacionLineal(m, b, zoom) {
    const canvas = document.getElementById('graficoCanvas');
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    dibujarEjesConValores(ctx, width, height, zoom);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    // Ajuste para que la línea cubra todo el ancho del canvas
    ctx.moveTo(0, height / 2 - b * zoom * 50);
    ctx.lineTo(width, height / 2 - (m * width / 2 + b) * zoom * 50);
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

// Funciones para manejar el zoom
function zoomIn() {
    zoomFactor *= 1.1;
    graficarEcuacionLineal(mActual, bActual, zoomFactor);
    actualizarNivelZoom();
}

function zoomOut() {
    zoomFactor /= 1.1;
    graficarEcuacionLineal(mActual, bActual, zoomFactor);
    actualizarNivelZoom();
}

function actualizarNivelZoom() {
    document.getElementById('zoomLevel').textContent = `Zoom: ${zoomFactor.toFixed(1)}x`;
}
