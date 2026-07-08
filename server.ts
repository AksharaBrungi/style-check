import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase limit to support base64 images
app.use(express.json({ limit: '15mb' }));

// Initialize Google Gen AI safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
  console.log("Google Gen AI SDK successfully initialized with Telemetry User-Agent.");
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. Please configure it in your Settings > Secrets panel.");
}

// 1. POST /api/analyze-outfit
app.post('/api/analyze-outfit', async (req, res) => {
  try {
    const { imageBase64, mimeType, userSelectedOccasion } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 data in request." });
    }

    if (!ai) {
      return res.status(500).json({ 
        error: "Unable to analyze this image. Please try again.", 
        message: "GEMINI_API_KEY environment variable is required but was not found. Please set it in Settings > Secrets." 
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `
      You are StyleCheck, a world-class AI Fashion Stylist and Computer Vision Outfit Analyzer.
      Analyze ONLY the outfit in the provided image.
      
      ${userSelectedOccasion ? `The user is specifically styling this outfit for the occasion: "${userSelectedOccasion}". Assess how well it fits this occasion, grade the styling choices, and provide tips to perfect this specific look.` : `Analyze the outfit and predict the most appropriate occasion.`}
      
      Perform the following tasks:
      1. Detect clothing items: categorise each item (e.g., blazer, t-shirt, trousers, denim, sneakers, watch, etc.), identify its primary color, style vibe, and your confidence score (0.0 to 1.0).
      2. Identify 3 to 5 dominant color hex codes (e.g. "#1A202C").
      3. Determine the primary fashion style category (e.g., Streetwear, Minimalist, Classic Menswear, Y2K, Bohemian, Business Casual, Gothic, Athleisure, Quiet Luxury).
      4. Predict the best suited occasion (Interview, Office, Casual, Wedding, Party, Festival, College, Business Meeting, Date Night, Gym/Sports).
      5. Provide an occasion confidence rating from 0 to 100.
      6. Calculate an overall Style Score (0 to 100) based on fit, color harmony, coordination, and styling level.
      7. List 2 to 3 key Strengths of the look (e.g., balanced proportions, complimentary tones).
      8. List 2 to 3 key Weaknesses or areas of improvement (e.g., sleeve length, high contrast clashing).
      9. List 2 to 3 accessory additions (belts, jewelry, glasses).
      10. List 2 to 3 footwear recommendations.
      11. List 2 to 3 specific layering, styling or pairing recommendations.
      12. Write an encouraging, helpful, professional styling explanation (3-4 sentences) summarizing the look, its aesthetic impact, and how to carry it with confidence.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType || 'image/jpeg'
          }
        },
        prompt
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleScore: { type: Type.INTEGER, description: "The overall style score of the outfit from 0 to 100." },
            confidence: { type: Type.INTEGER, description: "The confidence rating of the style analysis from 0 to 100." },
            occasion: { type: Type.STRING, description: "The predicted best-suited occasion." },
            styleCategory: { type: Type.STRING, description: "The primary style category classification (e.g. Streetwear, Quiet Luxury)." },
            clothingItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "e.g. Blazer, T-shirt, Pants, Sneakers." },
                  color: { type: Type.STRING, description: "Detected shade or color description." },
                  style: { type: Type.STRING, description: "Vibe or fit description of this item." },
                  confidence: { type: Type.NUMBER, description: "Confidence score from 0.0 to 1.0." }
                },
                required: ["category", "color", "style", "confidence"]
              }
            },
            dominantColors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 5 dominant color hex codes (e.g., #1A202C)."
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 2 to 3 visual strengths of the look."
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 2 to 3 areas of improvement."
            },
            accessories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended accessories."
            },
            footwear: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended footwear."
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 2 to 3 specific layering, styling or pairing recommendations."
            },
            summary: { type: Type.STRING, description: "An encouraging, professional styling explanation (3-4 sentences)." }
          },
          required: [
            "styleScore", "confidence", "occasion", "styleCategory",
            "clothingItems", "dominantColors", "strengths", "weaknesses",
            "accessories", "footwear", "recommendations", "summary"
          ]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini API.");
    }

    const report = JSON.parse(responseText.trim());
    return res.json(report);

  } catch (error: any) {
    console.error("Error analyzing outfit with Gemini:", error);
    return res.status(500).json({ 
      error: "Unable to analyze this image. Please try again.", 
      message: error.message || error 
    });
  }
});

// 2. POST /api/chatbot-message
app.post('/api/chatbot-message', async (req, res) => {
  try {
    const { messages, reportContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    if (!ai) {
      return res.json({
        text: "Please configure your GEMINI_API_KEY in the Settings > Secrets panel to enable the real-time AI stylist dialogue."
      });
    }

    const conversationHistory = messages.map(msg => {
      return `${msg.sender === 'user' ? 'User' : 'StyleCheck Assistant'}: ${msg.text}`;
    }).join('\n');

    const prompt = `
      You are StyleCheck's Premium Personal Fashion Stylist chatbot.
      You are talking to a user about their fashion choices and clothing styles.
      
      ${reportContext ? `
        For context, the user just ran an outfit analysis with StyleCheck and got this report:
        - Style Score: ${reportContext.styleScore}/100
        - Fashion Style: ${reportContext.styleCategory}
        - Predicted/Selected Occasion: ${reportContext.occasion}
        - Explanation: ${reportContext.summary}
        - Strengths: ${reportContext.strengths?.join(', ')}
        - Weaknesses: ${reportContext.weaknesses?.join(', ')}
      ` : ''}

      Here is the dialogue history:
      ${conversationHistory}

      Please respond as a friendly, expert, and premium stylist. Provide practical, creative styling ideas, keep it to 3-4 sentences max, and stay focused on fashion, color theories, fit, or wardrobe tips.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return res.json({ text: response.text });

  } catch (error: any) {
    console.error("Chatbot response error:", error);
    return res.status(500).json({ error: "Failed to process style chatbot message." });
  }
});

// Set up Vite / static file serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production static assets...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StyleCheck Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(err => {
  console.error("Vite/Express initialization failed:", err);
});
