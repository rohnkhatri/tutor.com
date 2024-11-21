class App {
    constructor() {
        this.teacherManager = new TeacherManager();
        this.studentManager = new StudentManager();
        this.initializeThemeToggle();
        this.initializeSectionNavigation();
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        
        // Set light mode by default
        document.body.setAttribute('data-theme', 'light');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            
            // Update the theme icon
            const themeIcon = themeToggle.querySelector('.theme-icon');
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    initializeSectionNavigation() {
        // Handle option card clicks
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const sectionId = card.dataset.section;
                this.showSection(sectionId);
            });
        });

        // Handle back buttons
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', () => {
                this.showLandingPage();
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.remove('hidden');

        // Add animation class for smooth transition
        targetSection.classList.add('fade-in');
    }

    showLandingPage() {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show landing section
        const landingSection = document.getElementById('landing-section');
        landingSection.classList.remove('hidden');
        landingSection.classList.add('fade-in');
    }

    showTeacherDetails(teacherId) {
        const teacher = this.teacherManager.teachers.find(t => t.id === teacherId);
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="this.parentElement.parentElement.remove();">&times;</span>
                <h2>${teacher.name}</h2>
                <p><strong>Expertise:</strong> ${teacher.expertise.join(', ')}</p>
                <p><strong>Experience:</strong> ${teacher.experience} years</p>
                <p><strong>Bio:</strong> [Add a short bio or teaching style here]</p>
                <button id="book-demo-btn">Book a Demo</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        document.getElementById('book-demo-btn').addEventListener('click', () => {
            this.showBookingForm();
        });
    }

    showBookingForm() {
        const bookingModal = document.createElement('div');
        bookingModal.classList.add('booking-modal');
        bookingModal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="this.parentElement.parentElement.remove();">&times;</span>
                <h3>Book a Demo</h3>
                <form id="payment-form">
                    <div>
                        <label for="cardholder-name">Cardholder Name:</label>
                        <input type="text" id="cardholder-name" required>
                    </div>
                    <div>
                        <label for="card-number">Credit Card Number:</label>
                        <input type="text" id="card-number" required>
                    </div>
                    <div>
                        <label for="expiration-date">Expiration Date:</label>
                        <input type="text" id="expiration-date" placeholder="MM/YY" required>
                    </div>
                    <div>
                        <label for="cvv">CVV:</label>
                        <input type="text" id="cvv" required>
                    </div>
                    <button type="submit">Submit Payment</button>
                </form>
            </div>
        `;
        document.body.appendChild(bookingModal);
        
        document.getElementById('payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Booking request submitted!'); // Placeholder for actual payment processing
            bookingModal.remove(); // Close the modal after submission
        });
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
}); 