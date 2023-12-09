server directory:

server/
    server.js     the entry point of the backend server. It also handles the messaging functionality(listens and emit message)

server/config                                 # Configuration files(e.g. database connection)
    db.js: code for database connection

server/controllers                            # Backend intermediate logic
    authController.js:
        controller level code for user authentications (handles user login & registration)
    discussionController.js:
        controller level code for board-related logic (handles board creation, deletion, retrieval of boards, board member management...)
    messageController.js
        controller level code for message-related logic (save message, get message, delete message...)
    
server/middleware                             # middleware function (e.g. token verification)
    authMiddleware.js:
        a middleware that handles authentication of the user through tokens

server/models                                 # models containing  data management/database query
    Board.js:
        model level code related to the data of the board
    Channel.js
        model level code related to the data of the channel
    Message.js
        model level code realted to the data of the messages
    User.js
        model level code related to the data of the users

server/routes                              # Express routes(guide the frontend requests to handler functions)

    discussionRoutes.js:
        defines API endpoints, relevant middleware verification functions and endpoint handler functions related to discussion board
        (including select-discussion-board page and specific discussion board page)
    userRoutes.js
        defines API endpoints, relevant middleware verification functions and endpoint handler functions related to user login & registration