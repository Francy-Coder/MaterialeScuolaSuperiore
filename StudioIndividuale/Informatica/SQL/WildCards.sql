-- 1. Uso del simbolo % (Rappresenta un numero qualsiasi di caratteri)

-- Trova nomi che iniziano con "S"
SELECT * FROM employees WHERE first_name LIKE "s%";

-- Trova date di assunzione in un anno specifico (es. 2023)
SELECT * FROM employees WHERE hire_date LIKE "2023%";

-- Trova cognomi che finiscono con "r"
SELECT * FROM employees WHERE last_name LIKE "%r";

-- Trova nomi che iniziano con "Sp"
SELECT * FROM employees WHERE first_name LIKE "Sp%";


-- 2. Uso del simbolo _ (Rappresenta un singolo carattere casuale)

-- Trova lavori dove la seconda e terza lettera sono "oo" (es. Cook)
SELECT * FROM employees WHERE job LIKE "_ook";

-- Trova date di assunzione in un mese specifico (usando underscore per i giorni)
SELECT * FROM employees WHERE hire_date LIKE "2023-01-__";

-- Trova assunzioni basate su un giorno specifico del mese (es. il giorno 02)
SELECT * FROM employees WHERE hire_date LIKE "____-__-02";


-- 3. Combinazione di _ e %

-- Trova lavori dove il secondo carattere è "a" (es. Manager, Cashier, Janitor)
SELECT * FROM employees WHERE job LIKE "_a%";