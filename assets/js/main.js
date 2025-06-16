// Mobile Navigation
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("X-kX9jOlb_OB6LqQR");
})();

// Project Slideshows (New functionality)
document.querySelectorAll('.project-slideshow-inner').forEach(slideshow => {
    const images = slideshow.querySelectorAll('img');
    let currentIndex = 0;

    // Function to show a specific image
    function showImage(index) {
        slideshow.style.transform = `translateX(${-index * 100}%)`;
    }

    // Function to go to the next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    // Auto-slide every 3 seconds
    setInterval(nextImage, 3000);

    // Initial display
    showImage(currentIndex);
});

// Form Submission with EmailJS
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'form-status';
    loadingDiv.textContent = 'Sending message...';
    contactForm.appendChild(loadingDiv);

    try {
        // Send email using EmailJS
        const response = await emailjs.send('service_lunyk82', 'template_db0z4t7', formData);
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        loadingDiv.className = 'form-status success';
        loadingDiv.textContent = 'Message sent successfully!';
        
        // Reset form
        contactForm.reset();
        
        // Remove status message after 5 seconds
        setTimeout(() => {
            loadingDiv.remove();
        }, 5000);
    } catch (error) {
        console.error('FAILED...', error);
        // Show detailed error message
        loadingDiv.className = 'form-status error';
        loadingDiv.textContent = `Error: ${error.text || 'Failed to send message. Please try again.'}`;
        
        // Log detailed error information
        console.log('Error details:', {
            status: error.status,
            text: error.text,
            serviceId: 'service_lunyk82',
            templateId: 'template_db0z4t7'
        });
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Smooth scroll for anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 