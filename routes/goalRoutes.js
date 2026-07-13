const router = require("express").Router();
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const goalController = require("../controllers/goalController");
const { getMileStone } = require("../services/goalServices");

router.post("/app/goals", authenticationMiddleware,goalController.addGoal);
router.get("/app/goals", authenticationMiddleware,goalController.getGoal);
router.patch("/app/goals/:id",authenticationMiddleware,goalController.updateGoal);
router.delete("/app/goals/:id", authenticationMiddleware,goalController.deleteGoal);


router.post("/app/goals/:id",authenticationMiddleware,goalController.addMileStone);
router.get("/app/goals/:id",authenticationMiddleware,goalController.getMileStone);

router.post("/app/goals/mileStone/:milestoneId", authenticationMiddleware,goalController.addMileStoneTask);
module.exports = router;