CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

INSERT INTO customers
VALUES  (1, "Fred", "Fish"),
        (2, "Larry", "Lobster"),
        (3, "Bubble", "Bass");

CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(5, 2),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

ALTER TABLE transactions
DROP FOREIGN KEY transactions_ibfk_1;

ALTER TABLE transactions
ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

INSERT INTO transactions (amount, customer_id)
VALUES  (4.99, 3),
        (2.89, 2),
        (3.38, 3),
        (4.99, 1);