let zoomFactorCuadratica = 1;
let aActual;

function calcularEcuacionCuadratica() {
    aActual = parseFloat(document.getElementById('a').value);
    graficarEcuacionCuadratica(aActual, zoomFactorCuadratica);
}

function graficarEcuacionCuadratica(a, zoom) {
    const canvas = document.getElementById('graficoCuadraticoCanvas');
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpiar el canvas y dibujar el plano cartesiano
    ctx.clearRect(0, 0, width, height);
    dibujarPlanoCartesiano(ctx, width, height);

    // Dibujar la parábola
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let x = -width / 2; x <= width / 2; x++) {
        let y = a * Math.pow((x / zoom), 2);
        ctx.lineTo(width / 2 + x, height / 2 - y);
    }
    ctx.stroke();
}

function zoomInCuadratica() {
    zoomFactorCuadratica *= 1.1;
    graficarEcuacionCuadratica(aActual, zoomFactorCuadratica);
    actualizarNivelZoomCuadratica();
}

function zoomOutCuadratica() {
    zoomFactorCuadratica /= 1.1;
    graficarEcuacionCuadratica(aActual, zoomFactorCuadratica);
    actualizarNivelZoomCuadratica();
}

function actualizarNivelZoomCuadratica() {
    document.getElementById('zoomLevelCuadratica').textContent = `Zoom: ${zoomFactorCuadratica.toFixed(1)}x`;
}

function dibujarPlanoCartesiano(ctx, width, height) {
    // Dibujar los ejes
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Dibujar las líneas del cuadriculado
    ctx.strokeStyle = '#ddd';
    for (let i = 0; i < width; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }
    ctx.stroke();
}
