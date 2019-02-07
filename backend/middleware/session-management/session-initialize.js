const session = require('express-session');
const passport = require('passport');
const redisConnect = require('connect-redis')(session);

const redisClient = require('../../helper/redis-helper/redis-initialize');
const passportLocalStrategy = require('./passport-strategy');

function initializeSession (app) {
    const redisStore = new redisConnect({
        client: redisClient,
        logErrors: true
    });

    app.use(session({
        name: 'stark.mailer.session',
        secret: 'SECRET_KEY_HERE',
        store: redisStore,
        cookie: {
            /**
             * Session will be expired after maxAge specified.
             * If rolling is true then maxAge will be counted since session was idle.
             * It will remove the session from store(redisStore) after maxAge.
             */
            maxAge: 3600000 // seconds
        },
        rolling: true, // to increase the expiration time of the session cookie for non-idle session
        resave: false,
        saveUninitialized: false
    }));
    
    /**
     * Passport initialization
     * As well initialize Passport session as we are using persistent login sessions
     */
    app.use(passport.initialize());
    app.use(passport.session());

    passportLocalStrategy();
}

module.exports = initializeSession;
