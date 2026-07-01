const router = require("express").Router();
const {signup, login} = require("../controllers/authControllers");
const taskController = require("../controllers/taskController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
// router.post("./login",login);

router.post("/signup",signup);
router.post("/login",login);
router.post("/app/tasks",authenticationMiddleware,taskController.createTask);

module.exports = router;