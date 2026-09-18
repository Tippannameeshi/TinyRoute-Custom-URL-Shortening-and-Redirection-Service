USE url_shortener;

CREATE TABLE clicks
(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    url_id BIGINT UNSIGNED NOT NULL,

    ip_address VARCHAR(45) NOT NULL,

    browser VARCHAR(100),

    operating_system VARCHAR(100),

    device VARCHAR(100),

    country VARCHAR(100),

    city VARCHAR(100),

    referrer VARCHAR(500),

    clicked_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_click_url
        FOREIGN KEY(url_id)
        REFERENCES urls(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_click_url
ON clicks(url_id);

CREATE INDEX idx_click_time
ON clicks(clicked_at);

CREATE INDEX idx_click_country
ON clicks(country);

CREATE INDEX idx_click_browser
ON clicks(browser);

CREATE INDEX idx_click_device
ON clicks(device);

CREATE INDEX idx_click_url_time
ON clicks(url_id, clicked_at);