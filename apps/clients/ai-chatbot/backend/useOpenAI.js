// Backend function for OpenAI API interactions
import express from 'express'
import OpenAI from 'openai'

import 'dotenv/config'

const router = express.Router();

// console.log("OpenAI key: " + process.env.VITE_OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

// List available models
router.get('/listModels', async (req, res) => {
  try {
    const models = [
      'gpt-4-turbo-preview',
      'gpt-4o',
      'gpt-4',
      'gpt-3.5-turbo'
    ];
    res.status(200).json(models);
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ error: 'Failed to list models' });
  }
});

// Initialize or retrieve an assistant
router.post('/initializeAssistant', async (req, res) => {
  try {
    const { existingAssistantId } = req.body;

    let assistant;
    if (existingAssistantId) {
      assistant = await openai.beta.assistants.retrieve(existingAssistantId);
      console.log("Assistant initialized with id:", assistant.id);
    } else {
      assistant = await openai.beta.assistants.create({
        name: 'RAG Context Assistant',
        instructions: 'You are a helpful AI assistant that can process and respond to queries using uploaded context.',
        model: 'gpt-4-turbo-preview'
      });
      // Optionally store the assistant ID in your database
    }

    res.status(200).json(assistant);
  } catch (error) {
    console.error('Failed to initialize assistant:', error);
    res.status(500).json({ error: 'Failed to initialize assistant' });
  }
});

// Create a new vector store
router.post('/createVectorStore', async (req, res) => {
  try {
    const { name } = req.body;
    const vectorStore = await openai.beta.vectorStores.create({
      name: name || 'RAG Context Store'
    });
    res.status(200).json(vectorStore);
  } catch (error) {
    console.error('Vector store creation failed:', error);
    res.status(500).json({ error: 'Failed to create vector store' });
  }
});

// Upload a file to OpenAI
router.post('/uploadFile', async (req, res) => {
  try {
    const { file, purpose } = req.body;
    const uploadedFile = await openai.files.create({
      file: file,
      purpose: purpose || 'assistants'
    });
    res.status(200).json(uploadedFile);
  } catch (error) {
    console.error('File upload failed:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Add files to vector store
router.post('/addFilesToVectorStore', async (req, res) => {
  try {
    const { vectorStoreId, files } = req.body;
    const batch = await openai.beta.vectorStores.fileBatches.create(vectorStoreId, { files });
    res.status(200).json(batch);
  } catch (error) {
    console.error('Adding files to vector store failed:', error);
    res.status(500).json({ error: 'Failed to add files to vector store' });
  }
});

// Combine contexts into a single file with metadata
router.post('/combineContextsToFile', (req, res) => {
  try {
    const { contexts, maxSizeBytes } = req.body;
    const maxBytes = maxSizeBytes || 1024 * 1024;

    const metadataHeader = contexts.map(context => 
      `Context ID: ${context.id}\nURL: ${context.original_url}\nCategory: ${context.category_name || 'Uncategorized'}\nSub-Category: ${context.sub_category_name || 'N/A'}\n---\n`
    ).join('\n');

    const combinedText = contexts.map(context => context.extracted_text).join('\n\n');
    const fullContent = `${metadataHeader}\n${combinedText}`;

    const byteLength = Buffer.byteLength(fullContent, 'utf8');
    if (byteLength > maxBytes) {
      const truncatedText = fullContent.substring(0, maxBytes);
      res.status(200).json({ file: truncatedText });
    } else {
      res.status(200).json({ file: fullContent });
    }
  } catch (error) {
    console.error('Combining contexts failed:', error);
    res.status(500).json({ error: 'Failed to combine contexts' });
  }
});

// Create a new thread
router.post('/createThread', async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    res.status(200).json(thread);
  } catch (error) {
    console.error('Thread creation failed:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

// Add a message to the thread
router.post('/addMessageToThread', async (req, res) => {
  try {
    const { threadId, content, fileId, vectorStoreId } = req.body;
    const messageParams = { role: 'user', content };

    if (fileId) messageParams.file_id = fileId;
    if (vectorStoreId) messageParams.metadata = { vector_store_id: vectorStoreId };

    const message = await openai.beta.threads.messages.create(threadId, messageParams);
    res.status(200).json(message);
  } catch (error) {
    console.error('Adding message to thread failed:', error);
    res.status(500).json({ error: 'Failed to add message to thread' });
  }
});

// Run the thread with the assistant
router.post('/runThread', async (req, res) => {
  try {
    const { threadId, assistantId } = req.body;
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId
    });
    res.status(200).json(run);
  } catch (error) {
    console.error('Thread run failed:', error);
    res.status(500).json({ error: 'Failed to run thread' });
  }
});

// Retrieve thread messages
router.get('/retrieveThreadMessages/:threadId', async (req, res) => {
  try {
    const { threadId } = req.params;
    const messages = await openai.beta.threads.messages.list(threadId);
    res.status(200).json(messages.data);
  } catch (error) {
    console.error('Retrieving thread messages failed:', error);
    res.status(500).json({ error: 'Failed to retrieve thread messages' });
  }
});

// Check run status
router.get('/checkRunStatus', async (req, res) => {
  try {
    const { threadId, runId } = req.query;
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    res.status(200).json({ status: run.status });
  } catch (error) {
    console.error('Checking run status failed:', error);
    res.status(500).json({ error: 'Failed to check run status' });
  }
});
export default router
// module.exports = router;
