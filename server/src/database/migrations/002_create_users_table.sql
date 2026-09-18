USE url_shortener;

CREATE TABLE users
(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM('USER','ADMIN')
        NOT NULL
        DEFAULT 'USER',

    is_verified BOOLEAN
        NOT NULL
        DEFAULT FALSE,

    is_active BOOLEAN
        NOT NULL
        DEFAULT TRUE,

    last_login_at DATETIME NULL,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_users_email
        UNIQUE(email)
);

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_users_created_at
ON users(created_at);