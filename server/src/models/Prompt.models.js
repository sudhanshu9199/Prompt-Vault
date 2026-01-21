const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    isPublic: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { timestamps: true });

const PromptModel = mongoose.model('prompt', promptSchema);

module.exports = PromptModel;