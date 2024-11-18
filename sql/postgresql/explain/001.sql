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

EXPLAIN SELECT 1 FROM foo;
--                          QUERY PLAN                          
-- -------------------------------------------------------------
--  Seq Scan on foo  (cost=0.00..18918.18 rows=1058418 width=4)
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


EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM foo;
--                                                    QUERY PLAN                                                   
-- ----------------------------------------------------------------------------------------------------------------
--  Seq Scan on foo  (cost=0.00..18918.18 rows=1058418 width=36)
--  (actual time=0.018..869.210 rows=1000010 loops=1)
--  Buffers: shared hit=8334
--  Planning:
--    Buffers: shared hit=7
--  Planning Time: 0.078 ms
--  Execution Time: 1665.123 ms
-- (6 rows)

-- Buffers: shared read — the number of blocks read from the disk.
-- Buffers: shared hit — the number of blocks read from the PostgreSQL cache

-- After repeating apply command above, the number of shared hit will increase 
-- Cache reads are faster than disk reads.
-- You can notice this trend by tracking the Total runtime value.
-- The cache size is determined by the shared_buffers constant
-- in the postgresql.conf file.


EXPLAIN SELECT * FROM foo WHERE c1 > 500;
--                          QUERY PLAN                          
-- -------------------------------------------------------------
-- Seq Scan on foo  (cost=0.00..21564.22 rows=352806 width=36)
-- Filter: (c1 > 500)
-- (2 rows)


CREATE INDEX ON foo(c1);
EXPLAIN SELECT * FROM foo WHERE c1 > 500;
--                                    QUERY PLAN                                    
-- ---------------------------------------------------------------------------------
--  Bitmap Heap Scan on foo  (cost=6247.79..18748.50 rows=333337 width=36)
--  Recheck Cond: (c1 > 500)
--  -> Bitmap Index Scan on foo_c1_idx  (cost=0.00..6164.45 rows=333337 width=0)
--       Index Cond: (c1 > 500)
-- (4 rows)

EXPLAIN (ANALYZE) SELECT * FROM foo WHERE c1 > 500;
--                                    QUERY PLAN                                                            
----------------------------------------------------------------------------------
--  Bitmap Heap Scan on foo  (cost=6247.79..18748.50 rows=333337 width=36)
--  (actual time=64.561..936.237 rows=999500 loops=1)
--    Recheck Cond: (c1 > 500)
--    Heap Blocks: exact=8330
--    ->  Bitmap Index Scan on foo_c1_idx  (cost=0.00..6164.45 rows=333337 width=0)
--        (actual time=63.173..63.174 rows=999500 loops=1)
--          Index Cond: (c1 > 500)
--  Planning Time: 0.219 ms
--  Execution Time: 1728.708 ms
-- (7 rows)
