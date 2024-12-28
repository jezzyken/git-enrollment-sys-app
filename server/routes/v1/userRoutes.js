const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const populateUserFields = async (query) => {
  try {
    const result = await query.populate({
      path: "role",
      select: "name _id"
    });

    if (!Array.isArray(result)) {
      if (result && !result.role.some(role => role.name === "admin")) {
        await result.populate("academicInfo.department");
      }
      return result;
    }

    const populatedUsers = await Promise.all(
      result.map(async (user) => {
        if (!user.role.some(role => role.name === "admin")) {
          await user.populate("academicInfo.department");
        }
        return user;
      })
    );

    return populatedUsers;
  } catch (error) {
    console.error("Error in populateUserFields:", error);
    throw error;
  }
};

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const populatedUser = await populateUserFields(User.findById(user._id));
    if (!populatedUser) {
      return res.status(404).json({ message: "User not found after creation" });
    }
    
    res.status(201).json(populatedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message || "Error creating user" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await populateUserFields(User.find());
    res.json(users || []);
    console.log(users)
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message || "Error fetching users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await populateUserFields(User.findById(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: error.message || "Error fetching user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.password) {
      delete req.body.password;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const populatedUser = await populateUserFields(User.findById(updatedUser._id));
    res.json(populatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: error.message || "Error updating user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message || "Error deleting user" });
  }
});

module.exports = router;