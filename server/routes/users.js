// It defines routes related to user operaitons...
// sets up an endpoint(e.g. /api/users/login). When it hit with a POST request, 
// invokes the login function from authController

import { Router } from 'express';
import { login, register } from "../controllers/authController.js";
const userRoutes = Router(); // used to declare routes

//  prefifix in server.js: /api/users/

/**
 * /api/users/login
 * /api/users/register
 */

userRoutes.post("/login", login); 

userRoutes.post("/register", register);

export default userRoutes;