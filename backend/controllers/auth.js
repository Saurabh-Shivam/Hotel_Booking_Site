import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// REGISTER USER
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // getting the data entered by the user
    const newUser = new User({
      // this will take all the values entered in the register page field
      ...req.body,
      password: hash,
    });

    // saving into collection/database
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// LOGIN USER
export const login = async (req, res, next) => {
  try {
    // to check whther the username entered is present in the database or not
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    // Check whether the password entered cooresponding to the username is same as in the database's hash password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    //  JSON Web Token, is an open standard used to share information between two parties securely — a client and a server.
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // destructuring user
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        // this does not allow any client secreat to reach this cookie and its's much more secure this way
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
