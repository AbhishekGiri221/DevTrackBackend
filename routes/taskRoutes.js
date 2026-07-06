const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const taskController = require("../controllers/taskController");

router.post("/app/tasks",authenticationMiddleware, taskController.createTask);
router.get("/app/tasks",authenticationMiddleware, taskController.getTask);
router.delete("/app/tasks/:id",authenticationMiddleware, taskController.deleteTask);
router.patch("/app/tasks/:id",authenticationMiddleware,taskController.updateTask);
module.exports = router;