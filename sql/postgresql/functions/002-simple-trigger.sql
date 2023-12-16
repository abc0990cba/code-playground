create table employees (
  id integer primary key,
  name text not null
);

insert into employees values (0001, 'Dave');
insert into employees values (0002, 'Pam');
insert into employees values (0003, 'Jim');

create or replace function remove_excess_employees()
  returns trigger
  language plpgsql
as
$$
declare
  rows_count integer;
  max_employees constant integer := 3;
begin 
  select count(*)::integer
    into rows_count
    from employees;
  
  if rows_count > max_employees then
    delete 
      from employees
     where id = (select min(id) from employees);
  end if;

  return NEW;
end;
$$;

create trigger rows_count_changes
  after insert
  on employees
  for each statement
  execute procedure remove_excess_employees();
  
select name, id
  from employees;
  
insert into employees values (0004, 'Joe');

select name, id
  from employees;
