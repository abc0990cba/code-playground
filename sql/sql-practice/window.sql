-- Example 1
-- The following query uses the AVG() aggregate function
-- to calculate the average weight of all patients. 
SELECT AVG(weight) as avg_weight
FROM patients;
-- output:
-- 76.77682119205298

-- Example 2
-- The following query uses the AVG() as a window function.
-- It returns the average weight of all patients
-- along with the weight of each individual patient: 
SELECT first_name,
       last_name,
       weight,
       AVG(weight) OVER() as avg_weight
  FROM patients;
-- output:
-- ...
-- Donald |	Waterfield | 65 | 76.77682119205298
-- ...


-- Example 3
-- Rolling sum of the weight column from the patients table 
SELECT patient_id,
       first_name,
       weight,
       SUM(weight) OVER(ORDER BY patient_id) AS rolling_sum
  FROM patients
-- output:
-- 1 | Donald |  65 |	 65
-- 2 | Mickey |  76 | 141
-- 3 | Jiji   |	106 |	247
-- ...

SELECT patient_id,
       first_name,
       weight,
       SUM(weight) OVER() AS rolling_sum
  FROM patients
-- output:
-- 1 | Donald |  65 |	347799
-- 2 | Mickey |  76 | 347799
-- 3 | Jiji   |	106 |	347799
-- ...


-- Example 4
-- Get all the patients that fall under the 1000 rolling_sum.
WITH rolling_sum_table as (
  SELECT patient_id,
         first_name,
         weight,
         SUM(weight) OVER(ORDER BY patient_id) AS rolling_sum
    FROM patients        
)
SELECT *
  FROM rolling_sum_table
 WHERE rolling_sum < 1000


-- Example 5
-- LAG() 
-- The following SQL statement displays every patients
-- first_name and the patient's first_name before them. 
SELECT patient_id,
       first_name,
       LAG(first_name, 1) OVER() AS previous_name
  FROM patients
-- output:
-- 1 | Donald |	NULL
-- 2 | Mickey |	Donald
-- 3 | Jiji   |	Mickey
-- ...


-- Example 6
-- LEAD() 
-- The following SQL statement displays every patients
-- first_name and the patient's first_name after them. 
SELECT patient_id,
       first_name,
       LEAD(first_name, 1) OVER() AS next_name
  FROM patients
-- output:
-- 1 | Donald |	Mickey
-- 2 | Mickey |	Jiji
-- 3 | Jiji   |	Blair
-- ...

