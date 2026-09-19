const QRCode = require('qrcode');

class QrService {
  /**
   * Generate Data URL (PNG base64 image)
   * @param {string} text 
   * @returns {Promise<string>}
   */
  async generateDataUrl(text) {
    return QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
      color: {
        dark: '#1e293b',
        light: '#ffffff'
      }
    });
  }

  /**
   * Generate SVG String
   * @param {string} text 
   * @returns {Promise<string>}
   */
  async generateSvgString(text) {
    return QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#1e293b',
        light: '#ffffff'
      }
    });
  }
}

module.exports = new QrService();
