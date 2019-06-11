const APIContext = require('./APIContext');
const QueryBuilder = require('../helpers/query-helper/query-builder');

class BaseRepository {
    /**
     * @param {APIContext} context 
     */
    constructor (context, logger, feature) {
        this.context = context;

        this.logger = logger;

        this.feature = feature;
    }

    async create (object) {
        let query = new QueryBuilder(this.context.connection, this.feature);

        query = query.insert(object);

        return await query.execute();
    }

    async list () {
        let query = new QueryBuilder(this.context.connection, this.feature);

        query = query.select();

        return await query.execute();
    }
}

module.exports = BaseRepository;
