const express = require("express");
const cors = require("cors");  // --> return a middleware function we have to use it before handling request
const authRoutes = require("../Devtrackbackend/routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express()
app.use(cors());
app.use(express.json())

app.use(authRoutes); // app.use("intiali_common_urls_part",authroutes);
app.use(taskRoutes);
app.listen(3000,()=>{
    console.log("listening to this port 3000");
})
