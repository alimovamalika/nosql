// ==========================================
// Лабораторная работа №2
// Моделирование данных в MongoDB
// Предметная область: Университет
// ==========================================

use("universityDB");

// Удаляем старые коллекции,
// чтобы код можно было запускать повторно
db.students.drop();
db.courses.drop();


// ==========================================
// Задание 2. Создание коллекций
// ==========================================

db.createCollection("students");
db.createCollection("courses");


// ==========================================
// Задание 3. Embedded Documents
// Создание 10 студентов
// ==========================================

db.students.insertMany([
    {
        studentId: 1001,
        name: "Aibek",
        age: 19,
        group: "IS-24-1",
        gpa: 3.5,
        contact: {
            city: "Almaty",
            email: "aibek@example.com"
        },
        skills: ["Python", "Java", "MongoDB"]
    },
    {
        studentId: 1002,
        name: "Aigerim",
        age: 20,
        group: "IS-24-1",
        gpa: 3.8,
        contact: {
            city: "Almaty",
            email: "aigerim@example.com"
        },
        skills: ["Python", "SQL", "MongoDB"]
    },
    {
        studentId: 1003,
        name: "Dias",
        age: 19,
        group: "IS-24-1",
        gpa: 3.2,
        contact: {
            city: "Astana",
            email: "dias@example.com"
        },
        skills: ["Java", "C++", "Git"]
    },
    {
        studentId: 1004,
        name: "Madina",
        age: 21,
        group: "IS-24-2",
        gpa: 3.9,
        contact: {
            city: "Almaty",
            email: "madina@example.com"
        },
        skills: ["Python", "JavaScript", "MongoDB"]
    },
    {
        studentId: 1005,
        name: "Nursultan",
        age: 20,
        group: "IS-24-2",
        gpa: 3.1,
        contact: {
            city: "Shymkent",
            email: "nursultan@example.com"
        },
        skills: ["C++", "Java", "Git"]
    },
    {
        studentId: 1006,
        name: "Dana",
        age: 19,
        group: "IS-24-2",
        gpa: 3.7,
        contact: {
            city: "Almaty",
            email: "dana@example.com"
        },
        skills: ["Python", "MongoDB", "Docker"]
    },
    {
        studentId: 1007,
        name: "Erlan",
        age: 22,
        group: "IS-24-3",
        gpa: 2.9,
        contact: {
            city: "Karaganda",
            email: "erlan@example.com"
        },
        skills: ["Java", "SQL", "Git"]
    },
    {
        studentId: 1008,
        name: "Zarina",
        age: 20,
        group: "IS-24-3",
        gpa: 3.6,
        contact: {
            city: "Almaty",
            email: "zarina@example.com"
        },
        skills: ["Python", "Java", "SQL"]
    },
    {
        studentId: 1009,
        name: "Arman",
        age: 21,
        group: "IS-24-3",
        gpa: 3.3,
        contact: {
            city: "Astana",
            email: "arman@example.com"
        },
        skills: ["C++", "MongoDB", "Docker"]
    },
    {
        studentId: 1010,
        name: "Sanzhar",
        age: 19,
        group: "IS-24-4",
        gpa: 3.4,
        contact: {
            city: "Almaty",
            email: "sanzhar@example.com"
        },
        skills: ["Java", "Python", "MongoDB"]
    }
]);


// ==========================================
// Задание 4. Массив документов grades
// ==========================================

db.students.updateMany(
    {},
    {
        $set: {
            grades: [
                {
                    course: "NoSQL",
                    grade: 90
                },
                {
                    course: "Algorithms",
                    grade: 85
                },
                {
                    course: "Programming",
                    grade: 95
                }
            ]
        }
    }
);


// ==========================================
// Задание 5. Dot notation
// ==========================================

// 1. Студенты из Алматы
db.students.find({
    "contact.city": "Almaty"
});

// 2. Студенты из Астаны
db.students.find({
    "contact.city": "Astana"
});

// 3. Алматы + GPA >= 3.0
db.students.find({
    "contact.city": "Almaty",
    gpa: {
        $gte: 3.0
    }
});


// ==========================================
// Задание 6. Работа с массивами
// ==========================================

// Поиск по элементу массива
db.students.find({
    skills: "MongoDB"
});

// $all
db.students.find({
    skills: {
        $all: ["Java", "MongoDB"]
    }
});

// $push
db.students.updateOne(
    {
        studentId: 1001
    },
    {
        $push: {
            skills: "Docker"
        }
    }
);


// ==========================================
// Задание 7. Referencing
// Создание 5 курсов
// ==========================================

db.courses.insertMany([
    {
        _id: 501,
        name: "NoSQL",
        credits: 5,
        teacher: "Kanatov A.",
        semester: 3
    },
    {
        _id: 502,
        name: "Algorithms",
        credits: 5,
        teacher: "Saparov B.",
        semester: 3
    },
    {
        _id: 503,
        name: "Programming",
        credits: 6,
        teacher: "Akhmetova D.",
        semester: 2
    },
    {
        _id: 504,
        name: "Database Systems",
        credits: 5,
        teacher: "Nurlanov E.",
        semester: 3
    },
    {
        _id: 505,
        name: "Computer Networks",
        credits: 4,
        teacher: "Bekov M.",
        semester: 4
    }
]);


// ==========================================
// Связь Students -> Courses
// ==========================================

db.students.updateOne(
    {
        studentId: 1001
    },
    {
        $set: {
            courseIds: [501, 502, 503]
        }
    }
);

db.students.updateMany(
    {
        studentId: {
            $ne: 1001
        }
    },
    {
        $set: {
            courseIds: [501, 502, 504]
        }
    }
);


// ==========================================
// Задание 8. $lookup
// Получение студентов вместе с курсами
// ==========================================

db.students.aggregate([
    {
        $lookup: {
            from: "courses",
            localField: "courseIds",
            foreignField: "_id",
            as: "courses"
        }
    }
]);


// ==========================================
// Дополнительные проверки
// ==========================================

print("================================");
print("Количество студентов:");
print(db.students.countDocuments());

print("================================");
print("Количество курсов:");
print(db.courses.countDocuments());

print("================================");
print("Студент Aibek:");

printjson(
    db.students.findOne({
        studentId: 1001
    })
);
