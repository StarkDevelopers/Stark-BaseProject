const BaseRepository = require('../../base/BaseRepository');

class UserRepository extends BaseRepository {
    constructor (context, logger) {
        super(context, logger);
    }
}

module.exports = UserRepository;
