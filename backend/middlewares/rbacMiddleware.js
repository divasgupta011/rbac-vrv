const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized!' });
    req.user = decoded;
    next();
  });
};

// Check Role Middleware
const checkRole = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: 'Access denied.' });
  }
  next();
};


module.exports = {verifyToken,checkRole};