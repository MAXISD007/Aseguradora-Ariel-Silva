import './style.css'
// --- Elementos del DOM ---
const toggleFamilia = document.getElementById('toggleFamilia');
const toggleEmpresa = document.getElementById('toggleEmpresa');
const toggleSlider = document.getElementById('toggleSlider');
const gridTrack = document.getElementById('gridTrack');

const PIXEL_OFFSET = 2;

/**
 * Función que mueve el slider al botón que esté activo.
 * Mide el ancho y la posición del botón y se los aplica al slider.
 */
function updateSliderPosition(activeButton) {
    if (!activeButton) return;

    // Obtenemos el ancho exacto del botón
    const buttonWidth = activeButton.offsetWidth;
    // Obtenemos la posición exacta del botón (cuántos píxeles desde la izquierda)
    const buttonPosition = activeButton.offsetLeft;

    // Aplicamos esos valores al slider
    toggleSlider.style.width = `${buttonWidth + PIXEL_OFFSET}px`;
    toggleSlider.style.transform = `translateX(${buttonPosition}px)`;
}

// --- Event Listeners para los Clicks ---

toggleFamilia.addEventListener('click', () => {
    // 1. Mover el slider (esto queda igual)
    updateSliderPosition(toggleFamilia);
    
    // 2. Cambiar clases de los botones (esto queda igual)
    toggleFamilia.classList.replace('inactive-toggle', 'active-toggle');
    toggleEmpresa.classList.replace('active-toggle', 'inactive-toggle');

    // 3. ¡CAMBIO AQUÍ! Mover el track de grillas a la posición 0
    if (gridTrack) {
        gridTrack.style.transform = 'translateX(0%)';
    }
});

toggleEmpresa.addEventListener('click', () => {
    // 1. Mover el slider (esto queda igual)
    updateSliderPosition(toggleEmpresa);
    
    // 2. Cambiar clases de los botones (esto queda igual)
    toggleEmpresa.classList.replace('inactive-toggle', 'active-toggle');
    toggleFamilia.classList.replace('active-toggle', 'inactive-toggle');

    // 3. ¡CAMBIO AQUÍ! Mover el track de grillas a la posición -100%
    if (gridTrack) {
        gridTrack.style.transform = 'translateX(-100%)';
    }
});

// --- Estado Inicial ---

// Cuando la página cargue, posiciona el slider en el botón activo por defecto ("Familia")
// Usamos 'DOMContentLoaded' para asegurarnos de que los elementos se hayan renderizado
// y tengan un 'offsetWidth' y 'offsetLeft' válidos.
document.addEventListener('DOMContentLoaded', () => {
    updateSliderPosition(toggleFamilia);
});

// (Opcional pero recomendado) Si la ventana cambia de tamaño, 
// re-calculamos la posición del slider para que no se desajuste.
window.addEventListener('resize', () => {
    // Comprueba cuál botón está activo actualmente y re-calcula
    if (toggleFamilia.classList.contains('active-toggle')) {
        updateSliderPosition(toggleFamilia);
    } else {
        updateSliderPosition(toggleEmpresa);
    }
});