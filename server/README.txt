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

// more details to be written...