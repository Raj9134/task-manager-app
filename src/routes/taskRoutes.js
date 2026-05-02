const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Task (admin only)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  taskController.createTask
);
router.get(
    "/dashboard",
    authMiddleware,
    taskController.getDashboard
  );
  router.get("/", authMiddleware, taskController.getTasks);
  console.log("Task routes working");
module.exports = router;