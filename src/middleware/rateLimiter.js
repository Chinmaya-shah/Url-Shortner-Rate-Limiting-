// Simple in-memory rate limiter per IP
const rateLimitStore = {};

// limit: max requests
// windowMs: time window in milliseconds
const createRateLimiter = (limit, windowMs) => {
    return (req, res, next) => {
        const clientIp = req.ip || req.connection.remoteAddress;

        const currentTime = Date.now();
        const record = rateLimitStore[clientIp];

        if (!record) {
            // First request from this IP
            rateLimitStore[clientIp] = {
                count: 1,
                windowStart: currentTime,
            };
            return next();
        }

        const elapsedTime = currentTime - record.windowStart;

        if (elapsedTime < windowMs) {
            // Still in the same time window
            if (record.count >= limit) {
                // Block the request
                return res.status(429).json({
                    error: 'Too many requests. Please try again later.',
                });
            }

            // Increment count and allow
            record.count += 1;
            return next();
        } else {
            // Time window has passed – reset for this IP
            rateLimitStore[clientIp] = {
                count: 1,
                windowStart: currentTime,
            };
            return next();
        }
    };
};

module.exports = createRateLimiter;
