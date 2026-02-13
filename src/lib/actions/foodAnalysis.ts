'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeFoodImage(base64Image: string) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Remove the data:image/jpeg;base64, prefix
        const imageData = base64Image.split(',')[1];

        const prompt = `
            Analyze this image of food and identify the primary item. 
            Provide the following information in a strict JSON format:
            {
                "name": "Common name of the food",
                "emoji": "A single relevant emoji",
                "sugar": "Estimated grams of sugar per typical serving (number only)",
                "reasoning": "A very brief explanation of why this is a sugar/glucose spike concern (1 sentence)"
            }
            Only return the JSON. No other text.
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageData,
                    mimeType: 'image/jpeg'
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Find the JSON part in case Gemini adds markdown noise
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Invalid AI response");

        const data = JSON.parse(jsonMatch[0]);

        return {
            success: true,
            data: {
                name: data.name,
                emoji: data.emoji,
                xp: 5, // Default base XP for identification
                sugarAmount: parseInt(data.sugar) || 15,
                reasoning: data.reasoning
            }
        };

    } catch (error) {
        console.error('AI Analysis Error:', error);
        return {
            success: false,
            error: 'Failed to analyze food. Maybe its not clear?'
        };
    }
}
