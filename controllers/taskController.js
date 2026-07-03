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

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.getTask = async(req,res)=>{
    try {

        console.log(`came here in taskcontorller.getTask and the req is ${JSON.stringify(req.user)}`)
        console.log(`the req.user.id in contorller is ${req.user.id}`);
        const taskList = await taskServices.getTask(req.user.id);
        
        // return taskList; ---> send in json format 
        res.status(200).json(taskList);
    } catch (error) {
        res.status(404).json(error.message);
    }

}