### Start DB from scratch: 

1. docker compose up -d
2. docker exec -it 'CONTAINER_ID' bin/bash
3. psql -f demo_db_init.sql -U 'USERNAME'
4. psql -d 'DB_NAME' -U 'USERNAME'

> Default DB_NAME=demo
> Default USERNAME=postgres

### Useful commands: 
- Get all tables 
```sql
 SELECT * FROM information_schema.tables;
```