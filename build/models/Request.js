import mongoose from "mongoose";
const prePlaceSchema = new mongoose.Schema({
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
const PrePlaceModel = mongoose.model("prePlace", prePlaceSchema);
export default PrePlaceModel;