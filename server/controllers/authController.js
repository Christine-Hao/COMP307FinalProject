// handle logic of the login process
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';


// create a login function for other files to use.
export async function login(req, res) {

    const { email, password} = req.body;
    const user = await UserModel.findByEmail(email);

    // check if user exists, and check if the provided password matches with the stored one.
    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json({ message: "Invalid credentials upon login checking" });
    }

    // 1. generates a Json  Web Token.
    // 2. encodes: the user.id from the database
    const token = jwt.sign({userID: user.id}, process.env.JWT_SECRET, {expiresIn: '12h' });

    res.json({token, userID: user.id});
}

export async function register(req, res) {
    const {fullname, username, password, email} = req.body;

    try{
        const existingUser = await UserModel.findByEmail(email);
        if(existingUser){
            return res.status(400).json({message:"Email already taken. Choose another one."});

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.createUser(fullname, username, hashedPassword, email);

        res.status(201).json({message: "User created successfully"});

    } catch(error){
        console.error("Registration Error:", error);
        res.status(500).json({message: "Error happens when registering new user. Please wait for a while or reach out to the contact team."});

    }
}