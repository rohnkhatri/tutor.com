class TeacherManager {
    constructor() {
        this.teachers = [];
        this.initializeTeachers();
        this.setupEventListeners();
    }

    initializeTeachers() {
        // Updated sample data with computer science expertise
        this.teachers = [
            new Teacher(1, "Amit Sharma", ["Data Structures", "Algorithms"], 10),
            new Teacher(2, "Priya Singh", ["Web Development", "HTML/CSS"], 8),
            new Teacher(3, "Rajesh Kumar", ["Machine Learning", "Python"], 12),
            new Teacher(4, "Anjali Mehta", ["Database Systems", "SQL"], 15),
            new Teacher(5, "Vikram Patel", ["Operating Systems", "C++"], 5),
            new Teacher(6, "Neha Gupta", ["Computer Networks", "Cybersecurity"], 7),
            new Teacher(7, "Suresh Reddy", ["Artificial Intelligence", "Java"], 9),
            new Teacher(8, "Kavita Nair", ["Mobile App Development", "Kotlin"], 11)
        ];
        this.renderTeachers();
    }

    setupEventListeners() {
        document.getElementById('teacher-search').addEventListener('input', () => {
            this.filterTeachers();
            this.updateClearFiltersButton();
        });

        document.getElementById('expertise-select').addEventListener('change', () => {
            this.filterTeachers();
            this.updateClearFiltersButton();
        });

        document.getElementById('experience-input').addEventListener('input', () => {
            this.filterTeachers();
            this.updateClearFiltersButton();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });
    }

    clearFilters() {
        const searchInput = document.getElementById('teacher-search');
        searchInput.value = '';

        const expertiseSelect = document.getElementById('expertise-select');
        expertiseSelect.value = '';

        const experienceInput = document.getElementById('experience-input');
        experienceInput.value = '';

        this.renderTeachers(this.teachers);
        
        this.updateClearFiltersButton();
    }

    updateClearFiltersButton() {
        const clearFiltersBtn = document.getElementById('clear-filters');
        const hasActiveFilters = this.hasActiveFilters();
        
        clearFiltersBtn.disabled = !hasActiveFilters;
    }

    hasActiveFilters() {
        const searchValue = document.getElementById('teacher-search').value;
        const expertiseValue = document.getElementById('expertise-select').value;
        const experienceValue = document.getElementById('experience-input').value;

        return searchValue !== '' || 
               expertiseValue !== '' || 
               experienceValue !== '';
    }

    filterTeachers() {
        const searchTerm = document.getElementById('teacher-search').value.toLowerCase();
        const selectedExpertise = document.getElementById('expertise-select').value.toLowerCase();
        const minExperience = parseInt(document.getElementById('experience-input').value) || 0;

        const filteredTeachers = this.teachers.filter(teacher => {
            const matchesSearch = teacher.name.toLowerCase().includes(searchTerm);
            const matchesExpertise = selectedExpertise === '' || 
                teacher.expertise.some(exp => exp.toLowerCase() === selectedExpertise);
            const matchesExperience = teacher.experience >= minExperience;

            return matchesSearch && matchesExpertise && matchesExperience;
        });

        this.renderTeachers(filteredTeachers);
    }

    renderTeachers(teachersToRender = this.teachers) {
        const container = document.getElementById('teachers-container');
        
        if (teachersToRender.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>No teachers found matching your filters.</p>
                </div>
            `;
        } else {
            container.innerHTML = teachersToRender.map(teacher => teacher.toCard()).join('');
        }
    }
} 