document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    // In a real implementation, you might want to add:
    // - Auto-rotation of testimonials
    // - Navigation controls for mobile
    // - Animation between testimonials
    
    // For now, we'll just add a simple hover effect enhancement
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Video testimonial lazy loading
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    const lazyLoadVideos = function() {
        videoWrappers.forEach(wrapper => {
            if (isElementInViewport(wrapper)) {
                const iframe = wrapper.querySelector('iframe');
                if (iframe && !iframe.src) {
                    const videoId = wrapper.closest('.video-item').querySelector('h3').textContent;
                    if (videoId.includes("Rajesh Mehta")) {
                        iframe.src = "https://www.youtube.com/watch?v=6jjmrk36PHo";
                    } else if (videoId.includes("Priya Sharma")) {
                        iframe.src = "https://www.youtube.com/watch?v=6jjmrk36PHo";
                    }
                }
            }
        });
    };
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initial check
    lazyLoadVideos();
    
    // Check on scroll
    window.addEventListener('scroll', lazyLoadVideos);
    
    // Smooth scroll for anchor links
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
});