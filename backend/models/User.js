const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  googleId: { type: String, unique: true }
});



module.exports = mongoose.model('User', UserSchema);
