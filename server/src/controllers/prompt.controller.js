const promptModel = require('../models/Prompt.models');

const createPrompt = async (req, res) => {
    try {
        const { title, content, tags, isPublic } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required'
            })
        }

        // Assuming your authMiddleware
    } catch (err) {
        console.error('Create Prompt Error:', err);
        res.status(500).json({
            message: 'Server error'
        })
    }
};

const getMyPrompts = async (req, res) => {
    try {
        const userId = req.user._id || req.user.userId;

        const prompts = await promptModel.find({ user: })

    } catch (err) {
        
    }
}