USE lab6;

-- UPDATE: меняем аудиторию занятия
UPDATE schedule_by_group
SET room = '415'
WHERE group_id = 'IS-24-1'
  AND lesson_date = '2026-10-08'
  AND lesson_time = '11:00:00'
  AND course_id = 'WEB-210';


-- Проверяем UPDATE
SELECT *
FROM schedule_by_group
WHERE group_id = 'IS-24-1'
  AND lesson_date = '2026-10-08'
  AND lesson_time = '11:00:00'
  AND course_id = 'WEB-210';


-- DELETE: удаляем конкретное занятие
DELETE FROM schedule_by_group
WHERE group_id = 'IS-24-1'
  AND lesson_date = '2026-10-09'
  AND lesson_time = '10:00:00'
  AND course_id = 'DB-205';


-- Проверяем DELETE
SELECT *
FROM schedule_by_group
WHERE group_id = 'IS-24-1';
