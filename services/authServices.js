const fs = require("fs/promises");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");


exports.signup = async (data) => {
    const file = await fs.readFile("database/user.json", "utf-8");

    const user = JSON.parse(file);

    const existingUser = user.find((user) => user.email === data.email);

    if (existingUser) {
        throw new Error(
            "User already exist"
        );
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        password: hashPassword
    }

    user.push(newUser);

    await fs.writeFile("database/user.json", JSON.stringify(user, null, 2));

    return {
        message: "user created successfully"
    }
}

exports.login = async (loginUser) => {
    try {

        const file = await fs.readFile("database/user.json", "utf-8");

        const userData = JSON.parse(file);
        const users = userData.find((user) => user.email === loginUser.email);


        if (!users) {
            throw new Error(
                "user not found"
            )
        }

        const valid = await bcrypt.compare(loginUser.password, users.password);


        if (!valid) {
            throw new Error("Enter correct userID and password");
        }

        const token = generateToken(users);

        return (
            {
                message: "login Successfull",
                token
            }
        )
    }
    catch (error) {
        throw error;
    }
}

