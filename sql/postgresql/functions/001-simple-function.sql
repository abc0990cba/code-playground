create table employee (
  id integer primary key,
  name text not null
);

insert into employee values (0001, 'Dave');
insert into employee values (0002, 'Pam');
insert into employee values (0003, 'Jim');

create function get_all_names(min_id int)
  returns text
  language plpgsql
as
$$
declare
  names text;
begin 
  select string_agg(name, ', ') into names 
    from employee 
   where id > min_id;

  return names;
end;
$$;

select get_all_names(1);
