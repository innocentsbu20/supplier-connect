CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(25) NOT NULL UNIQUE,
    surname VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    type VARCHAR(10) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    contact VARCHAR(10) NOT NULL UNIQUE,
    ratings INTEGER,
    create_time DATETIME NOT NULL,
    sa_id INTEGER NOT NULL UNIQUE,
    company_name VARCHAR(45) NOT NULL,
    address VARCHAR(125) NOT NULL,
    balance REAL NOT NULL DEFAULT 0.0
);
INSERT INTO users (username, surname, name, type, email, password, contact, ratings, create_time, sa_id, company_name, address, balance)
VALUES
    ('john_doe', 'Doe', 'John', 'b', 'john@example.com', 'hashed_password1', '1234567890', 4, '2023-08-24 10:30:00', 1234567890123, 'ABC Inc.', '123 Main St', 100.50),
    ('jane_smith', 'Smith', 'Jane', 'Premium', 'jane@example.com', 'hashed_password2', '9876543210', 5, '2023-08-24 11:45:00', 9876543210987, 'XYZ Corp.', '456 Elm St', 250.75);
	
	UPDATE users
SET type = 'supplier'
WHERE
    surname = 'Smith'
