const Joi = require('joi');

const API = require('../../base/API');
const UserController = require('./user.controller');

const createUserApi = {
    path: '',
    verb: 'POST',
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
            Password: Joi.string().regex(/^.*[a-z]+.*$/)
                .regex(/^.*[A-Z]+.*$/)
                .regex(/^.*[0-9]+.*$/)
                .regex(/^.*\W+.*$/)
                .required(),
            Email: Joi.string().email().required()
        }
    }
}

const listUsersApi = {
    path: '',
    verb: 'GET',
    handler: {
        controller: UserController,
        method: 'list',
        methodArguments: ['request:query']
    },
    middlewares: {},
    request: {
        query: {
            filter: Joi.string().allow('', null).required(),
            sortBy: Joi.string().allow('', null).required(),
            sortType: Joi.string().allow('', null).required(),
            pageIndex: Joi.number().required(),
            pageSize: Joi.number().required()
        }
    }
}

const userEndpoints = [
    createUserApi,
    listUsersApi
];

module.exports = new API('User', '/api/user', userEndpoints);
