const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const taskController = require("../controllers/taskController");
const auth = require("../middleware/authenticationMiddleware");

router.post("/app/tasks",authenticationMiddleware, taskController.createTask);
router.get("/app/tasks",authenticationMiddleware, taskController.getTask);
router.delete("/app/tasks/:id",authenticationMiddleware, taskController.deleteTask);
router.patch("/app/tasks/:id",authenticationMiddleware,taskController.updateTask);
router.put("/app/tasks/:id",authenticationMiddleware,taskController.completeTask);

module.exports = router;