const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};

module.exports = authMiddleware;
