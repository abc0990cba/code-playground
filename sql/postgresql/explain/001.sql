CREATE TABLE foo (
  c1 INTEGER,
  c2 TEXT
);


INSERT INTO foo 
SELECT i, md5(random()::TEXT)
  FROM generate_series(1, 1000000) AS i;


EXPLAIN SELECT * FROM foo;
--                          QUERY PLAN                          
-- --------------------------------------------------------------
--  Seq Scan on foo  (cost=0.00..18918.18 rows=1058418 width=36)
-- (1 row)

-- EXPLAIN reports that
-- Seq Scan is used — sequential, block by block, reading of foo table data.
-- cost - This is not time, but a kind of spherical concept in a vacuum,
-- designed to assess the cost of the operation. The first value 0.00 is the cost of getting the first row.
-- The second is 18918.18 — the cost of getting all the lines.
-- rows — the approximate number of rows returned when performing
-- the Seq Scan operation. This value is returned by the scheduler.
-- width — the average size of a single string in bytes.


INSERT INTO foo
  SELECT i, md5(random()::TEXT)
  FROM generate_series(1, 10) AS i;

ANALYZE foo;
EXPLAIN SELECT * FROM foo;
--                           QUERY PLAN                          
-- --------------------------------------------------------------
--  Seq Scan on foo  (cost=0.00..18334.10 rows=1000010 width=37)
-- (1 row)

-- What happens when performing ANALYZE?
-- A certain number of rows of the table are read, selected randomly
-- Statistics of values for each of the columns of the table are collected:
-- How many rows will ANALYZE read depends on the default_statistics_target parameter.


EXPLAIN (ANALYZE) SELECT * FROM foo;
--                                                    QUERY PLAN                                                   
-- ----------------------------------------------------------------------------------------------------------------
--  Seq Scan on foo  (cost=0.00..18918.18 rows=1058418 width=36)
--  (actual time=0.018..897.111 rows=1000010 loops=1)
--  Planning Time: 0.081 ms
--  Execution Time: 1712.969 ms
-- (3 rows)


-- rows — the actual number of rows received during Seq Scan.
-- loops — how many times the Seq Scan operation had to be performed