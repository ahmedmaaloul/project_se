const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token is not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'onepiece'); 

    req.userId = decoded.userId;

    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
