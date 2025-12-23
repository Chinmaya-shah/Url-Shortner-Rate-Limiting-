
require('dotenv').config();
const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require('./config/db');
const { handleRedirect } = require('./controllers/urlController');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
// Middleware to parse JSON
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'URL Shortener service is running',
    });
});

// URL routes – all under /api/urls
app.use('/api/urls', urlRoutes);

// Redirect route – must come after /health and /api/urls
app.get('/:shortCode', handleRedirect);

const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`🌐 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
};

startServer();
