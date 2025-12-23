const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            trim: true,
        },
        shortCode: {
            type: String,
            required: true,
            unique: true,
        },
        clickCount: {
            type: Number,
            default: 0,
        },
        lastAccessedAt: {
            type: Date,
            default: null,
        },
    },


    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
