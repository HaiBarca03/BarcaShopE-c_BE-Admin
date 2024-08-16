const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Assuming your token contains the user ID as 'id'
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ success: false, message: 'Invalid Token' });
    }
}

module.exports = authMiddleware;
