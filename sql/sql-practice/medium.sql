-- Task 1
-- Show unique birth years
-- from patients and order them by ascending.
SELECT DISTINCT YEAR(birth_date) AS birth_year
FROM patients
ORDER BY birth_year;
-- or
SELECT YEAR(birth_date)
FROM patients
GROUP BY YEAR(birth_date)


-- Task 2
-- Show unique first names from the patients table which
-- only occurs once in the list.
-- For example, if two or more people are named 'John'
-- in the first_name column then don't include their name
-- in the output list. If only 1 person is named 'Leo'
-- then include them in the output.
SELECT first_name
FROM patients
GROUP BY first_name
HAVING COUNT(first_name) = 1
-- or
SELECT first_name
FROM (
    SELECT first_name, count(first_name) AS occurrences
    FROM patients
    GROUP BY first_name
  )
WHERE occurrencies = 1


-- Task 3
-- Show patient_id and first_name from patients
-- where their first_name start and ends with 's'
-- and is at least 6 characters long.
SELECT patient_id, first_name
FROM patients
WHERE
  first_name LIKE 's%s' AND len(first_name) >= 6;
-- or
SELECT patient_id, first_name
FROM patients
WHERE first_name LIKE 's____%s';


-- Task 4
-- Show patient_id, first_name, last_name from patients
-- whos diagnosis is 'Dementia'.
-- Primary diagnosis is stored in the admissions table.
SELECT p.patient_id, first_name, last_name
FROM patients p
  JOIN admissions a ON a.patient_id = p.patient_id
WHERE diagnosis = 'Dementia';
-- or
SELECT patient_id, first_name, last_name
FROM patients
WHERE patient_id IN (
    SELECT patient_id
    FROM admissions
    WHERE diagnosis = 'Dementia'
  );


-- Task 5
-- Display every patient's first_name.
-- Order the list by the length
-- of each name and then by alphbetically
SELECT first_name
FROM patients
ORDER BY LEN(first_name), first_name;


-- Task 6
-- Show the total amount of male patients and
-- the total amount of female patients in the patients table.
-- Display the two results in the same row.
SELECT
  SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) as male_count,
  SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) as female_count
FROM patients
-- or
SELECT 
  (SELECT count(*) FROM patients WHERE gender='M') AS male_count, 
  (SELECT count(*) FROM patients WHERE gender='F') AS female_count;
-- or
SELECT 
  SUM(gender = 'M') as male_count, 
  SUM(gender = 'F') AS female_count
FROM patients


-- Task 7
-- Show first and last name, allergies from patients
-- which have allergies to either 'Penicillin' or 'Morphine'.
-- Show results ordered ascending by allergies then
-- by first_name then by last_name.
SELECT first_name, last_name, allergies
FROM patients
WHERE allergies IN ('Penicillin', 'Morphine')
ORDER BY allergies, first_name, last_name;


-- Task 8
-- Show patient_id, diagnosis from admissions.
-- Find patients admitted multiple times for the same diagnosis.
SELECT patient_id, diagnosis
FROM admissions
GROUP BY patient_id, diagnosis
HAVING COUNT(*) > 1;


-- Task 9
-- Show the city and the total number of patients in the city.
-- Order from most to least patients and then by city name ascending.
SELECT city, COUNT(*) AS num_patients
FROM patients
GROUP BY city
ORDER BY num_patients DESC, city ASC;


-- Task 10
-- Show first name, last name and role
-- of every person that is either patient or physician.
-- The roles are either "Patient" or "Physician"
SELECT first_name, last_name, 'Patient' as role
FROM patients
  UNION
SELECT first_name, last_name, 'Physician' as role
FROM physicians;


-- Task 11
-- Show all allergies ordered by popularity.
-- Remove NULL values from query.
SELECT allergies, COUNT(allergies) AS total_diagnosis
FROM patients
WHERE allergies IS NOT NULL
GROUP BY allergies
ORDER BY total_diagnosis DESC


-- Task 12
-- Show all patient's first_name, last_name, and birth_date
-- who were born in the 1970s decade.
-- Sort the list starting from the earliest birth_date.
SELECT first_name, last_name, birth_date
FROM patients
WHERE YEAR(birth_date) BETWEEN 1970 AND 1979
ORDER BY birth_date;


-- Task 13
-- We want to display each patient's full name in a single column.
-- Their last_name in all upper letters must appear first,
-- then first_name in all lower case letters.
-- Separate the last_name and first_name with a comma.
-- Order the list by the first_name in decending order
-- EX: SMITH,jane
SELECT
  CONCAT(UPPER(last_name), ',', LOWER(first_name)) AS new_name_format
FROM patients
ORDER BY first_name DESC;


-- Task 14
-- Show the province_id(s), sum of height,
-- where the total sum of its patient's
-- height is greater than or equal to 7,000.
SELECT province_id, SUM(height) AS sum_height
FROM patients
GROUP BY province_id
HAVING sum_height >= 7000


-- Task 15
-- Show the difference between the largest weight
-- and smallest weight for patients with the last name 'Maroni'
SELECT (MAX(weight) - MIN(weight)) AS weight_delta
FROM patients
WHERE last_name = 'Maroni';


-- Task 16
-- Show all of the days of the month (1-31)
-- and how many admission_dates occurred on that day.
-- Sort by the day with most admissions to least admissions.
SELECT
  DAY(admission_date) AS day_number,
  COUNT(*) AS number_of_admissions
FROM admissions
GROUP BY day_number
ORDER BY number_of_admissions DESC


-- Task 17
-- Show all columns for patient_id 542's most recent admission_date.
SELECT *
FROM admissions
WHERE patient_id = 542
GROUP BY patient_id
HAVING admission_date = MAX(admission_date);


-- Task 18
-- Show patient_id, attending_physician_id, and diagnosis for admissions
-- that match one of the two criteria:
-- 1. patient_id is an odd number and attending_physician_id is either 1, 5, or 19.
-- 2. attending_physician_id contains a 2 and the length of patient_id is 3 characters.