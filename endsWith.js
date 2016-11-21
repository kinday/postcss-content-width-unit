module.exports = function endsWith(pattern, string) {
    if (typeof string === 'undefined') {
        return function _endsWith(_string) {
            return endsWith(pattern, _string);
        };
    }

    if (string.length < pattern.length) {
        return false;
    }

    return string.indexOf(pattern) === string.length - pattern.length;
};
