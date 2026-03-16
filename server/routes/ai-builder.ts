import { RequestHandler } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface LayoutSection {
  id: string;
  type: "hero" | "features" | "testimonials" | "footer" | "cta" | "stats" | "team" | "pricing";
  title?: string;
  description?: string;
  content?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

interface GenerateLayoutResponse {
  title: string;
  subtitle: string;
  sections: LayoutSection[];
}

export const handleGenerateLayout: RequestHandler = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Prompt is required and must be a string" });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: "OpenAI API key is not configured" });
      return;
    }

    const systemPrompt = `You are an expert landing page designer. Your task is to create a detailed JSON structure for a landing page based on user requirements.

Return ONLY a valid JSON object (no markdown, no extra text) with the following structure:
{
  "title": "Page title",
  "subtitle": "Page subtitle/tagline",
  "sections": [
    {
      "id": "section-1",
      "type": "hero|features|testimonials|footer|cta|stats|team|pricing",
      "title": "Section title",
      "description": "Section description",
      "content": "Main content text",
      "items": [
        {
          "title": "Item title",
          "description": "Item description",
          "icon": "optional icon name"
        }
      ]
    }
  ]
}

Generate 4-6 sections that best fit the user's requirements. Ensure the layout flows logically. Use appropriate section types to create a cohesive landing page.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create a landing page based on this prompt: "${prompt}". Return ONLY valid JSON, no other text or markdown.`,
        },
      ],
      temperature: 0.7,
    });

    // Extract text from the response
    const responseText = response.choices[0].message.content || "";

    // Remove markdown code blocks if present
    let jsonString = responseText.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.slice(7); // Remove ```json
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.slice(3); // Remove ```
    }
    if (jsonString.endsWith("```")) {
      jsonString = jsonString.slice(0, -3); // Remove closing ```
    }
    jsonString = jsonString.trim();

    // Parse the JSON response
    const layoutData: GenerateLayoutResponse = JSON.parse(jsonString);

    res.json({
      success: true,
      data: layoutData,
    });
  } catch (error) {
    console.error("Error generating layout:", error);

    if (error instanceof SyntaxError) {
      res.status(500).json({
        error: "Failed to parse AI response. Please try again with a different prompt.",
      });
    } else {
      res.status(500).json({
        error: "Failed to generate layout. Please try again.",
      });
    }
  }
};
