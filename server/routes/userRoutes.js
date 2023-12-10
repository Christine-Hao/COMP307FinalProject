import { Router } from 'express';
import { login, register } from "../controllers/authController.js";
const userRoutes = Router();

//  prefifix in server.js: /api/users/
/**
 * list of API related to users:

 * /api/users/login
 * /api/users/register
 */

userRoutes.post("/login", login); 

userRoutes.post("/register", register);

export default userRoutes;