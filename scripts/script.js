/**
 * SF Plus! Vanilla Interactive Logic - V2
 */

// --- Data ---
const channelData = [
    // Deportes
    { name: "ESPN", category: "deportes", logo: "espn-ar.png" },
    { name: "ESPN 2", category: "deportes", logo: "espn-2-ar.png" },
    { name: "ESPN 3", category: "deportes", logo: "espn-3-ar.png" },
    { name: "ESPN 4", category: "deportes", logo: "espn-4-ar.png" },
    { name: "ESPN Premium", category: "deportes", logo: "espn-premium-ar.png" },
    { name: "Fox Sports", category: "deportes", logo: "fox-sports-ar.png" },
    { name: "Fox Sports 2", category: "deportes", logo: "fox-sports-2-ar.png" },
    { name: "Fox Sports 3", category: "deportes", logo: "fox-sports-3-ar.png" },
    { name: "TyC Sports", category: "deportes", logo: "tyc-sports-ar.png" },
    { name: "TNT Sports", category: "deportes", logo: "tnt-sports-ar.png" },
    { name: "DeporTV", category: "deportes", logo: "deportv-ar.png" },
    { name: "Claro Sports", category: "deportes", logo: "claro-sports-ar.png" },
    { name: "América Sports", category: "deportes", logo: "america-sports-ar.png" },
    
    // Nacionales
    { name: "Telefe", category: "nacionales", logo: "telefe-ar.png" },
    { name: "El Trece", category: "nacionales", logo: "eltrece-ar.png" },
    { name: "El Nueve", category: "nacionales", logo: "elnueve-ar.png" },
    { name: "TV Pública", category: "nacionales", logo: "television-publica-ar.png" },
    { name: "América TV", category: "nacionales", logo: "america-ar.png" },
    { name: "A24", category: "nacionales", logo: "a24-ar.png" },
    { name: "C5N", category: "nacionales", logo: "c5n-ar.png" },
    { name: "TN", category: "nacionales", logo: "tn-todo-noticias-ar.png" },
    { name: "Canal 26", category: "nacionales", logo: "canal-26-ar.png" },
    { name: "Crónica", category: "nacionales", logo: "cronica-ar.png" },
    { name: "LN+", category: "nacionales", logo: "ln-mas-ar.png" },

    // Entretenimiento (Cine & Series)
    { name: "Star Channel", category: "entretenimiento", logo: "star-channel-ar.png" },
    { name: "FX", category: "entretenimiento", logo: "fx-ar.png" },
    { name: "AXN", category: "entretenimiento", logo: "axn-ar.png" },
    { name: "Cinemax", category: "entretenimiento", logo: "cinemax-ar.png" },
    { name: "TNT", category: "entretenimiento", logo: "tnt-ar.png" },
    { name: "Cinecanal", category: "entretenimiento", logo: "cine-canal-ar.png" },
    { name: "Warner TV", category: "entretenimiento", logo: "warner-tv-ar.png" },
    { name: "Paramount", category: "entretenimiento", logo: "paramount-ar.png" },
    { name: "Universal TV", category: "entretenimiento", logo: "universal-tv-ar.png" },
    { name: "Sony Channel", category: "entretenimiento", logo: "sony-channel-ar.png" },
    { name: "Space", category: "entretenimiento", logo: "space-ar.png" },
    { name: "Comedy Central", category: "entretenimiento", logo: "comedy-central-ar.png" },
    { name: "Volver", category: "entretenimiento", logo: "volver-ar.png" },
    { name: "A&E", category: "entretenimiento", logo: "ae-ar.png" },

    // Infantiles
    { name: "Disney Channel", category: "infantiles", logo: "disney-channel-ar.png" },
    { name: "Disney Jr", category: "infantiles", logo: "disney-jr-ar.png" },
    { name: "Nickelodeon", category: "infantiles", logo: "nickelodeon-ar.png" },
    { name: "Nick Jr", category: "infantiles", logo: "nick-jr-ar.png" },
    { name: "Cartoon Network", category: "infantiles", logo: "cartoon-network-ar.png" },
    { name: "Cartoonito", category: "infantiles", logo: "cartoonito-ar.png" },
    { name: "Discovery Kids", category: "infantiles", logo: "discovery-kids-ar.png" },
    { name: "Paka Paka", category: "infantiles", logo: "paka-paka-ar.png" },
    { name: "Baby TV", category: "infantiles", logo: "baby-tv-ar.png" },
    { name: "Plim Plim", category: "infantiles", logo: "plim-plim-ar.png" },
    { name: "Tooncast", category: "infantiles", logo: "tooncast-ar.png" },
    { name: "ZooMoo", category: "infantiles", logo: "zoo-moo-ar.png" },

    // Documentales (Cultura)
    { name: "Discovery Channel", category: "documentales", logo: "discovery-channel-ar.png" },
    { name: "Animal Planet", category: "documentales", logo: "animal-planet-ar.png" },
    { name: "Nat Geo", category: "documentales", logo: "natgeo-ar.png" },
    { name: "History", category: "documentales", logo: "history-ar.png" },
    { name: "History 2", category: "documentales", logo: "history-2-ar.png" },
    { name: "Discovery Science", category: "documentales", logo: "discovery-science-ar.png" },
    { name: "Discovery Turbo", category: "documentales", logo: "discovery-turbo-ar.png" },
    { name: "H&H", category: "documentales", logo: "hh-discovery-ar.png" },
    { name: "Encuentro", category: "documentales", logo: "canal-encuentro-ar.png" },

    // Variedades (en Entretenimiento por ahora)
    { name: "El Gourmet", category: "entretenimiento", logo: "el-gourmet-ar.png" },
    { name: "Food Network", category: "entretenimiento", logo: "food-network-ar.png" },
    { name: "Canal Rural", category: "entretenimiento", logo: "canal-rural-ar.png" },
    { name: "Chacra TV", category: "entretenimiento", logo: "chacra-tv-ar.png" }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initHeroGrid();
    renderChannels('all');
    initIntersectionObserver();
    initNavbar();
    initTabs();
    initWhatsApp();
});

// --- Hero Grid (TV Mockup) ---
function initHeroGrid() {
    const grid = document.getElementById('hero-tv-grid');
    if (!grid) return;

    // Fill the TV with some channel boxes
    const gridChannels = [
        "espn-ar.png", "telefe-ar.png", "star-channel-ar.png", "disney-channel-ar.png",
        "espn-premium-ar.png", "eltrece-ar.png", "tnt-ar.png", "nickelodeon-ar.png",
        "tyc-sports-ar.png", "elnueve-ar.png", "warner-tv-ar.png", "discovery-kids-ar.png",
        "fox-sports-ar.png", "america-ar.png", "cinemax-ar.png", "cartoon-network-ar.png"
    ];

    gridChannels.forEach(logo => {
        const box = document.createElement('div');
        box.className = 'tv-channel-slot';
        box.innerHTML = `<img src="assets/${logo}" alt="Channel" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.7;">`;
        grid.appendChild(box);
    });
}

// --- Channel Rendering ---
function renderChannels(category) {
    const container = document.getElementById('channels-container');
    if (!container) return;

    const filtered = category === 'all' 
        ? channelData 
        : channelData.filter(ch => ch.category === category);

    container.innerHTML = '';

    filtered.forEach((ch, index) => {
        const card = document.createElement('div');
        card.className = `channel-card reveal`;
        card.style.transitionDelay = `${(index % 8) * 0.05}s`;
        
        card.innerHTML = `
            <div class="hd-badge">HD</div>
            <div class="channel-logo-container">
                <img src="assets/${ch.logo}" alt="${ch.name}" class="channel-logo-img">
            </div>
            <div class="channel-name">${ch.name}</div>
        `;
        container.appendChild(card);
    });

    // Re-observe new elements
    setTimeout(() => {
        initIntersectionObserver();
    }, 50);
}

// --- Intersection Observer (Scroll Reveals) ---
function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// --- Navbar & Mobile Toggle ---
function initNavbar() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-close');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if (toggle && mobileMenu) {
        toggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        }

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }
}

// --- Tabs ---
function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter channels
            const category = btn.getAttribute('data-category');
            renderChannels(category);
        });
    });
}
// --- WhatsApp Interactive Menu ---
function initWhatsApp() {
    const waFloatContainer = document.querySelector('.whatsapp-float');
    if (!waFloatContainer) return;

    let waExpanded = false;
    
    // Create the menu
    const expandedDiv = document.createElement('div');
    expandedDiv.className = "wa-menu";
    expandedDiv.innerHTML = `
        <a href="https://wa.me/5492625413267?text=Hola!%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20planes%20de%20SF%20Plus!%20TV." target="_blank" rel="noopener noreferrer" class="wa-option wa-option-sales">
            <div class="wa-option-info">
                <span class="wa-option-label sales">Ventas & Admin</span>
                <span class="wa-option-number">2625 41-3267</span>
            </div>
            <div class="wa-option-icon sales">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
            </div>
        </a>
        <a href="https://wa.me/5492625414118?text=Hola!%20Necesito%20soporte%20t%C3%A9cnico%20con%20mi%20servicio%20de%20SF%20Plus!%20TV." target="_blank" rel="noopener noreferrer" class="wa-option wa-option-tech">
            <div class="wa-option-info">
                <span class="wa-option-label tech">Guardia Técnica</span>
                <span class="wa-option-number">2625 41-4118</span>
            </div>
            <div class="wa-option-icon tech">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
        </a>
    `;
    
    waFloatContainer.insertBefore(expandedDiv, waFloatContainer.firstChild);

    const waMainBtn = waFloatContainer.querySelector('.whatsapp-btn');
    
    function updateWaBtnIcon() {
        if (waExpanded) {
            waMainBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        } else {
            waMainBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width: 32px; height: 32px;"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
        }
    }

    waMainBtn.addEventListener('click', () => {
        waExpanded = !waExpanded;
        expandedDiv.classList.toggle('active', waExpanded);
        waMainBtn.classList.toggle('active', waExpanded);
        updateWaBtnIcon();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!waFloatContainer.contains(e.target) && waExpanded) {
            waExpanded = false;
            expandedDiv.classList.remove('active');
            waMainBtn.classList.remove('active');
            updateWaBtnIcon();
        }
    });
}
