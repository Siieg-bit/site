/**
 * MANUS AI - SALES PAGE SCRIPT
 * Product Selection & WhatsApp Integration
 * 
 * EDITABLE VARIABLES (Easy to change)
 */

// ============================================
// 1. EDITABLE VARIABLES
// ============================================

const CONFIG = {
    // WhatsApp phone number (edit this with your number)
    // Format: country code + area code + number (without spaces or special chars)
    telefone: "5517992506437", // WhatsApp number
    
    // Brand name
    marca: "Sieg Store",
    
    // Page title
    titulo_pagina: "Manus AI - Créditos e Pacotes",
    
    // Stock data for each product
    // Update these values as needed
    estoque: {
        "Conta com Assinatura Plus por 7 dias + 5 MIL CRÉDITOS - R$15,00": 100,
        "Recarga - 2.500 CRÉDITOS - R$5,99": 99,
        "Recarga - 5.000 CRÉDITOS - R$10,00": 49,
        "Recarga - 10.000 CRÉDITOS + 1k BÔNUS - R$20,00": 57,
        "Recarga - 20.000 CRÉDITOS + 2k BÔNUS - R$34,99": 95,
        "Recarga - 30.000 CRÉDITOS + 3k BÔNUS - R$49,99": 96,
        "Recarga - 40.000 CRÉDITOS + 4k BÔNUS - R$64,99": 96,
        "Recarga - 50.000 CRÉDITOS + 5k BÔNUS - R$79,99": 96
    }
};

// ============================================
// 2. DOM ELEMENTS
// ============================================

const selectElement = document.getElementById("item");
const btnComprar = document.getElementById("btnComprar");
const stockInfo = document.getElementById("stockInfo");

// ============================================
// 3. INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("✓ Page loaded successfully");
    console.log("✓ WhatsApp Number: " + CONFIG.telefone);
    console.log("✓ Brand: " + CONFIG.marca);
    
    // Initialize event listeners
    setupEventListeners();
    
    // Setup product card click listeners
    setupProductCardListeners();
    
    // Setup navigation links
    setupNavigationLinks();
    
    // Set page title if needed
    document.title = CONFIG.titulo_pagina;
});

// ============================================
// 4. EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Product selection change event
    selectElement.addEventListener("change", handleProductChange);
    
    // Buy button click event
    btnComprar.addEventListener("click", handleBuyClick);
    
    // Keyboard support
    selectElement.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleBuyClick();
        }
    });
}

// ============================================
// 5. PRODUCT SELECTION HANDLER
// ============================================

function handleProductChange() {
    const selectedValue = selectElement.value;
    
    if (selectedValue === "") {
        // No product selected
        btnComprar.disabled = true;
        updateStockInfo(null);
        console.log("ℹ No product selected");
    } else {
        // Product selected
        btnComprar.disabled = false;
        updateStockInfo(selectedValue);
        console.log("✓ Product selected: " + selectedValue);
    }
}

// ============================================
// 6. STOCK INFO UPDATE
// ============================================

function updateStockInfo(productName) {
    if (!productName) {
        stockInfo.innerHTML = '<p class="stock-text">Selecione um pacote para ver a disponibilidade</p>';
        return;
    }
    
    const quantidade = CONFIG.estoque[productName];
    
    if (quantidade === undefined) {
        stockInfo.innerHTML = '<p class="stock-text">Informação de estoque indisponível</p>';
        return;
    }
    
    let stockStatus = "";
    let stockClass = "";
    
    if (quantidade === 0) {
        stockStatus = "❌ Fora de estoque";
        stockClass = "out-of-stock";
        btnComprar.disabled = true;
    } else if (quantidade <= 10) {
        stockStatus = `⚠️ ${quantidade} em estoque (Últimas unidades!)`;
        stockClass = "low-stock";
        btnComprar.disabled = false;
    } else {
        stockStatus = `✓ ${quantidade} em estoque`;
        stockClass = "in-stock";
        btnComprar.disabled = false;
    }
    
    stockInfo.innerHTML = `<p class="stock-text ${stockClass}">${stockStatus}</p>`;
    console.log("✓ Stock updated: " + stockStatus);
}

// ============================================
// 7. WHATSAPP BUTTON HANDLER
// ============================================

function handleBuyClick() {
    const selectedProduct = selectElement.value;
    
    // Validate selection
    if (!selectedProduct || selectedProduct === "") {
        showNotification("Por favor, selecione um pacote", "error");
        console.warn("⚠ No product selected for purchase");
        return;
    }
    
    // Check stock
    const quantidade = CONFIG.estoque[selectedProduct];
    if (quantidade === 0) {
        showNotification("Este pacote está fora de estoque", "error");
        console.warn("⚠ Product out of stock");
        return;
    }
    
    // Validate phone number
    if (!isValidPhoneNumber(CONFIG.telefone)) {
        showNotification("Número de WhatsApp inválido. Verifique a configuração.", "error");
        console.error("✗ Invalid phone number: " + CONFIG.telefone);
        return;
    }
    
    // Create WhatsApp message
    const message = createWhatsAppMessage(selectedProduct);
    
    // Open WhatsApp
    openWhatsApp(message);
}

// ============================================
// 8. WHATSAPP MESSAGE CREATION
// ============================================

function createWhatsAppMessage(productName) {
    const baseMessage = `Olá! Gostaria de comprar o ${productName}`;
    return baseMessage;
}

// ============================================
// 9. WHATSAPP LINK GENERATOR
// ============================================

function openWhatsApp(message) {
    try {
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp link
        const whatsappUrl = `https://wa.me/${CONFIG.telefone}?text=${encodedMessage}`;
        
        // Log for debugging
        console.log("✓ Opening WhatsApp...");
        console.log("✓ URL: " + whatsappUrl);
        
        // Track conversion and open WhatsApp
        if (typeof gtag_report_conversion === 'function') {
            gtag_report_conversion(whatsappUrl);
        } else {
            // Fallback if gtag is not available
            window.open(whatsappUrl, "_blank");
        }
        
        // Show success notification
        showNotification("Redirecionando para WhatsApp...", "success");
        
    } catch (error) {
        console.error("✗ Error opening WhatsApp: " + error.message);
        showNotification("Erro ao abrir WhatsApp. Tente novamente.", "error");
    }
}

// ============================================
// 10. PHONE NUMBER VALIDATION
// ============================================

function isValidPhoneNumber(phone) {
    // Check if phone is a string and has at least 10 digits
    if (typeof phone !== "string") {
        return false;
    }
    
    // Remove any non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");
    
    // Check if it has between 10 and 15 digits (valid for most countries)
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

// ============================================
// 11. NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set color based on type
    const colors = {
        success: { bg: "#00A884", text: "#fff" },
        error: { bg: "#ff4444", text: "#fff" },
        info: { bg: "#00A3FF", text: "#fff" },
        warning: { bg: "#ff9800", text: "#fff" }
    };
    
    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.color = color.text;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = "slideInRight 0.3s ease-out reverse";
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// 12. UTILITY FUNCTIONS
// ============================================

/**
 * Get product name from value
 */
function getProductName(value) {
    return value.split(" - ")[0] || value;
}

/**
 * Get product price from value
 */
function getProductPrice(value) {
    const match = value.match(/R\$\s*[\d.,]+/);
    return match ? match[0] : "N/A";
}

/**
 * Format currency
 */
function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
}

/**
 * Log analytics (optional)
 */
function logAnalytics(event, data) {
    console.log(`📊 Event: ${event}`, data);
    // You can send this to an analytics service if needed
}

// ============================================
// 13. NAVIGATION LINKS HANDLER
// ============================================

function setupNavigationLinks() {
    // Get the Contato navigation links
    const navContato = document.getElementById('navContato');
    const footerContato = document.getElementById('footerContato');
    
    // Create WhatsApp link with message
    const whatsappLink = `https://wa.me/${CONFIG.telefone}?text=Ol%C3%A1!+Gostaria+de+saber+mais+sobre+os+cr%C3%A9ditos+Manus+AI`;
    
    // Add click event to header Contato link
    if (navContato) {
        navContato.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof gtag_report_conversion === 'function') {
                gtag_report_conversion(whatsappLink);
            } else {
                window.open(whatsappLink, '_blank');
            }
            console.log('✓ Opened WhatsApp from header navigation');
        });
    }
    
    // Add click event to footer Contato link
    if (footerContato) {
        footerContato.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof gtag_report_conversion === 'function') {
                gtag_report_conversion(whatsappLink);
            } else {
                window.open(whatsappLink, '_blank');
            }
            console.log('✓ Opened WhatsApp from footer navigation');
        });
    }
}

// ============================================
// 14. PRODUCT CARD CLICK HANDLER
// ============================================

function setupProductCardListeners() {
    const productCards = document.querySelectorAll('.product-item');
    
    productCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', () => {
            // Get the product name from the card
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            
            // Find matching option in select
            const options = selectElement.querySelectorAll('option');
            let found = false;
            
            options.forEach(option => {
                if (option.value.includes(productName) || option.value.includes(productPrice)) {
                    selectElement.value = option.value;
                    found = true;
                }
            });
            
            // If not found by name/price, use index
            if (!found && index + 1 < options.length) {
                selectElement.value = options[index + 1].value;
            }
            
            // Trigger change event
            handleProductChange();
            
            // Highlight the selected card
            productCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // Scroll to the buy button
            setTimeout(() => {
                btnComprar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 200);
            
            console.log('✓ Product selected: ' + productName);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
}

// ============================================
// 15. ACCESSIBILITY FEATURES
// ============================================

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
    // Alt + B to focus buy button
    if (e.altKey && e.key === "b") {
        btnComprar.focus();
    }
    
    // Alt + S to focus select
    if (e.altKey && e.key === "s") {
        selectElement.focus();
    }
});

// ============================================
// 16. PRODUCT CARD SELECTION TRACKING
// ============================================

function updateProductCardSelection() {
    const selectedValue = selectElement.value;
    const productCards = document.querySelectorAll('.product-item');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        
        if (selectedValue.includes(productName) || selectedValue.includes(productPrice)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

// Update selection when select changes
selectElement.addEventListener('change', () => {
    updateProductCardSelection();
});

// ============================================
// 17. OFFLINE DETECTION
// ============================================

window.addEventListener("offline", () => {
    console.warn("⚠ You are offline");
    showNotification("Você está offline. Verifique sua conexão.", "warning");
    btnComprar.disabled = true;
});

window.addEventListener("online", () => {
    console.log("✓ You are online");
    showNotification("Conexão restaurada!", "success");
    // Re-enable button if a product is selected
    if (selectElement.value !== "") {
        btnComprar.disabled = false;
    }
});

// ============================================
// 18. PERFORMANCE MONITORING
// ============================================

// Log page load time
window.addEventListener("load", () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⏱ Page load time: ${pageLoadTime}ms`);
    
    if (pageLoadTime > 2000) {
        console.warn("⚠ Page load time is slow: " + pageLoadTime + "ms");
    } else {
        console.log("✓ Page load time is good: " + pageLoadTime + "ms");
    }
});

// ============================================
// 19. SWIPER CAROUSEL INITIALIZATION
// ============================================

function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.products-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop: false,
            grabCursor: true,
            touchEventsTarget: 'container',
            simulateTouch: true,
            touchRatio: 1,
            touchAngle: 45,
            longSwipes: true,
            longSwipesRatio: 0.5,
            slidesPerGroup: 1,
            freeMode: true,
            freeModeMomentum: true,
            freeModeMomentumRatio: 0.5,
            freeModeMomentumVelocityRatio: 0.5,
            scrollbar: {
                el: '.products-swiper-scrollbar',
                draggable: true,
                dragSize: 'auto',
                snapOnRelease: false,
            },
            navigation: {
                nextEl: '.products-swiper-next',
                prevEl: '.products-swiper-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1.8,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                },
                1440: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                1600: {
                    slidesPerView: 2.7,
                    spaceBetween: 20,
                }
            },
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            centeredSlides: false,
            centeredSlidesBounds: false
        });
        console.log("Swiper carousel initialized");
        window.productsSwiper = swiper;
    } else {
        console.warn("Swiper library not loaded");
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeSwiper, 100);
    });
} else {
    setTimeout(initializeSwiper, 100);
}

// ============================================
// 20. EXPORT FUNCTIONS FOR TESTING
// ============================================

// Make functions available for testing
window.testFunctions = {
    validatePhone: isValidPhoneNumber,
    createMessage: createWhatsAppMessage,
    getConfig: () => CONFIG,
    updateStock: updateStockInfo,
    simulatePurchase: (productIndex) => {
        const options = selectElement.querySelectorAll("option");
        if (options[productIndex]) {
            selectElement.value = options[productIndex].value;
            handleProductChange();
            handleBuyClick();
        }
    }
};

console.log("✓ Script loaded successfully");
console.log("ℹ For testing, use: window.testFunctions");



// ============================================
// FAQ ACCORDION - Versão Simplificada
// ============================================

// Aguardar carregamento completo do DOM
window.addEventListener('load', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    console.log('FAQ Accordion: Encontrados ' + faqItems.length + ' itens');
    
    faqItems.forEach(function(item, index) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                console.log('FAQ: Clicou no item ' + index);
                
                // Fechar todos os outros itens
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle do item atual
                item.classList.toggle('active');
            });
        }
    });
    
    console.log('✓ FAQ Accordion inicializado com sucesso!');
});



// ============================================
// WHATSAPP FLOATING BUTTON HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create WhatsApp link with API format
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os créditos Manus AI.');
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=${CONFIG.telefone}&text=${message}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
            
            console.log('✓ WhatsApp flutuante clicado');
        });
        
        console.log('✓ Botão flutuante do WhatsApp inicializado');
    }
});

