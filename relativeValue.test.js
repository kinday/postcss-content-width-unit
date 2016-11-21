import test from 'ava';

import relativeValue from './relativeValue';

test('relativeValue', t => {
    t.is(
        relativeValue('$content-max-width', '200'),
        '$content-max-width / 200',
        'returns expression if given a variable'
    );

    t.is(
        relativeValue('1280px', '200'),
        '6.4vw',
        'converts to vw if both values is in px'
    );

    t.is(
        relativeValue('1280em', '200'),
        'calc(1280em / 200)',
        'returns calc expression otherwise'
    );
});
