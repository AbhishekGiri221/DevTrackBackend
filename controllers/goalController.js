const goalServices = require("../services/goalServices");

exports.addGoal = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {

        const goal = {
            id: Date.now(),
            userid: req.user.id,
            icon: req.body.selectedIcon,
            title: req.body.goalTitle,
            description : req.body.goalDescription,
            duedate : req.body.targetDate,
            priority : req.body.goalPriority,
        }

        console.log(JSON.stringify(goal));
        const response = await goalServices.addGoals(goal);

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({
            message: "Failed to add"
        })
    }
}

exports.getGoal = async(req, res)=>{
    try {
        const response = await goalServices.getGoal();
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            message : "Failed to get the goals"
        })
    }

}