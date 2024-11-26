-- https://hakibenita.com/postgresql-hash-index
--  distribute values by buckets 
select n, 
       mod(n, 3) as bucket
  from generate_series(1, 7) as n;
--  Output:
--    n | bucket 
-- ---+--------
--  1 |      1
--  2 |      2
--  3 |      0
--  4 |      1
--  5 |      2
--  6 |      0
--  7 |      1 

-------------------------------------------------------------------------------

SELECT hashtext('text'),
       hashchar('c'),
       hash_array(array[1,2,3]),
       jsonb_hash('{"me": "haki"}'::jsonb),
       timestamp_hash(now()::timestamp);
-- Output:
--   hashtext  | hashchar  | hash_array | jsonb_hash  | timestamp_hash 
-- ------------+-----------+------------+-------------+----------------
--  -451854347 | 203891234 | -325393530 | -1784498999 |    -1888574425

-------------------------------------------------------------------------------

create table shorturl (
  id serial primary key,
  key text not null,
  url text not null
);

create unique index shorturl_key_btree_index on shorturl using btree(key);
-- Hash indexes currently cannot be used to enforce unique constraints.
create index shorturl_key_hash_index on shorturl using hash(key);
  
create index shorturl_url_btree_index on shorturl using btree(url);
create index shorturl_url_hash_index on shorturl using hash(url);


CREATE EXTENSION "uuid-ossp";

DO $$
BEGIN
    FOR i IN 0..1000000 LOOP
           INSERT INTO shorturl (key, url) VALUES (
               uuid_generate_v4(),
               'example/' || round(random() * 10 ^ 6)::text
           );
           IF mod(i, 10000) = 0 THEN
               RAISE NOTICE 'rows:%  Hash key%  B-Tree key:%  Hash url:%  B-Tree url:%',
                   to_char(i, '9999999999'),
                   to_char(pg_relation_size('shorturl_key_hash_index'), '99999999999'),
                   to_char(pg_relation_size('shorturl_key_btree_index'), '99999999999'),
                   to_char(pg_relation_size('shorturl_url_hash_index'), '99999999999'),
                   to_char(pg_relation_size('shorturl_url_btree_index'), '99999999999');
           END IF;
    END LOOP;
END;
$$;


-- psql:commands.sql:33: NOTICE:  rows:          0  Hash key       32768  B-Tree key:       16384  Hash url:       32768  B-Tree url:       16384
-- psql:commands.sql:33: NOTICE:  rows:      10000  Hash key      606208  B-Tree key:      794624  Hash url:      614400  B-Tree url:      434176
-- psql:commands.sql:33: NOTICE:  rows:      20000  Hash key     1212416  B-Tree key:     1556480  Hash url:     1212416  B-Tree url:      827392
-- psql:commands.sql:33: NOTICE:  rows:      30000  Hash key     1359872  B-Tree key:     2318336  Hash url:     1351680  B-Tree url:     1204224
-- psql:commands.sql:33: NOTICE:  rows:      40000  Hash key     2408448  B-Tree key:     3112960  Hash url:     2400256  B-Tree url:     1613824
-- psql:commands.sql:33: NOTICE:  rows:      50000  Hash key     2408448  B-Tree key:     3883008  Hash url:     2400256  B-Tree url:     2105344
-- psql:commands.sql:33: NOTICE:  rows:      60000  Hash key     2670592  B-Tree key:     4546560  Hash url:     2686976  B-Tree url:     2424832
-- psql:commands.sql:33: NOTICE:  rows:      70000  Hash key     2670592  B-Tree key:     5316608  Hash url:     2686976  B-Tree url:     2727936
-- psql:commands.sql:33: NOTICE:  rows:      80000  Hash key     4767744  B-Tree key:     6234112  Hash url:     4784128  B-Tree url:     3211264
-- psql:commands.sql:33: NOTICE:  rows:      90000  Hash key     4767744  B-Tree key:     7004160  Hash url:     4784128  B-Tree url:     3760128
-- psql:commands.sql:33: NOTICE:  rows:     100000  Hash key     4767744  B-Tree key:     7831552  Hash url:     4784128  B-Tree url:     4177920
