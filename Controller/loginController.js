const ModelUser = require('../models/UserModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
// Config JOI Validation
const Schema = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});
// Controller
const loginController = async (req, res) => {
  console.log(req.body);
  //Validation data before login
  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // CHECK EMAIL ALREADY EXITS OR NOT
  const userdata = await ModelUser.findOne({ email: req.body.email });
  if (!userdata) return res.status(400).json({ message: 'Data is not found' });
  // VERIFAY password
  await bcrypt.compare(req.body.password, userdata.password, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });
    // IF PASSWORD OT NOT MACTH
    if (!result) return res.status(400).json({ access: false, message: 'Invalid password' });
    // IF VALID PASSWORD
    // GENERATE TOKEN
    const token = jwt.sign({ _id: userdata._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).status(200).json({ access: true, message: 'User login', token });
  });
};

module.exports = loginController;
