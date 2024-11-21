class Person {
    constructor(id, name, profilePicture = 'default-avatar.png') {
        this.id = id;
        this.name = name;
        this.profilePicture = profilePicture;
    }
}

class Teacher extends Person {
    constructor(id, name, expertise, experience, profilePicture) {
        super(id, name, profilePicture);
        this.expertise = Array.isArray(expertise) ? expertise : [expertise];
        this.experience = experience;
    }

    toCard() {
        return `
            <div class="card teacher-card" data-id="${this.id}" onclick="app.showTeacherDetails(${this.id})">
                <img src="assets/images/${this.profilePicture}" alt="${this.name}" class="profile-pic">
                <h3>${this.name}</h3>
                <div class="expertise-tags">
                    ${this.expertise.map(exp => `<span class="tag">${exp}</span>`).join(' ')}
                </div>
                <p>${this.experience} years of experience</p>
            </div>
        `;
    }
}

class Student extends Person {
    constructor(id, name, studyField, marks, profilePicture) {
        super(id, name, profilePicture);
        this.studyField = studyField;
        this.marks = marks;
    }

    toCard() {
        return `
            <div class="card student-card" data-id="${this.id}">
                <img src="assets/images/${this.profilePicture}" alt="${this.name}" class="profile-pic">
                <h3>${this.name}</h3>
                <span class="field-badge">${this.studyField}</span>
                <p class="marks">Marks: ${this.marks}/100</p>
            </div>
        `;
    }
} 