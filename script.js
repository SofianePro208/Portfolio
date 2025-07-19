// =================================================================
// #7: HOMEPAGE ONLY - PROJECTS "LOAD MORE / SHOW LESS" BUTTON (CORRECTED WITH SCROLL)
// =================================================================
const toggleBtn = document.getElementById('toggle-projects-btn');
const projectsGrid = document.querySelector('.projects-grid');

if (toggleBtn && projectsGrid) {
    const initiallyHiddenProjects = projectsGrid.querySelectorAll('[data-initially-hidden="true"]');

    if (initiallyHiddenProjects.length === 0) {
        toggleBtn.style.display = 'none';
    }

    function updateButtonState() {
        const currentlyHidden = projectsGrid.querySelectorAll('.project-card.project-hidden');
        if (currentlyHidden.length === 0) {
            toggleBtn.textContent = 'Show Less';
        } else {
            toggleBtn.textContent = 'Load More Projects';
        }
    }

    toggleBtn.addEventListener('click', () => {
        const currentlyHidden = projectsGrid.querySelectorAll('.project-card.project-hidden');

        if (currentlyHidden.length > 0) {
            // --- LOAD MORE LOGIC ---
            const firstHidden = currentlyHidden[0];
            if (firstHidden) {
                firstHidden.classList.remove('project-hidden');
                firstHidden.style.animation = 'fadeIn 0.5s ease forwards';
            }
        } else {
            // --- SHOW LESS LOGIC ---
            initiallyHiddenProjects.forEach(project => {
                project.classList.add('project-hidden');
                project.style.animation = 'fadeOut 0.5s ease forwards';
            });
            
            // This is the added line to scroll up smoothly
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
        
        updateButtonState();
    });

    updateButtonState();
}
