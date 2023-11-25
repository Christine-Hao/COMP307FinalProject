
Visual Layout:

Boostrap 12 colum : col-sm-10, col-md-8, and col-lg-6.

The core feature is a login form that includes:
An input field for the user's email address.
An input field for the user's password.
Both fields are marked as required, ensuring users cannot submit the form without filling these out.
A submit button that says "Login".
Form Interaction:

The form handles user input for email and password through handleEmailChange and handlePasswordChange functions, updating the component's state accordingly.
On submission (handleSubmit), a POST request is sent to a specified API endpoint for login, constructed from environment variables. The request includes the user's email and password in JSON format.
The response from the server is handled within handleSubmit. If successful, it stores a token in local storage and could potentially redirect the user or perform other post-login actions. If the login fails, it logs the error message.
Cleanup and Effects:

A useEffect hook is used to initialize the Vanta.js effect when the component mounts and to clean up (destroy) the effect when the component unmounts, preventing potential memory leaks.
Registration Prompt:

Below the login form, there's a prompt indicating "Don't have an account? Register," suggesting a navigation option for new users to register.
Overall User Flow:

When a user visits this page, they will see a visually engaging interface with an animated background.
They are greeted with a welcome message and presented with a straightforward form to enter their email and password.
After filling out the form, they can attempt to log in. Depending on the success or failure of this attempt, they receive appropriate feedback.


- Need to install react-router-dom



React native documentation
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


