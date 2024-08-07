const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    first_name: {
      type: String,
      required: [true, "Firstname is required"],
      minLength: [3, "firstname must be at least 3 characters"],
      maxLength: [25, "firstname must be at most 25 characters"],
    },
    last_name: {
      type: String,
      required: [true, "Lastname is required"],
      minLength: [3, "lastname must be at least 3 characters"],
      maxLength: [25, "lastname must be at most 25 characters"],
    },
    phone: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
    { timestamps: true }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("users", UserSchema);
