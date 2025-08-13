// Funcionalidad principal de la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initMobileMenu();
    initSmoothScrolling();
    loadSectionContent();
    initScrollAnimations();
});

// Menú móvil hamburguesa
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll suave para la navegación
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el header fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cargar contenido de las secciones
async function loadSectionContent() {
    loadData();
}

// Datos de ejemplo para mostrar la funcionalidad
function loadData() {
    const sampleProyectos = [
    ];

    const sampleLaboratorios = [
    ];

    const sampleCasosEstudio = [
        {
        "title": "Caso de Estudio 01: Tour de France",
        "description": "Análisis de datos de la carrera ciclista más importante del mundo.",
        "tags": ["CRIPS-DM", "Entendimiento de Negocio", "Entendimiento de datos"],
        "link": "casos-estudio/caso-estudio01.html",
        "company": "UVG",
        "industry": "EDA"
        }
    ];

    const sampleTalleres = [
    ];

    renderCards('proyectos-content', sampleProyectos);
    renderCards('laboratorios-content', sampleLaboratorios);
    renderCards('casos-estudio-content', sampleCasosEstudio);
    renderCards('talleres-content', sampleTalleres);
}

// Renderizar tarjetas en el DOM
function renderCards(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cardsHTML = data.map(item => {
        // Información adicional específica por tipo de contenido
        let extraInfo = '';
        
        if (item.status) {
            extraInfo += `<span class="card-status ${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>`;
        }
        
        if (item.difficulty) {
            extraInfo += `<span class="card-difficulty">${item.difficulty}</span>`;
        }
        
        if (item.duration) {
            extraInfo += `<span class="card-duration">${item.duration}</span>`;
        }
        
        if (item.company) {
            extraInfo += `<span class="card-company">${item.company}</span>`;
        }
        
        if (item.level) {
            extraInfo += `<span class="card-level">${item.level}</span>`;
        }

        return `
            <div class="card fade-in-up">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ${extraInfo ? `<div class="card-meta">${extraInfo}</div>` : ''}
                <a href="${item.link}" class="card-link">Ver más</a>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHTML;
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas para animaciones
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
}

// Función para agregar nuevo contenido (útil para futuras expansiones)
function addNewItem(section, item) {
    const container = document.getElementById(`${section}-content`);
    if (!container) return;

    const cardHTML = `
        <div class="card fade-in-up">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <div class="card-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${item.link}" class="card-link">Ver más</a>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHTML);
}

// Función para filtrar contenido (para futuras mejoras)
function filterContent(section, filterTag) {
    const cards = document.querySelectorAll(`#${section}-content .card`);
    
    cards.forEach(card => {
        const tags = card.querySelectorAll('.tag');
        const hasTag = Array.from(tags).some(tag => 
            tag.textContent.toLowerCase().includes(filterTag.toLowerCase())
        );
        
        if (filterTag === '' || hasTag) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
