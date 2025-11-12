import './style.css'

const toggleFamilia = document.getElementById('toggleFamilia')
const toggleEmpresa = document.getElementById('toggleEmpresa')
const toggleSlider = document.getElementById('toggleSlider')
const gridContainer = document.getElementById('gridContainer')
const gridTrack = document.getElementById('gridTrack')
const gridFamilia = document.getElementById('gridFamilia')
const gridEmpresa = document.getElementById('gridEmpresa')

const PIXEL_OFFSET = 2

function updateSliderPosition(activeButton) {
    if (!activeButton) return
    const buttonWidth = activeButton.offsetWidth
    const buttonPosition = activeButton.offsetLeft
    toggleSlider.style.width = `${buttonWidth + PIXEL_OFFSET}px`
    toggleSlider.style.transform = `translateX(${buttonPosition}px)`
}

function updateContainerHeight(activeGrid) {
    if (gridContainer && activeGrid) {
        const gridHeight = activeGrid.offsetHeight
        const containerStyles = window.getComputedStyle(gridContainer)
        const paddingTop = parseFloat(containerStyles.paddingTop)
        const paddingBottom = parseFloat(containerStyles.paddingBottom)
        const newTotalHeight = gridHeight + paddingTop + paddingBottom
        gridContainer.style.height = `${newTotalHeight}px`
    }
}

toggleFamilia.addEventListener('click', () => {
    updateSliderPosition(toggleFamilia)
    toggleFamilia.classList.replace('inactive-toggle', 'active-toggle')
    toggleEmpresa.classList.replace('active-toggle', 'inactive-toggle')

    if (gridTrack) {
        gridTrack.style.transform = 'translateX(0%)'
    }

    updateContainerHeight(gridFamilia)
})

toggleEmpresa.addEventListener('click', () => {
    updateSliderPosition(toggleEmpresa)
    toggleEmpresa.classList.replace('inactive-toggle', 'active-toggle')
    toggleFamilia.classList.replace('active-toggle', 'inactive-toggle')

    if (gridTrack) {
        gridTrack.style.transform = 'translateX(-100%)'
    }

    updateContainerHeight(gridEmpresa)
})

document.addEventListener('DOMContentLoaded', () => {
    updateSliderPosition(toggleFamilia)

    setTimeout(() => {
        updateContainerHeight(gridFamilia)
    }, 100)

    const cards = document.querySelectorAll('.clickable-card')
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const front = card.querySelector('.card-front')
            const back = card.querySelector('.card-back')

            card.classList.toggle('bg-white')
            card.classList.toggle('bg-secondary')
            card.classList.toggle('text-secondary')
            card.classList.toggle('text-white')
            front.classList.toggle('hidden')
            front.classList.toggle('flex')
            back.classList.toggle('hidden')
            back.classList.toggle('flex')
        })
    })
})

window.addEventListener('resize', () => {
    let activeGrid

    if (toggleFamilia.classList.contains('active-toggle')) {
        activeGrid = gridFamilia
        updateSliderPosition(toggleFamilia)
    } else {
        activeGrid = gridEmpresa
        updateSliderPosition(toggleEmpresa)
    }

    updateContainerHeight(activeGrid)
})

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('mapa-interactivo', { scrollWheelZoom: false })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map)

    const sucursalIcon = L.icon({ iconUrl: '/logotipoSolo/AS-logo.svg', iconSize: [40, 40] })

    const sucursales = [
        { coords: [-29.1438, -59.2638], label: "<b>Sucursal Goya</b><br>Belgrano 1167" },
        { coords: [-27.4508, -58.9859], label: "<b>Sucursal Resistencia</b><br>Av. Paraguay 157" },
        { coords: [-34.5833, -58.4069], label: "<b>Sucursal Palermo</b><br>Beruti 3450" }
    ]

    const markerList = []

    sucursales.forEach(s => {
        const marker = L.marker(s.coords, { icon: sucursalIcon }).addTo(map).bindPopup(s.label)
        markerList.push(marker)
    })

    const sucursalGroup = L.featureGroup(markerList)
    map.fitBounds(sucursalGroup.getBounds().pad(0.2))

    sucursales.forEach(s => {
        L.marker(s.coords, { icon: sucursalIcon }).addTo(map).bindPopup(s.label)
    })

    const productorIcon = L.icon({ iconUrl: '/items/user.svg', iconSize: [25, 25] })

    const productores = [
        { lat: -27.5, lng: -58.8, zona: 'Corrientes - Capital' },
        { lat: -28.2538, lng: -58.6258, zona: 'Corrientes - Saladas' },
        { lat: -29.7833, lng: -58.0833, zona: 'Corrientes - Curuzu Cuatia' },
        { lat: -29.2, lng: -58.0833, zona: 'Corrientes - Mercedes' },
        { lat: -30.2494, lng: -57.6344, zona: 'Corrientes - Monte Caseros' },
        { lat: -29.7167, lng: -57.0833, zona: 'Corrientes - Paso de los Libres' },
        { lat: -28.55, lng: -56.0333, zona: 'Corrientes - Santo Tome' },
        { lat: -29.175, lng: -56.6414, zona: 'Corrientes - La Cruz' },
        { lat: -29.1128, lng: -56.5556, zona: 'Corrientes - Alvear' },
        { lat: -27.75, lng: -57.6167, zona: 'Corrientes - General Paz' },
        { lat: -30.0667, lng: -58.7667, zona: 'Corrientes - Sauce' },
        { lat: -30.0169, lng: -59.5339, zona: 'Corrientes - Esquina' },
        { lat: -30.2167, lng: -59.3833, zona: 'Corrientes - Pueblo Libertador' },
        { lat: -29.1438, lng: -59.2638, zona: 'Corrientes - Goya' },
        { lat: -27.4514, lng: -58.9867, zona: 'Chaco - Resistencia' },
        { lat: -27.5026, lng: -58.9308, zona: 'Chaco - Barranqueras' },
        { lat: -26.5167, lng: -61.1667, zona: 'Chaco - Pampa del Infierno' },
        { lat: -26.1986, lng: -58.1474, zona: 'Formosa - Formosa Capital' },
        { lat: -25.1311, lng: -58.245, zona: 'Formosa - Laguna Blanca' }
    ]

    const productoresLayer = L.layerGroup()

    productores.forEach(p => {
        L.marker([p.lat, p.lng], { icon: productorIcon })
            .addTo(productoresLayer)
            .bindPopup(`<b>Productor</b><br>${p.zona}`)
    })

    function actualizarProductores() {
        map.addLayer(productoresLayer)
    }

    map.on('zoomend', actualizarProductores)
    actualizarProductores()
})

function animateValue(element, start, end, duration) {
    let startTimestamp = null
    element.style.opacity = '1'
    const step = timestamp => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const currentValue = Math.floor(progress * (end - start) + start)
        element.textContent =
            '+' +
            currentValue.toLocaleString('es-ES', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true
            })
        if (progress < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    )
}

function handleScroll() {
    const numberElements = document.querySelectorAll('.animate-number')
    numberElements.forEach(element => {
        if (!element.hasAnimated && isElementInViewport(element)) {
            element.hasAnimated = true
            const finalValue = parseInt(element.textContent.replace(/[+,]/g, ''))
            animateValue(element, 0, finalValue, 3000)
        }
    })
}

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAnimated) {
                const element = entry.target
                element.hasAnimated = true
                const finalValue = parseInt(element.textContent.replace(/[+,]/g, ''))
                animateValue(element, 0, finalValue, 2000)
                observer.unobserve(element)
            }
        })
    },
    {
        rootMargin: '50px',
        threshold: 0.1
    }
)

document.querySelectorAll('.animate-number').forEach(element => {
    element.style.opacity = '0'
    element.style.transition = 'opacity 0.5s'
    observer.observe(element)
})

const testimonials = [
    {
        quote:
            "Cuando choco los llamo y siempre están ahí acompañándome. ¡Hace años elijo sus servicios porque nos brindan tranquilidad!",
        author: 'ELISA FERRAGUT'
    },
    {
        quote:
            'En todos los siniestros la oficina respondió de manera inmediata, respondiendo las dudas y guiándonos... para contar con el reemplazo... lo antes posible.',
        author: 'ALEJANDRO VALENZUELA LOPEZ'
    },
    {
        quote:
            '¡La atención es excelente! De forma presencial en la agencia de Goya, como así también por teléfono... dando respuesta siempre a las inquietudes.',
        author: 'ZAMPEDRI REINALDO'
    },
    {
        quote:
            'Tuve un siniestro grande hace poco... y valoro mucho la paciencia, la empatía y la predisposición tanto de mi agente... como del resto del equipo.',
        author: 'SAETTONE DAIANA'
    },
    {
        quote:
            'La atención es excelente y rápida. Siempre están pendientes de que tengamos todos los documentos al día y... dispuestos a ayudarnos con lo que sea.',
        author: 'COVIELLA MARIA INES'
    },
    {
        quote: 'La atención es muy buena y siempre resuelven cualquier dificultad que uno tenga con rapidez.',
        author: 'GERARDO FABIAN FARGUEZ'
    },
    {
        quote:
            'Su asesoramiento es preciso y personalizado, destacando la eficiencia y rapidez en la solución de todos los inconvenientes... brindándome continuamente tranquilidad.',
        author: 'JOSE LUIS GORBEÑA'
    },
    {
        quote:
            'La atención es muy buena, rápida y la explicación excelente, se entiende perfectamente. Pude gestionar mis consultas e inquietudes rápido y sin problema.',
        author: 'ZABALA NATALIA'
    },
    {
        quote:
            'Muy buena atención personalizada, siempre con predisposición a resolver los casos pensando en los clientes. Los tiempos de respuestas son muy cortos.',
        author: 'ING ELENA GONZALEZ PERINI'
    },
    {
        quote:
            'Por precio compite cualquiera, pero a la hora de los problemas uno quiere soluciones y siempre encontré una persona que me ayude con eso dentro de tu empresa.',
        author: 'DOBLE CLICK'
    }
]

const quoteElement = document.getElementById('testimonial-quote')
const authorElement = document.getElementById('testimonial-author')

let currentIndex = 0

function showNextTestimonial() {
    quoteElement.classList.add('opacity-0')
    authorElement.classList.add('opacity-0')

    setTimeout(() => {
        const currentTestimonial = testimonials[currentIndex]

        quoteElement.textContent = `"${currentTestimonial.quote}"`
        authorElement.textContent = currentTestimonial.author

        quoteElement.classList.remove('opacity-0')
        authorElement.classList.remove('opacity-0')

        currentIndex = (currentIndex + 1) % testimonials.length
    }, 300)
}

document.addEventListener('DOMContentLoaded', () => {
    if (quoteElement && authorElement) {
        showNextTestimonial()
        setInterval(showNextTestimonial, 5000)
    }
})

const whatsappFloat = document.getElementById('whatsapp-float')

function handleWhatsappFloat() {
  const scrollPosition = window.scrollY
  const showAfter = 300

  if (scrollPosition > showAfter) {
    whatsappFloat.style.opacity = '1'
    whatsappFloat.style.transform = 'translateY(0)'
    whatsappFloat.style.pointerEvents = 'auto'
  } else {
    whatsappFloat.style.opacity = '0'
    whatsappFloat.style.transform = 'translateY(1rem)'
    whatsappFloat.style.pointerEvents = 'none'
  }
}

window.addEventListener('scroll', handleWhatsappFloat)
handleWhatsappFloat()
