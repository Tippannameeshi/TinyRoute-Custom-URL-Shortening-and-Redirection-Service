USE url_shortener;

CREATE TABLE IF NOT EXISTS password_reset_tokens (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    token_hash VARCHAR(255) NOT NULL,

    expires_at DATETIME NOT NULL,

    used BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(id),

    INDEX idx_reset_user(user_id),

    INDEX idx_reset_token(token_hash),

    CONSTRAINT fk_reset_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

) ENGINE=InnoDB;