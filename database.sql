--user table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(45) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    created_at DATE DEFAULT CURRENT_DATE
)

CREATE TABLE results (
    id INTEGER REFERENCES "users"(user_id) UNIQUE,
    result VARCHAR(6) NOT NULL,
    paystack_ref VARCHAR(255),
    created_at DATE DEFAULT CURRENT_DATE
);

UPDATE results SET paystack_ref = 'some_value' WHERE id = 1;

