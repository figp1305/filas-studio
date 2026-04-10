/**
 * ============================================
 * FILAS STUDIO - SCRIPT PRINCIPAL
 * ============================================
 * Este archivo maneja:
 * 1. Smooth scroll para enlaces internos (navegación suave)
 * 2. Tracking de conversiones para WhatsApp (simulación de eventos)
 * 3. Protección para enlaces externos (seguridad)
 * 4. Detección de scroll para posibles animaciones futuras
 * ============================================
 */

// ============================================
// 1. SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================
// Selecciona todos los enlaces que empiecen con "#" (anclas internas)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Evita errores si el href es solo "#" o está vacío
        if (targetId === "#" || targetId === "") return;
        
        // Busca el elemento destino en el DOM
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();  // Evita el salto brusco por defecto
            
            // Scroll suave hacia la sección correspondiente
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Opcional: registrar en consola la navegación (útil para debugging)
            console.log(`[Filas Studio] Navegación suave hacia: ${targetId}`);
        }
    });
});

// ============================================
// 2. TRACKING DE CONVERSIONES (WHATSAPP)
// ============================================
// Detecta cualquier clic en botones que lleven a WhatsApp
// Esto es útil para medir leads en Google Analytics, Facebook Pixel, etc.

// Selecciona todos los enlaces que contengan "wa.me" en su href
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

// También incluye el botón flotante (aunque ya tiene wa.me, lo reforzamos)
const allWhatsAppBtns = document.querySelectorAll('.whatsapp-float, .btn-large, .btn-primary');

// Unir ambos selectores para no duplicar eventos
const allConversionBtns = [...whatsappLinks, ...allWhatsAppBtns];

// Eliminar duplicados (por si acaso)
const uniqueBtns = [...new Set(allConversionBtns)];

uniqueBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Aquí puedes enviar eventos a herramientas de analítica
        // Ejemplo con Google Analytics (gtag) - descomenta si tienes GA instalado
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CAMPAIGN_KEY',
                'value': 1.0,
                'currency': 'COP'
            });
        }
        */
        
        // Ejemplo con Facebook Pixel (fbq)
        /*
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Click WhatsApp Filas Studio'
            });
        }
        */
        
        // Registro en consola para verificar que el tracking funciona
        console.log('[Filas Studio] Lead capturado: clic en WhatsApp - Potencial cliente');
        
        // Opcional: Mostrar un pequeño mensaje o evento de analytics
        // Puedes personalizar este log para enviar datos a tu CRM
    });
});

// ============================================
// 3. SEGURIDAD: ENLACES EXTERNOS CON ATRIBUTO REL
// ============================================
// Asegura que todos los enlaces externos tengan rel="noopener noreferrer"
// Esto mejora la seguridad y el rendimiento.
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
        console.log(`[Filas Studio] Seguridad aplicada a: ${link.href}`);
    }
});

// ============================================
// 4. DETECCIÓN DE SCROLL (PARA FUTURAS ANIMACIONES)
// ============================================
// Este código puede servir para agregar efectos cuando el usuario hace scroll
// Por ejemplo: cambiar opacidad del header, animar elementos al aparecer, etc.

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ejemplo: si quieres ocultar/mostrar header al hacer scroll (descomentar si se necesita)
    /*
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll hacia abajo - ocultar header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba - mostrar header
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
    */
    
    // Por ahora solo registramos la posición (útil para debugging)
    if (scrollTop > 200) {
        // El usuario ha bajado bastante, podrías activar un botón flotante o algo
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// ============================================
// 5. INICIALIZACIÓN: MENSAJE DE BIENVENIDA EN CONSOLA
// ============================================
console.log(`
%c✨ Filas Studio - Performance Digital ✨
%cTransformamos filas de datos en filas de clientes
%cSitio web optimizado para conversión | Diseño minimalista 2025
`, 'color: #0052FF; font-size: 14px; font-weight: bold;', 'color: #0A0A0A; font-size: 12px;', 'color: #5A6A7F; font-size: 10px;');

// ============================================
// 6. (OPCIONAL) PREVENCIÓN DE FORMULARIOS INCOMPLETOS
// ============================================
// Si en el futuro agregas un formulario, este script puede validarlo.
// Por ahora no hay formulario, pero queda la estructura comentada.
/*
function validateForm(formId) {
    const form = document.getElementById(formId);
    if(form) {
        form.addEventListener('submit', (e) => {
            // Validaciones personalizadas
            console.log('[Filas Studio] Formulario enviado');
        });
    }
}
*/