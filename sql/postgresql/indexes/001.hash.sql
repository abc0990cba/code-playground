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
