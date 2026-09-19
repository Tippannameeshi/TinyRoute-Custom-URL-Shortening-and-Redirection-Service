USE url_shortener;

INSERT INTO clicks
(
    url_id,
    ip_address,
    browser,
    operating_system,
    device,
    country,
    city,
    referrer
)
VALUES
(
    1,
    '192.168.1.10',
    'Chrome',
    'Windows 11',
    'Desktop',
    'India',
    'Bengaluru',
    'https://google.com'
),
(
    1,
    '192.168.1.11',
    'Edge',
    'Windows 11',
    'Desktop',
    'India',
    'Mysuru',
    'https://bing.com'
),
(
    2,
    '192.168.1.12',
    'Firefox',
    'Ubuntu',
    'Laptop',
    'India',
    'Mangaluru',
    'Direct'
),
(
    3,
    '192.168.1.13',
    'Safari',
    'macOS',
    'Laptop',
    'USA',
    'New York',
    'https://twitter.com'
);