const goalServices = require("../services/goalServices");

exports.addGoal = async (req, res) => {

    try {

        const goal = {
            id: Date.now(),
            userid: req.user.id,
            icon: req.body.selectedIcon,
            title: req.body.goalTitle,
            description : req.body.goalDescription,
            duedate : req.body.targetDate,
            status : req.body.currentStatus,
            priority : req.body.goalPriority,
        }

        const response = await goalServices.addGoals(goal);

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({
            message: "Failed to add"
        })
    }
}

exports.updateGoal = async(req, res) =>{
    try {
        const response = await goalServices.updateGoal(Number(req.params.id) ,req.body);

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({
            message: "Failed to update"
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

exports.deleteGoal = async(req,res) =>{
    try{
        const response = await goalServices.deleteGoal(Number(req.params.id));

        res.status(200).json({
            message : "deleted successfully"
        })
    }catch(error){
        res.status(400).json({
            message : "failed to delete"
        })
    }
}



exports.addMileStone = async(req,res) =>{
    try {
        
        const createMileStone = {
            id: Date.now(),
            goalid : Number(req.params.id), // ---> it can be primary key if we are using database like in both goal and milstone this can be common thing
            title: req.body.title,
            description: req.body.description,
            duedate: req.body.duedate,
            priority: req.body.priority,
            status: req.body.status,
        }
    
        const response = await goalServices.addMilestone(createMileStone);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            message : "failed to add the milestone"
        })
    }

    
}

exports.getMileStone = async(req, res) => {
    try {

        const response = await goalServices.getMileStone(Number(req.params.id));
        
        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({
            message : "failed to get the milestone"
        })
    }

}