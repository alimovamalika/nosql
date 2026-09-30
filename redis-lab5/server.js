const express = require("express");
const path = require("path");
const { client, connectRedis } = require("./redis");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/*
|--------------------------------------------------------------------------
| Тестовые данные
|--------------------------------------------------------------------------
*/

const courses = [
    {
        id: "CS305",
        name: "NoSQL Technologies",
        teacher: "A. Teacher",
        room: "305",
        semester: "5"
    },
    {
        id: "DB201",
        name: "Database Systems",
        teacher: "B. Teacher",
        room: "210",
        semester: "4"
    },
    {
        id: "WEB301",
        name: "Web Technologies",
        teacher: "C. Teacher",
        room: "401",
        semester: "5"
    }
];

/*
|--------------------------------------------------------------------------
| Главная страница
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
|--------------------------------------------------------------------------
| Получить все курсы
|--------------------------------------------------------------------------
*/

app.get("/api/courses", async (req, res) => {
    try {
        const result = [];

        for (const course of courses) {
            const key = `cache:course:${course.id}`;

            const exists = await client.exists(key);

            if (exists) {
                const data = await client.hGetAll(key);

                result.push({
                    ...data,
                    source: "Redis"
                });
            } else {
                result.push({
                    ...course,
                    source: "Main DB"
                });
            }
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Получить курс из Redis cache
|--------------------------------------------------------------------------
*/

app.get("/api/courses/:id", async (req, res) => {
    try {
        const id = req.params.id.toUpperCase();
        const key = `cache:course:${id}`;

        const exists = await client.exists(key);

        if (exists) {
            const data = await client.hGetAll(key);
            const ttl = await client.ttl(key);

            return res.json({
                success: true,
                source: "cache hit",
                ttl,
                data
            });
        }

        /*
         * Cache miss.
         * Имитируем получение данных из основной БД.
         */

        const course = courses.find(
            item => item.id === id
        );

        if (!course) {
            return res.status(404).json({
                error: "Курс не найден"
            });
        }

        await client.hSet(key, {
            id: course.id,
            name: course.name,
            teacher: course.teacher,
            room: course.room,
            semester: course.semester
        });

        await client.expire(key, 600);

        return res.json({
            success: true,
            source: "cache miss → main DB → Redis",
            ttl: 600,
            data: course
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Изменение аудитории курса
|--------------------------------------------------------------------------
*/

app.put("/api/courses/:id", async (req, res) => {
    try {
        const id = req.params.id.toUpperCase();
        const { room } = req.body;

        if (!room) {
            return res.status(400).json({
                error: "Необходимо указать room"
            });
        }

        /*
         * Имитация изменения основной БД
         */

        const course = courses.find(
            item => item.id === id
        );

        if (!course) {
            return res.status(404).json({
                error: "Курс не найден"
            });
        }

        course.room = room;

        /*
         * Инвалидирование Redis cache
         */

        const key = `cache:course:${id}`;

        await client.del(key);

        res.json({
            success: true,
            message: "Данные изменены. Кэш инвалидирован.",
            course
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Создание сессии
|--------------------------------------------------------------------------
*/

app.post("/api/sessions", async (req, res) => {
    try {
        const {
            id,
            user_id,
            role,
            language,
            last_section
        } = req.body;

        if (!id || !user_id || !role || !language) {
            return res.status(400).json({
                error: "Заполните обязательные поля"
            });
        }

        const key = `session:${id}`;

        await client.hSet(key, {
            user_id,
            role,
            language,
            last_section: last_section || "dashboard"
        });

        /*
         * 1800 секунд = 30 минут
         */

        await client.expire(key, 1800);

        const ttl = await client.ttl(key);

        res.json({
            success: true,
            key,
            ttl,
            data: await client.hGetAll(key)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Получить сессию
|--------------------------------------------------------------------------
*/

app.get("/api/sessions/:id", async (req, res) => {
    try {
        const key = `session:${req.params.id}`;

        const exists = await client.exists(key);

        if (!exists) {
            return res.status(404).json({
                error: "Сессия отсутствует или срок её действия истёк"
            });
        }

        const data = await client.hGetAll(key);
        const ttl = await client.ttl(key);

        res.json({
            success: true,
            key,
            ttl,
            data
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Изменение языка сессии
|--------------------------------------------------------------------------
*/

app.put("/api/sessions/:id", async (req, res) => {
    try {
        const key = `session:${req.params.id}`;
        const { language } = req.body;

        const exists = await client.exists(key);

        if (!exists) {
            return res.status(404).json({
                error: "Сессия не найдена"
            });
        }

        await client.hSet(key, "language", language);

        /*
         * Продлеваем сессию после активности
         */

        await client.expire(key, 1800);

        res.json({
            success: true,
            message: "Язык сессии изменён",
            data: await client.hGetAll(key),
            ttl: await client.ttl(key)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Удаление сессии
|--------------------------------------------------------------------------
*/

app.delete("/api/sessions/:id", async (req, res) => {
    try {
        const key = `session:${req.params.id}`;

        const exists = await client.exists(key);

        if (!exists) {
            return res.status(404).json({
                error: "Сессия не найдена"
            });
        }

        await client.del(key);

        res.json({
            success: true,
            message: "Сессия завершена"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Последние просмотренные дисциплины
|--------------------------------------------------------------------------
*/

app.post("/api/recent/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { courseId } = req.body;

        const key = `recent:student:${userId}`;

        await client.lPush(key, `course:${courseId}`);

        /*
         * Оставляем только последние 5 элементов
         */

        await client.lTrim(key, 0, 4);

        res.json({
            success: true,
            data: await client.lRange(key, 0, -1)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Получить последние дисциплины
|--------------------------------------------------------------------------
*/

app.get("/api/recent/:userId", async (req, res) => {
    try {
        const key = `recent:student:${req.params.userId}`;

        const data = await client.lRange(key, 0, 4);

        res.json({
            key,
            data
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Активные пользователи курса
|--------------------------------------------------------------------------
*/

app.post("/api/online/:courseId", async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { user } = req.body;

        const key = `course:${courseId}:online`;

        await client.sAdd(key, user);

        res.json({
            success: true,
            users: await client.sMembers(key),
            count: await client.sCard(key)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Получить активных пользователей
|--------------------------------------------------------------------------
*/

app.get("/api/online/:courseId", async (req, res) => {
    try {
        const key = `course:${req.params.courseId}:online`;

        const users = await client.sMembers(key);
        const count = await client.sCard(key);

        res.json({
            key,
            users,
            count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Счётчик просмотров курса
|--------------------------------------------------------------------------
*/

app.post("/api/views/:courseId", async (req, res) => {
    try {
        const key = `counter:course:${req.params.courseId}:views`;

        const value = await client.incr(key);

        res.json({
            key,
            views: value
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Получить счётчик
|--------------------------------------------------------------------------
*/

app.get("/api/views/:courseId", async (req, res) => {
    try {
        const key = `counter:course:${req.params.courseId}:views`;

        const value = await client.get(key);

        res.json({
            key,
            views: Number(value || 0)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| TTL демонстрация
|--------------------------------------------------------------------------
*/

app.post("/api/ttl-demo", async (req, res) => {
    try {
        const key = "cache:ttl-demo";

        await client.set(
            key,
            "temporary",
            {
                EX: 20
            }
        );

        res.json({
            success: true,
            key,
            ttl: await client.ttl(key)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Информация о Redis
|--------------------------------------------------------------------------
*/

app.get("/api/redis-info", async (req, res) => {
    try {
        const info = await client.info("server");

        const versionMatch =
            info.match(/redis_version:([^\r\n]+)/);

        res.json({
            connected: client.isReady,
            version: versionMatch
                ? versionMatch[1]
                : "unknown"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Запуск
|--------------------------------------------------------------------------
*/

async function start() {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(
                `Server started: http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Failed to start application:",
            error
        );

        process.exit(1);
    }
}

start();
