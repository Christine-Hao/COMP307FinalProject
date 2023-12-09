// It defines routes related to user operaitons...
import { Router } from 'express';
import { login, register } from "../controllers/authController.js";
const userRoutes = Router();

//  prefifix in server.js: /api/users/

/**
 * /api/users/login
 * /api/users/register
 */

userRoutes.post("/login", login); 

userRoutes.post("/register", register);

export default userRoutes;