const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const projectController = require("../controllers/projectController");

// Create project (admin only)
router.post(
  "/create-project",
  authMiddleware,
  roleMiddleware("admin"),
  projectController.createProject
);

module.exports = router;