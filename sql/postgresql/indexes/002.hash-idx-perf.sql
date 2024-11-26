CREATE EXTENSION "uuid-ossp";

DROP TABLE IF EXISTS shorturl_hash;
CREATE TABLE shorturl_hash (
    id serial primary key,
    key text not null,
    url text not null
);

CREATE INDEX shorturl_hash_hash_ix ON shorturl_hash USING hash(key);

DO $$
DECLARE
    n INTEGER := 1000000;
    duration INTERVAL := 0;
    start TIMESTAMP;
    uid TEXT;
    url TEXT;
BEGIN
    FOR i IN 1..n LOOP
        uid := uuid_generate_v4()::text;
        url := 'example' || round(random() * 10 ^ 6)::text;
        start := clock_timestamp();
          INSERT INTO shorturl_hash (key, url) VALUES (uid, url);
        duration := duration + (clock_timestamp() - start);
    END LOOP;
    RAISE NOTICE 'Hash: total=% mean=%', duration, extract('epoch' from duration) / n;
END;
$$;

------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS shorturl_btree;
CREATE TABLE shorturl_btree (
    id serial primary key,
    key text not null,
    url text not null
);

CREATE INDEX shorturl_btree_hash_idx ON shorturl_btree(key);

DO $$
DECLARE
    n INTEGER := 1000000;
    duration INTERVAL := 0;
    start TIMESTAMP;
    uid TEXT;
    url TEXT;
BEGIN
    FOR i IN 1..n LOOP
        uid := uuid_generate_v4()::text;
        url := 'example' || round(random() * 10 ^ 6)::text;
        start := clock_timestamp();
        INSERT INTO shorturl_btree (key, url) VALUES (uid, url);
        duration := duration + (clock_timestamp() - start);
    END LOOP;
    RAISE NOTICE 'B-Tree: total=% mean=%', duration, extract('epoch' from duration) / n;
END;
$$;

------------------------------------------------------------------------------------------------

DO $$
DECLARE
  n INTEGER := 100000;
  duration INTERVAL := 0;
  start TIMESTAMP;
  keys TEXT[];
BEGIN
    -- Fetch random keys from the table
    SELECT ARRAY_AGG(key) INTO keys
      FROM (
        SELECT key
          FROM shorturl_hash
         ORDER BY random()
         LIMIT n
      ) AS foo;

    FOR i IN array_lower(keys, 1)..array_upper(keys, 1) LOOP
        start := clock_timestamp();
        PERFORM * FROM shorturl_hash WHERE key = keys[i];
        duration := duration + (clock_timestamp() - start);
    END LOOP;
    RAISE NOTICE 'Hash: total=% mean=%', duration, extract('epoch' from duration) / n;
END;
$$;

------------------------------------------------------------------------------------------------

DO $$
DECLARE
  n INTEGER := 100000;
  duration INTERVAL := 0;
  start TIMESTAMP;
  keys TEXT[];

BEGIN
  -- Fetch random keys from the table
  SELECT ARRAY_AGG(key) INTO keys
    FROM (
      SELECT key
        FROM shorturl_btree
       ORDER BY random()
       LIMIT n
    ) AS foo;

    FOR i IN array_lower(keys, 1)..array_upper(keys, 1) LOOP
      start := clock_timestamp();
        PERFORM * FROM shorturl_btree WHERE key = keys[i];
      duration := duration + (clock_timestamp() - start);
  END LOOP;
  RAISE NOTICE 'B-Tree: total=% mean=%', duration, extract('epoch' from duration) / n;
END;
$$;

------------------------------------------------------------------------------------------------

-- INSERT
-- Hash: total=00:00:09.764746 mean=9.764746e-06
-- B-Tree: total=00:00:10.822158 mean=1.0822158e-05

-- SELECT
-- Hash: total=00:00:00.590032 mean=5.90032e-06
-- B-Tree: total=00:00:00.923244 mean=9.23244e-06

