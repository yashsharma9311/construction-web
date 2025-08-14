document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbar) navbar.classList.remove('active');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) icon.classList.remove('fa-times');
            });
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Hero Slider - Only initialize if elements exist
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const heroSlider = document.querySelector('.hero-slider');
    
    if (slides.length > 0 && prevBtn && nextBtn && heroSlider) {
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto slide change every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Animated Stats Counter - Only initialize if elements exist
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    if (statNumbers.length > 0 && statsSection) {
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const speed = 200;
                const increment = target / speed;
                let current = 0;
                
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        setTimeout(updateCount, 1);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCount();
            });
        }
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(statsSection);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});