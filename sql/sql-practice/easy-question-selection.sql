-------------------------- Tables ---------------------------------
-------------------------------------------------------------------

-- *********** patients ***********
--  primary key  patient_id     INT
-- 	             first_name     TEXT
-- 	             last_name 	    TEXT
-- 	             gender 	    CHAR(1)
-- 	             birth_date 	DATE
-- 	             city 	        TEXT
--  primary key  province_id 	CHAR(2)
-- 	             allergies 	    TEXT
-- 	             height 	    INT
-- 	             weight 	    INT

-- *************** province_names ************
--  primary key  province_id 	CHAR(2)
--               province_name 	TEXT

-- ***************** admissions **************
-- primary key   attending_physician_id   INT
--   	         patient_id 	          INT
-- 	             admission_date 	      DATE
-- 	             discharge_date 	      DATE
-- 	             diagnosis 	              TEXT

-------------------------------------------------------------------
-------------------------------------------------------------------

-- Task 1
-- Show first name, last name,
-- and gender of patients who's gender is 'M'
SELECT first_name, last_name, gender
FROM patients
WHERE gender IS "M";


-- Task 2
-- Show first name and last name of patients
-- who does not have allergies. (null)
SELECT first_name, last_name
FROM patients
where allergies IS NULL;


-- Task 3
-- Show first name of patients that
-- start with the letter 'C'
SELECT first_name
FROM patients
where first_name like 'C%';


-- Task 4
-- Show first name and last name of patients
-- that weight within the range of 100 to 120 (inclusive)
SELECT first_name, last_name
FROM patients
where weight between 100 AND 120;


-- Task 5
-- Update the patients table for the allergies column.
-- If the patient's allergies is null then replace it with 'NKA'
UPDATE patients
SET allergies = 'NKA'
WHERE allergies IS NULL;


-- Task 6
-- Show first name and last name concatinated
-- into one column to show their full name.
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM patients;


-- Task 7
-- Show first name, last name,
-- and the full province name of each patient.
-- Example: 'Ontario' instead of 'ON'
SELECT first_name, last_name, province_name
FROM patients AS p
JOIN province_names AS pn
ON p.province_id = pn.province_id


-- Task 8 
-- Show how many patients have a birth_date
-- with 2010 as the birth year.
SELECT COUNT(1) AS total_patients
FROM patients
WHERE YEAR(birth_date) = 2010;


-- Task 9
-- Show the first_name, last_name and height
-- of the patient with the greatest height.
SELECT first_name, last_name, MAX(height) AS height
FROM patients;


-- Task 10
-- Show all columns for patients who have
-- one of the following patient_ids: 1,45,534,879,1000
SELECT * FROM patients
WHERE patient_id IN (1, 45, 534, 879, 1000);


-- Task 11
-- Show the total number of admissions
SELECT COUNT(*) AS total_admissions
FROM admissions;


-- Task 12
-- Show all the columns from admissions
-- where the patient was admitted and discharged on the same day.
SELECT * FROM admissions
WHERE admission_date = discharge_date;


-- Task 13
-- Show the total number of admissions for patient_id 579.
SELECT
  patient_id,
  COUNT(*) AS total_admissions
FROM admissions
WHERE patient_id = 579;


-- Task 14
-- Based on the cities that our patients live in,
-- show unique cities that are in province_id 'NS'
SELECT DISTINCT(city) AS unique_cities
FROM patients
WHERE province_id = 'NS';


-- Task 15
-- Write a query to find the first_name, last name and birth date
-- of patients who have height more than 160 and weight more than 70
SELECT first_name, last_name, birth_date FROM patients
WHERE height > 160 AND weight > 70;


-- Task 16
-- Write a query to find list of patients
-- first_name, last_name, and allergies
-- from Hamilton where allergies are not null 
SELECT first_name, last_name, allergies
FROM patients
WHERE city = 'Hamilton' AND allergies IS NOT NULL;