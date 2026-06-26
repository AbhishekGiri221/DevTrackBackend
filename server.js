const express = require("express");
const cors = require("cors");  // --> return a middleware function we have to use it before handling request
const fs = require("fs/promises");


const app = express()
app.use(cors());
app.use(express.json())


app.post("/signup",async(req,res)=>{

    try {
        const previousData = await fs.readFile("./user.json","utf-8");
        const data = JSON.parse(previousData);

        const user = req.body;

        data.push(user);

        await fs.writeFile("./user.json",JSON.stringify(data,null,2));

        res.json({
            message : "user created Succesfully"
        })
        
    } catch (error) {
        console.log(error);
    }

});


app.post("/login",async(req,res)=>{
    const previousData = await fs.readFile("./user.json","utf-8");
    const{email,password} = req.body;

    console.log(`email is. : ${email} password is ${password}`);
    const data = JSON.parse(previousData);

    const user = data.filter((user)=> user.email == email && user.password == password);
    console.log(user);
    res.status(200);
})

app.listen(3000,()=>{
    console.log("listneing tho this port 3000");
})

