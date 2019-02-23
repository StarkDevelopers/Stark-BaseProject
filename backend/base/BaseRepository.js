const APIContext = require('./APIContext');

class BaseRepository {
    /**
     * @param {APIContext} context 
     */
    constructor (context, logger) {
        this.context = context;

        this.logger = logger;
    }

    async create () {
        this.logger.info('Repo called.');
    }
}

module.exports = BaseRepository;
