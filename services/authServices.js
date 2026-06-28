const fs = require("fs/promises");

const bcrypt = require("bcrypt");


exports.signup = async(data)=>{
    const file = await fs.readFile("database/user.json","utf-8");

    const user = JSON.parse(file);

    const existingUser = user.find((user)=> user.email === data.email);

    if(existingUser){
        throw new Error(
            "User already exist"
        );
    }

    const hashPassword = await bcrypt.hash(data.password,10);

    const newUser = {
        id : Date.now(),
        name : data.name,
        email : data.email,
        password : hashPassword
    }

    user.push(newUser);

    await fs.writeFile("database/user.json",JSON.stringify(user,null,2));

    return {
        message : "user created successfully"
    }
}

