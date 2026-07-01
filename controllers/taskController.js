const taskServices = require("../services/taskServices");

exports.createTask = async(req,res)=>{

    try {
        const newTask = {
            id : Date.now(),
            userId : req.user.id,
            title : req.body.title,
            description : req.body.description,
            priority : req.body.priority,
            duedate : req.body.dueDate,
        }

        const task = await taskServices.createTask(newTask);
        console.log(task);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}