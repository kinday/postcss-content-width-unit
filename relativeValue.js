var join = require('./join');

function isValueInPixels(value) {
    return (/^[0-9.]+px$/i).test(value);
}

function isVariable(value) {
    return value.indexOf('$') === 0;
}

module.exports = function relativeValue(contentMaxWidth, value) {
    if (typeof value === 'undefined') {
        return function _relativeValue(_value) {
            return relativeValue(contentMaxWidth, _value);
        };
    }

    if (isVariable(contentMaxWidth)) {
        return join([value, ' / ', contentMaxWidth, ' * ', '100']);
    }

    if (isValueInPixels(contentMaxWidth)) {
        var ratio = parseFloat(value) / parseFloat(contentMaxWidth) * 100;
        return join([ratio, 'vw']);
    }

    throw new Error('contentMaxWidth must be either variable or in pixels');
};
