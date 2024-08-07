const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapMarkerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  position: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    elevation: {
      type: Number,
    },
  },
  color: {
    type: String,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = MapMarker = mongoose.model("mapmarkers", MapMarkerSchema);
