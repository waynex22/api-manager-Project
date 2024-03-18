const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTI1NjM3MSwiaWF0IjoxNzAxMjU2MzcxfQ.TrBKsx9Dhwy-dcaji2iBPjBhFusq1LvZp8hjfYSs0vQ'
const authenticateToken = (req, res, next) => {
  const testToken = req.header('Authorization');
  const token = testToken.split('Bearer ')[1]
    // console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET , (err, user) => {
    if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
    req.user = user;
    next();
  });
};

const checkRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: 'Do you Not have Permission to perform this action'});
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  checkRole,
};
