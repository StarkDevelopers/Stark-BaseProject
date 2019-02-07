// Built-in modules
const path = require('path');

// 3rd party modules
const express = require('express');
const bodyParser = require('body-parser');

// Project modules
const initializeSession = require('./middleware/session-management/session-initialize');
const initializeCSRFToken = require('./middleware/csrf-management/csrfToken');
const loginSequence = require('./middleware/session-management/login-sequence');
const logoutSequence = require('./middleware/session-management/logout-sequence');
const staticResources = require('./middleware/static-resource-management/static-resource');

// Constants variables
const isProduction = (process.env.NODE_ENV || 'development') === 'production';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());

initializeSession(app);

initializeCSRFToken(app);

loginSequence(app);

logoutSequence(app);

app.get('/', (req, res, next) => {
    // res.sendFile(path.join(__dirname, 'client/index.html'));
    console.log('req.isAuthenticated()', req.isAuthenticated());
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        next();
    }
});

staticResources(app, __dirname);

/**
 * Uncaught Exception
 * For more information: https://nodejs.org/api/process.html#process_event_uncaughtexception
 */
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception Caught \n', error);
    // Handle error here
});

/**
 * Unhandled Rejection
 * For more information: https://nodejs.org/api/process.html#process_event_unhandledrejection
 */
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, ' with reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

/**
 * Exit Process
 * For more information: https://nodejs.org/api/process.html#process_event_exit
 */
process.on('exit', (code) => {
    console.log(`Process is about to exit with code: ${code}`);
});

app.listen(8080, () => console.log('App listening on port 8080!'));
