CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY,
    amount DECIMAL(5, 2)
);

ALTER TABLE transactions
ADD CONSTRAINT PRIMARY KEY(transaction_id);

INSERT INTO transactions
VALUES  (1000, 4.99),
        (1001, 2.89),
        (1002, 3.38),
        (1003, 4.99);

SELECT amount 
FROM transactions 
WHERE transaction_id = 1003;