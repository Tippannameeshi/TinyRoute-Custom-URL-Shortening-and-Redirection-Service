USE url_shortener;

-- Passwords are set to 'Password123!' hashed with bcrypt cost 10
INSERT INTO users (id, first_name, last_name, email, password_hash, role, is_verified, is_active)
VALUES
(1, 'System', 'Admin', 'admin@tinyroute.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'ADMIN', TRUE, TRUE),
(2, 'Jane', 'Doe', 'jane@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'USER', TRUE, TRUE),
(3, 'John', 'Smith', 'john@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'USER', TRUE, TRUE)
ON DUPLICATE KEY UPDATE updated_at=NOW();

INSERT INTO user_settings (user_id, default_domain, notify_on_click, notify_on_expiration, theme)
VALUES
(1, 'tiny.route', TRUE, TRUE, 'dark'),
(2, 'tiny.route', FALSE, TRUE, 'light'),
(3, 'tiny.route', FALSE, FALSE, 'light')
ON DUPLICATE KEY UPDATE updated_at=NOW();