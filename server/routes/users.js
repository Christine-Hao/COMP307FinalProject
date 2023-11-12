// It defines routes realted to user operaitons...
// sets up an endpoint(e.g. /api/users/login). When it hit with a POST request, 
// invokes the login function from authController

const express = require('express');
const authController = require("../controllers/authController");
const router = express.Router(); // used to declare routes
// HTTP method which indicates that this route responds to HTTP POST request
// combined with prefifix in server.js, the full endpoint URL: /api/users/login
// authCOntroller.login is the handler function.
router.post("/login", authController.login); 


module.exports = router;