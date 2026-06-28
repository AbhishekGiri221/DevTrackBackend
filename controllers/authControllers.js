const authServices = require("../services/authServices");

exports.signup = async(req,res)=>{
    try {
        const response = await authServices.signup(req.body);

        res.status(201).json(response);
        
    } catch (error) {
        res.status(400).json({
            message : error.message
        });
    }
}