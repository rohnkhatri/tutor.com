class StudentManager {
    constructor() {
        this.students = [];
        this.initializeStudents();
        this.setupEventListeners();
    }

    initializeStudents() {
        // Sample data with Indian names
        this.students = [
            new Student(1, "Rohan Verma", "Computer Science", 92),
            new Student(2, "Sneha Iyer", "Mathematics", 88),
            new Student(3, "Arjun Desai", "Physics", 95),
            new Student(4, "Meera Joshi", "Chemistry", 85),
            new Student(5, "Lakshmi Menon", "Biology", 90),
            new Student(6, "Vivek Chawla", "History", 78),
            new Student(7, "Pooja Kapoor", "English", 82),
            new Student(8, "Rahul Nair", "Environmental Science", 87),
            new Student(9, "Ananya Rao", "Computer Science", 91),
            new Student(10, "Karan Mehta", "Physics", 89),
            new Student(11, "Isha Patel", "Mathematics", 94),
            new Student(12, "Aarav Gupta", "Chemistry", 86),
            new Student(13, "Nisha Bhatia", "Biology", 83),
            new Student(14, "Dev Sharma", "History", 80),
            new Student(15, "Tara Reddy", "English", 84),
            new Student(16, "Aditya Singh", "Environmental Science", 88)
        ];
        this.renderStudents();
        this.updateLeaderboard();
    }

    setupEventListeners() {
        document.getElementById('student-search').addEventListener('input', (e) => {
            this.filterStudents(e.target.value);
        });
    }

    filterStudents(searchTerm) {
        const filtered = this.students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderStudents(filtered);
    }

    renderStudents(studentsToRender = this.students) {
        const container = document.getElementById('students-container');
        container.innerHTML = studentsToRender.map(student => student.toCard()).join('');
    }

    updateLeaderboard() {
        const leaderboardList = document.querySelector('.leaderboard-list');
        const sortedStudents = [...this.students].sort((a, b) => b.marks - a.marks);
        
        leaderboardList.innerHTML = sortedStudents.map((student, index) => `
            <div class="leaderboard-item ${index < 3 ? 'top-three' : ''}">
                <span class="rank">#${index + 1}</span>
                <span class="name">${student.name}</span>
                <span class="marks">${student.marks}</span>
            </div>
        `).join('');
    }
} 