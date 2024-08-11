const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./User");

const MapMarkerSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
module.exports = MapMarker = mongoose.model("mapmarkers", MapMarkerSchema);
