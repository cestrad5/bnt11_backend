const mongoose = require('mongoose');

/**
 * Represents the schema for a Token.
 */
const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

/**
 * Represents the Token model.
 */
const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;