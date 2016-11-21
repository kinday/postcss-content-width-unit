var join = require('./join');

function isValueInPixels(value) {
    return (/^[0-9.]+px$/i).test(value);
}

function isVariable(value) {
    return value.indexOf('$') === 0;
}

module.exports = function relativeValue(contentMaxWidth, value) {
    if (isVariable(contentMaxWidth)) {
        return join([contentMaxWidth, ' / ', value]);
    }

    if (isValueInPixels(contentMaxWidth)) {
        var ratio = parseFloat(contentMaxWidth) / parseFloat(value);
        return join([ratio, 'vw']);
    }

    return join(['calc(', contentMaxWidth, ' / ', value, ')']);
};
