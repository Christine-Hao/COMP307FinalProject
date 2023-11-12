// handle logic of the login process
// when login request is received, maybe extract the username and password from the request.
// then uses functions that interact with the database in /server/models/User.js


const bcrypt = require("bcrypt"); //for hashing password anc com
const jwt = require("jsonwebtoken"); // json token
const User = require("../models/User"); // use the functions in models/User.js

// create a login function for other files to use.
exports.login = async (req, res) => {
    
    const { username, password} = req.body;
    const user = await User.findByUsername(username);
    
    // check if user exists, and check if the provided password matches with the stored one.
    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).send("Invalid credentials");
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
            return res.status.send("Username already taken. Choose another one.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userID; = await User.createUser(username, hashedPassword);

        // Optionally, maybe directly log in the user after registration?? Or no??
        // and return a token as in the login function

        res.status(201).send("User created successfully");
    } catch(error){
        res.status(500).send("Error happens when registering new user. Please wait for a while or reach out to the contact team.");
    }
}