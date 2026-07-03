const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const taskController = require("../controllers/taskController");

router.post("/app/tasks",authenticationMiddleware, taskController.createTask);
router.get("/app/tasks",authenticationMiddleware, taskController.getTask);

module.exports = router;