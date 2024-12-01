// controllers/aiController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.google_api); // Use API key from .env
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.AIchat = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).send("Please provide a prompt.");
    }

    // Modify the prompt to make the AI respond as a teacher
    const teacherPrompt = `You are a teacher. Your goal is to help students by providing clear and detailed explanations. Answer the following question as if you are explaining it to a student: ${prompt}`;

    // Generate response from the AI with the modified prompt
    const result = await model.generateContent([teacherPrompt]);

    const text = result.response.candidates[0].content.parts[0].text;

    // Return the generated response as the AI's teaching response
    res.json({ response: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Internal Server Error");
  }
};
