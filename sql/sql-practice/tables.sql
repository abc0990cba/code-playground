-------------------------- Tables ---------------------------------
-------------------------------------------------------------------

-- **************** patients ****************
---------------------------------------------
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
---------------------------------------------

-- *************** province_names ************
---------------------------------------------
--  primary key  province_id 	CHAR(2)
--               province_name 	TEXT
---------------------------------------------

-- ***************** admissions **************
---------------------------------------------
-- primary key   attending_physician_id   INT
--   	         patient_id 	          INT
-- 	             admission_date 	      DATE
-- 	             discharge_date 	      DATE
-- 	             diagnosis 	              TEXT
---------------------------------------------

-- ***************** physicians **************
---------------------------------------------
-- primary key   physician_id 	INT
-- 	             first_name 	TEXT
-- 	             last_name 	    TEXT
--               specialty 	    TEXT
---------------------------------------------

-------------------------------------------------------------------
-------------------------------------------------------------------
