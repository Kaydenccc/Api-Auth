const express = require('express');
const registerConroller = require('../Controller/registerController');
const loginConroller = require('../Controller/loginController');
const verify = require('./verifyaccess');
const router = express.Router();

// ROUTES
router.post('/register', registerConroller);
router.post('/login', loginConroller);
router.get('/home', verify, (req, res) => {
  res.status(200).json({ access: true, message: 'Access Accepted', data: req.user });
});

module.exports = router;
