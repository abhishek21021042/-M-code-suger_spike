'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function analyzeVoiceLog(audioBase64: string) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
            Analyze this voice log describing a meal. 
            Extract the food items and estimate the sugar content for each item in grams.
            Return ONLY a valid JSON object with this structure:
            {
                "items": [
                    { "name": "Food Name", "sugar": 10, "emoji": "🍎" }
                ],
                "totalSugar": 10,
                "insight": "Short nutritional insight about this meal (max 10 words)"
            }
            If no food is detected, return { "items": [], "totalSugar": 0, "insight": "No food detected" }.
        `;

        const result = await model.generateContent({
            contents: [{
                role: 'user',
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: 'audio/webm', data: audioBase64 } }
                ]
            }],
            generationConfig: {
                responseMimeType: 'application/json'
            }
        });

        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error('Error analyzing voice log:', error);
        throw new Error('Failed to analyze voice log');
    }
}
