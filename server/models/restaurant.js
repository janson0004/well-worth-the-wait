const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  created_time: { type: Date, required: true },
  message: { type: String, required: true },
});
const restaurantSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rating: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  comment: [commentSchema],
});

module.exports = mongoose.model("User", restaurantSchema);
