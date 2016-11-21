var endsWith = require('./endsWith');
var join = require('./join');
var parseValue = require('postcss-value-parser');
var postcss = require('postcss');
var relativeValue = require('./relativeValue');

var parseUnit = parseValue.unit;

function hasDecls(rule) {
    return rule.nodes && rule.nodes.length > 0;
}

function createMediaQueryRule(contentMaxWidth, nodes) {
    return postcss.atRule({
        name: 'media',
        params: join(['screen and (min-width: ', contentMaxWidth, ')']),
        nodes: nodes
    });
}

module.exports = postcss.plugin('postcss-content-width-unit', function (opts) {
    opts = opts || {};

    var contentMaxWidth = opts.contentMaxWidth;
    var unit = opts.unit || 'rpx';

    if (!contentMaxWidth) {
        throw new Error('contentMaxWidth option is mandatory');
    }

    return function _walkRoot(root) {
        root.walkRules(function _walkRules(rule) {
            var mq = createMediaQueryRule(contentMaxWidth);
            var mqRule = rule.cloneAfter({ nodes: [] });

            rule.walkDecls(function _walkDecls(decl) {
                var values = parseValue(decl.value);
                var mqValues = [];

                values.walk(function _walkValues(value) {
                    var mqValue = Object.assign({}, value);

                    if (value.type === 'word' && endsWith(unit, value.value)) {
                        var word = parseUnit(value.value);

                        value.value = relativeValue(contentMaxWidth, value);
                        mqValue.value = word.number + 'px';
                    }

                    mqValues.push(mqValue);
                });

                if (mqValues.length > 0) {
                    decl.value = values.toString();
                    mqRule.append(mqValues.toString());
                }
            });

            if (hasDecls(mqRule)) {
                mqRule.moveTo(mq);
                rule.parent.insertAfter(rule, mq);
            } else {
                mqRule.remove();
            }
        });
    };
});
