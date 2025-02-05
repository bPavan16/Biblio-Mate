import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 88192,
  responseMimeType: "text/plain",
};

export async function analyzeBook(bookName: string) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Analyze the following book  The power of your subconscious mind  and provide detailed information:\\nTitle:\\nAuthor:\\nPublisher:\\nPublication Year:\\nDetails: (format, ISBN, pages, language)\\nGenre:\\nSummary:\\nReviews:\\nRating:\\nTarget Audience:\\nSimilar Books: (provide 3 similar books with titles, authors, and reasons for similarity)\\nin JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"Title\": \"The Power of Your Subconscious Mind\",\n    \"Author\": \"Joseph Murphy\",\n    \"Publisher\": \"Hallmark Library\",\n    \"Publication Year\": \"1963\",\n    \"Details\": {\n      \"format\": \"Paperback, Hardcover, Audiobook, Kindle\",\n      \"ISBN\": \"978-0440500349 (Paperback)\",\n      \"pages\": \"312\",\n      \"language\": \"English\"\n    },\n    \"Genre\": \"Self-Help, Spirituality, Personal Development\",\n    \"Summary\": \"The Power of Your Subconscious Mind explores the potential of the subconscious mind to positively influence a person's life. Joseph Murphy provides practical techniques and principles for harnessing the power of the subconscious to achieve goals, improve health, enhance relationships, and overcome fears. The book emphasizes the importance of positive thinking, visualization, and affirmations in reprogramming the subconscious mind to create a more fulfilling and successful life.\",\n    \"Reviews\": \"Reviews of the book are generally positive, highlighting its accessibility and practical advice. Many readers find the techniques presented to be helpful in improving their mental and emotional well-being. Some common criticisms include the book's repetitive nature and the lack of scientific evidence to support some of its claims. However, its enduring popularity suggests that many people find value in its message.\",\n    \"Rating\": \"4.5/5 (Average rating based on various online platforms)\",\n    \"Target Audience\": \"Individuals interested in self-improvement, personal development, spirituality, and those seeking to improve their mental and emotional well-being. It appeals to those open to exploring the power of positive thinking and the subconscious mind.\",\n    \"Similar Books\": [\n      {\n        \"Title\": \"Think and Grow Rich\",\n        \"Author\": \"Napoleon Hill\",\n        \"Reason for Similarity\": \"Both books focus on the power of the mind, positive thinking, and visualization to achieve success and personal fulfillment.\"\n      },\n      {\n        \"Title\": \"As a Man Thinketh\",\n        \"Author\": \"James Allen\",\n        \"Reason for Similarity\": \"Emphasizes the connection between thoughts and life circumstances, advocating for the power of positive thinking and self-mastery.\"\n      },\n      {\n        \"Title\": \"You Can Heal Your Life\",\n        \"Author\": \"Louise Hay\",\n        \"Reason for Similarity\": \"Explores the connection between thoughts, emotions, and physical health, offering affirmations and techniques for healing and self-improvement.\"\n      }\n    ]\n  }\n]\n```"},
          ],
        },
      ],
    });

    const prompt = `Analyze the book "${bookName}" and provide detailed information:
    Title:
    Author:
    Publisher:
    Publication Year:
    Details: (format, ISBN, pages, language)
    Genre:
    Summary:
    Reviews:
    Rating:
    Target Audience:
    Similar Books: (provide 3 similar books)
    Return the response in JSON format.`;

    const result = await chatSession.sendMessage(prompt);
    const response = await result.response.text();
    const cleanedString = response.replace(/```json|```/g, "").trim();


    if (!response) {
      throw new Error("No response received from API");
    }


    try {
      const jsonResponse = JSON.parse(cleanedString)
      return (jsonResponse);
    } catch (error) {
      console.error("Error parsing API response:", error);
      throw new Error("Failed to parse API response");
    }



  } catch (error) {
    console.error("Error in book analysis:", error);
    throw new Error("Failed to analyze book. Please try again.");
  }
}
