USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id BIGINT UNSIGNED NOT NULL,

    original_url TEXT NOT NULL,

    short_code VARCHAR(20) NOT NULL,

    custom_alias VARCHAR(50) DEFAULT NULL,

    title VARCHAR(255) DEFAULT NULL,

    password_hash VARCHAR(255) DEFAULT NULL,

    expires_at DATETIME DEFAULT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    click_count BIGINT UNSIGNED NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(id),

    UNIQUE KEY uk_short_code(short_code),

    UNIQUE KEY uk_custom_alias(custom_alias),

    INDEX idx_user(user_id),

    INDEX idx_created(created_at),

    CONSTRAINT fk_url_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

) ENGINE=InnoDB;