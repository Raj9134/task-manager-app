const Project = require("../models/Project");

// CREATE PROJECT (admin only)
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.userId // from authMiddleware
    });

    res.status(201).json({
      message: "Project created",
      project
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};