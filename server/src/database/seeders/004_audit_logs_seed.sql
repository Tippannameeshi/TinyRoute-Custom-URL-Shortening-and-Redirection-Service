USE url_shortener;

INSERT INTO audit_logs (user_id, action, details, ip_address, request_id, created_at)
VALUES
(1, 'LOGIN', 'Admin user logged in successfully', '127.0.0.1', 'req-audit-001', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 'REGISTER', 'User registered with email jane@example.com', '127.0.0.1', 'req-audit-002', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 'CREATE_URL', 'User created short URL: rct002', '127.0.0.1', 'req-audit-003', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, 'CREATE_URL', 'User created short URL: sql004', '127.0.0.1', 'req-audit-004', DATE_SUB(NOW(), INTERVAL 1 DAY));
