const express = require('express');
const router = express.Router();

const { createShortUrl, getUrlStats } = require('../controllers/urlController');
const createRateLimiter = require('../middleware/rateLimiter');

// Configure rate limiter: 10 requests per 1 minute per IP
const urlCreationRateLimiter = createRateLimiter(10, 60 * 1000);

// POST /api/urls – create a short URL (rate-limited)
router.post('/', urlCreationRateLimiter, createShortUrl);

// GET /api/urls/:shortCode/stats – get stats for a short URL
router.get('/:shortCode/stats', getUrlStats);

module.exports = router;
