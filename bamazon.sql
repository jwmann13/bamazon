DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products
VALUES (null, 'shoes', 'clothing', 30.00, 10), 
    (null, 'shirts', 'clothing', 10.00, 20),
    (null, 'pants', 'clothing', 20.00, 8),
    (null, 'engine oil', 'automotive', 30.00, 30),
    (null, 'air fresheners', 'automotive', 3.00, 50),
    (null, 'celery', 'grocery', 1.50, 60),
    (null, 'cereal', 'grocery', 2.85, 35),
    (null, 'bread', 'grocery', 1.00, 100),
    (null, 'eggs', 'grocery', 2.50, 100),
    (null, 'gold watch', 'jewelry', 3000.00, 1);