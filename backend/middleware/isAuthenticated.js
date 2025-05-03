import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

const isAuthenticated = async (req, res, next) => {
    try {
        let token;

        // Check token in cookies or Authorization header
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user (make sure your token includes userId when signing)
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
};

export default isAuthenticated;
