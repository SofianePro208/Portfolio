document.addEventListener('DOMContentLoaded', function() {

    // --- TYPED.JS ---
    // Initializes the typing effect on the hero section
    const options = {
        strings: [
            'Creative Front-End Alchemist',       
'Human-Centered Developer',  
'UI Visionary',
'Logic-Driven Creative Thinker',
'Lifelong Learner — Always in Beta', 

        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    };
    const typed = new Typed('#typing-effect', options);

    // --- REVEAL ON SCROLL ---
    // Uses Intersection Observer to add 'active' class to elements when they enter the viewport
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: stop observing once revealed
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // =======================================================
    // === MOBILE NAVIGATION (HAMBURGER MENU) ===
    // =======================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
    
    // --- ACTIVE NAV LINK HIGHLIGHTING ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) { // 150px offset to trigger highlight sooner
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    });
 // --- SCROLL TO TOP BUTTON ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Smooth scroll to top on click
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
 // --- CV MODAL LOGIC ---
     const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const resumeIframe = document.getElementById('resume-iframe');

    // --- CONFIGURATION ---
    // IMPORTANT: CHANGE THIS TO YOUR ACTUAL GITHUB USERNAME!
    const GITHUB_USERNAME = "SofianePro208"; 
    // IMPORTANT: Make sure this path exactly matches your folder and file name.
    const CV_FILE_PATH = "cv/cvv.pdf"; 
    // -------------------

    // This creates the full, final URL for the viewer
    const pdfUrl = `https://raw.githubusercontent.com/SofianePro208/Portfolio/main/cv/cvv.pdf`;
    const viewerUrl = `https://docs.google.com/gview?url=https://raw.githubusercontent.com/SofianePro208/Portfolio/main/cv/cvv.pdf&embedded=true`;

    // Function to open the modal
    function openModal() {
        // Set the iframe src to the Google Viewer URL
        resumeIframe.setAttribute('src', viewerUrl);
        // Show the modal
        resumeModal.classList.add('active');
        // Stop the background from scrolling
        document.body.style.overflow = 'hidden'; 
    }

    // Function to close the modal
    function closeModal() {
        // Hide the modal
        resumeModal.classList.remove('active');
        // Important: Clear the src to stop the PDF from loading in the background
        resumeIframe.setAttribute('src', ''); 
        // Allow background scrolling again
        document.body.style.overflow = 'auto';
    }

    // --- EVENT LISTENERS ---

    // When you click "View Resume"
    viewResumeBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Stop the link from doing anything by itself
        openModal();
    });

    // When you click the 'X' button
    closeModalBtn.addEventListener('click', closeModal);

    // When you click the dark background of the modal
    resumeModal.addEventListener('click', function(e) {
        if (e.target === resumeModal) {
            closeModal();
        }
    });

    // When you press the 'Escape' key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeModal();
        }
    });

      // --- CONTACT FORM SUBMISSION (FOR NETLIFY, WITH MODAL WINDOW) ---
const form = document.getElementById('contact-form');

if (form) { // Only run this code if the form exists on the page
    // --- Get all the elements we need ---
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Modal window elements
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-success-modal');
    const okBtn = document.getElementById('ok-btn');
    
    // --- Function to hide the modal ---
    function hideSuccessModal() {
        successModal.classList.remove('active');
    }

    // --- Event listeners to close the modal ---
    closeModalBtn.addEventListener('click', hideSuccessModal);
    okBtn.addEventListener('click', hideSuccessModal);
    successModal.addEventListener('click', (e) => { // Close if background is clicked
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
    window.addEventListener('keydown', (e) => { // Close with Escape key
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            hideSuccessModal();
        }
    });

    // --- Email validation function ---
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // --- Main form submission event listener ---
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // --- Validation Check ---
        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.classList.add('visible');
            emailInput.classList.add('input-error');
            return;
        }

        // --- Submission to Netlify ---
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        const formData = new FormData(form);
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // SUCCESS!
            form.reset();
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

    // --- Remove error on input ---
    emailInput.addEventListener('input', () => {
        if (emailError.classList.contains('visible')) {
            emailError.classList.remove('visible');
            emailInput.classList.remove('input-error');
        }
    });
}
}); // This should be the final closing brace of your file



