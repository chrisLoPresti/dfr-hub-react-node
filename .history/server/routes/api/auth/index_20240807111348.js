const User = require("../../../models/User");
const saltRounds = 10;

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    // Find the user by ID in the database
    const user = await User.findById(userId);

    // Generate an access token and a refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token to the user in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Return the generated tokens
    return { accessToken, refreshToken };
  } catch (error) {
    // Handle any errors that occur during the process
    throw new Error(error.message);
  }
};

exports.register = async (req, res, next) => {
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
    }).then(({ _doc: { password, refreshToken, ...user } }) =>
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found matching these credentials" });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid username and password combination" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    };

    delete user._doc.password;
    delete user._doc.refreshToken;
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(user);
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
};
