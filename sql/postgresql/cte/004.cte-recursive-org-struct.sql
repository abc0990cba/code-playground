CREATE TABLE position (
  id int PRIMARY KEY NOT NULL,
  parent_id integer,
  name varchar NOT NULL
);

ALTER TABLE position
  ADD CONSTRAINT "$1" FOREIGN KEY (parent_id) REFERENCES position;
  
INSERT INTO position (id, parent_id, name) VALUES 
(1, null, 'CEO'),
(2, 1, 'CTO'),
(3, 1, 'CFO'),
(4, 1, 'CPO'),
(5, 2, 'Architect'),
(6, 5, 'Tech Lead'),
(7, 3, 'Financial manager'),
(8, 7, 'Accountant');

SELECT * FROM position;
-- id | parent_id |       name        
-- ----+-----------+-------------------
--   1 |           | CEO
--   2 |         1 | CTO
--   3 |         1 | CFO
--   4 |         1 | CPO
--   5 |         2 | Architect
--   6 |         5 | Tech Lead
--   7 |         3 | Financial manager
--   8 |         7 | Accountant
  
WITH RECURSIVE children AS (
  SELECT id, parent_id, name, 1 AS depth
    FROM position
   WHERE id = 2
  UNION
  SELECT p.id, p.parent_id, p.name, depth + 1
    FROM position p
    JOIN children c
      ON p.parent_id = c.id
)

SELECT * FROM children;
-- id | parent_id |   name    | depth 
-- ----+-----------+-----------+-------
--   2 |         1 | CTO       |     1
--   5 |         2 | Architect |     2
--   6 |         5 | Tech Lead |     3

WITH RECURSIVE parents AS (
  SELECT id, parent_id, name, 0 AS depth
    FROM position
   WHERE id = 6
  UNION
  SELECT p.id, p.parent_id, p.name, depth - 1
    FROM position p
    JOIN parents c
      ON p.id = c.parent_id
)

SELECT * FROM parents;
-- id | parent_id |   name    | depth 
-- ----+-----------+-----------+-------
--   6 |         5 | Tech Lead |     0
--   5 |         2 | Architect |    -1
--   2 |         1 | CTO       |    -2
--   1 |           | CEO       |    -3