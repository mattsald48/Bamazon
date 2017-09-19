DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE IF NOT EXISTS bamazonDB;

USE bamazonDB;

CREATE TABLE IF NOT EXISTS products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  
  PRIMARY KEY (item_id)
);

SELECT * FROM products ;



