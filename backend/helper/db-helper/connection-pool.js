let connections;

class ConnectionPool {
    constructor() {
        connections = [];
    }

    get (key) {
        if (key && connections[key]) {
            return connections[key];
        }

        return null;
    }

    register (key, connection) {
        if (key && connection && !connections[key]) {
            connections[key] = connection;
        }
    }

    generateKey (server, username, database) {
        return database ? `${username}@${server}|${database}` : `${username}@${server}`;
    }
}

module.exports = new ConnectionPool();