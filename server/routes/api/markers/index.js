const MapMarker = require("../../../models/MapMarker");

exports.getmarkers = async (req, res, next) => {
  try {
    const markers = await MapMarker.find().populate({
      path: "created_by",
      model: "users",
      select: { name: 1, email: 1 },
    });

    return res.status(200).json(markers);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unable to load map markers!",
    });
  }
};
