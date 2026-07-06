const { param } = require("../routes/authRoutes");
const taskServices = require("../services/taskServices");

exports.createTask = async(req,res)=>{

    try {
        const newTask = {
            id : Date.now(),
            userId : req.user.id,
            title : req.body.title,
            description : req.body.description,
            status : req.body.taskStatus,
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

        const taskList = await taskServices.getTask(req.user.id);
        
        // return taskList; ---> send in json format 
        res.status(200).json(taskList);
    } catch (error) {
        res.status(404).json(error.message);
    }

}

exports.deleteTask = async (req,res) =>{
    try{
        const response = await taskServices.deleteTask(Number(req.params.id));

        res.status(200).json(response.message);

    } catch(error){
        res.status(404).json(error.message);
    }
}

exports.updateTask = async (req,res) =>{
    console.log(`the body is ${req.body}`);
    // console.log(req);
    try {
        const response = await taskServices.updateTask(Number(req.params.id), req.body);

        res.status(200).json(response);
    } catch (error) { 
        res.status(404).json(error.message);
    }
}