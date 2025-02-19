// models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
