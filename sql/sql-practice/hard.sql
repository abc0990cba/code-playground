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