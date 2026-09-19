const env = require('../config/env');

/**
 * Format a full short URL from short code or custom alias
 * @param {string} shortCode 
 * @param {string} customAlias 
 * @returns {string}
 */
const buildShortUrl = (shortCode, customAlias = null) => {
  const code = customAlias || shortCode;
  return `${env.app.baseUrl}/${code}`;
};

/**
 * Validate URL string format
 * @param {string} urlString 
 * @returns {boolean}
 */
const isValidUrl = (urlString) => {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

module.exports = {
  buildShortUrl,
  isValidUrl
};
