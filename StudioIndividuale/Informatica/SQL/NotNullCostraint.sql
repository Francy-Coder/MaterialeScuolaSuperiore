CREATE TABLE products (
    product_id INT,
    product_name VARCHAR(25),
    price DOUBLE NOT NULL
);

ALTER TABLE products
MODIFY price DOUBLE NOT NULL;

INSERT INTO products
VALUES (104, "cookie", 0);