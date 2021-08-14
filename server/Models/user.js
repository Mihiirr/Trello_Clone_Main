const mongoose = require("mongoose");
const Board = require("./board").schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  board: [Board],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
