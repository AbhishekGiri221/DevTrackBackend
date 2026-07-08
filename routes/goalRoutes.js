const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const goalController = require("../controllers/goalController");

router.post("/app/goals", authenticationMiddleware,goalController.addGoal);
router.get("/app/goals", authenticationMiddleware,goalController.getGoal);

module.exports = router;