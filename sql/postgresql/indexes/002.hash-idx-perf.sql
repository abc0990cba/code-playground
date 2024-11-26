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

-- Hash: total=00:00:00.590032 mean=5.90032e-06
-- B-Tree: total=00:00:00.923244 mean=9.23244e-06
