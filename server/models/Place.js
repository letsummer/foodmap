import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    location: String,
    // views: { type: Number, default: 0 },
    hashtag: [String],
    twit: [String],
    createdTime: Date,
})

const PlaceModel = mongoose.model("places", placeSchema);

export default PlaceModel;