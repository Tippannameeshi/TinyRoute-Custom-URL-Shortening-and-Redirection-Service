USE url_shortener;

CREATE TABLE IF NOT EXISTS url_clicks (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    url_id BIGINT UNSIGNED NOT NULL,

    country VARCHAR(100),

    city VARCHAR(100),

    browser VARCHAR(100),

    operating_system VARCHAR(100),

    device VARCHAR(100),

    referrer TEXT,

    ip_address VARCHAR(45),

    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(id),

    INDEX idx_url(url_id),

    INDEX idx_clicked(clicked_at),

    INDEX idx_url_clicked(url_id, clicked_at),

    CONSTRAINT fk_click_url
        FOREIGN KEY(url_id)
        REFERENCES urls(id)
        ON DELETE CASCADE

) ENGINE=InnoDB;