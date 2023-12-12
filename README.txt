Group name: Debug Demons

Project: The slack replacement project

Website name: Double Bond

Competition: NO.

Team captain:
   Jiahao Jiang (261038881)
   Email: jiahao.jiang@mail.mcgill.ca

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

NOTE 2:
    Due to the hosting services, you may occasionally find that the messages are not displayed in real-time 
    If such things happen, you can go to the select-Board page, refresh, and enter the board again. Then your
    messages should be displayed in a real-time fashion.

    All the functionalities should not be impacted.

NOTE 3:
    In case you can't register for an account(You shoule be able to do that unless our website breaks), you can
    use this account for testing (or just feel free to use it):
    Email:    ta.test@mcgill.ca
    Password: tatest123

Members' main responsibilties
1. For the login page:
    Frontend:
        Christine Yuanqing Hao: Design, Formatting, Animation, Input validation
        Christine Yuanqing Hao & Jiahao Jiang : Page redirection
        Nicholas Foisy: some input validation
    Backend:
        Jiahao Jiang: Login verfication, authentication via token, routing
    Database:
        Jiahao Jiang: Database operations & designs

2. For the registration page:
    Frontend:
        Christine Yuanqing Hao: Design, Formatting, Input validation, Password confirmation, Background image design and creation
        Nicholas Foisy: some input validation
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
        Nicholas & Jiahao: message display
    Backend:
        Jiahao Jiang: message processing(save, load messages), board management, retriving board information(members, messages)
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

6. Bonus Feature (Christine, Jiahao, Nicholas)
    Observer pattern:
        1. In most cases, the messages are updated in real time for all users. If it's not updated, it should be acceidental
        and please refer to NOTE 2 above to solve it.
        2. In the discussion board, if the owner removes the user out of the board during chatting, the user will receive
        such notification via a popup, and be redirected to the select-board page upon closing the popup. 


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

