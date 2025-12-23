const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// Simple URL validation helper
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

// POST /api/urls
const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl || originalUrl.trim() === '') {
            return res.status(400).json({ error: 'originalUrl is required' });
        }

        if (!isValidUrl(originalUrl)) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        const existing = await Url.findOne({ originalUrl });
        if (existing) {
            const shortUrl = `${process.env.BASE_URL}/${existing.shortCode}`;
            return res.status(200).json({
                originalUrl: existing.originalUrl,
                shortCode: existing.shortCode,
                shortUrl,
                clickCount: existing.clickCount,
                createdAt: existing.createdAt,
                lastAccessedAt: existing.lastAccessedAt,
                message: 'Short URL already exists for this original URL',
            });
        }

        const shortCode = nanoid(7);

        const newUrl = await Url.create({
            originalUrl,
            shortCode,
        });

        const shortUrl = `${process.env.BASE_URL}/${newUrl.shortCode}`;

        return res.status(201).json({
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode,
            shortUrl,
            clickCount: newUrl.clickCount,
            createdAt: newUrl.createdAt,
            lastAccessedAt: newUrl.lastAccessedAt,
            message: 'Short URL created successfully',
        });
    } catch (error) {
        console.error('Error in createShortUrl:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /api/urls/:shortCode/stats
const getUrlStats = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const urlDoc = await Url.findOne({ shortCode });

        if (!urlDoc) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.status(200).json({
            originalUrl: urlDoc.originalUrl,
            shortCode: urlDoc.shortCode,
            clickCount: urlDoc.clickCount,
            createdAt: urlDoc.createdAt,
            lastAccessedAt: urlDoc.lastAccessedAt,
            message: 'URL stats fetched successfully',
        });
    } catch (error) {
        console.error('Error in getUrlStats:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /:shortCode – redirect handler
const handleRedirect = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // Find and update in one go: increment clickCount and set lastAccessedAt
        const urlDoc = await Url.findOneAndUpdate(
            { shortCode },
            {
                $inc: { clickCount: 1 },
                $set: { lastAccessedAt: new Date() },
            },
            { new: true }
        );

        if (!urlDoc) {
            // If not found, you can show a simple message
            return res.status(404).send('Short URL not found');
        }

        // Redirect to the original URL
        return res.redirect(302, urlDoc.originalUrl);
    } catch (error) {
        console.error('Error in handleRedirect:', error.message);
        return res.status(500).send('Internal server error');
    }
};

module.exports = {
    createShortUrl,
    getUrlStats,
    handleRedirect,
};
