USE lab6;

-- Q1. Расписание группы за период
SELECT *
FROM schedule_by_group
WHERE group_id = 'IS-24-1'
  AND lesson_date >= '2026-10-08'
  AND lesson_date <= '2026-10-11';


-- Q2. Занятия преподавателя за период
SELECT *
FROM schedule_by_teacher
WHERE teacher_id = 'T001'
  AND lesson_date >= '2026-10-08'
  AND lesson_date <= '2026-10-10';


-- Q3. Занятия группы за конкретную дату
SELECT *
FROM schedule_by_group
WHERE group_id = 'IS-24-1'
  AND lesson_date = '2026-10-08';


-- Q4. Занятие преподавателя в конкретное время
SELECT *
FROM schedule_by_teacher
WHERE teacher_id = 'T002'
  AND lesson_date = '2026-10-08'
  AND lesson_time = '11:00:00';


-- Q5. Полное расписание преподавателя
SELECT *
FROM schedule_by_teacher
WHERE teacher_id = 'T003';


-- Дополнительная проверка всех групп
SELECT *
FROM schedule_by_group
WHERE group_id = 'IS-24-2';
