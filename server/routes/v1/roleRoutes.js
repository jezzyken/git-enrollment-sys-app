const express = require("express");
const router = express.Router();
const Role = require("../../models/Roles"); 

// GET all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find({
      $or: [{ active: true }, { active: { $exists: false } }],
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single role by ID
router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new role
router.post("/", async (req, res) => {
  const role = new Role({
    name: req.body.name,
  });

  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE role
router.put("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.name = req.body.name;
    const updatedRole = await role.save();
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE role
router.delete("/:id", async (req, res) => {
  try {
    const professor = await Role.softDelete(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
