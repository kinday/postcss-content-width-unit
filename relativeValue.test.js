import test from 'ava';

import relativeValue from './relativeValue';

test('relativeValue', t => {
    t.is(
        relativeValue('$content-max-width', '200'),
        '200 / $content-max-width * 100',
        'returns expression if given a variable'
    );

    t.is(
        relativeValue('1280px', '200'),
        '15.625vw',
        'converts to vw if both values is in px'
    );

    t.throws(
        () => relativeValue('1280em', '200'),
        /contentMaxWidth/,
        'throws otherwise'
    );
});
