const dbConnection = require('../../helper/db-helper/db-connection');
const QueryBuilder = require('../../helper/query-helper/query-builder');
const buildConfig = require('../../config/mssql-config');

async function login(server, username, password, domain, done) {
    let connection;

    // Try to make connection using login credentials...
    try {
        const config = buildConfig(server, username, password, domain);

        connection = await dbConnection.makeConnection(config);
    } catch (error) {
        console.error('Error while logging in user');
        console.error('User', username);
        console.error('Domain', domain);
        console.error('Server', server);
        console.error('Error=> ', error);

        return done(null, false, { message: `Login failed for user ${username}` });
    }

    let user;
    try {
        user = await getUser(connection, username);
    } catch (error) {
        console.error('Error while fetching user detail');
        console.error('User', username);
        console.error('Domain', domain);
        console.error('Server', server);
        console.error('Error=> ', error);

        return done(null, false, { message: `Login failed for user ${username}` });
    }

    /**
     * Close the connection we have used for login purpose...
     */
    connection.close();

    /**
     * Make connection and register in connection pool for current user
     */
    await dbConnection.getConnection(server, username, password, domain);

    return done(null, user);
}

async function getUser(connection, username) {
    let query = new QueryBuilder(connection, 'Users');

    query = query.select()
        .where('UserName = ?', username);

    const user = await query.execute();

    console.log('Logged in user detail ', user);

    return user;
}

function serializeUser(user) {
    return {
        Id: user.Id,
        UserName: user.UserName,
        Name: user.Name
    }
}

module.exports = {
    login,
    serializeUser
}