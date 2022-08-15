const ModelUser = require('../models/UserModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');
// Config JOI Validation
const Schema = Joi.object({
  username: Joi.string().alphanum().min(6).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});
//CONTROLLER
const registerController = async (req, res) => {
  //Validation data before become a user
  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // CHECK EMAIL ALREADY EXITS OR NOT
  const dataexist = await ModelUser.findOne({ email: req.body.email });
  if (dataexist) return res.status(400).json({ message: 'Email already exist!' });
  // HAS PASSWORD USING BCRYPT
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };
  //create data or save data to db
  ModelUser.create(data, (err, data) => {
    // IF ERROR
    if (err) return res.status(400).send(err);
    // SUCCESS
    res.status(201).json({ message: 'Success', data });
  });
};
// IMPORT CONTROLLER FUNCTION
module.exports = registerController;
