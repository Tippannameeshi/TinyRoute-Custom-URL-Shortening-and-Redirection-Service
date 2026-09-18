USE url_shortener;

CREATE TABLE password_reset_tokens
(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    token_hash VARCHAR(255) NOT NULL,

    expires_at DATETIME NOT NULL,

    used_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_password_reset_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_reset_user
ON password_reset_tokens(user_id);

CREATE INDEX idx_reset_expiry
ON password_reset_tokens(expires_at);

CREATE INDEX idx_reset_used
ON password_reset_tokens(used_at);

CREATE INDEX idx_reset_user_expiry
ON password_reset_tokens(user_id, expires_at);