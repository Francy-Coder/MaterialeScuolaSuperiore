CREATE TABLE products (
    product_id INT,
    product_name VARCHAR(25),
    price DOUBLE DEFAULT 0.00
);

ALTER TABLE products
ALTER price SET DEFAULT 0;

INSERT INTO products (product_id, product_name)
VALUES  (104, "straw"),
        (105, "napkin"),
        (106, "fork"),
        (107, "spoon");

CREATE TABLE transactions (
    transaction_id INT,
    amount DOUBLE,
    transaction_date DATETIME DEFAULT NOW()
);

INSERT INTO transactions (transaction_id, amount)
VALUES (1, 4.99);

SELECT * FROM transactions;

DROP TABLE transactions;