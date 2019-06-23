const BaseService = require('../../base/BaseService');
const UserRepository = require('./user.repository');
const TABLES = require('../../base/Tables');

class UserService extends BaseService {
    constructor (context, logger) {
        super(context, logger);

        this.userRepository = new UserRepository(context, logger, TABLES.USER);
    }

    async create (user) {
        await this.userRepository.createSystemUser(user);
        delete user.Password;

        return await this.userRepository.create(user);
    }

    async list (query) {
        return await this.userRepository.list(query);
    }
}

module.exports = UserService;
