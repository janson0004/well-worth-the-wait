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
  placeId: {type: String, requried: true},
  name: { type: String, required: true, unique: true },
  rating: { type: Number, required: true },
  address: {type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  comment: [commentSchema],
});

module.exports = {
  Restaurant: mongoose.model("Restaurant", restaurantSchema),
  Comment: mongoose.model("Comment", commentSchema)
};
