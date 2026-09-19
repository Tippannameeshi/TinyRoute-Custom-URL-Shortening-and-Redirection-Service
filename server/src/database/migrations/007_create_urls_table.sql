USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    original_url VARCHAR(2048) NOT NULL,
    short_code VARCHAR(20) NOT NULL,
    custom_alias VARCHAR(50) NULL,
    title VARCHAR(255) NULL,
    description TEXT NULL,
    tags JSON NULL,
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    max_clicks BIGINT UNSIGNED NULL,
    password_hash VARCHAR(255) NULL,
    expires_at DATETIME NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    deleted_at DATETIME NULL,
    click_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_urls_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_short_code UNIQUE (short_code),
    CONSTRAINT uq_custom_alias UNIQUE (custom_alias)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_urls_user ON urls(user_id);
CREATE INDEX idx_urls_created ON urls(created_at);
CREATE INDEX idx_urls_expiry ON urls(expires_at);
CREATE INDEX idx_urls_user_created ON urls(user_id, created_at);
CREATE INDEX idx_urls_deleted ON urls(deleted_at);
CREATE FULLTEXT INDEX idx_urls_search ON urls(title, original_url, short_code, custom_alias);
