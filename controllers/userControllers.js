const mongoose = require("mongoose");
const User = require("../models/userModel");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = (await User.find()).toSorted({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const {
  name, email, password, phone_number, gender, date_of_birth, membership_status, account_verified, company } = req.body;
    }
};

const newUser = await User.create({
  name,
  email,
  password,
  phone_number,
  gender,
  date_of_birth,
  membership_status,
  account_verified,
  company
});

res.status(201).json(newUser);
} catch (error) {
  res.status(500).json({ message: "Error creating user" });
};

// GET /users/:userId
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } 
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  try {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true }); // Spread the req.body object

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  } 
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  try {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  const isDeleted = await User.findByIdAndDelete(userId);

  if (!isDeleted) {
    res.status(404).json({ message: "User not found" });
  } 

  res.status(204).send();
} catch (error) {
  res.status(500).json({ message: "Error deleting user" });
}
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
