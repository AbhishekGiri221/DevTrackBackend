const fs = require("fs/promises");

exports.addGoals = async(goalData)=>{
    const data = await fs.readFile("database/goals.json","utf-8");

    const goalList = JSON.parse(data);

    goalList.push(goalData);

    console.log(`the goalList is :  ${JSON.stringify(goalList)}`);

    await fs.writeFile("database/goals.json",JSON.stringify(goalList,null,2));

    return goalList;
}

exports.getGoal = async()=>{
    const data = await fs.readFile("database/goals.json");
    console.log(`the data is ${data}`);
    const goalList = JSON.parse(data);

    return goalList;
}