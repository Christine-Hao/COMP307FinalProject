// handle logic of the login process
// when login request is received, maybe extract the username and password from the request.
// then uses functions that interact with the database in /server/models/User.js


const bcrypt = require("bcrypt"); //for hashing password anc com
const jwt = require("jsonwebtoken"); // json token
const User = require("../models/User"); // use the functions in models/User.js

// create a login function for other files to use.
exports.login = async (req, res) => {

    const { email, password} = req.body;
    const user = await User.findByEmail(email);
    
    // for testing ONLY: manually insert an un-hashed password into databse, first hash the correct password
    user.password = await bcrypt.hash(user.password, 10);

    // check if user exists, and check if the provided password matches with the stored one.
    // bcrypt.compare -> hashes the entered password(left argument), and compare with the correct password(expect to be hashed)
    if(!user || !await bcrypt.compare(password, user.password)){

        //return res.status(401).send("Invalid credentials");
        console.log("user password upon login check:", user.password);
        console.log("correct password:", user.password)
        console.log("not exist?", !user);
        console.log("user email upon login check:", user.email);
        console.log('correct email:', email);
        console.log(" not equal password?)", ! await bcrypt.compare(password, user.password));

        return res.status(401).json({ message: "Invalid credentials upon login checking" });
    }

    // generates a Json  Web Token.
    // it securely confirm the identity of the user on subsequent requests...
    const token = jwt.sign({userID: user.id}, "yourSecreteKey", {expiresIn: '1h' });

    res.json({token});
}

exports.register = async(req, res) => {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findByUsername(username);
        if(existingUser){
            //return res.status.send("Username already taken. Choose another one.");
            return res.status.json({message:"Username already taken. Choose another one."});

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userID = await User.createUser(username, hashedPassword);

        // Optionally, maybe directly log in the user after registration?? Or no??
        // and return a token as in the login function

        //res.status(201).send("User created successfully");
        res.status(201).json({message: "User created successfully"});

    } catch(error){
        //res.status(500).send("Error happens when registering new user. Please wait for a while or reach out to the contact team.");
        res.status(500).json({message: "Error happens when registering new user. Please wait for a while or reach out to the contact team."});

    }
}