server directory:
where the Node.js and Express.js application resides and uses the packages about
express, pg, bcrypt, jsonwebtoken, cors.

/server/config/:
    db.js: basic code for database creation.
/server/controllers/:
    authController.js: handle login logic
/server/models/:
    User.js: interaction with the database
/server/routes/:
    users.js: routes user request to specific programs to handle
/server/:
    servers.js: entry point that defines and sets up the Node.js server configs above.


routes:
1. In server.js, any routes defined in users.js shuold be prefixed with "/api/users":
    const userRoutes = require("./routes/users");
    app.use('/api/users', userRoutes); 

    So, for Frontend to make an API call, -> fetch("/api/users" + some route in users.js) (POST)

    When deploying app, the domain or IP of backend server is in the requested URL.
    e.g. await fetch("https://backendwebsite.com/api/users/register);