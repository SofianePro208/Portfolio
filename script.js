/* ===================================================================
   FINAL, COMPLETE SCRIPT.JS FOR THE ENTIRE PORTFOLIO
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

        // Close mobile nav when a link inside it is clicked
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
    if (typingElement) {
        const typed = new Typed('#typing-effect', {
            strings: ['Creative Front-End Alchemist', 'Human-Centered Developer', 'UI Visionary', 'Logic-Driven Creative Thinker', 'Lifelong Learner — Always in Beta'],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }


    // =======================================================
    // #3: HOMEPAGE ONLY - ON-SCROLL REVEAL ANIMATIONS
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
    // This uses the Google Docs Viewer method for reliability.
    // =======================================================
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');

    if (viewResumeBtn && resumeModal) {
        const closeModalBtn = resumeModal.querySelector('.close-btn');
        const resumeIframe = document.getElementById('resume-iframe');

        // --- CONFIGURATION ---
        const GITHUB_USERNAME = "[YOUR_GITHUB_USERNAME]"; // !! IMPORTANT: Change this!
        const CV_FILE_PATH = "cv/Rezak_Souilah_CV.pdf"; // !! IMPORTANT: Make sure this is correct!
        // -------------------

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

    // If there are no projects to hide/show, hide the button completely.
    if (initiallyHiddenProjects.length === 0) {
        toggleBtn.style.display = 'none';
    }

    // Function to check the state and update the button text
    function updateButtonState() {
        const currentlyHidden = projectsGrid.querySelectorAll('.project-card.project-hidden');
        if (currentlyHidden.length === 0) {
            // All projects are visible
            toggleBtn.textContent = 'Show Less';
        } else {
            // Some projects are still hidden
            toggleBtn.textContent = 'Load More Projects';
        }
    }

    toggleBtn.addEventListener('click', () => {
        const currentlyHidden = projectsGrid.querySelectorAll('.project-card.project-hidden');

        if (currentlyHidden.length > 0) {
            // --- LOAD MORE LOGIC ---
            // Show the next project that is currently hidden
            const firstHidden = currentlyHidden[0];
            if (firstHidden) {
                firstHidden.classList.remove('project-hidden');
                // Optional: Add a fade-in animation
                firstHidden.style.animation = 'fadeIn 0.5s ease forwards';
            }
        } else {
            // --- SHOW LESS LOGIC ---
            // Hide all the projects that were initially hidden
            initiallyHiddenProjects.forEach(project => {
                project.classList.add('project-hidden');
                // Optional: Add a fade-out animation
                project.style.animation = 'fadeOut 0.5s ease forwards';
            });
        }
        
        // After any action, update the button's text and state
        updateButtonState();
    });

    // Initialize the button text on page load
    updateButtonState();
}

}); // This is the final closing brace for the DOMContentLoaded event listener.
