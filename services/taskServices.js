const { json } = require("body-parser");
const fs = require("fs/promises");

exports.createTask = async(taskData)=>{
    const file = await fs.readFile("database/task.json","utf-8");

    const task = JSON.parse(file);

    task.push(taskData);

    await fs.writeFile("database/task.json",JSON.stringify(task,null,2));

    return taskData;
}