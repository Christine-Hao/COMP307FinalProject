// It defines routes related to user operaitons...
// sets up an endpoint(e.g. /api/users/login). When it hit with a POST request, 
// invokes the login function from authController

import { Router } from 'express';
import { login, register } from "../controllers/authController.js";
const router = Router(); // used to declare routes

// HTTP method which indicates that this route responds to HTTP POST request

// combined with prefifix in server.js, the full endpoint URL: /api/users/login
// authCOntroller.login is the handler function.
router.post("/login", login); 

router.post("/register", register);

export default router;