import './style.css'
// --- Elementos del DOM ---
const toggleFamilia = document.getElementById('toggleFamilia');
const toggleEmpresa = document.getElementById('toggleEmpresa');
const toggleSlider = document.getElementById('toggleSlider');
const gridFamilia = document.getElementById('gridFamilia');
const gridEmpresa = document.getElementById('gridEmpresa');

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
    // 1. Mover el slider al botón "Familia"
    updateSliderPosition(toggleFamilia);
    
    // 2. Cambiar clases de los botones
    toggleFamilia.classList.replace('inactive-toggle', 'active-toggle');
    toggleEmpresa.classList.replace('active-toggle', 'inactive-toggle');

    // 3. Mostrar/ocultar grids
    if (gridFamilia && gridEmpresa) { // Comprobamos que existan
        gridFamilia.classList.remove('hidden');
        gridEmpresa.classList.add('hidden');
    }
});

toggleEmpresa.addEventListener('click', () => {
    // 1. Mover el slider al botón "Empresa"
    updateSliderPosition(toggleEmpresa);
    
    // 2. Cambiar clases de los botones
    toggleEmpresa.classList.replace('inactive-toggle', 'active-toggle');
    toggleFamilia.classList.replace('active-toggle', 'inactive-toggle');

    // 3. Mostrar/ocultar grids
    if (gridFamilia && gridEmpresa) { // Comprobamos que existan
        gridEmpresa.classList.remove('hidden');
        gridFamilia.classList.add('hidden');
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