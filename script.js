/**
 * ============================================
 * FILAS STUDIO - SCRIPT PRINCIPAL
 * ============================================
 * FUNCIONES:
 * 1. Smooth scroll para navegación suave
 * 2. Tracking de conversiones (WhatsApp)
 * 3. Seguridad en enlaces externos
 * 4. Animaciones al hacer scroll
 * 5. Log de bienvenida para emprendedores
 * ============================================
 */

// ============================================
// 1. SMOOTH SCROLL (NAVEGACIÓN SUAVE)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            console.log(`[Filas Studio] Navegación a: ${targetId}`);
        }
    });
});

// ============================================
// 2. TRACKING DE CONVERSIONES (WHATSAPP)
// ============================================
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
const allCtaBtns = document.querySelectorAll('.whatsapp-float, .btn-large, .btn-primary, .service-cta');
const allConversionBtns = [...new Set([...whatsappLinks, ...allCtaBtns])];

allConversionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Registro de lead potencial
        console.log('[Filas Studio] 🎯 Lead capturado: emprendedor interesado');
        
        // Aquí puedes agregar eventos de Google Analytics o Facebook Pixel
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CAMPAIGN_KEY'
            });
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Contacto Filas Studio'
            });
        }
        */
    });
});

// ============================================
// 3. SEGURIDAD EN ENLACES EXTERNOS
// ============================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ============================================
// 4. ANIMACIONES AL HACER SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a tarjetas de servicios y pasos
document.querySelectorAll('.service-card, .step-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// 5. LOG DE BIENVENIDA PARA EMPRENDEDORES
// ============================================
console.log(`
%c✨ Filas Studio - Agencia para Emprendedores ✨
%c🎯 Especialistas en pequeños negocios en Colombia y Venezuela
%c💰 Pagas por nuestro trabajo. Tú controlas tu inversión en anuncios.
%c🚀 Configuración | Diseños | Landing Pages
`, 'color: #0052FF; font-size: 14px; font-weight: bold;', 'color: #0A0A0A; font-size: 12px;', 'color: #5A6A7F; font-size: 11px;', 'color: #0052FF; font-size: 11px;');

// ============================================
// 6. ACTUALIZAR AÑO EN FOOTER AUTOMÁTICAMENTE
// ============================================
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}
