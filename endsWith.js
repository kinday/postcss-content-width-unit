module.exports = function endsWith(pattern, string) {
    return string.indexOf(pattern) === string.length - pattern.length;
}
