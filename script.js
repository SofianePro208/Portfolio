document.addEventListener('DOMContentLoaded', function() {

    // --- TYPED.JS ---
    // Initializes the typing effect on the hero section
    const options = {
        strings: [
            'EdTech Developer',       
'Web Design Enthusiast',  
'Creative Problem Solver',
'Lifelong Learner',
'Open Source Contributor', 

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

    // --- MOBILE NAVIGATION (HAMBURGER MENU) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
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

});

