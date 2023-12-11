Group name: Debug Demons

Project: The slack replacement project

Website name: Double Bond

Competition: NO.

Group members:
1. Jiahao Jiang (261038881)
   Email: jiahao.jiang@mail.mcgill.ca
2. Yuanqing Hao (261053765)
   Email: yuanqing.hao@mail.mcgill.ca
3. Nicholas Foisy (261055677)
   Email: nicholas.foisy@mail.mcgill.ca
   
Link to our website:
https://doublebound.onrender.com

Technology Stack:
    Frontend: React, Bootstrap, HTML, CSS, JS
    Backend: Express.js , Node.js, JS
    Database: PostgreSQL
    Externals: bcrypt, JWT, SOCKET.IO
    Image Creation: Canva

NOTE:
    1. Due to time constraints, we did not implement all elements in the provided storyboard.
       After reading the instruction and confirming with the Professor, we selected at least 4 private facing circles
       and all public-facing webpages to implement.
    2. To elaborate on, we did not implement the cirlces about channel management function and search message. Instead,
       we create only a default channel (i.e. general) for each board. But we still created a Channel model in the backend,
       and the Channel model will simply interact with the discussion board controller. We implemented all the other
       private-facing circles and public-facing webpages.

Members' main responsibilties
1. For the login page:
    Frontend:
        Christine Yuanqing Hao: Design, Formatting, Animation, Input validation
        Christine Yuanqing Hao & Jiahao Jiang : Page redirection
    Backend:
        Jiahao Jiang: Login verfication, authentication via token, routing
    Database:
        Jiahao Jiang: Database operations & designs

2. For the registration page:
    Frontend:
        Christine Yuanqing Hao: Design, Formatting, Input validation, Password confirmation, Background image design and creation
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

4. For the specific discussion board page:
    Frontend:
        Nicholas Foisy: Design, Formatting, input validation.
        Christine Yuanqing Hao: Design and creation of the background image
    Backend:
        Jiahao Jiang: messaging, board management, retriving board information(members, messages)
        Nicholas Foisy: retriving board information(names)
        Jiahao Jiang & Nicholas Foisy: routing
    Database:
        Nicholas Foisy, Christine Yuanqing hao, Jiahao Jiang: database design
        Jiahao Jiang: database operations

5. Security
    Christine Yuanqing Hao & Jiahao Jiang & Nicholas Foisy:
        use local storage to store tokens and non-crucial user data.
        use trustful hosting services that adopts HTTPs.
    Jiahao Jiang:
        verifies the user tokens sent from the client before using the requested services on the backend.


Main Directory Structures(include the main files):

COMP307FINALPROJECT/
├── README.md
├── client                                  # React frontend (The View part in MVC)
│   ├── public                              # Static files & public resources
│   │   ├── public files...
│   └── src
│       ├── App.js
│       ├── components                      # Reusable components
│       │   ├── Navbar
│       │   │   ├── AccountInfoPopup.js
│       │   │   ├── Navbar.js
│       │   │   └── Navbar_styles.css
│       │   ├── login
│       │   │   ├── Login.js
│       │   │   ├── Login_styles.css
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
└── server                                     # Node backend (The Model and Controller parts in MVC)
    ├── README.txt
    ├── config                                 # Configuration file(set up database connection)
    │   └── db.js
    ├── controllers                            # Backend intermediate logic (The Controller part in MVC)
    │   ├── authController.js
    │   ├── discussionController.js
    │   └── messageController.js
    ├── middleware                             # specialized middleware function (e.g. token verification)
    │   └── authMiddleware.js
    ├── models                                 # data management/query (The Model part in MVC)
    │   ├── Board.js
    │   ├── Channel.js
    │   ├── Message.js
    │   └── User.js
    ├── routes                                  # Express routes(guide the API calls from the frontend to the backend)
    │   ├── discussionRoutes.js
    │   └── userRoutes.js
    └── server.js                               # entry point of the backend server

