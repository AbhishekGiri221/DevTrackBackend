const { json } = require("body-parser");
const fs = require("fs/promises");

exports.createTask = async (taskData) => {
    const file = await fs.readFile("database/task.json", "utf-8");

    const task = JSON.parse(file);

    task.push(taskData);

    await fs.writeFile("database/task.json", JSON.stringify(task, null, 2));

    return taskData;
}

exports.getTask = async (userId) => {

        const data = await fs.readFile("database/task.json", "utf-8");

        // const taskList = JSON.parse(data).filter((data) => data.userId === userId);

        const taskList = JSON.parse(data);

        const filteredData = taskList.filter((d)=> d.userId == userId);

        return filteredData;
}

exports.deleteTask = async(taskId) =>{

    const data = await fs.readFile("database/task.json",'utf-8');

    const task = JSON.parse(data);

    const filteredData = task.filter((d) => d.id !== taskId);

    await fs.writeFile("database/task.json",JSON.stringify(filteredData,null,2));

    return {
        message : "task deleted successfully"
    };
}

exports.updateTask = async (taskId, taskToUpdate) =>{
    const data = await fs.readFile("database/task.json", "utf-8");

    const taskList = JSON.parse(data);

    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    console.log("the task Index is ", taskIndex);
    if(taskIndex === -1){
        throw new Error("Task Not found");
    }

    console.log(`the task to update is ${JSON.stringify(taskToUpdate)}`);

    taskList[taskIndex].id = taskId;
    taskList[taskIndex].title = taskToUpdate.title;
    taskList[taskIndex].description = taskToUpdate.description;
    taskList[taskIndex].status = taskToUpdate.status;
    taskList[taskIndex].priority = taskToUpdate.priority;
    taskList[taskIndex].duedate = taskToUpdate.duedate;

    await fs.writeFile("database/task.json",JSON.stringify(taskList,null,2));

    return taskList
}

exports.completeTask = async(taskId, taskStatus) =>{
    const data = await fs.readFile("database/task.json", "utf-8");

    const taskList = JSON.parse(data);

    const taskIndex = taskList.findIndex((task) => task.id === taskId);

    taskList[taskIndex].status = taskStatus.status;

    await fs.writeFile("database/task.json",JSON.stringify(taskList,null,2));

    return{
        message : "task completed"
    }
}