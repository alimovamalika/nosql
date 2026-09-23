// ЛАБОРАТОРНАЯ РАБОТА №4
// Тема: Aggregation, индексы и анализ производительности
// Вариант: Музыкальный сервис

// Подключение:
// mongosh
// use music_lab4

use("music_lab4");

// ============================================================
// 1. СОЗДАНИЕ КОЛЛЕКЦИЙ
// ============================================================

db.createCollection("tracks");
db.createCollection("users");
db.createCollection("playlists");

// ============================================================
// 2. ОЧИСТКА КОЛЛЕКЦИЙ ПЕРЕД ПОВТОРНЫМ ЗАПУСКОМ
// ============================================================

db.tracks.deleteMany({});
db.users.deleteMany({});
db.playlists.deleteMany({});

// ============================================================
// 3. ДОБАВЛЕНИЕ 30 ДОКУМЕНТОВ В ОСНОВНУЮ КОЛЛЕКЦИЮ
// ============================================================

db.tracks.insertMany([
    {
        trackId: 101,
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        duration: 200,
        rating: 4.9,
        plays: 500000,
        year: 2020,
        tags: ["pop", "hit", "2020"]
    },
    {
        trackId: 102,
        title: "Save Your Tears",
        artist: "The Weeknd",
        genre: "Pop",
        duration: 215,
        rating: 4.8,
        plays: 420000,
        year: 2020,
        tags: ["pop", "love", "hit"]
    },
    {
        trackId: 103,
        title: "Shape of You",
        artist: "Ed Sheeran",
        genre: "Pop",
        duration: 234,
        rating: 4.8,
        plays: 600000,
        year: 2017,
        tags: ["pop", "love", "hit"]
    },
    {
        trackId: 104,
        title: "Perfect",
        artist: "Ed Sheeran",
        genre: "Pop",
        duration: 263,
        rating: 4.7,
        plays: 550000,
        year: 2017,
        tags: ["pop", "love"]
    },
    {
        trackId: 105,
        title: "Believer",
        artist: "Imagine Dragons",
        genre: "Rock",
        duration: 204,
        rating: 4.8,
        plays: 490000,
        year: 2017,
        tags: ["rock", "hit", "energy"]
    },
    {
        trackId: 106,
        title: "Thunder",
        artist: "Imagine Dragons",
        genre: "Rock",
        duration: 187,
        rating: 4.6,
        plays: 410000,
        year: 2017,
        tags: ["rock", "energy"]
    },
    {
        trackId: 107,
        title: "Radioactive",
        artist: "Imagine Dragons",
        genre: "Rock",
        duration: 186,
        rating: 4.7,
        plays: 450000,
        year: 2012,
        tags: ["rock", "classic"]
    },
    {
        trackId: 108,
        title: "Numb",
        artist: "Linkin Park",
        genre: "Rock",
        duration: 185,
        rating: 4.9,
        plays: 520000,
        year: 2003,
        tags: ["rock", "classic", "hit"]
    },
    {
        trackId: 109,
        title: "In the End",
        artist: "Linkin Park",
        genre: "Rock",
        duration: 216,
        rating: 4.9,
        plays: 580000,
        year: 2000,
        tags: ["rock", "classic", "hit"]
    },
    {
        trackId: 110,
        title: "Faint",
        artist: "Linkin Park",
        genre: "Rock",
        duration: 162,
        rating: 4.6,
        plays: 330000,
        year: 2003,
        tags: ["rock", "energy"]
    },
    {
        trackId: 111,
        title: "HUMBLE.",
        artist: "Kendrick Lamar",
        genre: "Hip-Hop",
        duration: 177,
        rating: 4.8,
        plays: 470000,
        year: 2017,
        tags: ["hiphop", "rap", "hit"]
    },
    {
        trackId: 112,
        title: "DNA.",
        artist: "Kendrick Lamar",
        genre: "Hip-Hop",
        duration: 185,
        rating: 4.7,
        plays: 390000,
        year: 2017,
        tags: ["hiphop", "rap"]
    },
    {
        trackId: 113,
        title: "God's Plan",
        artist: "Drake",
        genre: "Hip-Hop",
        duration: 198,
        rating: 4.8,
        plays: 510000,
        year: 2018,
        tags: ["hiphop", "rap", "hit"]
    },
    {
        trackId: 114,
        title: "One Dance",
        artist: "Drake",
        genre: "Hip-Hop",
        duration: 173,
        rating: 4.6,
        plays: 480000,
        year: 2016,
        tags: ["hiphop", "dance"]
    },
    {
        trackId: 115,
        title: "Sicko Mode",
        artist: "Travis Scott",
        genre: "Hip-Hop",
        duration: 312,
        rating: 4.8,
        plays: 460000,
        year: 2018,
        tags: ["hiphop", "rap", "energy"]
    },
    {
        trackId: 116,
        title: "Bad Guy",
        artist: "Billie Eilish",
        genre: "Alternative",
        duration: 194,
        rating: 4.9,
        plays: 530000,
        year: 2019,
        tags: ["alternative", "pop", "hit"]
    },
    {
        trackId: 117,
        title: "Lovely",
        artist: "Billie Eilish",
        genre: "Alternative",
        duration: 200,
        rating: 4.8,
        plays: 440000,
        year: 2018,
        tags: ["alternative", "love"]
    },
    {
        trackId: 118,
        title: "Ocean Eyes",
        artist: "Billie Eilish",
        genre: "Alternative",
        duration: 200,
        rating: 4.7,
        plays: 350000,
        year: 2016,
        tags: ["alternative", "love"]
    },
    {
        trackId: 119,
        title: "Stay",
        artist: "Justin Bieber",
        genre: "Pop",
        duration: 141,
        rating: 4.7,
        plays: 570000,
        year: 2021,
        tags: ["pop", "hit", "dance"]
    },
    {
        trackId: 120,
        title: "Sorry",
        artist: "Justin Bieber",
        genre: "Pop",
        duration: 200,
        rating: 4.5,
        plays: 430000,
        year: 2015,
        tags: ["pop", "dance"]
    },
    {
        trackId: 121,
        title: "Peaches",
        artist: "Justin Bieber",
        genre: "Pop",
        duration: 198,
        rating: 4.6,
        plays: 380000,
        year: 2021,
        tags: ["pop", "love"]
    },
    {
        trackId: 122,
        title: "Lose Yourself",
        artist: "Eminem",
        genre: "Hip-Hop",
        duration: 326,
        rating: 4.9,
        plays: 610000,
        year: 2002,
        tags: ["hiphop", "rap", "classic"]
    },
    {
        trackId: 123,
        title: "Without Me",
        artist: "Eminem",
        genre: "Hip-Hop",
        duration: 290,
        rating: 4.8,
        plays: 540000,
        year: 2002,
        tags: ["hiphop", "rap", "classic"]
    },
    {
        trackId: 124,
        title: "Mockingbird",
        artist: "Eminem",
        genre: "Hip-Hop",
        duration: 250,
        rating: 4.7,
        plays: 490000,
        year: 2004,
        tags: ["hiphop", "rap"]
    },
    {
        trackId: 125,
        title: "Stressed Out",
        artist: "Twenty One Pilots",
        genre: "Alternative",
        duration: 202,
        rating: 4.6,
        plays: 360000,
        year: 2015,
        tags: ["alternative", "hit"]
    },
    {
        trackId: 126,
        title: "Heathens",
        artist: "Twenty One Pilots",
        genre: "Alternative",
        duration: 195,
        rating: 4.7,
        plays: 400000,
        year: 2016,
        tags: ["alternative", "hit"]
    },
    {
        trackId: 127,
        title: "Ride",
        artist: "Twenty One Pilots",
        genre: "Alternative",
        duration: 214,
        rating: 4.5,
        plays: 320000,
        year: 2015,
        tags: ["alternative", "classic"]
    },
    {
        trackId: 128,
        title: "Counting Stars",
        artist: "OneRepublic",
        genre: "Pop",
        duration: 257,
        rating: 4.8,
        plays: 590000,
        year: 2013,
        tags: ["pop", "hit", "classic"]
    },
    {
        trackId: 129,
        title: "Apologize",
        artist: "OneRepublic",
        genre: "Pop",
        duration: 179,
        rating: 4.6,
        plays: 370000,
        year: 2007,
        tags: ["pop", "love"]
    },
    {
        trackId: 130,
        title: "Starboy",
        artist: "The Weeknd",
        genre: "Pop",
        duration: 230,
        rating: 4.8,
        plays: 510000,
        year: 2016,
        tags: ["pop", "hit", "dance"]
    }
]);

// ============================================================
// 4. USERS
// ============================================================

db.users.insertMany([
    { userId: 1, name: "Aidar", age: 20, country: "Kazakhstan" },
    { userId: 2, name: "Dana", age: 21, country: "Kazakhstan" },
    { userId: 3, name: "Alex", age: 22, country: "Kazakhstan" },
    { userId: 4, name: "Maria", age: 20, country: "Russia" },
    { userId: 5, name: "John", age: 25, country: "USA" }
]);

// ============================================================
// 5. PLAYLISTS
// ============================================================

db.playlists.insertMany([
    {
        playlistId: 1,
        userId: 1,
        name: "My Favorites",
        trackIds: [101, 105, 108, 116]
    },
    {
        playlistId: 2,
        userId: 2,
        name: "Workout",
        trackIds: [105, 107, 111, 115]
    },
    {
        playlistId: 3,
        userId: 3,
        name: "Relax",
        trackIds: [104, 117, 118, 129]
    }
]);

// ============================================================
// ЗАДАНИЕ 1 — $match
// ============================================================

// 1. Фильтрация по строковому полю
db.tracks.aggregate([
    { $match: { genre: "Rock" } }
]);

// 2. Фильтрация по диапазону
db.tracks.aggregate([
    { $match: { rating: { $gte: 4.8 } } }
]);

// 3. Два условия
db.tracks.aggregate([
    {
        $match: {
            genre: "Pop",
            rating: { $gte: 4.7 }
        }
    }
]);

// 4. $or
db.tracks.aggregate([
    {
        $match: {
            $or: [
                { genre: "Rock" },
                { genre: "Hip-Hop" }
            ]
        }
    }
]);

// ============================================================
// ЗАДАНИЕ 2 — $project
// ============================================================

// Только нужные поля
db.tracks.aggregate([
    {
        $project: {
            _id: 0,
            title: 1,
            artist: 1,
            genre: 1,
            rating: 1
        }
    }
]);

// Вычисляемое поле
db.tracks.aggregate([
    {
        $project: {
            _id: 0,
            title: 1,
            artist: 1,
            plays: 1,
            rating: 1,
            popularity: {
                $multiply: ["$plays", "$rating"]
            }
        }
    }
]);

// ============================================================
// ЗАДАНИЕ 3 — $group
// ============================================================

// Количество, среднее, минимум, максимум
db.tracks.aggregate([
    {
        $group: {
            _id: "$genre",
            trackCount: { $sum: 1 },
            avgRating: { $avg: "$rating" },
            minRating: { $min: "$rating" },
            maxRating: { $max: "$rating" }
        }
    }
]);

// Сумма прослушиваний по жанрам
db.tracks.aggregate([
    {
        $group: {
            _id: "$genre",
            totalPlays: { $sum: "$plays" },
            avgPlays: { $avg: "$plays" }
        }
    },
    {
        $sort: { totalPlays: -1 }
    }
]);

// ============================================================
// ЗАДАНИЕ 4 — $sort + $limit
// ============================================================

// TOP-5 самых популярных треков
db.tracks.aggregate([
    { $sort: { plays: -1 } },
    { $limit: 5 },
    {
        $project: {
            _id: 0,
            title: 1,
            artist: 1,
            plays: 1
        }
    }
]);

// ============================================================
// ЗАДАНИЕ 5 — $unwind
// ============================================================

// Самые часто встречающиеся теги
db.tracks.aggregate([
    { $unwind: "$tags" },
    {
        $group: {
            _id: "$tags",
            count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
]);

// ============================================================
// ЗАДАНИЕ 6 — $lookup
// ============================================================

// Объединяем playlists и users
db.playlists.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "userId",
            as: "user"
        }
    },
    { $unwind: "$user" },
    {
        $project: {
            _id: 0,
            playlistId: 1,
            name: 1,
            "user.name": 1,
            "user.country": 1
        }
    }
]);

// from          — коллекция, с которой выполняется соединение
// localField    — поле текущей коллекции
// foreignField  — поле коллекции users
// as            — имя результирующего массива

// ============================================================
// ЗАДАНИЕ 7 — PIPELINE ИЗ 4+ ЭТАПОВ
// ============================================================

db.tracks.aggregate([
    {
        $match: {
            rating: { $gte: 4.7 },
            plays: { $gt: 300000 }
        }
    },
    {
        $group: {
            _id: "$genre",
            avgRating: { $avg: "$rating" },
            totalPlays: { $sum: "$plays" },
            trackCount: { $sum: 1 }
        }
    },
    {
        $sort: {
            avgRating: -1
        }
    },
    {
        $limit: 5
    },
    {
        $project: {
            _id: 0,
            genre: "$_id",
            avgRating: 1,
            totalPlays: 1,
            trackCount: 1
        }
    }
]);

// ============================================================
// ЗАДАНИЕ 8 — EXPLAIN ДО ИНДЕКСА
// ============================================================

// Перед экспериментом удаляем пользовательские индексы
db.tracks.dropIndexes();

// Запрос без индекса
db.tracks
    .find({ genre: "Rock" })
    .explain("executionStats");

// Ожидаемый тип плана на данном этапе:
// COLLSCAN

// ============================================================
// ЗАДАНИЕ 9 — ПРОСТОЙ ИНДЕКС
// ============================================================

db.tracks.createIndex({ genre: 1 });

// Повторный explain
db.tracks
    .find({ genre: "Rock" })
    .explain("executionStats");

// После создания индекса ожидается:
// IXSCAN

// ============================================================
// ЗАДАНИЕ 10 — СОСТАВНОЙ ИНДЕКС
// ============================================================

db.tracks.createIndex({
    genre: 1,
    rating: -1
});

// Запрос по жанру и рейтингу
db.tracks
    .find({
        genre: "Rock",
        rating: { $gte: 4.5 }
    })
    .sort({ rating: -1 })
    .explain("executionStats");

// ============================================================
// ЗАДАНИЕ 11 — СОСТАВНОЙ ИНДЕКС ДЛЯ SORT
// ============================================================

// Удаляем предыдущий индекс
db.tracks.dropIndexes();

// Индекс: Equality + Sort
db.tracks.createIndex({
    genre: 1,
    plays: -1
});

db.tracks
    .find({ genre: "Pop" })
    .sort({ plays: -1 })
    .explain("executionStats");

// ============================================================
// ЗАДАНИЕ 12 — ЭКСПЕРИМЕНТ ESR
// ============================================================

// Индекс №1:
// Equality -> Sort -> Range
db.tracks.dropIndexes();

db.tracks.createIndex({
    genre: 1,
    plays: 1,
    rating: 1
});

db.tracks
    .find({
        genre: "Pop",
        rating: { $gte: 4.5 }
    })
    .sort({ plays: 1 })
    .explain("executionStats");

// Индекс №2:
// Equality -> Range -> Sort
db.tracks.dropIndexes();

db.tracks.createIndex({
    genre: 1,
    rating: 1,
    plays: 1
});

db.tracks
    .find({
        genre: "Pop",
        rating: { $gte: 4.5 }
    })
    .sort({ plays: 1 })
    .explain("executionStats");

// Сравнение необходимо выполнять по:
// winningPlan
// totalDocsExamined
// totalKeysExamined
// executionTimeMillis

// ============================================================
// ДОПОЛНИТЕЛЬНЫЕ ЭКСПЕРИМЕНТЫ
// ============================================================

// Эксперимент 1 — без индекса
db.tracks.dropIndexes();

db.tracks
    .find({ artist: "The Weeknd" })
    .explain("executionStats");

// Эксперимент 2 — простой индекс
db.tracks.createIndex({ artist: 1 });

db.tracks
    .find({ artist: "The Weeknd" })
    .explain("executionStats");

// Эксперимент 3 — составной индекс
db.tracks.createIndex({
    genre: 1,
    rating: -1
});

db.tracks
    .find({
        genre: "Pop",
        rating: { $gte: 4.5 }
    })
    .explain("executionStats");

// Эксперимент 4 — Equality + Sort
db.tracks.createIndex({
    genre: 1,
    plays: -1
});

db.tracks
    .find({ genre: "Pop" })
    .sort({ plays: -1 })
    .explain("executionStats");

// ============================================================
// ПРОВЕРКА ИНДЕКСОВ
// ============================================================

db.tracks.getIndexes();

// ============================================================
// ФИНАЛЬНАЯ АГРЕГАЦИЯ ДЛЯ ДЕМОНСТРАЦИИ
// ============================================================

db.tracks.aggregate([
    {
        $match: {
            plays: { $gte: 400000 },
            rating: { $gte: 4.7 }
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            artist: 1,
            genre: 1,
            rating: 1,
            plays: 1,
            popularity: {
                $multiply: ["$rating", "$plays"]
            }
        }
    },
    {
        $sort: {
            popularity: -1
        }
    },
    {
        $limit: 10
    }
]);