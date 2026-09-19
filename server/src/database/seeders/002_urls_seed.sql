USE url_shortener;

INSERT INTO urls
(
    user_id,
    original_url,
    short_code,
    custom_alias,
    title,
    description,
    password_hash,
    expires_at,
    is_active,
    click_count
)
VALUES
(
    1,
    'https://github.com',
    'gh1234',
    'github',
    'GitHub',
    'GitHub Home',
    NULL,
    NULL,
    TRUE,
    25
),
(
    2,
    'https://react.dev',
    'rct001',
    NULL,
    'React',
    'React Documentation',
    NULL,
    NULL,
    TRUE,
    12
),
(
    3,
    'https://nodejs.org',
    'nd001',
    'nodejs',
    'Node.js',
    'Official Node.js Website',
    NULL,
    NULL,
    TRUE,
    8
);