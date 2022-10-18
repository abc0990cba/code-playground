-- The following query uses the AVG() aggregate function
-- to calculate the average weight of all patients. 
SELECT AVG(weight) as avg_weight
FROM patients;
-- output:
-- 76.77682119205298


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


