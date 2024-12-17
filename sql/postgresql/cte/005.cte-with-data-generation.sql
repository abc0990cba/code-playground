CREATE TABLE organization_positions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES organization_positions(id)
);

-- INSERT INTO organization_positions (name, parent_id) VALUES
-- ('CEO', NULL),
-- ('CTO', 1),
-- ('CFO', 1),
-- ('Software Engineer', 2),
-- ('Financial Analyst', 3);

CREATE OR REPLACE FUNCTION generate_positions(max_level INT, target_count INT) RETURNS VOID AS $$
DECLARE
    current_level INT := 0;
    current_count INT := 0;
    parent_id INT;
    position_name TEXT;
BEGIN
    -- Insert the root position
    INSERT INTO organization_positions (name, parent_id) VALUES ('CEO', NULL);
    current_count := current_count + 1;

    -- Generate positions level by level
    WHILE current_level < max_level AND current_count < target_count LOOP
        current_level := current_level + 1;
        FOR parent_id IN
            SELECT op.id
            FROM organization_positions op
            WHERE op.parent_id IS NOT NULL
              AND op.id NOT IN (SELECT op2.parent_id FROM organization_positions op2)
        LOOP
            FOR i IN 1..5 LOOP -- Each position can have 1 to 5 children
                position_name := 'Position ' || current_count;
                INSERT INTO organization_positions (name, parent_id) VALUES (position_name, parent_id);
                current_count := current_count + 1;
                EXIT WHEN current_count >= target_count;
            END LOOP;
        END LOOP;
    END LOOP;

    -- Ensure we have at least the target count of positions
    WHILE current_count < target_count LOOP
        parent_id := (SELECT id FROM organization_positions ORDER BY RANDOM() LIMIT 1);
        position_name := 'Position ' || current_count;
        INSERT INTO organization_positions (name, parent_id) VALUES (position_name, parent_id);
        current_count := current_count + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT generate_positions(10, 1000);

WITH RECURSIVE position_hierarchy AS (
    SELECT id, name, parent_id, 1 AS level
    FROM organization_positions
    WHERE parent_id IS NULL
    UNION ALL
    SELECT op.id, op.name, op.parent_id, ph.level + 1
    FROM organization_positions op
    INNER JOIN position_hierarchy ph ON op.parent_id = ph.id
)

SELECT * FROM position_hierarchy LIMIT 20;

-- SELECT * FROM organization_positions;
