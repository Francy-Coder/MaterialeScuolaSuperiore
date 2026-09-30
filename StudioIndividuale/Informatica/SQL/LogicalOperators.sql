-- 1. Preparazione: Aggiunta colonna e aggiornamento dati
ALTER TABLE employees ADD COLUMN job VARCHAR(25) AFTER hourly_pay;

UPDATE employees SET job = "manager" WHERE employee_id = 1;
UPDATE employees SET job = "cashier" WHERE employee_id = 2;
UPDATE employees SET job = "cook" WHERE employee_id = 3;
UPDATE employees SET job = "cook" WHERE employee_id = 4;
UPDATE employees SET job = "assistant manager" WHERE employee_id = 5;
UPDATE employees SET job = "janitor" WHERE employee_id = 6;

-- 2. Operatore AND (Entrambe le condizioni devono essere vere)
SELECT * FROM employees 
WHERE hire_date < "2023-01-05" AND job = "cook";

-- 3. Operatore OR (Almeno una condizione deve essere vera)
SELECT * FROM employees 
WHERE job = "cook" OR job = "cashier";

-- 4. Operatore NOT (Inverte la condizione)
SELECT * FROM employees 
WHERE NOT job = "manager";

-- Combinazione di NOT e AND
SELECT * FROM employees 
WHERE NOT job = "manager" AND NOT job = "assistant manager";

-- 5. Operatore BETWEEN (Cerca valori in un intervallo inclusivo)
SELECT * FROM employees 
WHERE hire_date BETWEEN "2023-01-04" AND "2023-01-07";

-- 6. Operatore IN (Cerca valori all'interno di una lista/set)
SELECT * FROM employees 
WHERE job IN ("cook", "cashier", "janitor");