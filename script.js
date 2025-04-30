// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("2dVK0vZm54ET4ct7h");
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('service_2mp28v4', 'template_b0epbyq', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000);
                    
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                    
                    // Hide error message after 5 seconds
                    setTimeout(function() {
                        errorMessage.style.display = 'none';
                    }, 5000);
                    
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Animation for skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function fadeInOnScroll() {
        skillItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Trigger initial animations
    fadeInOnScroll();
    
    // Project filtering
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        // This would be expanded if you add filter buttons
        console.log(`Loaded ${projectCards.length} projects`);
    }
    
    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.querySelector('.timeline-content').style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('.timeline-content').style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Typing effect for hero section
    const heroText = document.querySelector('.hero-content p');
    
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const speed = 50; // ms per character
        
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start the typing effect
        setTimeout(typeWriter, 1000);
    }
});