const express = require("express");
const cors = require("cors");  // --> return a middleware function we have to use it before handling request
const fs = require("fs/promises");


const app = express()
app.use(cors());
app.use(express.json())


app.get("/user",(req,res)=>{
    console.log(req.body);

    console.log(typeof(req.body));

    res.json({
        message : "listnening here"
    })
})

app.post("/signup",async(req,res)=>{

    try {
        const data = await fs.readFile("./user.json","utf-8");
        console.log(typeof(data));
        console.log(data);

        await fs.writeFile("./user.json",JSON.stringify(req.body,null,2));

        res.json({
            message : "user created Succesfully"
        })
        
    } catch (error) {
        console.log(error);
    }

})

app.listen(3000,()=>{
    console.log("listneing tho this port 3000");
})

