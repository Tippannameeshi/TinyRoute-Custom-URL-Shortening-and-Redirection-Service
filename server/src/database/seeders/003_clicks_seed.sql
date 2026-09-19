USE url_shortener;

INSERT INTO url_clicks (url_id, ip_address, browser, operating_system, device, country, city, referrer, request_id, clicked_at)
VALUES
(1, '192.168.1.1', 'Chrome', 'Windows', 'Desktop', 'United States', 'New York', 'https://google.com', 'req-seed-001', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(1, '192.168.1.2', 'Firefox', 'MacOS', 'Desktop', 'United States', 'San Francisco', 'https://github.com', 'req-seed-002', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(1, '192.168.1.3', 'Safari', 'iOS', 'Mobile', 'United Kingdom', 'London', 'Direct', 'req-seed-003', DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(2, '192.168.1.4', 'Chrome', 'Android', 'Mobile', 'India', 'Mumbai', 'https://twitter.com', 'req-seed-004', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, '192.168.1.5', 'Edge', 'Windows', 'Desktop', 'Germany', 'Berlin', 'https://linkedin.com', 'req-seed-005', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(3, '192.168.1.6', 'Chrome', 'Linux', 'Desktop', 'Canada', 'Toronto', 'Direct', 'req-seed-006', DATE_SUB(NOW(), INTERVAL 12 HOUR));
