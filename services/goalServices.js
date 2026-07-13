const fs = require("fs/promises");

exports.addGoals = async(goalData)=>{
    const data = await fs.readFile("database/goals.json","utf-8");

    const goalList = JSON.parse(data);

    goalList.push(goalData);

    await fs.writeFile("database/goals.json",JSON.stringify(goalList,null,2));
    
    const goalsWithProgress = await exports.getGoal();

    return goalsWithProgress.find(item => item.goal.id === goalData.id);
}

exports.getGoal = async()=>{
    const data = await fs.readFile("database/goals.json","utf-8");

    const goalList = JSON.parse(data);

    const mileStone = JSON.parse(await fs.readFile("database/mileStone.json", "utf-8"));

    const goalsWithProgress = goalList.map((goal)=>{
        const goalMilestone = mileStone.filter((m) => m.goalid === goal.id);

        const completed = goalMilestone.filter((m) => m.status === "completed");

        const progress = goalMilestone.length ? Math.round(completed.length / goalMilestone.length * 100) : 0;

        return{
            goal,
            progress
        }
    })

    return goalsWithProgress;
}


exports.updateGoal = async(id, goal)=>{

    const data = await fs.readFile("database/goals.json","utf-8");

    const goalList = JSON.parse(data);

    const goalIndex = goalList.findIndex((g) => g.id === Number(id));

    if(goalIndex === -1){
        return({
            message : "No data gound"
        })
    }
    goalList[goalIndex].icon = goal.icon;
    goalList[goalIndex].title = goal.title ;
    goalList[goalIndex].description = goal.description;
    goalList[goalIndex].duedate = goal.duedate;
    goalList[goalIndex].status = goal.status;
    goalList[goalIndex].priority = goal.priority;


    await fs.writeFile("database/goals.json", JSON.stringify(goalList,null,2));

    const goalsWithProgress = await exports.getGoal();

    return goalsWithProgress.find(item => item.goal.id === id);
}

exports.deleteGoal = async(id) =>{
    const goalList = JSON.parse(await fs.readFile("database/goals.json","utf-8"));

    const updatedGoalList = goalList.filter(goal => goal.id !== id);

    await fs.writeFile("database/goals.json",JSON.stringify(updatedGoalList,null,2));

    const mileStoneList = JSON.parse(await fs.readFile("database/mileStone.json","utf-8"));

    const updatedMileStoneList = mileStoneList.filter(item => item.goalid !== id);


    await fs.writeFile("database/mileStone.json",JSON.stringify(updatedMileStoneList,null,2));
    console.log("fiel written successfully");
    return {
        message : "deleted"
    }
} 




exports.addMilestone = async(mileStone)=>{
    const data = await fs.readFile("database/mileStone.json", "utf-8");

    const mileStoneList = JSON.parse(data);

    mileStoneList.push(mileStone);

    await fs.writeFile("database/mileStone.json",JSON.stringify(mileStoneList,null,2))

    return mileStoneList;

}

exports.getMileStone = async(goalId) => {

    const data = await fs.readFile("database/mileStone.json","utf-8");

    const mileStoneList = JSON.parse(data);
    console.log(`the mileStone that i a returning is ${JSON.stringify(mileStoneList)}`);
    const mileStone = mileStoneList.filter((m)=> m.goalid === goalId)

    return mileStone;
}