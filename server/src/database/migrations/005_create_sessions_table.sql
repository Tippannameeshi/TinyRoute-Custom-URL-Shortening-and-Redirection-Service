USE url_shortener;

CREATE TABLE sessions
(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    refresh_token_hash VARCHAR(255) NOT NULL,

    device_name VARCHAR(255),

    browser VARCHAR(150),

    operating_system VARCHAR(150),

    ip_address VARCHAR(45),

    expires_at DATETIME NOT NULL,

    revoked_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user
ON sessions(user_id);

CREATE INDEX idx_sessions_expiry
ON sessions(expires_at);

CREATE INDEX idx_sessions_revoked
ON sessions(revoked_at);

CREATE INDEX idx_sessions_user_expiry
ON sessions(user_id, expires_at);