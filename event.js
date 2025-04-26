// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const registerModal = document.getElementById('register-modal');
const closeModalBtn = document.querySelector('.close-modal');
const registerBtns = document.querySelectorAll('a[href="#register"]');
const registerForm = document.getElementById('register-form');
const dropdowns = document.querySelectorAll('.dropdown');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initApp();
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

// Register modal
registerBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        openRegisterModal();
    });
});

closeModalBtn.addEventListener('click', closeRegisterModal);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === registerModal) {
        closeRegisterModal();
    }
});

// Register form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission();
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
            e.preventDefault();
            dropdown.classList.toggle('active');
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

function switchTab(tabId) {
    // Remove active class from all tabs
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected tab
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function openRegisterModal() {
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeRegisterModal() {
    registerModal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
}

function handleFormSubmission() {
    // Get form data
    const formData = new FormData(registerForm);
    const formDataObj = {};
    
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });
    
    // Simulate form submission
    console.log('Form submitted:', formDataObj);
    
    // Show success message
    alert('Registration successful! Thank you for registering.');
    
    // Close modal and reset form
    closeRegisterModal();
    registerForm.reset();
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
            if (targetId === '#register') return; // Skip register links
            
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

function initAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .speaker-card, .schedule-item, .sponsor-category, .cta-content');
    
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
        animation: fadeIn 0.8s ease forwards;
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
        animation: fadeIn 0.8s ease forwards;
    }
    
    .schedule-item.animate {
        animation: fadeIn 0.8s ease forwards;
    }
    
    .sponsor-category.animate {
        animation: fadeIn 0.8s ease forwards;
    }
    
    .cta-content.animate {
        animation: scaleIn 0.8s ease forwards;
    }
</style>
`);
