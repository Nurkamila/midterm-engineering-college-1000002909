// Engineering College - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
    initializeInteractiveFeatures();
    initializeFormProgress();
    initializeAntiSpam();
    initializeProgramModals(); // Добавляем инициализацию модальных окон программ
});

// Form Validation System
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                handleFormSubmission(form);
            }

            form.classList.add('was-validated');
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
                updateFormProgress();
            });

            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        // Password confirmation validation
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');

        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', function() {
                validatePasswordMatch(password, confirmPassword);
            });
        }
    });
}

// Field-specific validation
function validateField(field) {
    const isValid = field.checkValidity();

    if (field.type === 'email') {
        validateEmail(field);
    } else if (field.type === 'tel') {
        validatePhone(field);
    } else if (field.type === 'password' && field.id === 'password') {
        validatePasswordStrength(field);
    }

    updateFieldStatus(field, isValid);
}

function validateEmail(field) {
    const email = field.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid && email) {
        field.setCustomValidity('Please enter a valid email address');
    } else {
        field.setCustomValidity('');
    }
}

function validatePhone(field) {
    const phone = field.value.replace(/\D/g, '');
    const isValid = phone.length >= 10;

    if (!isValid && field.value) {
        field.setCustomValidity('Please enter a valid phone number');
    } else {
        field.setCustomValidity('');
    }
}

function validatePasswordStrength(field) {
    const password = field.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const isValid = password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers;

    if (!isValid && password) {
        field.setCustomValidity('Password must be at least 8 characters with uppercase, lowercase, and numbers');
    } else {
        field.setCustomValidity('');
    }
}

function validatePasswordMatch(password, confirmPassword) {
    const isValid = password.value === confirmPassword.value;

    if (!isValid && confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords must match');
    } else {
        confirmPassword.setCustomValidity('');
    }

    updateFieldStatus(confirmPassword, isValid);
}

function updateFieldStatus(field, isValid) {
    field.classList.remove('is-valid', 'is-invalid');
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
}

// Form Progress Tracking
function initializeFormProgress() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    updateFormProgress();
}

function updateFormProgress() {
    const form = document.getElementById('registrationForm');
    const progressBar = document.getElementById('formProgress');

    if (!form || !progressBar) return;

    const requiredFields = form.querySelectorAll('[required]');
    const filledFields = Array.from(requiredFields).filter(field => {
        if (field.type === 'checkbox') return field.checked;
        if (field.type === 'radio') {
            const name = field.name;
            return form.querySelector(`input[name="${name}"]:checked`);
        }
        return field.value.trim() !== '';
    });

    const progress = (filledFields.length / requiredFields.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// Interactive Features
function initializeInteractiveFeatures() {
    initializeNewsFilter();
    initializeClubModals();
    initializeFAQAccordion();
    initializeTooltips();
}

// News Filter Feature
function initializeNewsFilter() {
    const filterButtons = document.querySelectorAll('.news-filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterNewsItems(filter);

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterNewsItems(filter) {
    const newsItems = document.querySelectorAll('.news-card');

    newsItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
        } else {
            const badge = item.querySelector('.badge');
            if (badge && badge.textContent.toLowerCase().includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Club Modals Feature
function initializeClubModals() {
    const clubButtons = document.querySelectorAll('[data-bs-target="#clubModal"]');

    clubButtons.forEach(button => {
        button.addEventListener('click', function() {
            const club = this.getAttribute('data-club');
            loadClubInfo(club);
        });
    });
}

function loadClubInfo(club) {
    const modalTitle = document.getElementById('clubModalTitle');
    const modalBody = document.getElementById('clubModalBody');

    const clubInfo = {
        'IEEE': {
            title: 'IEEE Student Chapter',
            content: '<p>The Institute of Electrical and Electronics Engineers (IEEE) is the world\'s largest technical professional organization. Our student chapter provides:</p><ul><li>Technical workshops and seminars</li><li>Networking opportunities with industry professionals</li><li>Competition participation</li><li>Professional development resources</li></ul><p><strong>Meetings:</strong> Every Tuesday, 6:00 PM at Engineering Building Room 201</p>'
        },
        'Robotics': {
            title: 'Robotics Club',
            content: '<p>Design, build, and program robots for competitions and research projects. Activities include:</p><ul><li>Annual robotics competition preparation</li><li>Arduino and Raspberry Pi workshops</li><li>3D printing and CAD design sessions</li><li>Industry guest speakers</li></ul><p><strong>Meetings:</strong> Thursdays, 4:00 PM at Innovation Lab</p>'
        },
        'Sustainable': {
            title: 'Sustainable Engineering Society',
            content: '<p>Focus on green technologies and sustainable engineering practices. Our initiatives:</p><ul><li>Renewable energy projects</li><li>Sustainable design challenges</li><li>Environmental awareness campaigns</li><li>Green campus initiatives</li></ul><p><strong>Meetings:</strong> Mondays, 5:00 PM at Environmental Science Building</p>'
        },
        'Women': {
            title: 'Women in Engineering',
            content: '<p>Supporting and empowering women pursuing engineering careers through:</p><ul><li>Mentorship programs</li><li>Industry networking events</li><li>Professional development workshops</li><li>Community outreach</li></ul><p><strong>Meetings:</strong> Bi-weekly Wednesdays, 4:30 PM at Student Center Room 305</p>'
        }
    };

    if (clubInfo[club]) {
        modalTitle.textContent = clubInfo[club].title;
        modalBody.innerHTML = clubInfo[club].content;
    }
}

// FAQ Accordion Feature
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';

            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });

            // Remove all active states
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });

            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                this.classList.add('active');
            }
        });
    });
}

// Tooltip Feature
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    if (tooltipElements.length > 0) {
        tooltipElements.forEach(element => {
            new bootstrap.Tooltip(element);
        });
    }
}

// Anti-Spam System for Contact Form
function initializeAntiSpam() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Add honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.className = 'honeypot';
    contactForm.appendChild(honeypot);

    // Add timestamp validation
    const timestamp = document.createElement('input');
    timestamp.type = 'hidden';
    timestamp.name = 'timestamp';
    timestamp.value = Date.now();
    contactForm.appendChild(timestamp);
}

// Form Submission Handler
function handleFormSubmission(form) {
    const formId = form.id;

    if (formId === 'registrationForm') {
        handleRegistrationSubmission(form);
    } else if (formId === 'contactForm') {
        handleContactSubmission(form);
    }
}

function handleRegistrationSubmission(form) {
    // Simulate form processing
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Processing...';

    setTimeout(() => {
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.remove('d-none');
            form.classList.add('d-none');
        }

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

function handleContactSubmission(form) {
    const honeypot = form.querySelector('.honeypot');
    const timestamp = form.querySelector('input[name="timestamp"]');

    // Basic anti-spam check
    if (honeypot.value !== '') {
        showMessage('Spam detected. Please try again.', 'error');
        return;
    }

    const formTime = parseInt(timestamp.value);
    const currentTime = Date.now();

    // If form was submitted too quickly (less than 2 seconds), likely spam
    if (currentTime - formTime < 2000) {
        showMessage('Please wait a moment and try again.', 'error');
        return;
    }

    // Simulate successful submission
    showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
    form.reset();
    form.classList.remove('was-validated');
}

// PROGRAM MODALS FEATURE - УПРОЩЕННАЯ ВЕРСИЯ
function initializeProgramModals() {
    const programCards = document.querySelectorAll('.program-card');

    programCards.forEach(card => {
        card.addEventListener('click', function() {
            const program = this.getAttribute('data-program');
            showProgramModal(program);
        });
    });
}

function showProgramModal(program) {
    const modalTitle = document.getElementById('programModalLabel');
    const modalBody = document.getElementById('programModalBody');

    // Simple content for all programs
    const content = {
        'computer': {
            title: 'Computer Engineering',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                             alt="Computer Engineering" class="img-fluid rounded mb-3">
                        <div class="program-quick-info">
                            <h5 class="h6">Quick Facts</h5>
                            <ul class="list-unstyled">
                                <li>📅 <strong>Duration:</strong> 4 years (8 semesters)</li>
                                <li>🎓 <strong>Credits:</strong> 128 credits</li>
                                <li>🔬 <strong>Laboratories:</strong> 8 specialized</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="h5">Program Overview</h4>
                        <p>Computer Engineering focuses on the design and development of computing systems, bridging the gap between hardware and software. Students learn to create innovative solutions from microprocessors to supercomputers.</p>
                        
                        <h5 class="h6 mt-4">First Year Courses</h5>
                        <ul>
                            <li>Introduction to Programming</li>
                            <li>Digital Logic Design</li>
                            <li>Calculus I & II</li>
                            <li>Physics for Engineers</li>
                            <li>Computer Organization</li>
                            <li>Discrete Mathematics</li>
                        </ul>
                        
                        <h5 class="h6 mt-4">Career Opportunities</h5>
                        <p>Software Engineer, Hardware Designer, Systems Architect, Embedded Systems Developer</p>
                    </div>
                </div>
            `
        },
        'mechanical': {
            title: 'Mechanical Engineering',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                             alt="Mechanical Engineering" class="img-fluid rounded mb-3">
                        <div class="program-quick-info">
                            <h5 class="h6">Quick Facts</h5>
                            <ul class="list-unstyled">
                                <li>📅 <strong>Duration:</strong> 4 years (8 semesters)</li>
                                <li>🎓 <strong>Credits:</strong> 130 credits</li>
                                <li>🔬 <strong>Laboratories:</strong> 6 specialized</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="h5">Program Overview</h4>
                        <p>Mechanical Engineering involves the design, analysis, manufacturing, and maintenance of mechanical systems. Students work with everything from small components to large machinery and thermal systems.</p>
                        
                        <h5 class="h6 mt-4">First Year Courses</h5>
                        <ul>
                            <li>Engineering Mechanics</li>
                            <li>Thermodynamics</li>
                            <li>Materials Science</li>
                            <li>Engineering Mathematics</li>
                            <li>Technical Drawing</li>
                            <li>Manufacturing Processes</li>
                        </ul>
                        
                        <h5 class="h6 mt-4">Career Opportunities</h5>
                        <p>Mechanical Designer, HVAC Engineer, Automotive Engineer, Manufacturing Engineer</p>
                    </div>
                </div>
            `
        },
        'electrical': {
            title: 'Electrical Engineering',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                             alt="Electrical Engineering" class="img-fluid rounded mb-3">
                        <div class="program-quick-info">
                            <h5 class="h6">Quick Facts</h5>
                            <ul class="list-unstyled">
                                <li>📅 <strong>Duration:</strong> 4 years (8 semesters)</li>
                                <li>🎓 <strong>Credits:</strong> 132 credits</li>
                                <li>🔬 <strong>Laboratories:</strong> 7 specialized</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="h5">Program Overview</h4>
                        <p>Electrical Engineering covers power systems, electronics, control systems, and telecommunications. Students learn to design and implement electrical systems for various applications.</p>
                        
                        <h5 class="h6 mt-4">First Year Courses</h5>
                        <ul>
                            <li>Circuit Analysis</li>
                            <li>Electromagnetic Theory</li>
                            <li>Digital Electronics</li>
                            <li>Signals and Systems</li>
                            <li>Engineering Mathematics</li>
                            <li>Electrical Machines</li>
                        </ul>
                        
                        <h5 class="h6 mt-4">Career Opportunities</h5>
                        <p>Power Systems Engineer, Electronics Designer, Control Systems Engineer, Telecommunications Specialist</p>
                    </div>
                </div>
            `
        },
        'civil': {
            title: 'Civil Engineering',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                             alt="Civil Engineering" class="img-fluid rounded mb-3">
                        <div class="program-quick-info">
                            <h5 class="h6">Quick Facts</h5>
                            <ul class="list-unstyled">
                                <li>📅 <strong>Duration:</strong> 4 years (8 semesters)</li>
                                <li>🎓 <strong>Credits:</strong> 129 credits</li>
                                <li>🔬 <strong>Laboratories:</strong> 5 specialized</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="h5">Program Overview</h4>
                        <p>Civil Engineering focuses on the design, construction, and maintenance of infrastructure projects including buildings, bridges, roads, and water supply systems.</p>
                        
                        <h5 class="h6 mt-4">First Year Courses</h5>
                        <ul>
                            <li>Engineering Mechanics</li>
                            <li>Surveying</li>
                            <li>Construction Materials</li>
                            <li>Structural Analysis</li>
                            <li>Geotechnical Engineering</li>
                            <li>Fluid Mechanics</li>
                        </ul>
                        
                        <h5 class="h6 mt-4">Career Opportunities</h5>
                        <p>Structural Engineer, Construction Manager, Transportation Engineer, Environmental Engineer</p>
                    </div>
                </div>
            `
        },
        'chemical': {
            title: 'Chemical Engineering',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                             alt="Chemical Engineering" class="img-fluid rounded mb-3">
                        <div class="program-quick-info">
                            <h5 class="h6">Quick Facts</h5>
                            <ul class="list-unstyled">
                                <li>📅 <strong>Duration:</strong> 4 years (8 semesters)</li>
                                <li>🎓 <strong>Credits:</strong> 131 credits</li>
                                <li>🔬 <strong>Laboratories:</strong> 6 specialized</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="h5">Program Overview</h4>
                        <p>Chemical Engineering involves transforming raw materials into valuable products through chemical processes, focusing on process design, optimization, and safety.</p>
                        
                        <h5 class="h6 mt-4">First Year Courses</h5>
                        <ul>
                            <li>Chemical Process Principles</li>
                            <li>Organic Chemistry</li>
                            <li>Physical Chemistry</li>
                            <li>Material and Energy Balances</li>
                            <li>Thermodynamics</li>
                            <li>Fluid Mechanics</li>
                        </ul>
                        
                        <h5 class="h6 mt-4">Career Opportunities</h5>
                        <p>Process Engineer, Plant Manager, Petroleum Engineer, Pharmaceutical Engineer</p>
                    </div>
                </div>
            `
        },
        'biomedical': {
            title: 'Biomedical Engineering',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                             alt="Biomedical Engineering" class="img-fluid rounded mb-3">
                        <div class="program-quick-info">
                            <h5 class="h6">Quick Facts</h5>
                            <ul class="list-unstyled">
                                <li>📅 <strong>Duration:</strong> 4 years (8 semesters)</li>
                                <li>🎓 <strong>Credits:</strong> 127 credits</li>
                                <li>🔬 <strong>Laboratories:</strong> 4 specialized</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="h5">Program Overview</h4>
                        <p>Biomedical Engineering combines engineering principles with medical sciences to develop technologies and devices for healthcare, including medical imaging, prosthetics, and diagnostic equipment.</p>
                        
                        <h5 class="h6 mt-4">First Year Courses</h5>
                        <ul>
                            <li>Human Anatomy and Physiology</li>
                            <li>Biomechanics</li>
                            <li>Biomaterials</li>
                            <li>Medical Instrumentation</li>
                            <li>Cell Biology</li>
                            <li>Engineering Mathematics</li>
                        </ul>
                        
                        <h5 class="h6 mt-4">Career Opportunities</h5>
                        <p>Medical Device Engineer, Clinical Engineer, Biomechanics Specialist, Rehabilitation Engineer</p>
                    </div>
                </div>
            `
        }
    };

    if (content[program]) {
        modalTitle.textContent = content[program].title;
        modalBody.innerHTML = content[program].content;
    } else {
        modalTitle.textContent = 'Program Details';
        modalBody.innerHTML = '<p>Program details not available at the moment.</p>';
    }

    // Show the modal using Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('programModal'));
    modal.show();
}

// Utility Functions
function showMessage(message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms[0].parentNode.insertBefore(alertDiv, forms[0]);
    }

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(event) {
    // Close modals with Escape key
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modalInstance = bootstrap.Modal.getInstance(openModal);
            modalInstance.hide();
        }
    }
});

// Contact Form Character Counter
function initializeContactForm() {
    const messageTextarea = document.getElementById('contactMessage');
    const charCount = document.getElementById('charCount');

    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;

            if (length > 500) {
                charCount.style.color = 'var(--accent-color)';
            } else if (length > 400) {
                charCount.style.color = 'var(--warning-color)';
            } else {
                charCount.style.color = 'inherit';
            }
        });
    }

    // Enhanced form submission for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (this.checkValidity()) {
                const submitBtn = this.querySelector('.submit-btn');
                const submitText = submitBtn.querySelector('.submit-text');
                const loadingSpinner = submitBtn.querySelector('.loading-spinner');

                // Show loading state
                submitText.style.display = 'none';
                loadingSpinner.style.display = 'flex';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.getElementById('contactSuccess');
                    if (successMessage) {
                        successMessage.classList.remove('d-none');
                        this.classList.add('d-none');
                    }

                    // Reset button
                    submitText.style.display = 'block';
                    loadingSpinner.style.display = 'none';
                    submitBtn.disabled = false;
                }, 2000);
            }

            this.classList.add('was-validated');
        });
    }
}

// Don't forget to call this in your main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
    initializeInteractiveFeatures();
    initializeFormProgress();
    initializeAntiSpam();
    initializeProgramModals();
    initializeContactForm(); // Add this line for contact form enhancements
});