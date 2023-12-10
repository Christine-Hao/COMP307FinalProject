Group name: Debug Demons

Project: The slack replacement project

Website name: Double Bond

Competition: NO.

Group members:
1. Jiahao Jiang (261038881)
2. Yuanqing Hao (261053765)
3. Nicholas Foisy (261055677)

Link to our website:
https://doublebound.onrender.com

Technology Stack:
    Frontend: React, Bootstrap, HTML, CSS, JS
    Backend: Express.js , Node.js, JS
    Database: PostgreSQL
    Externals: bcrypt, JWT, SOCKET.IO

NOTE:
    Due to time constraints, we did not implement all elements in the provided storyboard.
    After reading the instruction and confirming with the Professor, we selected at least 4 private facing circles
    and all public-facing webpages to implement.

Members' main responsibilties
1. For the login page:
    Frontend:
        Yuanqing Hao: Design, Formatting, Animation, Input validation
        Yuanqing Hao & Jiahao Jiang : Page redirection
    Backend:
        Jiahao Jiang: Login verfication, authentication via token, routing
    Database:
        Jiahao Jiang: Database operations & designs

2. For the registration page:
    Frontend:
        Yuanqing Hao: Design, Formatting, Input validation
    Backend:
        Jiahao Jiang: User registration, routing.
    Database:
        Jiahao Jiang: Database operations

3. For the select-discussion-board page
    Frontend:
        Yuanqing Hao: Design, Formatting, Input validation, Display flow of Board creation & deletion
    Backend:
        Jiahao Jiang: Board creation & deletion, retrieval of board list, routing
    Database:
        Nicholas Foisy, Yuanqing hao, Jiahao Jiang: Database design
        Jiahao Jiang: Database operations    

4. For the (specific)discussion board page:
    Frontend:
        Nicholas Foisy: Design, Formatting, Animation, input validation.
    Backend:
        Jiahao Jiang: messaging, board management, retriving board information(members, messages)
        Nicholas Foisy: retriving board information(names)
        Jiahao Jiang & Nicholas Foisy: routing
    Database:
        Nicholas Foisy, Yuanqing hao, Jiahao Jiang: database design
        Jiahao Jiang: database operations

5. Security
    Yuanqing Hao & Jiahao Jiang & Nicholas Foisy:
        use local storage to store tokens and non-crucial user data.
        use trustful hosting services that adopts HTTPs.
    Jiahao Jiang:
        verifies the user tokens sent from the client before using the requested services on the backend.

Directory structures:

COMP307FINALPROJECT/
├── README.md
├── client                                  # React frontend
│   ├── README.md
│   ├── package-lock.json       
│   ├── package.json
│   ├── public                              # Static files & public resources
│   │   ├── public files...
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components                      # Reusable components
│       │   ├── Navbar
│       │   │   ├── AccountInfoPopup.js
│       │   │   ├── Navbar.js
│       │   │   └── Navbar_styles.css
│       │   ├── login
│       │   │   ├── Login.js
│       │   │   ├── Login_styles.css
│       │   │   └── README.md
│       │   ├── registration
│       │   │   ├── Registration.js
│       │   │   ├── registration.png
│       │   │   ├── registration.png:Zone.Identifier
│       │   │   └── registration_styles.css
│       │   ├── select_board
│       │   │   ├── SelectBoard.js
│       │   │   ├── selectBoard_styles.css
│       │   │   └── server_backup.js
│       │   └── view_board
│       │       ├── BoardManagement.js
│       │       ├── view_board.js
│       │       ├── view_board_backup.js
│       │       └── view_board_styles.css
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
├── package-lock.json
└── server                                     # Node backend
    ├── README.txt
    ├── config                                 # Configuration file(set up database connection)
    │   └── db.js
    ├── controllers                            # Backend intermediate logic
    │   ├── authController.js
    │   ├── discussionController.js
    │   └── messageController.js
    ├── middleware                             # specialized middleware function (e.g. token verification)
    │   └── authMiddleware.js
    ├── models                                 # models containing  data management/database query
    │   ├── Board.js
    │   ├── Channel.js
    │   ├── Message.js
    │   └── User.js
    ├── package-lock.json
    ├── package.json
    ├── routes                                  # Express routes(guide the API calls to handler functions)
    │   ├── discussionRoutes.js
    │   └── userRoutes.js
    └── server.js                               # entry point of the backend server