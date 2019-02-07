const sql = require('mssql');
const _ = require('lodash');

const PARAM_REGEX = /(=|in|<|>|like|between|values|,\s?|object_id)(\s)*(\(?)[?]/i;
const PARAM_REPLACEMENT = '$1$2$3';

const __QueryParamTypes = {
    INT: 'INT',
    FLOAT: 'FLOAT',
    DECIMAL: 'DECIMAL'
};

class QueryExecutor {
    constructor (connection) {
        this.connection = connection;
    }

    async execute (text, params) {
        const query = _replaceQueryParameters(text, params);

        const request = new sql.Request(this.connection);

        return await request.query(query);
    }
}

function _replaceQueryParameters (query, params) {
    if (!_.isArray(params)) {
        console.error("_replaceQueryParameters: unexpected non param array", params);
        return query;
    }

    const now = new Date().getTime();
    const questionMarkIdentifier = `~~QuestionMark_${now}~~`;
    const questionMarkIdentifierRegex = new RegExp(questionMarkIdentifier, 'g');

    for (var k = 0; k < params.length; k++) {
        var param = params[k];

        if (param === null || param === undefined) {
            query = query.replace(PARAM_REGEX, PARAM_REPLACEMENT + 'null');
            continue;
        }

        if (_.isNumber(param)) {
            const parsedParam = getNumberTypeFromRange(param) === __QueryParamTypes.INT ? parseInt(param) : parseFloat(param);
            query = query.replace(PARAM_REGEX, PARAM_REPLACEMENT + parsedParam);
            continue;
        }

        query = query.replace(PARAM_REGEX, PARAM_REPLACEMENT + "'" + escapeValues(param, questionMarkIdentifier) + "'");
    }

    query = query.replace(questionMarkIdentifierRegex, '\?');

    return query;
}

function getNumberTypeFromRange(param) {
    if (param % 1 === 0) {
        // check for decimal numbers
        if (param < -2147483648 || param > 2147483647) {
            return __QueryParamTypes.DECIMAL;
        } else {
            return __QueryParamTypes.INT;
        }
    } else {
        return __QueryParamTypes.FLOAT;
    }
}

function escapeValues(valueString, questionMarkIdentifier) {
    if (!valueString)
        return '';

    return String(valueString).replace(/'/g, '\'\'').replace(/\?/g, questionMarkIdentifier);
}

module.exports = QueryExecutor;
