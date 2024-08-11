const MapMarker = require("../../../models/MapMarker");

const io = req.app.get("socketio");

exports.getmarkers = async (req, res, next) => {
  try {
    const markers = await MapMarker.find().populate({
      path: "created_by",
      model: "users",
      select: { first_name: 1, last_name: 1, email: 1 },
    });

    return res.status(200).json(markers);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unable to load map markers!",
    });
  }
};

exports.createmarker = async (req, res, next) => {
  try {
    const marker = req.body;
    const user = req.user;

    const newMarker = new MapMarker({ ...marker, created_by: user._id });
    const savedMarker = await newMarker.save();
    io.emit("markers-updated", { message: "Markers data updated" });
    return res.status(200).json({
      ...savedMarker._doc,
      created_by: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to create map marker!",
    });
  }
};

exports.updatemarker = async (req, res, next) => {
  try {
    const { created_by, _id, ...marker } = req.body;

    const updatedMarker = await MapMarker.findOneAndUpdate(
      { _id },
      { ...marker, updated_at: new Date() },
      { returnDocument: "after" }
    );
    io.emit("markers-updated", { message: "Markers data updated" });
    res.status(200).json({ ...updatedMarker._doc, created_by });
  } catch (e) {
    res.status(400).json({
      message: "Unable to update map marker!",
    });
  }
};

exports.deletemarker = async (req, res, next) => {
  try {
    const { marker } = req.body;
    const deletedMarker = await MapMarker.findByIdAndDelete(marker._id);
    io.emit("markers-updated", { message: "Markers data updated" });
    res.status(200).json(deletedMarker);
  } catch (e) {
    res.status(400).json({
      message: "Unable to delete map marker!",
    });
  }
};
