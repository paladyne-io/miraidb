// Backend function for Anthropic API interactions
import express from 'express'
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk';

// const Anthropic = import('@anthropic-ai/sdk');

const router = express.Router();
// console.log("Anthropic key: " + process.env.VITE_ANTHROPIC_API_KEY)

const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY
});

// Create a conversation with context
router.post('/createConversation', async (req, res) => {
  try {
    const { contexts, userQuery, model } = req.body;
    const selectedModel = model || 'claude-3-5-haiku-20241022';

    // Combine context texts
    const contextTexts = contexts.map(ctx => ctx.extracted_text).join('\n\n');
    
    // Construct full prompt
    const fullPrompt = `Context:\n${contextTexts}\n\nQuery: ${userQuery}`;

    // Send message to Anthropic
    const response = await anthropic.messages.create({
      model: selectedModel,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ]
    });

    res.status(200).json({ response: response.content[0].text });
  } catch (error) {
    console.error('Anthropic conversation failed:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// List available models
router.get('/listModels', (req, res) => {
  try {
    const models = [
      'claude-3-5-haiku-20241022',
      'claude-3-5-sonnet-20241022',
      'claude-3-opus-20240229'
    ];
    res.status(200).json(models);
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ error: 'Failed to list models' });
  }
});

// Check if file upload is supported
router.get('/supportsFileUpload', (req, res) => {
  try {
    res.status(200).json({ supportsFileUpload: false });
  } catch (error) {
    console.error('Error checking file upload support:', error);
    res.status(500).json({ error: 'Failed to check file upload support' });
  }
});
export default router
// module.exports = router;
