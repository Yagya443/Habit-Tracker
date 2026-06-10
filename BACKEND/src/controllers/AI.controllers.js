const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getRecommendations = async (req, res) => {
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
            4.why is that habit important(30-40 words)


            Return ONLY a valid JSON array.
        `);

    const recommendation = result.response.text();

    res.status(200).json({
        recommendation,
    });
};

module.exports = getRecommendations;
