const BaseController = require('../../base/BaseController');
const UserService = require('./user.service');
const Constants = require('../../base/Constants');

class UserController extends BaseController {
    constructor (context, logger, feature) {
        super(context, logger, feature);

        this.userService = new UserService(context, logger);
    }

    async create (user) {
        await this.userService.create(user);

        this.respondOk(Constants.createMessage(this.feature));
    }

    async list (query) {
        const users = await this.userService.list(query);

        this.respondOk(users);
    }
}

module.exports = UserController;
