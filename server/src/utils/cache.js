const NodeCache = require("node-cache");

// Initialize cache with default TTL of 300 seconds (5 minutes)
const appCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const getCache = (key) => appCache.get(key);

const setCache = (key, value, ttl = 300) => appCache.set(key, value, ttl);

const deleteCache = (key) => appCache.del(key);

const flushCache = () => appCache.flushAll();

module.exports = {
  getCache,
  setCache,
  deleteCache,
  flushCache,
  appCache
};
