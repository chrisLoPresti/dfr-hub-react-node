const User = require("../../../models/User");
const saltRounds = 10;

exports.register = async (req, res, next) => {
  console.log(req.body);
  const { first_name, last_name, email, phone, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  try {
    await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      phone,
      password,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch ({ errorResponse }) {
    let error = "";
    if (errorResponse.code === 11000) {
      error = "An account with this email already exists!";
    }
    res.status(401).json({
      message: "User not successful created",
      error,
    });
  }
};
