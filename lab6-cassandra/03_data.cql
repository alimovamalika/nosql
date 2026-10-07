USE lab6;

-- Группа IS-24-1
INSERT INTO schedule_by_group VALUES
('IS-24-1','2026-10-08','09:00:00','NOSQL-301','NoSQL Technologies','T001','305');

INSERT INTO schedule_by_group VALUES
('IS-24-1','2026-10-08','11:00:00','WEB-210','Web Development','T002','410');

INSERT INTO schedule_by_group VALUES
('IS-24-1','2026-10-09','10:00:00','DB-205','Database Systems','T003','212');

INSERT INTO schedule_by_group VALUES
('IS-24-1','2026-10-10','09:00:00','JAVA-201','Java Programming','T004','301');

INSERT INTO schedule_by_group VALUES
('IS-24-1','2026-10-11','12:00:00','MATH-101','Discrete Mathematics','T005','205');


-- Группа IS-24-2
INSERT INTO schedule_by_group VALUES
('IS-24-2','2026-10-08','09:00:00','NOSQL-301','NoSQL Technologies','T001','306');

INSERT INTO schedule_by_group VALUES
('IS-24-2','2026-10-08','13:00:00','WEB-210','Web Development','T002','411');

INSERT INTO schedule_by_group VALUES
('IS-24-2','2026-10-09','10:00:00','DB-205','Database Systems','T003','213');

INSERT INTO schedule_by_group VALUES
('IS-24-2','2026-10-10','11:00:00','JAVA-201','Java Programming','T004','302');

INSERT INTO schedule_by_group VALUES
('IS-24-2','2026-10-11','10:00:00','MATH-101','Discrete Mathematics','T005','206');


-- Группа IS-24-3
INSERT INTO schedule_by_group VALUES
('IS-24-3','2026-10-08','10:00:00','NOSQL-301','NoSQL Technologies','T001','307');

INSERT INTO schedule_by_group VALUES
('IS-24-3','2026-10-09','09:00:00','WEB-210','Web Development','T002','412');

INSERT INTO schedule_by_group VALUES
('IS-24-3','2026-10-10','10:00:00','DB-205','Database Systems','T003','214');

INSERT INTO schedule_by_group VALUES
('IS-24-3','2026-10-11','09:00:00','JAVA-201','Java Programming','T004','303');

INSERT INTO schedule_by_group VALUES
('IS-24-3','2026-10-12','11:00:00','MATH-101','Discrete Mathematics','T005','207');


-- Преподаватель T001
INSERT INTO schedule_by_teacher VALUES
('T001','2026-10-08','09:00:00','NOSQL-301','NoSQL Technologies','IS-24-1','305');

INSERT INTO schedule_by_teacher VALUES
('T001','2026-10-08','09:00:00','NOSQL-301','NoSQL Technologies','IS-24-2','306');

INSERT INTO schedule_by_teacher VALUES
('T001','2026-10-08','10:00:00','NOSQL-301','NoSQL Technologies','IS-24-3','307');


-- Преподаватель T002
INSERT INTO schedule_by_teacher VALUES
('T002','2026-10-08','11:00:00','WEB-210','Web Development','IS-24-1','410');

INSERT INTO schedule_by_teacher VALUES
('T002','2026-10-08','13:00:00','WEB-210','Web Development','IS-24-2','411');

INSERT INTO schedule_by_teacher VALUES
('T002','2026-10-09','09:00:00','WEB-210','Web Development','IS-24-3','412');


-- Преподаватель T003
INSERT INTO schedule_by_teacher VALUES
('T003','2026-10-09','10:00:00','DB-205','Database Systems','IS-24-1','212');

INSERT INTO schedule_by_teacher VALUES
('T003','2026-10-09','10:00:00','DB-205','Database Systems','IS-24-2','213');

INSERT INTO schedule_by_teacher VALUES
('T003','2026-10-10','10:00:00','DB-205','Database Systems','IS-24-3','214');


-- Преподаватель T004
INSERT INTO schedule_by_teacher VALUES
('T004','2026-10-10','09:00:00','JAVA-201','Java Programming','IS-24-1','301');

INSERT INTO schedule_by_teacher VALUES
('T004','2026-10-10','11:00:00','JAVA-201','Java Programming','IS-24-2','302');

INSERT INTO schedule_by_teacher VALUES
('T004','2026-10-11','09:00:00','JAVA-201','Java Programming','IS-24-3','303');


-- Преподаватель T005
INSERT INTO schedule_by_teacher VALUES
('T005','2026-10-11','12:00:00','MATH-101','Discrete Mathematics','IS-24-1','205');

INSERT INTO schedule_by_teacher VALUES
('T005','2026-10-11','10:00:00','MATH-101','Discrete Mathematics','IS-24-2','206');

INSERT INTO schedule_by_teacher VALUES
('T005','2026-10-12','11:00:00','MATH-101','Discrete Mathematics','IS-24-3','207');
