const logElement = document.getElementById("log");

function log(data) {
    if (typeof data === "object") {
        logElement.textContent =
            JSON.stringify(data, null, 2);
    } else {
        logElement.textContent = data;
    }
}


async function request(url, options = {}) {

    try {

        const response = await fetch(
            url,
            options
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Ошибка запроса"
            );
        }

        return data;

    } catch (error) {

        log({
            error: error.message
        });

        throw error;
    }
}


/*
|--------------------------------------------------------------------------
| Redis status
|--------------------------------------------------------------------------
*/

async function checkRedis() {

    try {

        const data =
            await request("/api/redis-info");

        document.getElementById(
            "redisStatus"
        ).textContent =
            `Redis ${data.version}`;

        document.getElementById(
            "statusDot"
        ).style.background =
            "#22c55e";

    } catch {

        document.getElementById(
            "redisStatus"
        ).textContent =
            "Redis недоступен";

        document.getElementById(
            "statusDot"
        ).style.background =
            "#ef4444";
    }
}


/*
|--------------------------------------------------------------------------
| Courses
|--------------------------------------------------------------------------
*/

async function loadCourses() {

    const container =
        document.getElementById(
            "courses"
        );

    try {

        const courses =
            await request("/api/courses");

        container.innerHTML = "";

        courses.forEach(course => {

            const element =
                document.createElement("div");

            element.className =
                "course";

            element.innerHTML = `
                <div class="course-code">
                    ${course.id}
                </div>

                <div class="course-name">
                    ${course.name}
                </div>

                <div class="course-info">

                    <span>
                        👨‍🏫 Преподаватель:
                        ${course.teacher}
                    </span>

                    <span>
                        🏫 Аудитория:
                        ${course.room}
                    </span>

                    <span>
                        📚 Семестр:
                        ${course.semester}
                    </span>

                </div>

                <span class="source">
                    ${course.source}
                </span>
            `;

            element.addEventListener(
                "click",
                () => loadCourse(course.id)
            );

            container.appendChild(element);

        });

        log(courses);

    } catch (error) {

        container.innerHTML =
            `<p>Ошибка загрузки</p>`;
    }
}


async function loadCourse(id) {

    const data =
        await request(
            `/api/courses/${id}`
        );

    log(data);
}


/*
|--------------------------------------------------------------------------
| Session
|--------------------------------------------------------------------------
*/

async function createSession() {

    const data =
        await request(
            "/api/sessions",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    id:
                        document.getElementById(
                            "sessionId"
                        ).value,

                    user_id:
                        document.getElementById(
                            "userId"
                        ).value,

                    role:
                        document.getElementById(
                            "role"
                        ).value,

                    language:
                        document.getElementById(
                            "language"
                        ).value,

                    last_section:
                        document.getElementById(
                            "lastSection"
                        ).value
                })
            }
        );

    showSession(data);

    log(data);
}


async function getSession() {

    const id =
        document.getElementById(
            "sessionId"
        ).value;

    const data =
        await request(
            `/api/sessions/${id}`
        );

    showSession(data);

    log(data);
}


async function changeLanguage() {

    const id =
        document.getElementById(
            "sessionId"
        ).value;

    const language =
        document.getElementById(
            "language"
        ).value;

    const data =
        await request(
            `/api/sessions/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    language
                })
            }
        );

    showSession(data);

    log(data);
}


async function deleteSession() {

    const id =
        document.getElementById(
            "sessionId"
        ).value;

    const data =
        await request(
            `/api/sessions/${id}`,
            {
                method: "DELETE"
            }
        );

    showSession(data);

    log(data);
}


function showSession(data) {

    document.getElementById(
        "sessionResult"
    ).textContent =
        JSON.stringify(
            data,
            null,
            2
        );
}


/*
|--------------------------------------------------------------------------
| Recent List
|--------------------------------------------------------------------------
*/

async function addRecent() {

    const userId =
        document.getElementById(
            "recentUser"
        ).value;

    const courseId =
        document.getElementById(
            "recentCourse"
        ).value;

    const data =
        await request(
            `/api/recent/${userId}`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    courseId
                })
            }
        );

    document.getElementById(
        "recentResult"
    ).textContent =
        JSON.stringify(
            data,
            null,
            2
        );

    log(data);
}


async function loadRecent() {

    const userId =
        document.getElementById(
            "recentUser"
        ).value;

    const data =
        await request(
            `/api/recent/${userId}`
        );

    document.getElementById(
        "recentResult"
    ).textContent =
        JSON.stringify(
            data,
            null,
            2
        );

    log(data);
}


/*
|--------------------------------------------------------------------------
| Online Set
|--------------------------------------------------------------------------
*/

async function addOnline() {

    const courseId =
        document.getElementById(
            "onlineCourse"
        ).value;

    const user =
        document.getElementById(
            "onlineUser"
        ).value;

    const data =
        await request(
            `/api/online/${courseId}`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    user
                })
            }
        );

    document.getElementById(
        "onlineResult"
    ).textContent =
        JSON.stringify(
            data,
            null,
            2
        );

    log(data);
}


async function loadOnline() {

    const courseId =
        document.getElementById(
            "onlineCourse"
        ).value;

    const data =
        await request(
            `/api/online/${courseId}`
        );

    document.getElementById(
        "onlineResult"
    ).textContent =
        JSON.stringify(
            data,
            null,
            2
        );

    log(data);
}


/*
|--------------------------------------------------------------------------
| Views counter
|--------------------------------------------------------------------------
*/

async function incrementViews() {

    const data =
        await request(
            "/api/views/CS305",
            {
                method: "POST"
            }
        );

    document.getElementById(
        "viewCounter"
    ).textContent =
        data.views;

    log(data);
}


async function loadViews() {

    const data =
        await request(
            "/api/views/CS305"
        );

    document.getElementById(
        "viewCounter"
    ).textContent =
        data.views;

    log(data);
}


/*
|--------------------------------------------------------------------------
| TTL
|--------------------------------------------------------------------------
*/

let ttlTimer = null;

async function startTTLDemo() {

    await request(
        "/api/ttl-demo",
        {
            method: "POST"
        }
    );

    updateTTL();

    if (ttlTimer) {
        clearInterval(ttlTimer);
    }

    ttlTimer =
        setInterval(
            updateTTL,
            1000
        );
}


async function updateTTL() {

    try {

        const data =
            await request(
                "/api/redis-info"
            );

        /*
         * Для демонстрации TTL
         * непосредственно получаем его
         * через отдельный endpoint ниже.
         */

        const response =
            await fetch(
                "/api/ttl-demo/status"
            );

        if (!response.ok) {
            throw new Error();
        }

        const ttl =
            await response.json();

        document.getElementById(
            "ttlValue"
        ).textContent =
            ttl.ttl;

    } catch {

        /*
         * Если endpoint отсутствует,
         * значение будет получено ниже.
         */

        try {

            const response =
                await fetch(
                    "/api/ttl-value"
                );

            const data =
                await response.json();

            document.getElementById(
                "ttlValue"
            ).textContent =
                data.ttl;

        } catch {

            document.getElementById(
                "ttlValue"
            ).textContent =
                "—";
        }
    }
}


/*
|--------------------------------------------------------------------------
| Clear log
|--------------------------------------------------------------------------
*/

function clearLog() {

    logElement.textContent =
        "Готово к работе...";
}


/*
|--------------------------------------------------------------------------
| Initial loading
|--------------------------------------------------------------------------
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkRedis();

        loadCourses();

        loadViews();

    }
);
