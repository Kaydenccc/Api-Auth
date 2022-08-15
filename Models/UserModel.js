const mongoose = require('mongoose');
//SHCEMA
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 1024,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserAuth', UserSchema);
