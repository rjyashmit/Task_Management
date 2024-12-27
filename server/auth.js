// auth.js
import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    console.log("token", token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        console.log("decoded", decoded)
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log("token invalid")
        res.status(401).json({ message: 'Token is not valid' });
    }
};
