CREATE DATABASE myDB; -- Crea il database
/* DROP DATABASE myDB; -- Elimina il database */

CREATE TABLE myDB.employees (
	employe_id INT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    hourly_pay DOUBLE,
    hire_date DATE
);

SELECT * FROM myDB.employees;

/* RENAME TABLE employees TO workers; -- Rinomina la tabella
DROP TABLE employees; -- Elimina la tabella */

ALTER TABLE employees ADD phone_number VARCHAR(20); -- Aggiunge una colonna

ALTER TABLE employees RENAME COLUMN phone_number TO email; -- Rinomina la colonna (ma nn cambia il tipo di variabile)

ALTER TABLE employees MODIFY COLUMN email VARCHAR(100); -- Cambia il tipo di variabile della colonna

ALTER TABLE employees MODIFY email VARCHAR(100) AFTER last_name; -- Sposta la colonna dopo una certa variabile indicata

ALTER TABLE employees DROP COLUMN email; -- Elimina la colonna