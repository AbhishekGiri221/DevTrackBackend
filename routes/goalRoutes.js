const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const goalController = require("../controllers/goalController");

router.post("/app/goals", authenticationMiddleware,goalController.addGoal);
router.get("/app/goals", authenticationMiddleware,goalController.getGoal);
router.patch("/app/goals/:id",authenticationMiddleware,goalController.updateGoal);
router.post("/app/goals/:id",authenticationMiddleware,goalController.addMileStone);
router.get("/app/goals/:id",authenticationMiddleware,goalController.getMileStone);
module.exports = router;