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

// Experiencias

const testimonials = [
    {
        quote: "Cuando choco los llamo y siempre están ahí acompañándome. ¡Hace años elijo sus servicios porque nos brindan tranquilidad!",
        author: "ELISA FERRAGUT"
    },
    {
        quote: "En todos los siniestros la oficina respondió de manera inmediata, respondiendo las dudas y guiándonos... para contar con el reemplazo... lo antes posible.",
        author: "ALEJANDRO VALENZUELA LOPEZ"
    },
    {
        quote: "¡La atención es excelente! De forma presencial en la agencia de Goya, como así también por teléfono... dando respuesta siempre a las inquietudes.",
        author: "ZAMPEDRI REINALDO"
    },
    {
        quote: "Tuve un siniestro grande hace poco... y valoro mucho la paciencia, la empatía y la predisposición tanto de mi agente... como del resto del equipo.",
        author: "SAETTONE DAIANA"
    },
    {
        quote: "La atención es excelente y rápida. Siempre están pendientes de que tengamos todos los documentos al día y... dispuestos a ayudarnos con lo que sea.",
        author: "COVIELLA MARIA INES"
    },
    {
        quote: "La atención es muy buena y siempre resuelven cualquier dificultad que uno tenga con rapidez.",
        author: "GERARDO FABIAN FARGUEZ"
    },
    {
        quote: "Su asesoramiento es preciso y personalizado, destacando la eficiencia y rapidez en la solución de todos los inconvenientes... brindándome continuamente tranquilidad.",
        author: "JOSE LUIS GORBEÑA"
    },
    {
        quote: "La atención es muy buena, rápida y la explicación excelente, se entiende perfectamente. Pude gestionar mis consultas e inquietudes rápido y sin problema.",
        author: "ZABALA NATALIA"
    },
    {
        quote: "Muy buena atención personalizada, siempre con predisposición a resolver los casos pensando en los clientes. Los tiempos de respuestas son muy cortos.",
        author: "ING ELENA GONZALEZ PERINI"
    },
    {
        quote: "Por precio compite cualquiera, pero a la hora de los problemas uno quiere soluciones y siempre encontré una persona que me ayude con eso dentro de tu empresa.",
        author: "DOBLE CLICK"
    }
];


const quoteElement = document.getElementById('testimonial-quote');
const authorElement = document.getElementById('testimonial-author');

let currentIndex = 0;

function showNextTestimonial() {
    quoteElement.classList.add('opacity-0');
    authorElement.classList.add('opacity-0');

    setTimeout(() => {
        const currentTestimonial = testimonials[currentIndex];
        
        quoteElement.textContent = `"${currentTestimonial.quote}"`;
        authorElement.textContent = currentTestimonial.author;

        quoteElement.classList.remove('opacity-0');
        authorElement.classList.remove('opacity-0');

        currentIndex = (currentIndex + 1) % testimonials.length;
    }, 300);
}


document.addEventListener('DOMContentLoaded', () => {
    if (quoteElement && authorElement) {
        showNextTestimonial();
        setInterval(showNextTestimonial, 5000);
    }
});