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
            2.about (5-7 words)
            3.category of that habit (Fitness,Health,Learning,Mindfullness,Social,Productivity,Finance,Creativity,Other,)
            4.importantan(20-30 words)
            5.Select any one of the emoji: "💪","❤️","📚","🧘","🫂","⚡","💰","🎨","✈️","🍎","🎵","🌟",
            6.Any one of the color:#f59e0b","#ef4444","#3b82f6","#22c55e","#a855f7","#ec4899",
            
            Return ONLY a valid JSON array.
            
            Do NOT use markdown.
            Do NOT use \`\`\`json.
            Do NOT add explanations.
            
            Format:
            [{
                "title": "",
                "about": "",
                "category": "",
                "importance": "",
                "icon":'',
                "color":''
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
            model: "gemini-2.5-flash-lite",
        });

        const result = await model.generateContent(`
        You are an inspiring motivational coach.

        Give exactly ONE powerful RANDOM motivational quote every time different from a well-known person of India such as an athlete, 
        entrepreneur, author, or speaker.

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
            model: "gemini-2.5-flash-lite",
        });

        const result = await model.generateContent(`
                You are a productivity coach.

                Generate a simple 3-day recovery plan for someone who has been inconsistent with their habits for the past 3 days.

                Output format must be EXACTLY:

                Intoduction Message to feel better (Only fullstops at the end)

                Day 1 : Title - Content
                Day 2 : Title - Content
                Day 3 : Title - Content

                Rules:
                    - Give exactly 3 days.
                    - Each day should have a short title.
                    - Each day should have 1-2 sentences of actionable advice.
                    - Do not use markdown.
                    - Do not use bullet points.
                    - Do not add any introduction or conclusion.
                `);

        const plan = result.response.text();

        res.status(200).json({
            plan,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const weeklyReport = async (req, res) => {
    try {
        const {habitdata} = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
        });

        const result = await model.generateContent(`
            You are an expert productivity and habit coach.

            Analyze the following weekly habit report:

            ${JSON.stringify(habitdata, null, 2)}   

            Provide:
                1. What I did well.
                2. What is going wrong.
                3. 3 actionable suggestions for improvement.
                4. One motivational conclusion.
                5. Do not use markdown.
                6. Do not use bullet points.
                7. Do not add any introduction or conclusion.
                8. Keep the response under 00 words.
            `);
        
        const report = result.response.text();

        res.status(200).json({
            report,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRecommendations,
    motivationQuote,
    threeDayPlan,
    weeklyReport,
};
