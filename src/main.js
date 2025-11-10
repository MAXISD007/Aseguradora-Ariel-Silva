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

    const cards = document.querySelectorAll('.clickable-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const front = card.querySelector('.card-front');
            const back = card.querySelector('.card-back');

            card.classList.toggle('bg-white');
            card.classList.toggle('bg-secondary'); 
            card.classList.toggle('text-secondary');
            card.classList.toggle('text-white');
            front.classList.toggle('hidden');
            front.classList.toggle('flex'); 
            back.classList.toggle('hidden');
            back.classList.toggle('flex'); 
        });
    });
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

// Cantidades

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    element.style.opacity = '1'; // Mostrar el elemento cuando comienza la animación
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        // Usar toLocaleString con configuración específica para asegurar el formato correcto
        element.textContent = "+" + currentValue.toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true
        });
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Función para verificar si un elemento es visible en la ventana
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

// Iniciar animación cuando los elementos sean visibles
function handleScroll() {
    const numberElements = document.querySelectorAll('.animate-number');
    numberElements.forEach(element => {
        if (!element.hasAnimated && isElementInViewport(element)) {
            element.hasAnimated = true;
            // Obtener el valor final del texto actual (eliminar el '+' y las comas)
            const finalValue = parseInt(element.textContent.replace(/[+,]/g, ''));
            animateValue(element, 0, finalValue, 3000); // 2000ms = 2 segundos de duración
        }
    });
}

// Crear un observador de intersección
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAnimated) {
            const element = entry.target;
            element.hasAnimated = true;
            const finalValue = parseInt(element.textContent.replace(/[+,]/g, ''));
            animateValue(element, 0, finalValue, 2000);
            // Dejar de observar el elemento una vez que se ha animado
            observer.unobserve(element);
        }
    });
}, {
    rootMargin: '50px', // Comienza a animar un poco antes de que el elemento sea visible
    threshold: 0.1 // Comienza cuando al menos 10% del elemento es visible
});

// Observar todos los elementos con la clase animate-number
document.querySelectorAll('.animate-number').forEach(element => {
    element.style.opacity = '0'; // Ocultar el número inicial
    element.style.transition = 'opacity 0.5s';
    observer.observe(element);
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