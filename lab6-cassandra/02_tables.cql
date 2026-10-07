USE lab6;

CREATE TABLE IF NOT EXISTS schedule_by_group (
    group_id text,
    lesson_date date,
    lesson_time time,
    course_id text,
    course_name text,
    teacher_id text,
    room text,
    PRIMARY KEY ((group_id), lesson_date, lesson_time, course_id)
)
WITH CLUSTERING ORDER BY (
    lesson_date ASC,
    lesson_time ASC,
    course_id ASC
);

CREATE TABLE IF NOT EXISTS schedule_by_teacher (
    teacher_id text,
    lesson_date date,
    lesson_time time,
    course_id text,
    course_name text,
    group_id text,
    room text,
    PRIMARY KEY ((teacher_id), lesson_date, lesson_time, course_id, group_id)
)
WITH CLUSTERING ORDER BY (
    lesson_date ASC,
    lesson_time ASC,
    course_id ASC,
    group_id ASC
);
