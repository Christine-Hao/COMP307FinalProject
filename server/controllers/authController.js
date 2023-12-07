// handle logic of the login process
// when login request is received, maybe extract the username and password from the request.
// then uses functions that interact with the database in /server/models/User.js


// import { compare, hash } from "bcrypt"; //for hashing password anc com
// import { sign } from "jsonwebtoken"; // json token
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByEmail, createUser } from "../models/User.js"; // use the functions in models/User.js

// create a login function for other files to use.
export async function login(req, res) {

    const { email, password} = req.body;
    const user = await findByEmail(email);
    
    // for testing ONLY: manually insert an un-hashed password into databse, first hash the correct password
    //user.password = await bcrypt.hash(user.password, 10);

    // check if user exists, and check if the provided password matches with the stored one.
    // bcrypt.compare -> hashes the entered password(left argument), and compare with the correct password(expect to be hashed)
    if(!user || !await bcrypt.compare(password, user.password)){

        //return res.status(401).send("Invalid credentials");
        // console.log("user password upon login check:", user.password);
        // console.log("correct password:", user.password)
        // console.log("not exist?", !user);
        // console.log("user email upon login check:", user.email);
        // console.log('correct email:', email);
        // console.log(" not equal password?", ! await bcrypt.compare(password, user.password));

        return res.status(401).json({ message: "Invalid credentials upon login checking" });
    }

    // 1. generates a Json  Web Token.
    // 2. encodes: the user.id from the database
    // purpose: To confirm the identity of the user on subsequent requests.
    const token = jwt.sign({userID: user.id}, process.env.JWT_SECRET, {expiresIn: '12h' });

    res.json({token, userID: user.id});
}

export async function register(req, res) {
    const {fullname, username, password, email} = req.body;
    // console.log("fullname:", fullname);
    // console.log("username:", username);
    // console.log("password:", password);
    // console.log("email:", email);
    try{
        const existingUser = await findByEmail(email);
        if(existingUser){
            //return res.status.send("Username already taken. Choose another one.");
            return res.status(400).json({message:"Email already taken. Choose another one."});

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await createUser(fullname, username, hashedPassword, email);

        // Optionally, maybe directly log in the user after registration?? Or no??
        // and return a token as in the login function

        //res.status(201).send("User created successfully");
        res.status(201).json({message: "User created successfully"});

    } catch(error){
        console.error("Registration Error:", error);
        //res.status(500).send("Error happens when registering new user. Please wait for a while or reach out to the contact team.");
        res.status(500).json({message: "Error happens when registering new user. Please wait for a while or reach out to the contact team."});

    }
}

export function logout(req, res) {
    // Clear the token from the client by instructing them to clear the storage
    res.json({ message: 'You have been logged out.' });
    // Note: Actual token invalidation might require a token blacklist or a stateful mechanism
}