/* ===================================================================
   FINAL, COMPLETE SCRIPT.JS FOR THE ENTIRE PORTFOLIO (v2)
   This file controls all dynamic features across all pages.
   It is wrapped in DOMContentLoaded to ensure the HTML is loaded first.
   Each feature is wrapped in an 'if' statement to prevent errors on pages
   where its specific HTML elements do not exist.
=================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // =======================================================
    // #1: UNIVERSAL - MOBILE NAVIGATION (HAMBURGER MENU)
    // Works on every page.
    // =======================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }


    // =======================================================
    // #2: HOMEPAGE ONLY - HERO TYPING EFFECT
    // =======================================================
    const typingElement = document.getElementById('typing-effect');
    if (typingElement && typeof Typed !== 'undefined') {
        const typed = new Typed('#typing-effect', {
            strings: ['Physics Teacher', 'Researcher', 'Developer', 'Lifelong Learner'],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }


    // =======================================================
    // #3: HOMEPAGE & CV PAGE - ON-SCROLL REVEAL ANIMATIONS
    // =======================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    // =======================================================
    // #4: CONTACT PAGE ONLY - NETLIFY FORM SUBMISSION
    // =======================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const successModal = document.getElementById('success-modal');
        const closeModalBtn = document.getElementById('close-success-modal');
        const okBtn = document.getElementById('ok-btn');
        
        const hideSuccessModal = () => successModal.classList.remove('active');
        closeModalBtn.addEventListener('click', hideSuccessModal);
        okBtn.addEventListener('click', hideSuccessModal);
        successModal.addEventListener('click', (e) => { if (e.target === successModal) hideSuccessModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && successModal.classList.contains('active')) hideSuccessModal(); });

        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                emailError.textContent = "Please enter a valid email address.";
                emailError.classList.add('visible');
                emailInput.classList.add('input-error');
                return;
            }
            submitButton.disabled = true;
            submitButton.innerHTML = "Sending...";
            const formData = new FormData(contactForm);
            fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(formData).toString() })
            .then(() => {
                contactForm.reset();
                successModal.classList.add('active');
            })
            .catch((error) => {
                alert('There was a problem submitting your form. Please try again.');
                console.error(error);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = "Send Message";
            });
        });
        emailInput.addEventListener('input', () => {
            if (emailError.classList.contains('visible')) {
                emailError.classList.remove('visible');
                emailInput.classList.remove('input-error');
            }
        });
    }


    // =======================================================
    // #5: HOMEPAGE ONLY - RESUME VIEWER MODAL
    // =======================================================
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');

    if (viewResumeBtn && resumeModal) {
        const closeModalBtn = resumeModal.querySelector('.close-btn');
        const resumeIframe = document.getElementById('resume-iframe');

        const GITHUB_USERNAME = "[YOUR_GITHUB_USERNAME]"; // !! IMPORTANT: Change this!
        const CV_FILE_PATH = "cv/Rezak_Souilah_CV.pdf";     // !! IMPORTANT: Make sure this is correct!

        const pdfUrl = `https://${GITHUB_USERNAME}.github.io/${CV_FILE_PATH}`;
        const viewerUrl = `https://docs.google.com/gview?url=${pdfUrl}&embedded=true`;

        const openModal = () => {
            resumeIframe.setAttribute('src', viewerUrl);
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            resumeModal.classList.remove('active');
            resumeIframe.setAttribute('src', '');
            document.body.style.overflow = 'auto';
        };

        viewResumeBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
        closeModalBtn.addEventListener('click', closeModal);
        resumeModal.addEventListener('click', (e) => { if (e.target === resumeModal) closeModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && resumeModal.classList.contains('active')) closeModal(); });
    }
    
    // =======================================================
    // #6: UNIVERSAL - SCROLL TO TOP BUTTON
    // =======================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
    }

    // =================================================================
    // #7: HOMEPAGE ONLY - PROJECTS "LOAD MORE / SHOW LESS" BUTTON
    // =================================================================
    const toggleBtn = document.getElementById('toggle-projects-btn');
    const projectsGrid = document.querySelector('.projects-grid');

    if (toggleBtn && projectsGrid) {
        const initiallyHiddenProjects = projectsGrid.querySelectorAll('[data-initially-hidden="true"]');
        const projectsToShowOnClick = 1; // Show one project at a time

        if (initiallyHiddenProjects.length === 0) {
            toggleBtn.style.display = 'none';
        }

        const updateButtonState = () => {
            const currentlyHidden = projectsGrid.querySelectorAll('.project-card.project-hidden');
            if (currentlyHidden.length === 0) {
                toggleBtn.textContent = 'Show Less';
            } else {
                toggleBtn.textContent = `Load More (${currentlyHidden.length} left)`;
            }
        };

        toggleBtn.addEventListener('click', () => {
            const currentlyHidden = Array.from(projectsGrid.querySelectorAll('.project-card.project-hidden'));

            if (currentlyHidden.length > 0) {
                // --- LOAD MORE LOGIC ---
                for (let i = 0; i < projectsToShowOnClick && i < currentlyHidden.length; i++) {
                    currentlyHidden[i].classList.remove('project-hidden');
                    currentlyHidden[i].style.animation = 'fadeIn 0.5s ease forwards';
                }
            } else {
                // --- SHOW LESS LOGIC ---
                initiallyHiddenProjects.forEach(project => {
                    project.classList.add('project-hidden');
                    project.style.animation = 'fadeOut 0.5s ease forwards';
                });
                
                // Scroll up smoothly to the projects section
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Use a small timeout to allow the DOM to update before checking state
            setTimeout(updateButtonState, 10);
        });

        // Initialize button text on page load
        updateButtonState();
    }

}); // This is the final closing brace for the DOMContentLoaded event listener.
