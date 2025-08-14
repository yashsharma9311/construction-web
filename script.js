document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    function setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navbar = document.querySelector('.navbar');
        
        if (!mobileMenuBtn || !navbar) return;
        
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Header Scroll Effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Hero Slider
    function setupHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        const heroSlider = document.querySelector('.hero-slider');
        
        if (!slides.length || !prevBtn || !nextBtn || !heroSlider) return;
        
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
        
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide change every 5 seconds
        startSlideInterval();
        
        // Pause auto slide on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', startSlideInterval);
    }

    // Animated Stats Counter
    function setupStatsCounter() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;
        
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const speed = 200; // Animation speed
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
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Example button click handler (from the duplicate DOMContentLoaded)
    function setupExampleButton() {
        const button = document.getElementById("myButton");
        if (button) {
            button.addEventListener("click", function() {
                alert("Button clicked!");
            });
        }
    }

    // Initialize all functionality
    function init() {
        setupMobileMenu();
        setupHeaderScroll();
        setupHeroSlider();
        setupStatsCounter();
        setupSmoothScrolling();
        setupExampleButton();
    }

    init();
});