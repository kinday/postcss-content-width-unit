module.exports = function endsWith(pattern, string) {
    if (string.length < pattern.length) {
        return false;
    }

    return string.indexOf(pattern) === string.length - pattern.length;
};
