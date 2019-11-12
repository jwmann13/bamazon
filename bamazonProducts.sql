DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    product_sales DECIMAL(10, 2) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products
VALUES (null, 'shoes', 'clothing', 0, 30.00, 10), 
    (null, 'shirts', 'clothing', 0, 10.00, 20),
    (null, 'pants', 'clothing', 0, 20.00, 8),
    (null, 'engine oil', 'automotive', 0, 30.00, 30),
    (null, 'air fresheners', 'automotive', 0, 3.00, 50),
    (null, 'celery', 'grocery', 0, 1.50, 60),
    (null, 'cereal', 'grocery', 0, 2.85, 35),
    (null, 'bread', 'grocery', 0, 1.00, 100),
    (null, 'eggs', 'grocery', 0, 2.50, 100),
    (null, 'gold watch', 'jewelry', 0, 3000.00, 1);