UPDATE employees SET hourly_pay = 10.25 WHERE employee_id = 6;

UPDATE employees SET hourly_pay = 10.50, hire_date = "2023-01-07" WHERE employee_id = 6;

UPDATE employees SET hire_date = NULL WHERE employee_id = 6;

UPDATE employees SET hourly_pay = 10.25;

DELETE FROM employees WHERE employee_id = 6;

DELETE FROM employees;