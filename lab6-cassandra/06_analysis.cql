USE lab6;

-- Проверка структуры базы
DESCRIBE KEYSPACE lab6;

DESCRIBE TABLE schedule_by_group;

DESCRIBE TABLE schedule_by_teacher;


-- Проверяем количество строк в учебной таблице
-- В Cassandra COUNT используется только для небольших учебных наборов.
SELECT COUNT(*)
FROM schedule_by_group
WHERE group_id = 'IS-24-1';

SELECT COUNT(*)
FROM schedule_by_group
WHERE group_id = 'IS-24-2';

SELECT COUNT(*)
FROM schedule_by_group
WHERE group_id = 'IS-24-3';


-- Анализ расписания преподавателя
SELECT *
FROM schedule_by_teacher
WHERE teacher_id = 'T001';

SELECT *
FROM schedule_by_teacher
WHERE teacher_id = 'T002';

SELECT *
FROM schedule_by_teacher
WHERE teacher_id = 'T003';


-- Проверка диапазонной выборки
SELECT *
FROM schedule_by_group
WHERE group_id = 'IS-24-1'
  AND lesson_date >= '2026-10-08'
  AND lesson_date <= '2026-10-12';
