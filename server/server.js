const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../'));

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Translation endpoint
app.post('/translate', async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;
    
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a clear instruction for the model
    const prompt = `Translate the following ${sourceLanguage || 'detected language'} text to ${targetLanguage}:\n\n"${text}"`;
    
    // Make request to OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Using GPT-3.5-turbo for better accessibility
      messages: [
        { role: "system", content: "You are a helpful translator. Provide only the translated text without explanations or additional commentary." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,  // Lower temperature for more consistent translations
    });

    // Extract translated text from response
    const translatedText = completion.choices[0].message.content.trim();
    
    return res.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ 
      error: 'Translation failed', 
      details: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});