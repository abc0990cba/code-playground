WITH RECURSIVE r AS (
    SELECT 
        1 AS i, 
        1 AS factorial
    UNION 
    SELECT 
        i+1 AS i, 
        factorial * (i+1) as factorial 
    FROM r
    WHERE i < 10
)
SELECT * FROM r;
-- i  | factorial 
-- ----+-----------
--   1 |         1
--   2 |         2
--   3 |         6
--   4 |        24
--   5 |       120
--   6 |       720
--   7 |      5040
--   8 |     40320
--   9 |    362880
--  10 |   3628800

SELECT factorial(10)
-- 3628800