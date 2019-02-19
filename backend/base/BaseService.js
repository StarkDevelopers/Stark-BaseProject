const APIContext = require('./APIContext');
const commonFunctions = require('../utils/common/commonFunctions');

class BaseService {
    /**
     * @param {APIContext} context 
     */
    constructor (context) {
        this.context = context;
    }

    parseIfString (jsonString, handleError = null, errorMessage = null, defaultObject = null) {
        commonFunctions.parseIfString(jsonString, handleError, errorMessage, defaultObject);
    }

    stringify (jsonObject) {
        commonFunctions.stringify(jsonObject);
    }
}

module.exports = BaseService;
