const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  role: { type: String, enum: ["User", "Admin"] },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
