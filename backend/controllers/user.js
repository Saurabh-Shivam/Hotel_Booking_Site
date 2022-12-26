import User from "../models/User.js";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  // finding the document(user) with the help of id and updating it
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      // bcz findByIdAndUpdate returns the previous document not the updated one so to prevent that we uhave writted this
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  // finding the document(user) with the help of id and deleting it
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET USER
export const getUser = async (req, res, next) => {
  // finding the document(user) with the help of id
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// GET ALL USERS
export const getUsers = async (req, res, next) => {
  // finding all the documents(users)
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
