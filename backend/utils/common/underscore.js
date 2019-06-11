const _ = require('lodash');

const isEmpty = (object) => _.isEmpty(object);
const isArray = (object) => _.isArray(object);

module.exports = {
    isEmpty,
    isArray
};
