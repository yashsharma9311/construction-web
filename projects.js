document.addEventListener('DOMContentLoaded', function() {
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-buttons li');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Project Modal
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    
    // Sample project data (in a real site, this would come from a database)
    const projectsData = {
        project1: {
            title: "Green Valley Apartments",
            type: "Residential",
            status: "Completed",
            date: "January 2023",
            location: "Denver City Center",
            description: "A luxury apartment complex featuring modern amenities and sustainable design elements. The project includes 50 units across 10 floors with underground parking, rooftop garden, and 24/7 security.",
            features: [
                "50 luxury apartments",
                "Rooftop garden",
                "Underground parking",
                "24/7 security",
                "Solar panel system",
                "Rainwater harvesting",
                "Smart home features",
                "Community clubhouse"
            ],
            images: [
                "images/project1.jpg",
                "images/project1-2.jpg",
                "images/project1-3.jpg"
            ]
        },
        // Add similar data for other projects...
    };
    
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.closest('.project-item').classList[1]; // Gets 'project1', 'project2', etc.
            
            // In a real implementation, you would fetch project data here
            const project = projectsData[projectId];
            
            // Populate modal with project data
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="modal-project-images">
                    ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                </div>
                <div class="modal-project-info">
                    <h2>${project.title}</h2>
                    <div class="modal-project-meta">
                        <div><i class="fas fa-home"></i> ${project.type}</div>
                        <div><i class="fas fa-calendar-check"></i> ${project.status}: ${project.date}</div>
                        <div><i class="fas fa-map-marker-alt"></i> ${project.location}</div>
                    </div>
                    <div class="modal-project-description">
                        <p>${project.description}</p>
                    </div>
                    <div class="modal-project-features">
                        <h3>Project Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});