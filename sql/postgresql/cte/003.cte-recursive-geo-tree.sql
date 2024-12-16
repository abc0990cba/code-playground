CREATE TABLE geo (
  id int NOT NULL PRIMARY KEY,
  parent_id int references geo(id),
  name varchar NOT NULL
);

INSERT INTO geo (id, parent_id, name) VALUES 
(1, null, 'Earth'),
(2, 1, 'Eurasia'),
(3, 1, 'North America'),
(4, 2, 'Europe'),
(5, 4, 'Poland'),
(6, 4, 'Germany'),
(7, 5, 'Warsaw'),
(8, 5, 'Krakow'),
(9, 6, 'Berlin');

SELECT * FROM geo;
-- id | parent_id |     name      
-- ----+-----------+---------------
--   1 |           | Earth
--   2 |         1 | Eurasia
--   3 |         1 | North America
--   4 |         2 | Europe
--   5 |         4 | Poland
--   6 |         4 | Germany
--   7 |         5 | Warsaw
--   8 |         5 | Krakow
--   9 |         6 | Berlin

WITH RECURSIVE r AS (
  SELECT id, parent_id, name
    FROM geo
   WHERE parent_id = 4 -- only europe locations
   
  UNION
  
  SELECT geo.id, geo.parent_id, geo.name
    FROM geo
    JOIN r
      ON geo.parent_id = r.id
)

SELECT * FROM r;
-- id | parent_id |  name   
-- ----+-----------+---------
--   5 |         4 | Poland
--   6 |         4 | Germany
--   7 |         5 | Warsaw
--   8 |         5 | Krakow
--   9 |         6 | Berlin

WITH RECURSIVE r2 AS (
  SELECT id, parent_id, name, 1 AS level
    FROM geo
   WHERE id = 4 -- only europe locations
   
  UNION
  
  SELECT geo.id, geo.parent_id, geo.name, r2.level + 1 AS level
    FROM geo
    JOIN r2
      ON geo.parent_id = r2.id
)

SELECT * FROM r2;
--  id | parent_id |  name   | level 
-- ----+-----------+---------+-------
--   4 |         2 | Europe  |     1
--   5 |         4 | Poland  |     2
--   6 |         4 | Germany |     2
--   7 |         5 | Warsaw  |     3
--   8 |         5 | Krakow  |     3
--   9 |         6 | Berlin  |     3