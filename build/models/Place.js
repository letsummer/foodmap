import mongoose from "mongoose";
const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: String,
  address: String,
  phone: String,
  coord: [String],
  info: String,
  hashtag: [String],
  twit: [String],
  createdTime: Date
});
const PlaceModel = mongoose.model("places", placeSchema);
export default PlaceModel;