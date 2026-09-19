/**
 * Parse user agent string to detect Browser, OS, and Device type.
 * @param {string} userAgent 
 * @returns {object} { browser, os, device }
 */
const parseUserAgent = (userAgent = '') => {
  if (!userAgent) {
    return { browser: 'Unknown', os: 'Unknown', device: 'Desktop' };
  }

  const ua = userAgent.toLowerCase();

  // Browser detection
  let browser = 'Other';
  if (ua.includes('edg/')) browser = 'Edge';
  else if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('opera') || ua.includes('opr/')) browser = 'Opera';
  else if (ua.includes('msie') || ua.includes('trident/')) browser = 'Internet Explorer';

  // OS detection
  let os = 'Other';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac os') || ua.includes('macintosh')) os = 'MacOS';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) os = 'iOS';
  else if (ua.includes('linux')) os = 'Linux';

  // Device detection
  let device = 'Desktop';
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) device = 'Mobile';
  else if (ua.includes('ipad') || ua.includes('tablet')) device = 'Tablet';
  else if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) device = 'Bot';

  return { browser, os, device };
};

module.exports = { parseUserAgent };
