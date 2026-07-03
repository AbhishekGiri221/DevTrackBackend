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
        console.log(`the userId that i got is ${userId}`);
        console.log(`came here in taskServices`);
        const data = await fs.readFile("database/task.json", "utf-8");
        console.log(`data in taskServices is : ${typeof(data)}`);
        // const taskList = JSON.parse(data).filter((data) => data.userId === userId);

        const taskList = JSON.parse(data);

        const filteredData = taskList.filter((d)=> d.userId == userId);

        console.log(`data type of filtered data ${JSON.stringify(filteredData)}`);

        return filteredData;
}