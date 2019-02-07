const sql = require('mssql');

const connectionPool = require('./connection-pool');
const buildConfig = require('../../config/mssql-config');

class DBConnection {
    constructor () {}

    async getConnection (server, username, password, database, port) {
        const connectionKey = connectionPool.generateKey(server, username, database);

        let connection = connectionPool.get(connectionKey);

        if (connection) {
            return connection;
        }

        const config = buildConfig(server, username, password, database, port);

        connection = await this.makeConnection(config);

        connectionPool.register(connectionKey, connection);

        return connection;
    }

    makeConnection (config) {
        return new Promise(async (resolve, reject) => {
            const pool = new sql.ConnectionPool(config);
        
            pool.on('error', error => {
                console.error('Error occured in pool with Config=> ', config, '\nError=> ', error);
            });
        
            try {
                await pool.connect();
            } catch (error) {
                console.error('Error while creating connection', error);
                return reject(error);
            }
        
            resolve(pool);
        }); 
    }
}


module.exports = new DBConnection();