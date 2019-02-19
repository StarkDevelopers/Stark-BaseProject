const APIContext = require('./APIContext');

class BaseRepository {
    /**
     * @param {APIContext} context 
     */
    constructor (context) {
        this.context = context;
    }
}

module.exports = BaseRepository;
