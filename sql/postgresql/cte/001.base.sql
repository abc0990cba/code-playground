WITH values AS (
	SELECT * FROM 
       (VALUES (1, 'One'),
               (2, 'Two'),
               (3, 'Three'),
               (4, 'Four'),
               (5, 'Five')) AS t(num, name)
)

SELECT name
  FROM values
 WHERE num % 2 = 0
 UNION 
SELECT name
  FROM values
 WHERE num % 2 != 0