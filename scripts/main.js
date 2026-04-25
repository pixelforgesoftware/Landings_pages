document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const nav = document.querySelector('.navbar');

    function updateNavbar() {
        if (!nav) return;
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check

    // 2. Mobile Menu
    const mobileBtn = nav.querySelector('.mobile-menu-btn');
    let menuOpen = false;
    // Create the mobile menu div
    const mobileMenuDiv = document.createElement('div');
    mobileMenuDiv.className = "mobile-menu-dropdown";
    mobileMenuDiv.style.display = "none";
    mobileMenuDiv.innerHTML = `
        <a href="#nosotros" class="mobile-nav-link">Nosotros</a>
        <a href="#planes" id="mobile-nav-fibra" class="mobile-nav-link">Fibra Óptica</a>
        <a href="#planes" id="mobile-nav-inalambrico" class="mobile-nav-link">Inalámbrico</a>
        <a href="#contacto" class="mobile-nav-link">Contacto</a>
        <a href="https://wa.me/5492625413267?text=Hola%2C%20me%20comunico%20para%20solicitar%20informaci%C3%B3n%20sobre%20los%20planes%20de%20Internet." target="_blank" rel="noopener noreferrer" class="mobile-btn-contratar">Contratar ahora</a>
    `;
    
    // Add event listeners to the links inside mobile menu to close it
    mobileMenuDiv.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menuOpen = false;
            mobileMenuDiv.style.display = "none";
            updateMobileBtnIcon();
        });
    });

    const navContainer = nav.querySelector('.container');
    if (navContainer) {
        navContainer.appendChild(mobileMenuDiv);
    }

    function updateMobileBtnIcon() {
        if (!mobileBtn) return;
        if (menuOpen) {
            mobileBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
        } else {
            mobileBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileMenuDiv.style.display = menuOpen ? "block" : "none";
            updateMobileBtnIcon();
        });
    }

    // 3. WhatsApp Button
    const waFloatContainer = document.querySelector('.whatsapp-float');
    if (waFloatContainer) {
        let waExpanded = false;
        
        const expandedDiv = document.createElement('div');
        expandedDiv.className = "wa-menu animate-float";
        expandedDiv.style.display = "none";
        expandedDiv.innerHTML = `
            <a href="https://wa.me/5492625413267?text=Hola%2C%20me%20comunico%20para%20solicitar%20informaci%C3%B3n%20sobre%20los%20planes%20de%20Internet." target="_blank" rel="noopener noreferrer" class="wa-option wa-option-sales">
                <div class="wa-option-info">
                    <span class="wa-option-label sales">Ventas & Admin</span>
                    <span class="wa-option-number">2625 41-3267</span>
                </div>
                <div class="wa-option-icon sales">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                </div>
            </a>
            <a href="https://wa.me/5492625414118?text=Hola%2C%20necesito%20asistencia%20t%C3%A9cnica%20con%20mi%20servicio%20de%20Internet." target="_blank" rel="noopener noreferrer" class="wa-option wa-option-tech">
                <div class="wa-option-info">
                    <span class="wa-option-label tech">Guardia Técnica</span>
                    <span class="wa-option-number">2625 41-4118</span>
                </div>
                <div class="wa-option-icon tech">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
            </a>
        `;
        
        waFloatContainer.insertBefore(expandedDiv, waFloatContainer.firstChild);

        const waMainBtn = waFloatContainer.querySelector('button');
        
        function updateWaBtnIcon() {
            if (waExpanded) {
                waMainBtn.innerHTML = '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>';
            } else {
                waMainBtn.innerHTML = '<svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>';
            }
        }

        waMainBtn.addEventListener('click', () => {
            waExpanded = !waExpanded;
            expandedDiv.style.display = waExpanded ? "flex" : "none";
            updateWaBtnIcon();
        });
    }

    // 4. Plans Tab Toggle
    const btnFibra = document.getElementById('fibra');
    const btnInalambrico = document.getElementById('inalambrico');
    const plansSection = btnFibra.closest('.planes-section') || btnFibra.closest('section');
    const plansGridContainer = plansSection.querySelector('.planes-grid');
    const noticeContainer = plansSection.querySelector('.planes-promo');

    const fiberHTML = plansGridContainer.innerHTML;
    const fiberNoticeHTML = noticeContainer.innerHTML;

    const wirelessPlans = [
        {
          speed: "10",
          speedUnit: "Mbps",
          upload: "5 Mbps subida",
          price: "$15.000",
          features: [
            "Conexión inalámbrica",
            "Sujeto a disponibilidad de zona",
            "Soporte técnico 24/7",
            "Instalación incluida",
          ],
        },
        {
          speed: "20",
          speedUnit: "Mbps",
          upload: "5 Mbps subida",
          price: "$19.000",
          popular: true,
          features: [
            "Conexión inalámbrica",
            "Sujeto a disponibilidad de zona",
            "Soporte técnico 24/7",
            "Instalación incluida",
          ],
        },
        {
          speed: "30",
          speedUnit: "Mbps",
          upload: "5 Mbps subida",
          price: "$23.000",
          features: [
            "Conexión inalámbrica",
            "Sujeto a disponibilidad de zona",
            "Soporte técnico 24/7",
            "Instalación incluida",
          ],
        },
    ];

    function generateWirelessHTML() {
        return wirelessPlans.map(plan => `
            <div class="plan-card ${plan.popular ? "featured" : ""}">
                ${plan.popular ? '<div class="plan-badge">⭐ MÁS POPULAR</div>' : ''}
                <div class="plan-card-body">
                    <div class="plan-icon-wrapper">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                    </div>
                    <div class="plan-speed">
                        <span class="plan-speed-val">${plan.speed}</span>
                        <span class="plan-speed-unit">${plan.speedUnit}</span>
                    </div>
                    <div class="text-sm text-gray-400 mb-3" style="color: #9ca3af; font-size: 0.875rem;">↑ ${plan.upload}</div>
                    <div class="plan-type">Inalámbrico</div>
                    <div class="plan-price">
                        <span class="plan-price-val">${plan.price}</span>
                        <span class="plan-price-unit">/mes</span>
                    </div>
                    <ul class="plan-features">
                        ${plan.features.map(f => `
                            <li class="plan-feature">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                                ${f}
                            </li>
                        `).join('')}
                    </ul>
                    <a href="https://wa.me/5492625413267?text=Hola%2C%20me%20comunico%20para%20solicitar%20informaci%C3%B3n%20sobre%20los%20planes%20de%20Internet." target="_blank" rel="noopener noreferrer" class="plan-btn ${plan.popular ? "featured" : ""}">
                        ¡Lo quiero!
                    </a>
                </div>
            </div>
        `).join('');
    }

    const wirelessNoticeHTML = `
        <div class="planes-promo-alert" style="background-color: #eff6ff; border-color: #bfdbfe;">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #3b82f6;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p style="color: #1d4ed8;">
                <strong>Servicio Inalámbrico:</strong> Sujeto a disponibilidad según la zona. Consultanos si tu domicilio tiene cobertura.
            </p>
        </div>
    `;

    btnFibra.addEventListener('click', () => {
        // Update Buttons
        btnFibra.className = "planes-tab active";
        btnInalambrico.className = "planes-tab";
        
        // Update Grid class and content
        plansGridContainer.className = "planes-grid";
        plansGridContainer.innerHTML = fiberHTML;
        
        // Update notice
        noticeContainer.innerHTML = fiberNoticeHTML;
    });

    btnInalambrico.addEventListener('click', () => {
        // Update Buttons
        btnInalambrico.className = "planes-tab active";
        btnFibra.className = "planes-tab";
        
        // Update Grid class and content
        plansGridContainer.className = "planes-grid planes-grid-wireless";
        plansGridContainer.innerHTML = generateWirelessHTML();
        
        // Update notice
        noticeContainer.innerHTML = wirelessNoticeHTML;
    });

    // 5. Navbar Link Tab Switching
    const navFibra = document.getElementById('nav-fibra');
    const navInalambrico = document.getElementById('nav-inalambrico');
    const mobileNavFibra = document.getElementById('mobile-nav-fibra');
    const mobileNavInalambrico = document.getElementById('mobile-nav-inalambrico');

    function switchToFibra() {
        if (!btnFibra.classList.contains('active')) {
            btnFibra.click();
        }
    }

    function switchToInalambrico() {
        if (!btnInalambrico.classList.contains('active')) {
            btnInalambrico.click();
        }
    }

    if (navFibra) navFibra.addEventListener('click', switchToFibra);
    if (navInalambrico) navInalambrico.addEventListener('click', switchToInalambrico);
    if (mobileNavFibra) mobileNavFibra.addEventListener('click', switchToFibra);
    if (mobileNavInalambrico) mobileNavInalambrico.addEventListener('click', switchToInalambrico);

});
