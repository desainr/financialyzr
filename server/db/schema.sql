BEGIN

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO INCREMENT,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    create_date DATETIME,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(5) DEFAULT 'USER'
);

END