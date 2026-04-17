import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in cookies (browser-based auth)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Fall back to Authorization header (Postman / API clients)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to the request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Not authorized, token invalid or expired' });
  }
};
