const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//crearea schemei

const UserSchema = new Schema({
  nume: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  parola: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("useri", UserSchema); //useri ii numele ce vrem sa il folosim
