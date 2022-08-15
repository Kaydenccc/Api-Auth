const jwt = require('jsonwebtoken');
const verify = (req, res, next) => {
  // CHECK TOKEN
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access Denied', access: false });
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
module.exports = verify;
