const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getRecommendations = async (req, res) => {
    try {
        const { answer } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(`
            You are a habit coach.
            User Answers:
            - Goal: ${answer.goal}
            - Most productive time: ${answer.productiveTime}
            - Habits they struggle with: ${answer.struggledHabits}
            
            Based on this information:
            
            I want the list of 3 habits in a form of object each should have :-
            1.title(2 words)
            2.about (25-35 words)
            3.category of that habit (Fitness,Health,Learning,Mindfullness,Social,Productivity,Finance,Creativity,Other,)
            4.importantan(30-40 words)
            
            Return ONLY a valid JSON array.
            
            Do NOT use markdown.
            Do NOT use \`\`\`json.
            Do NOT add explanations.
            
            Format:
            [{
                "title": "",
                "about": "",
                "category": "",
                "importance": ""
                }]
                `);

        const recommendation = result.response.text();

        res.status(200).json({
            recommendation,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const motivationQuote = async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(`
        You are an inspiring motivational coach.

        Give exactly ONE powerful motivational quote from a well-known person such as an athlete, 
        entrepreneur, leader, author, or speaker.

    Requirements:
        - Start with the person's name once said.
        - Include the quote in quotation marks.
        - After the quote, provide a 1-2 sentence explanation of how it helps with self-improvement, discipline, focus, or achieving goals.
        - Keep the total response under 50 words.
        - Do not use markdown.
        `);

        const quote = result.response.text();

        res.status(200).json({
            quote,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const threeDayPlan = async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(
            "Generate me a 3 plan for recovery as i have been insisistent for past 3 days ",
        );

        const plan = result.response.text();

        res.status(200).json({
            plan,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getRecommendations, motivationQuote,threeDayPlan };
