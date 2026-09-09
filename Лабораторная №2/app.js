// ==========================================
// University MongoDB
// Frontend JavaScript
// ==========================================

const searchInput = document.getElementById("searchInput");

const students = [
    {
        name: "Aibek",
        id: 1001,
        age: 19,
        group: "IS-24-1",
        gpa: 3.5,
        city: "Almaty",
        skills: ["Python", "Java", "MongoDB", "Docker"]
    },
    {
        name: "Aigerim",
        id: 1002,
        age: 20,
        group: "IS-24-1",
        gpa: 3.8,
        city: "Almaty",
        skills: ["Python", "SQL", "MongoDB"]
    },
    {
        name: "Dias",
        id: 1003,
        age: 19,
        group: "IS-24-1",
        gpa: 3.2,
        city: "Astana",
        skills: ["Java", "C++", "Git"]
    },
    {
        name: "Madina",
        id: 1004,
        age: 21,
        group: "IS-24-2",
        gpa: 3.9,
        city: "Almaty",
        skills: ["Python", "JavaScript", "MongoDB"]
    },
    {
        name: "Nursultan",
        id: 1005,
        age: 20,
        group: "IS-24-2",
        gpa: 3.1,
        city: "Shymkent",
        skills: ["C++", "Java", "Git"]
    },
    {
        name: "Dana",
        id: 1006,
        age: 19,
        group: "IS-24-2",
        gpa: 3.7,
        city: "Almaty",
        skills: ["Python", "MongoDB", "Docker"]
    },
    {
        name: "Erlan",
        id: 1007,
        age: 22,
        group: "IS-24-3",
        gpa: 2.9,
        city: "Karaganda",
        skills: ["Java", "SQL", "Git"]
    },
    {
        name: "Zarina",
        id: 1008,
        age: 20,
        group: "IS-24-3",
        gpa: 3.6,
        city: "Almaty",
        skills: ["Python", "Java", "SQL"]
    },
    {
        name: "Arman",
        id: 1009,
        age: 21,
        group: "IS-24-3",
        gpa: 3.3,
        city: "Astana",
        skills: ["C++", "MongoDB", "Docker"]
    },
    {
        name: "Sanzhar",
        id: 1010,
        age: 19,
        group: "IS-24-4",
        gpa: 3.4,
        city: "Almaty",
        skills: ["Java", "Python", "MongoDB"]
    }
];


// Количество студентов

document.getElementById("studentsCount").textContent =
    students.length;


// Поиск студентов

searchInput.addEventListener("input", function () {

    const value = searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(".student-card");

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


// Сообщение в консоли

console.log("University MongoDB project loaded.");

console.log("Students:", students.length);

console.log(
    "Database: universityDB"
);

console.log(
    "Collections: students, courses"
);
