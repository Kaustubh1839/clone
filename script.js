// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const registerBtns = document.querySelectorAll('a[href="register.html"]');
const dropdowns = document.querySelectorAll('.dropdown');
const pageTransition = document.querySelector('.page-transition');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initApp();
    
    // Add page transition for all links
    addPageTransitions();
});

// Scroll event for sticky header and back to top button
window.addEventListener('scroll', function() {
    toggleStickyHeader();
    toggleBackToTopButton();
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', function() {
    toggleMobileMenu();
});

// Tab functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        switchTab(tabId);
    });
});

// Back to top button
backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
});

// Mobile dropdown toggle
if (window.innerWidth <= 1024) {
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

// Functions
function initApp() {
    // Set initial states
    toggleStickyHeader();
    toggleBackToTopButton();
    
    // Add smooth scrolling to all links
    addSmoothScrolling();
    
    // Initialize animations
    initAnimations();
    
    // Initialize schedule tabs
    initScheduleTabs();
}

function toggleStickyHeader() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleBackToTopButton() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function initScheduleTabs() {
    // Make sure the first tab is active by default
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        const firstTabId = tabBtns[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
}

function switchTab(tabId) {
    // Remove active class from all tabs
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected tab
    const selectedBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const selectedPane = document.getElementById(tabId);
    
    if (selectedBtn && selectedPane) {
        // First hide all panes
        tabPanes.forEach(pane => {
            pane.style.display = 'none';
            pane.classList.remove('active');
        });
        
        // Add active class to button immediately
        selectedBtn.classList.add('active');
        
        // Show the selected pane with animation
        selectedPane.style.display = 'block';
        
        // Trigger reflow
        void selectedPane.offsetWidth;
        
        // Add active class for animation
        selectedPane.classList.add('active');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's a dropdown toggle on mobile
            if (window.innerWidth <= 1024 && this.parentElement.classList.contains('dropdown')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Calculate header height for offset
                const headerHeight = header.offsetHeight;
                
                // Scroll to target with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function addPageTransitions() {
    // Add transition for all links that point to other pages
    const links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript:"])');
    
    links.forEach(link => {
        // Skip links that open in new tabs or have download attribute
        if (link.getAttribute('target') === '_blank' || link.hasAttribute('download')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's an external link
            if (href.indexOf('http') === 0 || href === '#') {
                return;
            }
            
            e.preventDefault();
            
            // Show transition
            pageTransition.classList.add('active');
            
            // Navigate to the new page after transition
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

function initAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .speaker-card, .schedule-item, .sponsor-category, .cta-content, .quick-link-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideInLeft {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .section-header.animate h2 {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .section-header.animate .underline {
        animation: scaleIn 0.8s ease forwards 0.3s;
    }
    
    .about-content.animate .about-text {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .about-content.animate .about-image {
        animation: slideInRight 0.8s ease forwards;
    }
    
    .speaker-card.animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .schedule-item.animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .sponsor-category.animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .cta-content.animate {
        animation: scaleIn 0.8s ease forwards;
    }
    
    .quick-link-card.animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    /* Staggered animations for grid items */
    .speakers-grid .speaker-card:nth-child(1).animate { animation-delay: 0.1s; }
    .speakers-grid .speaker-card:nth-child(2).animate { animation-delay: 0.2s; }
    .speakers-grid .speaker-card:nth-child(3).animate { animation-delay: 0.3s; }
    .speakers-grid .speaker-card:nth-child(4).animate { animation-delay: 0.4s; }
    
    .sponsors-grid .sponsor-logo:nth-child(1).animate { animation-delay: 0.1s; }
    .sponsors-grid .sponsor-logo:nth-child(2).animate { animation-delay: 0.2s; }
    .sponsors-grid .sponsor-logo:nth-child(3).animate { animation-delay: 0.3s; }
    .sponsors-grid .sponsor-logo:nth-child(4).animate { animation-delay: 0.4s; }
</style>
`);

// Check if this is a page load (not a refresh)
if (performance.navigation.type !== 1) {
    // Add initial page load animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
}
