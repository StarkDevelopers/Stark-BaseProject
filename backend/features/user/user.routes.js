const Joi = require('Joi');

const API = require('../../base/API');
const UserController = require('./user.controller');

const createUserApi = {
    path: '/create',
    verb: 'GET',
    handler: {
        controller: UserController,
        method: 'create',
        methodArguments: ['request:body']
    },
    middlewares: {
        // authorization: 'admin:user:create',
        // decryption: 'Username,Name,Password,Email',
        // subscription: 'Free'
    },
    request: {
        body: {
            Username: Joi.string().required(),
            Name: Joi.string().required(),
            Password: Joi.string().required(),
            Email: Joi.string().required()
        }
    }
}

const userEndpoints = [
    createUserApi
];

module.exports = new API('User', '/api/user', userEndpoints);
