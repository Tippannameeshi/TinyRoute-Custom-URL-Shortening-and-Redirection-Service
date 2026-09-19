USE url_shortener;

CREATE TABLE IF NOT EXISTS url_clicks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    url_id BIGINT UNSIGNED NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    browser VARCHAR(100) NULL,
    operating_system VARCHAR(100) NULL,
    device VARCHAR(100) NULL,
    country VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    referrer VARCHAR(500) NULL,
    request_id VARCHAR(100) NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_url_clicks_url FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_url_clicks_url ON url_clicks(url_id);
CREATE INDEX idx_url_clicks_time ON url_clicks(clicked_at);
CREATE INDEX idx_url_clicks_country ON url_clicks(country);
CREATE INDEX idx_url_clicks_browser ON url_clicks(browser);
CREATE INDEX idx_url_clicks_device ON url_clicks(device);
CREATE INDEX idx_url_clicks_url_time ON url_clicks(url_id, clicked_at);
