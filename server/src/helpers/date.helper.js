/**
 * Format Date to MySQL DATETIME string YYYY-MM-DD HH:MM:SS
 * @param {Date} date 
 * @returns {string}
 */
const toMySQLDateTime = (date = new Date()) => {
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * Check if a given date is expired
 * @param {Date|string} expiryDate 
 * @returns {boolean}
 */
const isExpired = (expiryDate) => {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
};

module.exports = {
  toMySQLDateTime,
  isExpired
};
