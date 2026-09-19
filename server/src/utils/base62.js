const crypto = require('crypto');

const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BASE62_CHARS.length;

/**
 * Encode an integer ID into Base62 string
 * @param {number} num 
 * @returns {string}
 */
const encodeBase62 = (num) => {
  if (num === 0) return BASE62_CHARS[0];
  let result = '';
  let n = BigInt(num);
  const baseBig = BigInt(BASE);

  while (n > 0n) {
    const remainder = Number(n % baseBig);
    result = BASE62_CHARS[remainder] + result;
    n = n / baseBig;
  }
  return result;
};

/**
 * Decode a Base62 string into integer
 * @param {string} str 
 * @returns {number}
 */
const decodeBase62 = (str) => {
  let num = 0n;
  const baseBig = BigInt(BASE);
  for (let i = 0; i < str.length; i++) {
    const index = BASE62_CHARS.indexOf(str[i]);
    if (index === -1) throw new Error(`Invalid Base62 character '${str[i]}'`);
    num = num * baseBig + BigInt(index);
  }
  return Number(num);
};

/**
 * Generate a random Base62 short code of specified length
 * @param {number} length 
 * @returns {string}
 */
const generateRandomShortCode = (length = 6) => {
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += BASE62_CHARS[bytes[i] % BASE];
  }
  return result;
};

module.exports = {
  encodeBase62,
  decodeBase62,
  generateRandomShortCode
};
