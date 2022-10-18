-- Task 1
-- Show all of the patients grouped into weight groups.
-- Show the total amount of patients in each weight group.
-- Order the list by the weight group decending.
-- For example, if they weight 100 to 109 they are placed
-- in the 100 weight group, 110-119 = 110 weight group, etc.

SELECT COUNT(*) AS patients_in_group,
       FLOOR(weight / 10) * 10 AS weight_group
  FROM patients
 GROUP BY weight_group
 ORDER BY weight_group DESC;
--  or
-- SELECT TRUNCATE(345.2, -1) -> 340
SELECT COUNT(*) AS patients_in_group,
       TRUNCATE(weight, -1) AS weight_group,
  FROM patients
 GROUP BY weight_group
 ORDER BY weight_group DESC;


-- Task 2
-- Show patient_id, weight, height, isObese from the patients table.
-- Display isObese as a boolean 0 or 1.
-- Obese is defined as weight(kg)/(height(m)2) >= 30.
-- weight is in units kg.
-- height is in units cm.
SELECT patient_id, weight, height, 
       CASE 
       WHEN weight/(POWER(height/100.0,2)) >= 30 THEN 1
       ELSE 0
       END AS isObese
  FROM patients;
-- or
SELECT patient_id,
       weight,
       height,
       weight / power(CAST(height AS FLOAT) / 100, 2) >= 30 AS isObese
  FROM patients


-- Task 3
-- Show patient_id, first_name, last_name,
-- and attending physician's specialty.
-- Show only the patients who has a diagnosis
-- as 'Epilepsy' and the physician's first name is 'Lisa'
-- Check patients, admissions, and physicians tables
-- for required information. 
SELECT p.patient_id,
       p.first_name AS patient_first_name,
       p.last_name AS patient_last_name,
       ph.specialty AS attending_physician_specialty
  FROM patients p
  JOIN admissions a 
    ON a.patient_id = p.patient_id
  JOIN physicians ph 
    ON ph.physician_id = a.attending_physician_id
 WHERE ph.first_name = 'Lisa' 
   AND a.diagnosis = 'Epilepsy'
-- or
SELECT pa.patient_id,
       pa.first_name,
       pa.last_name,
       ph1.specialty
  FROM patients AS pa
  JOIN (
    SELECT *
      FROM admissions AS a
      JOIN physicians AS ph
        ON a.attending_physician_id = ph.physician_id
  ) AS ph1 USING (patient_id)
WHERE ph1.diagnosis = 'Epilepsy'
  AND ph1.first_name = 'Lisa'
-- or
SELECT pa.patient_id,
       pa.first_name,
       pa.last_name,
       ph.specialty
  FROM patients pa,
       physicians ph,
       admissions ad
 WHERE pa.patient_id = ad.patient_id
   AND ad.attending_physician_id = ph.physician_id
   AND ad.diagnosis = 'Epilepsy'
   AND ph.first_name = 'Lisa';
-- or
WITH patient_table AS (
    SELECT pa.patient_id,
           pa.first_name,
           pa.last_name,
           ad.attending_physician_id
      FROM patients pa
      JOIN admissions ad
        ON pa.patient_id = ad.patient_id
     WHERE ad.diagnosis = 'Epilepsy'
  )
SELECT pt.patient_id,
       pt.first_name,
       pt.last_name,
       ph.specialty
  FROM patient_table pt
  JOIN physicians ph
    ON pt.attending_physician_id = ph.physician_id
 WHERE ph.first_name = 'Lisa';


-- Task 4
-- All patients who have gone through admissions,
-- can see their medical documents on our site.
-- Those patients are given a temporary password
-- after their first admission. Show the patient_id and temp_password.

-- The password must be the following, in order:
-- 1. patient_id
-- 2. the numerical length of patient's last_name
-- 3. year of patient's birth_date
SELECT patient_id,
       CONCAT(patient_id, LEN(last_name), YEAR(birth_date)) AS temp_password
  FROM patients p 
  JOIN admissions a USING(patient_id)
 GROUP BY patient_id
-- or
SELECT DISTINCT p.patient_id,
      CONCAT(p.patient_id, LEN(last_name), YEAR(birth_date)) AS temp_password
  FROM patients p
  JOIN admissions a
    ON a.patient_id = p.patient_id
-- or
SELECT DISTINCT p.patient_id,
                p.patient_id
             || FLOOR(len(last_name))
             || FLOOR(year(birth_date)) as temp_password
  FROM patients p
  JOIN admissions a
    ON p.patient_id = a.patient_id


-- Task 5
-- Each admission costs $50 for patients without insurance,
-- and $10 for patients with insurance.
-- All patients with an even patient_id have insurance.
-- Give each patient a 'Yes' if they have insurance,
-- and a 'No' if they don't have insurance.
-- Add up the admission_total cost for each has_insurance group.
SELECT CASE WHEN patient_id % 2 = 0 THEN 'Yes'
       ELSE 'No' 
       END AS has_insurance,
       SUM(CASE WHEN patient_id % 2 = 0 THEN 10
           ELSE 50 
           END) AS cost_after_insurance
  FROM admissions 
 GROUP BY has_insurance;
-- or
SELECT 'No' AS has_insurance,
        COUNT(*) * 50 AS cost
  FROM admissions 
 WHERE patient_id % 2 = 1
 GROUP BY has_insurance
 UNION
SELECT 'Yes' AS has_insurance,
       COUNT(*) * 10 AS cost
  FROM admissions
 WHERE patient_id % 2 = 0
 GROUP BY has_insurance
--or
SELECT has_insurance,
       CASE
       WHEN has_insurance = 'Yes' THEN COUNT(has_insurance) * 10
       ELSE COUNT(has_insurance) * 50
       END AS cost_after_insurance
  FROM (
       SELECT CASE
              WHEN patient_id % 2 = 0 THEN 'Yes'
              ELSE 'No'
              END AS has_insurance
         FROM admissions
  )
 GROUP BY has_insurance
--or
SELECT has_insurance,
       SUM(admission_cost) AS admission_total
  FROM (
       SELECT patient_id,
              CASE 
              WHEN patient_id % 2 = 0 THEN 'Yes'
              ELSE 'No' 
              END AS has_insurance,
              CASE
              WHEN patient_id % 2 = 0 THEN 10
              ELSE 50 
              END AS admission_cost
         FROM admissions
)
 GROUP BY has_insurance


-- Task 6
-- Show the provinces that has more patients
-- identified as 'M' than 'F'.
-- Must only show full province_name
SELECT province_name
  FROM patients pa
  JOIN province_names AS pr ON pa.province_id = pr.province_id
 GROUP BY pr.province_name
HAVING COUNT( CASE WHEN gender = 'M' THEN 1 END)
     > COUNT( CASE WHEN gender = 'F' THEN 1 END);
-- or
SELECT province_name
  FROM (
       SELECT province_name,
              SUM(gender = 'M') AS n_male,
              SUM(gender = 'F') AS n_female
         FROM patients pa
         JOIN province_names pr 
           ON pa.province_id = pr.province_id
        GROUP BY province_name
  )
  WHERE n_male > n_female
-- or
SELECT pr.province_name
  FROM patients AS pa
  JOIN province_names AS pr
    ON pa.province_id = pr.province_id
 GROUP BY pr.province_name
HAVING SUM(gender = 'M') > SUM(gender = 'F');
-- or
SELECT province_name
  FROM patients p
  JOIN province_names pr
    ON p.province_id = pr.province_id
 GROUP BY province_name
HAVING SUM(CASE 
           WHEN gender = 'M' THEN 1
           ELSE -1 
           END) > 0
-- or
SELECT pr.province_name
  FROM patients AS pa
  JOIN province_names AS pr
    ON pa.province_id = pr.province_id
 GROUP BY pr.province_name
HAVING COUNT( CASE WHEN gender = 'M' THEN 1 END)
     > COUNT(*) * 0.5;


-- Task 7
-- We are looking for a specific patient.
-- Pull all columns for the patient who matches the following criteria:
-- * First_name contains an 'r' after the first two letters.
-- * Identifies their gender as 'F'
-- * Born in February, May, or December
-- * Their weight would be between 60kg and 80kg
-- * Their patient_id is an odd number
-- * They are from the city 'Kingston'
SELECT *
  FROM patients
 WHERE first_name LIKE '__r%'
   AND gender = 'F'
   AND MONTH(birth_date) IN (2, 5, 12)
   AND weight BETWEEN 60 AND 80
   AND patient_id % 2 = 1
   AND city = 'Kingston';


-- Task 8
-- Show the percent of patients that have 'M' as their gender.
-- Round the answer to the nearest hundreth number and in percent form.
SELECT CONCAT(
          ROUND((
            SELECT COUNT(*)
              FROM patients
             WHERE gender = 'M'
          ) / CAST(COUNT(*) as float), 4) * 100, '%'
  ) AS percent_of_male_patients
  FROM patients;
-- or
SELECT ROUND(100 * AVG(gender = 'M'), 2)
       || '%' AS percent_of_male_patients
  FROM patients;
-- or
SELECT CONCAT(ROUND(SUM(gender='M') 
              / CAST(COUNT(*) AS float), 4) * 100, '%')
FROM patients;
