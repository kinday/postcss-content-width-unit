var endsWith = require('./endsWith');
var join = require('./join');
var postcss = require('postcss');
var relativeValue = require('./relativeValue');

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
                if (endsWith(unit, decl.value)) {
                    var value = decl.value.slice(0, -unit.length);

                    decl.value = relativeValue(contentMaxWidth, value);

                    mqRule.append(postcss.decl({
                        prop: decl.prop,
                        value: value + 'px'
                    }));
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
