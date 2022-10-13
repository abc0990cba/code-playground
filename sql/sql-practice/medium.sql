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
