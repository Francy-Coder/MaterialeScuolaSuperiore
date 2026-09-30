CREATE DATABASE myDB;

CREATE TABLE myDB.employees (
	employe_id INT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    hourly_pay DOUBLE,
    hire_date DATE
);

INSERT INTO myDB.employees VALUES (1, "Francy", "Tresoldi", 10000, "2026-02-22"), -- Inserisci i valori inseriti nelle righe della tabella
(2, "Squidward", "Tentacles", 15.00, "2023-01-03"), 
(3, "Spongebob", "Squarepants", 12.50, "2023-01-04"), 
(4, "Patrick", "Star", 12.50, "2023-01-05"), 
(5, "Sandy", "Cheeks", 17.25, "2023-01-06");

SELECT * FROM myDB.employees;

INSERT INTO myDB.employees (employe_id, first_name, last_name) VALUES (5, "Mr", "Crab");