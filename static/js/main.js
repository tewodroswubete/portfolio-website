// You can add interactive JS here
console.log("Portfolio website loaded");

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].classList.toggle('active');
            spans[2].classList.toggle('active');
            spans[1].style.opacity = spans[1].style.opacity === '0' ? '1' : '0';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].classList.remove('active');
            spans[2].classList.remove('active');
            spans[1].style.opacity = '1';
        });
    });
    

    
    // Project filtering
    const filterButtons = document.querySelectorAll('.project-filters .btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Trigger fade-in animation
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            
            // Send form data to server
            fetch('/contact', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    contactForm.reset();
                } else {
                    alert('Error: ' + data.errors.join('\n'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Create form data
            const formData = new FormData();
            formData.append('email', email);
            
            // Send form data to server
            fetch('/newsletter', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    this.reset();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }
    
    // Initialize scroll animations
    function animateOnScroll() {
        const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .bounce-in');
        
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Cookie consent banner
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    // Check if user has made a choice before
    const cookieConsentShown = localStorage.getItem('cookieConsent');
    if (!cookieConsentShown) {
        // Show the banner after a delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });
    
    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
    });
    
    // Animated counters for stats section
    const statElements = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    if (statElements.length > 0 && statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statElements.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        let count = 0;
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 16ms per frame ≈ 60fps
                        
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                stat.textContent = Math.ceil(count);
                                setTimeout(updateCount, 16);
                            } else {
                                stat.textContent = target;
                            }
                        };
                        
                        updateCount();
                    });
                    
                    observer.disconnect(); // Stop observing after animation starts
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(statsSection);
    }
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    if (skillBars.length > 0 && skillsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                    
                    skillObserver.disconnect();
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillObserver.observe(skillsSection);
    }
    
    // Testimonial slider functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        testimonialSlides[index].classList.add('active');
        testimonialIndicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // Event listeners for slider buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    
    // Event listeners for indicators
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance testimonials every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Resume download button
    const downloadResumeBtn = document.getElementById('downloadResume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = '/static/files/resume.pdf';
            link.download = 'Teddy_Dev_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Add animation feedback
            const originalText = this.innerHTML;
            this.innerHTML = 'Downloading...';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }
    
    // Project search functionality
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Re-apply animations
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('projectSearch');
            if (searchInput) {
                searchInput.focus();
            }
        });
    }
    
    // Project modal functionality
   
    const modal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalChallenges = document.getElementById('modalChallenges');
    const modalOutcome = document.getElementById('modalOutcome');
    
    // Add event listeners to "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the project card
            const projectCard = this.closest('.project-card');
            const modalContent = JSON.parse(projectCard.getAttribute('data-modal-content'));
            
            // Update modal content
            modalTitle.textContent = modalContent.title;
            modalDescription.textContent = modalContent.description;
            
            // Update tech tags
            modalTech.innerHTML = '';
            modalContent.tech.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                modalTech.appendChild(tag);
            });
            
            // Update features list
            modalFeatures.innerHTML = '';
            modalContent.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });
            
            // Update challenges list
            modalChallenges.innerHTML = '';
            modalContent.challenges.forEach(challenge => {
                const li = document.createElement('li');
                li.textContent = challenge;
                modalChallenges.appendChild(li);
            });
            
            // Update outcome
            modalOutcome.textContent = modalContent.outcome;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking the X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Allow scrolling again
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Allow scrolling again
        }
    });
    
    // Initialize theme based on system preference or saved preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Determine initial theme
        let initialTheme;
        if (savedTheme) {
            initialTheme = savedTheme;
        } else {
            initialTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        // Apply the theme
        document.documentElement.setAttribute('data-theme', initialTheme);
        
        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = initialTheme === 'dark' ? '☀️' : '🌙';
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    // Only update if user hasn't manually selected a theme
                    const newTheme = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    if (themeIcon) {
                        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                    }
                }
            });
    }
    
    // Initialize theme on load
    initializeTheme();
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            console.log("Theme toggle clicked!");
            const currentTheme = document.documentElement.getAttribute('data-theme');
            console.log("Current theme:", currentTheme);
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            console.log("New theme:", newTheme);
            
            document.documentElement.setAttribute('data-theme', newTheme);
            console.log("Set data-theme to:", newTheme);
            
            // Update theme icon
            const themeIcon = document.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                console.log("Updated theme icon");
            }
            
            // Save user preference
            localStorage.setItem('theme', newTheme);
            console.log("Saved theme to localStorage:", newTheme);
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Allow scrolling again
        }
    });
    
    // Language selector functionality
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            
            // In a real implementation, you would load the appropriate language resources
            // For this demo, we'll just show an alert
            alert(`Language changed to: ${selectedLang}. In a full implementation, the site would reload with content in the selected language.`);
            
            // Store the selected language in localStorage
            localStorage.setItem('preferredLanguage', selectedLang);
        });
        
        // Set the language selector to the previously selected language
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
        }
    }
    
    // Chatbot functionality
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    // Toggle chatbot visibility
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                chatbotInput.focus();
            }
        });
    }
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }
    
    // Send message when clicking send button
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    // Send message when pressing Enter
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot response after a delay
            setTimeout(() => {
                const botResponse = generateBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function generateBotResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            return "Hello there! I'm Teddy's virtual assistant. How can I help you today?";
        } else if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
            return "Teddy has worked on various projects including e-commerce platforms, task management systems, APIs, and mobile apps. You can explore his work in the Projects section!";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
            return "You can contact Teddy through the Contact page on this website. He typically responds within 24 hours!";
        } else if (lowerMsg.includes('skill') || lowerMsg.includes('technology')) {
            return "Teddy is skilled in Python, Flask, JavaScript, React, SQL, and various other modern web technologies. Check out the About page for more details!";
        } else if (lowerMsg.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
            return "Goodbye! Feel free to reach out if you have more questions.";
        } else {
            return "I'm Teddy's virtual assistant. I can help you learn more about his projects, skills, and how to contact him. Try asking about his projects or skills!";
        }
    }
    
    // Handle chatbot container being closed by clicking outside
    document.addEventListener('click', function(event) {
        if (chatbotContainer.classList.contains('active') && 
            !chatbotContainer.contains(event.target) && 
            event.target !== chatbotBtn) {
            // Check if the click was on the chatbot button
            if (event.target !== chatbotBtn && 
                !chatbotBtn.contains(event.target)) {
                chatbotContainer.classList.remove('active');
            }
        }
    });
});
