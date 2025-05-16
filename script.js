// Detectar el scroll y cambiar la transparencia del header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Agregar clase cuando se hace scroll
    } else {
        header.classList.remove('scrolled'); // Quitar clase cuando se vuelve al inicio
    }
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const fadeInElements = document.querySelectorAll('.benefit, .testimonial, .product-details, #no-decidido');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Scroll automático al hacer clic en los enlaces del menú
document.querySelectorAll('.menu li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        const targetId = link.getAttribute('href').substring(1); // Obtener el ID del destino
        const targetElement = document.getElementById(targetId); // Seleccionar el elemento destino
        if (targetElement) {
            // Añadir un desplazamiento para compensar el header fijo
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sistema de carrusel mejorado con animaciones
const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoSlideInterval;

// Iniciar el carrusel automático
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Cambiar cada 5 segundos
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function updateCarousel() {
    // Eliminar clases activas de todas las imágenes
    images.forEach(img => img.classList.remove('active', 'slide-in-right', 'slide-in-left'));
    
    // Agregar clase activa a la imagen actual con animación
    if (images[currentIndex]) {
        images[currentIndex].classList.add('active');
        
        // Añadir animación basada en la dirección del deslizamiento
        const direction = images[currentIndex].dataset.direction;
        if (direction === 'right') {
            images[currentIndex].classList.add('slide-in-right');
        } else if (direction === 'left') {
            images[currentIndex].classList.add('slide-in-left');
        }
    }
    
    // Actualizar los indicadores
    updateIndicators();
}

function prevSlide() {
    images[currentIndex].dataset.direction = 'left';
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

function nextSlide() {
    images[currentIndex].dataset.direction = 'right';
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function updateIndicators() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === currentIndex);
    });
}

// Configurar listeners para botones de carrusel
prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

// Hacer que los puntos indicadores sean clicables
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index > currentIndex) {
            images[currentIndex].dataset.direction = 'right';
        } else if (index < currentIndex) {
            images[currentIndex].dataset.direction = 'left';
        }
        currentIndex = index;
        updateCarousel();
        stopAutoSlide();
        startAutoSlide();
    });
});

// Detener autoSlide cuando el cursor está sobre el carrusel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// Contador de productos disponibles (efecto psicológico de escasez)
function iniciarContadorDisponibilidad() {
    const productInfo = document.querySelector('.product-info');
    if (!productInfo) return;
    
    const disponibilidadElement = document.createElement('div');
    disponibilidadElement.className = 'product-availability';
    
    // Número inicial aleatorio entre 3 y 10
    const disponibilidadInicial = Math.floor(Math.random() * 8) + 3;
    disponibilidadElement.innerHTML = `<p>¡Solo quedan <span class="availability-count">${disponibilidadInicial}</span> unidades en stock!</p>`;
    
    // Insertar después del precio
    const precioElement = document.querySelector('.product-price');
    if (precioElement) {
        precioElement.after(disponibilidadElement);
    }
    
    // Decrementar aleatoriamente durante la visita
    setTimeout(() => {
        const countElement = document.querySelector('.availability-count');
        if (countElement && parseInt(countElement.textContent) > 1) {
            countElement.textContent = parseInt(countElement.textContent) - 1;
            countElement.classList.add('flash');
            setTimeout(() => {
                countElement.classList.remove('flash');
            }, 1000);
        }
    }, 45000); // 45 segundos después
}

// Añadir al carrito con animación
function añadirAlCarrito() {
    const button = document.querySelector('.product-info .cta-button');
    button.classList.add('button-pressed');
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = '🛒 Producto añadido al carrito';
    document.body.appendChild(notification);
    
    // Animar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Eliminar notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
    
    // Quitar efecto presionado del botón
    setTimeout(() => {
        button.classList.remove('button-pressed');
    }, 300);
}

// Función para ir a la sección de compra
function scrollToCompra() {
    const compraSection = document.getElementById('compra');
    if (compraSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = compraSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Animación del logo al cargar la página
function animarLogo() {
    const logo = document.querySelector('.logo-container img');
    if (logo) {
        logo.classList.add('logo-animation');
    }
}

// Contador de visitas simulado con localStorage
function contadorVisitas() {
    let visits = localStorage.getItem('prosazestos_visits');
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem('prosazestos_visits', visits);
    
    if (visits > 1) {
        // Si es visitante recurrente, mostrar mensaje de bienvenida
        setTimeout(() => {
            const welcomeBack = document.createElement('div');
            welcomeBack.className = 'welcome-back';
            welcomeBack.innerHTML = `<p>¡Bienvenido de nuevo! Esta es tu visita #${visits}.</p>`;
            document.body.appendChild(welcomeBack);
            
            setTimeout(() => {
                welcomeBack.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                welcomeBack.classList.remove('show');
                setTimeout(() => {
                    welcomeBack.remove();
                }, 500);
            }, 4000);
        }, 2000);
    }
}

// Mostrar hora de último pedido (simulado)
function mostrarUltimaCompra() {
    const compraSection = document.getElementById('compra');
    if (!compraSection) return;
    
    const ultimaCompraElement = document.createElement('div');
    ultimaCompraElement.className = 'last-purchase';
    
    // Generar tiempo aleatorio en los últimos 30 minutos
    const minutos = Math.floor(Math.random() * 30) + 1;
    ultimaCompraElement.innerHTML = `<p>Último pedido realizado hace ${minutos} minutos en ${generarCiudadAleatoria()}</p>`;
    
    // Añadir después de la info de compra
    const compraInfo = document.querySelector('.compra-info');
    if (compraInfo) {
        compraInfo.appendChild(ultimaCompraElement);
    }
}

function generarCiudadAleatoria() {
    const ciudades = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Zaragoza'];
    return ciudades[Math.floor(Math.random() * ciudades.length)];
}

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    startAutoSlide();
    updateCarousel();
    animarLogo();
    iniciarContadorDisponibilidad();
    contadorVisitas();
    mostrarUltimaCompra();
    
    // Añadir clases necesarias para animaciones CSS
    document.body.classList.add('js-enabled');
});

// Detectar si el usuario intenta abandonar la página
window.addEventListener('beforeunload', (e) => {
    const isScrolled = window.scrollY > 0;
    const isProduct = document.querySelector('.product-info') !== null;
    
    // Solo mostrar diálogo si el usuario ha bajado y visto el producto
    if (isScrolled && isProduct) {
        // Esto mostrará un diálogo estándar del navegador
        e.preventDefault();
        e.returnValue = '';
    }
});

// Añadir funcionalidad de zoom al pasar el ratón para las imágenes del carrusel
const carouselImages = document.querySelectorAll('.carousel-images img');
carouselImages.forEach(img => {
    img.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = this.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        this.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        this.style.transform = 'scale(1.2)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});