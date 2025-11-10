import './style.css'

const toggleFamilia = document.getElementById('toggleFamilia');
const toggleEmpresa = document.getElementById('toggleEmpresa');
const toggleSlider = document.getElementById('toggleSlider');
const gridContainer = document.getElementById('gridContainer');
const gridTrack = document.getElementById('gridTrack');
const gridFamilia = document.getElementById('gridFamilia');
const gridEmpresa = document.getElementById('gridEmpresa');

const PIXEL_OFFSET = 2;

function updateSliderPosition(activeButton) {
    if (!activeButton) return;
    const buttonWidth = activeButton.offsetWidth;
    const buttonPosition = activeButton.offsetLeft;
    toggleSlider.style.width = `${buttonWidth + PIXEL_OFFSET}px`;
    toggleSlider.style.transform = `translateX(${buttonPosition}px)`;
}

function updateContainerHeight(activeGrid) {
    if (gridContainer && activeGrid) {
        const gridHeight = activeGrid.offsetHeight;
        const containerStyles = window.getComputedStyle(gridContainer);
        const paddingTop = parseFloat(containerStyles.paddingTop);
        const paddingBottom = parseFloat(containerStyles.paddingBottom);
        const newTotalHeight = gridHeight + paddingTop + paddingBottom;
        gridContainer.style.height = `${newTotalHeight}px`;
    }
}

toggleFamilia.addEventListener('click', () => {
    updateSliderPosition(toggleFamilia);
    toggleFamilia.classList.replace('inactive-toggle', 'active-toggle');
    toggleEmpresa.classList.replace('active-toggle', 'inactive-toggle');

    if (gridTrack) {
        gridTrack.style.transform = 'translateX(0%)';
    }

    updateContainerHeight(gridFamilia);
});

toggleEmpresa.addEventListener('click', () => {
    updateSliderPosition(toggleEmpresa);
    toggleEmpresa.classList.replace('inactive-toggle', 'active-toggle');
    toggleFamilia.classList.replace('active-toggle', 'inactive-toggle');

    if (gridTrack) {
        gridTrack.style.transform = 'translateX(-100%)';
    }

    updateContainerHeight(gridEmpresa);
});


document.addEventListener('DOMContentLoaded', () => {
    updateSliderPosition(toggleFamilia);

    setTimeout(() => {
        updateContainerHeight(gridFamilia);
    }, 100);
});


window.addEventListener('resize', () => {
    let activeGrid;
    
    if (toggleFamilia.classList.contains('active-toggle')) {
        activeGrid = gridFamilia;
        updateSliderPosition(toggleFamilia);
    } else {
        activeGrid = gridEmpresa;
        updateSliderPosition(toggleEmpresa);
    }
    
    updateContainerHeight(activeGrid);
});