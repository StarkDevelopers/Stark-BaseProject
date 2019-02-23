const BaseService = require('../../base/BaseService');
const UserRepository = require('./user.repository');

class UserService extends BaseService {
    constructor (context, logger) {
        super(context, logger);

        this.userRepository = new UserRepository(context, logger);
    }

    async create (user) {
        this.logger.info('Service Called');

        await this.userRepository.create();
    }
}

module.exports = UserService;
