/**
 * Resolve IP address to geographic location (Country and City)
 * @param {string} ip 
 * @returns {object} { country, city }
 */
const lookupIpLocation = (ip = '') => {
  // Strip IPv6 prefix if present
  const cleanIp = ip.replace(/^::ffff:/, '');

  if (!cleanIp || cleanIp === '127.0.0.1' || cleanIp === '::1' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.')) {
    return { country: 'Local Network', city: 'Localhost' };
  }

  // Fallback default mapping for external IPs in demo/local environment
  return { country: 'United States', city: 'Unknown' };
};

module.exports = { lookupIpLocation };
