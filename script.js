// ===========================
// Console Logger Setup
// ===========================
const logger = {
    log: (message, data = null) => {
        console.log(`[AquaFresh] ${message}`, data || '');
    },
    warn: (message, data = null) => {
        console.warn(`[AquaFresh] ⚠️ ${message}`, data || '');
    },
    error: (message, data = null) => {
        console.error(`[AquaFresh] ❌ ${message}`, data || '');
    },
    success: (message, data = null) => {
        console.log(`[AquaFresh] ✅ ${message}`, data || '');
    }
};

// ===========================
// Utility Functions
// ===========================
const utils = {
    debounce: (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    throttle: (func, delay) => {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    },
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^[\d+\-\(\)\s]{10,}$/
};

// ===========================
// Navigation Scroll Effect & Sticky Header
// ===========================
class NavigationManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        
        logger.log('Navigation Manager initialized');
        this.init();
    }

    init() {
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Scroll event listener with throttling
        window.addEventListener('scroll', utils.throttle(() => this.onScroll(), 100));

        // Smooth scroll behavior
        this.setupSmoothScroll();
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        const isOpen = this.hamburger.classList.contains('active');
        this.hamburger.setAttribute('aria-expanded', isOpen);
        logger.log(`Mobile menu ${isOpen ? 'opened' : 'closed'}`);
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
    }

    onScroll() {
        // Sticky header effect
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Active link based on scroll position
        this.updateActiveLink();
    }

    updateActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        logger.log(`Scrolled to section: ${href}`);
                    }
                }
            });
        });
    }
}

// ===========================
// Form Validation & Submission
// ===========================
// ===========================
// Contact Form Management with Validation
// ===========================
class FormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.formSuccess = document.getElementById('formSuccess');
        this.formErrorSummary = document.getElementById('formErrorSummary');
        
        // Validation patterns
        this.patterns = {
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^[\d\s\-\+\(\)]{10,}$/,
            name: /^[a-zA-Z\s]{2,}$/
        };
        
        logger.log('Form Manager initialized');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        // Form submit handler
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation on blur
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                // Clear error on input
                if (field.classList.contains('error')) {
                    this.clearFieldError(field);
                }
            });
        });

        // Phone number formatting
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }
    }

    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (value) {
            // Field-specific validation
            switch (fieldId) {
                case 'name':
                    if (!this.patterns.name.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid name (letters only)';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters';
                    }
                    break;

                case 'email':
                    if (!this.patterns.email.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;

                case 'phone':
                    if (value && !this.patterns.phone.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number (at least 10 digits)';
                    }
                    break;

                case 'subject':
                    if (!value || value === '') {
                        isValid = false;
                        errorMessage = 'Please select a subject';
                    }
                    break;

                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters';
                    }
                    break;
            }
        }

        this.displayFieldError(field, isValid, errorMessage);
        return isValid;
    }

    displayFieldError(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        const errorElement = document.getElementById(`${field.id}-error`);

        if (!isValid) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            logger.warn(`Validation failed: ${field.id}`, errorMessage);
        } else {
            formGroup.classList.remove('error');
            if (field.value.trim()) {
                formGroup.classList.add('success');
            }
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = document.getElementById(`${field.id}-error`);
        
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        logger.log('Form submission initiated');

        // Hide previous messages
        this.formSuccess.style.display = 'none';
        this.formErrorSummary.style.display = 'none';

        // Validate all fields
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        let firstErrorField = null;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });

        if (!isFormValid) {
            this.formErrorSummary.style.display = 'flex';
            if (firstErrorField) {
                firstErrorField.focus();
            }
            logger.error('Form validation failed');
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        logger.log('Form data collected', data);

        // Submit form
        this.submitForm(data);
    }

    submitForm(data) {
        // Show loading state
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        this.submitBtn.disabled = true;

        // Simulate API call with fetch (replace URL with actual endpoint)
        setTimeout(() => {
            // Simulating successful submission
            // In production, use: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            
            try {
                logger.success('Form submitted successfully', data);
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                this.submitBtn.disabled = false;

                // Show success message
                this.formSuccess.style.display = 'flex';
                
                // Show toast notification
                this.showToast('Success!', 'Your message has been sent successfully.');

                // Reset form and clear validation states
                this.form.reset();
                this.clearAllValidation();

                // Scroll to success message
                this.formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide success message after 10 seconds
                setTimeout(() => {
                    this.formSuccess.style.display = 'none';
                }, 10000);

            } catch (error) {
                logger.error('Form submission error', error);
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                this.submitBtn.disabled = false;

                // Show error message
                this.showToast('Error', 'Something went wrong. Please try again.', 'error');
            }
        }, 2000); // Simulate network delay
    }

    clearAllValidation() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
        });

        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });
    }

    showToast(title, message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const iconColor = type === 'success' ? 'var(--primary-green)' : '#e74c3c';
        
        if (type === 'error') {
            toast.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to page
        document.body.appendChild(toast);
        
        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
        
        logger.log(`Toast notification displayed: ${title}`);
    }
}

// ===========================
// Testimonials Carousel
// ===========================
class TestimonialCarousel {
    constructor() {
        this.carousel = document.getElementById('testimonials-carousel');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.dots = document.querySelectorAll('.carousel-dot');
        
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.autoRotateDelay = 5000; // 5 seconds
        this.isAutoRotating = true;

        logger.log('Testimonial Carousel initialized', { slideCount: this.slides.length });
        
        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // Set first slide as active
        this.showSlide(0);

        // Navigation button event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dot indicator event listeners
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-rotate testimonials
        if (this.slides.length > 1) {
            this.startAutoRotate();
        }

        // Keyboard navigation (arrow keys)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });

        // Pause auto-rotate on hover
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', () => this.pauseAutoRotate());
            this.carousel.addEventListener('mouseleave', () => {
                if (this.isAutoRotating) {
                    this.startAutoRotate();
                }
            });
        }
    }

    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });

        // Add active class to current slide and dot
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.dots[index].setAttribute('aria-selected', 'true');

        // Update carousel aria-label
        if (this.carousel) {
            this.carousel.setAttribute('aria-label', 
                `Testimonials carousel showing slide ${index + 1} of ${this.slides.length}`);
        }

        logger.log(`Showing testimonial slide ${index + 1} of ${this.slides.length}`);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
        // Reset auto-rotate timer when manually navigating
        if (this.isAutoRotating) {
            this.pauseAutoRotate();
            this.startAutoRotate();
        }
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentIndex);
        // Reset auto-rotate timer when manually navigating
        if (this.isAutoRotating) {
            this.pauseAutoRotate();
            this.startAutoRotate();
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.showSlide(index);
        // Reset auto-rotate timer when manually navigating
        if (this.isAutoRotating) {
            this.pauseAutoRotate();
            this.startAutoRotate();
        }
    }

    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoRotateDelay);
        this.isAutoRotating = true;
        logger.log('Testimonial auto-rotate started');
    }

    pauseAutoRotate() {
        clearInterval(this.autoRotateInterval);
        this.isAutoRotating = false;
        logger.log('Testimonial auto-rotate paused');
    }

    // Legacy methods for compatibility
    next() {
        this.nextSlide();
    }

    prev() {
        this.prevSlide();
    }

    updateCarousel() {
        this.showSlide(this.currentIndex);
    }
}

// ===========================
// Animated Statistics Counter
// ===========================
class StatisticsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-value');
        this.hasAnimated = false;

        logger.log('Statistics Counter initialized', { statCount: this.stats.length });
        
        if (this.stats.length > 0) {
            this.observeStats();
        }
    }

    observeStats() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                    observer.disconnect();
                }
            });
        }, observerOptions);

        // Observe the first stat element
        if (this.stats.length > 0) {
            observer.observe(this.stats[0].closest('.hero-stats'));
        }
    }

    animateCounters() {
        this.stats.forEach(stat => {
            const text = stat.textContent.trim();
            const numericValue = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[0-9]/g, '').trim();

            if (!isNaN(numericValue)) {
                this.countUp(stat, numericValue, suffix);
            }
        });
    }

    countUp(element, targetValue, suffix) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const incrementPerStep = targetValue / steps;

        let currentValue = 0;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            currentValue = Math.floor(incrementPerStep * step);

            if (step >= steps) {
                currentValue = targetValue;
                clearInterval(interval);
                logger.success(`Counter animation complete: ${targetValue}${suffix}`);
            }

            element.textContent = currentValue.toLocaleString() + suffix;
        }, stepDuration);
    }
}

// ===========================
// Lazy Loading Images
// ===========================
class LazyLoadManager {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        
        logger.log('Lazy Load Manager initialized', { imageCount: this.images.length });
        
        if (this.images.length > 0) {
            this.init();
        }
    }

    init() {
        // Check browser support for Intersection Observer
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                    logger.log(`Image lazy-loaded: ${img.src}`);
                }
            });
        });

        this.images.forEach(img => imageObserver.observe(img));
    }

    loadAllImages() {
        this.images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
        logger.warn('Using fallback image loading (Intersection Observer not supported)');
    }
}

// ===========================
// Back-to-Top Button
// ===========================
class BackToTopButton {
    constructor() {
        this.button = this.createButton();
        this.threshold = 300; // Show button after scrolling 300px

        logger.log('Back-to-Top Button initialized');
        this.init();
    }

    createButton() {
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #30C04F 0%, #7CCF6A 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: none;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(48, 192, 79, 0.3);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(btn);
        return btn;
    }

    init() {
        window.addEventListener('scroll', utils.throttle(() => this.toggleVisibility(), 100));
        this.button.addEventListener('click', () => this.scrollToTop());
        
        // Keyboard shortcut: Home key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Home') {
                this.scrollToTop();
            }
        });
    }

    toggleVisibility() {
        if (window.scrollY > this.threshold) {
            this.button.style.display = 'flex';
            this.button.style.alignItems = 'center';
            this.button.style.justifyContent = 'center';
        } else {
            this.button.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logger.log('Scrolling to top');
    }
}

// ===========================
// Scroll Animation Observer
// ===========================
class ScrollAnimationObserver {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
        
        logger.log('Scroll Animation Observer initialized', { cardCount: this.cards.length });
        
        if (this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.cards.forEach(card => observer.observe(card));
    }
}

// ===========================
// Page Performance Monitor
// ===========================
class PerformanceMonitor {
    constructor() {
        logger.log('Performance Monitor initialized');
        this.logPageMetrics();
    }

    logPageMetrics() {
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            logger.log('Page Performance Metrics', {
                pageLoadTime: `${pageLoadTime}ms`,
                domContentLoaded: `${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`,
                resourcesLoaded: `${perfData.loadEventEnd - perfData.domContentLoadedEventEnd}ms`
            });
        }
    }
}

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Animated Counter for Stats
// ===========================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Handle decimal numbers
                if (target % 1 !== 0) {
                    stat.textContent = target.toFixed(1);
                } else {
                    stat.textContent = target;
                }
            }
        };

        updateCounter();
    });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector('.market-stats');
// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Newsletter Subscription Manager
// ===========================
class NewsletterManager {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.emailInput = document.getElementById('newsletter-email');
        this.errorElement = document.getElementById('newsletter-error');
        this.successElement = document.getElementById('newsletter-success');
        
        this.emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        logger.log('Newsletter Manager initialized');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Clear messages on input
        this.emailInput.addEventListener('input', () => {
            this.clearMessages();
            this.emailInput.classList.remove('error');
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        // Clear previous messages
        this.clearMessages();
        
        // Validate email
        if (!email) {
            this.showError('Please enter your email address');
            this.emailInput.classList.add('error');
            return;
        }
        
        if (!this.emailPattern.test(email)) {
            this.showError('Please enter a valid email address');
            this.emailInput.classList.add('error');
            return;
        }
        
        // Submit newsletter subscription
        this.subscribe(email);
    }

    subscribe(email) {
        logger.log('Newsletter subscription:', email);
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccess('Thank you for subscribing!');
            this.emailInput.value = '';
            this.emailInput.classList.remove('error');
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                this.clearMessages();
            }, 5000);
            
            logger.success('Newsletter subscription successful:', email);
        }, 500);
    }

    showError(message) {
        this.errorElement.textContent = message;
        logger.warn('Newsletter validation error:', message);
    }

    showSuccess(message) {
        this.successElement.textContent = message;
    }

    clearMessages() {
        this.errorElement.textContent = '';
        this.successElement.textContent = '';
    }
}

// ===========================
// Initialize All Modules on DOM Ready
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    logger.log('========================================');
    logger.log('AquaFresh Website Initialization Started');
    logger.log('========================================');

    try {
        // Add dynamic styles
        addFormStyles();
        addNavigationStyles();

        // Initialize all modules
        const navigation = new NavigationManager();
        const formManager = new FormManager();
        const carousel = new TestimonialCarousel();
        const counter = new StatisticsCounter();
        const lazyLoad = new LazyLoadManager();
        const backToTop = new BackToTopButton();
        const scrollAnimations = new ScrollAnimationObserver();
        const performance = new PerformanceMonitor();
        const newsletter = new NewsletterManager();

        logger.success('All modules initialized successfully');
        logger.log('========================================');

        // Log feature detection
        logger.log('Browser Features Detected', {
            IntersectionObserver: 'IntersectionObserver' in window,
            FormData: 'FormData' in window,
            localStorage: 'localStorage' in window,
            matchMedia: 'matchMedia' in window
        });

    } catch (error) {
        logger.error('Initialization Error', error);
    }
});

// ===========================
// Handle Page Visibility
// ===========================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        logger.log('Page is now hidden');
    } else {
        logger.log('Page is now visible');
    }
});

// ===========================
// Graceful Error Handling
// ===========================
window.addEventListener('error', (event) => {
    logger.error('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// ===========================
// Console Banner
// ===========================
console.log('%c🌱 AquaFresh Hydroponics 🌱', 
    'color: #30C04F; font-size: 20px; font-weight: bold; padding: 10px; font-family: sans-serif;');
console.log('%cCultivating Tomorrow - Advanced Hydroponic Solutions', 
    'color: #6EC8A5; font-size: 14px; font-family: sans-serif;');
console.log('%cOpening DevTools? Great! Check the logs below for detailed information about page functionality.', 
    'color: #999; font-size: 12px; font-style: italic;');
