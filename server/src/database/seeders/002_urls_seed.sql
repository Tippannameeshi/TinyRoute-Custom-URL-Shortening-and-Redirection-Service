USE url_shortener;

INSERT INTO urls (id, user_id, original_url, short_code, custom_alias, title, description, tags, is_favorite, max_clicks, password_hash, expires_at, is_active, click_count)
VALUES
(1, 1, 'https://github.com/expressjs/express', 'exp001', 'express-repo', 'Express GitHub Repository', 'Official Express.js repository', '["node", "express", "backend"]', TRUE, NULL, NULL, NULL, TRUE, 120),
(2, 2, 'https://react.dev/learn', 'rct002', 'react-docs', 'React Official Documentation', 'Comprehensive guide to React 19', '["react", "frontend", "javascript"]', TRUE, 500, NULL, NULL, TRUE, 45),
(3, 2, 'https://tailwindcss.com/docs', 'tw003', NULL, 'Tailwind CSS Docs', 'Utility-first CSS framework documentation', '["css", "tailwind"]', FALSE, NULL, NULL, NULL, TRUE, 12),
(4, 3, 'https://mysql.com', 'sql004', 'mysql-official', 'MySQL Official Site', 'Relational database management system', '["database", "sql"]', FALSE, 10, NULL, DATE_ADD(NOW(), INTERVAL 30 DAY), TRUE, 2)
ON DUPLICATE KEY UPDATE updated_at=NOW();