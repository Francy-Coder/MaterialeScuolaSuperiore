-- 1. INNER JOIN (Restituisce solo le righe che hanno corrispondenze in entrambe le tabelle) <-- E' un Equi Join visto l'=
SELECT * FROM transactions INNER JOIN customers
ON transactions.customer_id = customers.customer_id;

-- 2. INNER JOIN con selezione di colonne specifiche <-- E' un Equi Join visto l'=
SELECT transaction_id, amount, first_name, last_name
FROM transactions INNER JOIN customers
ON transactions.customer_id = customers.customer_id;

-- 3. INNER JOIN
SELECT * FROM impiegati 
INNER JOIN bonus 
ON impiegati.stipendio > bonus.soglia_min; -- Usa ">" quindi NON è EQUI