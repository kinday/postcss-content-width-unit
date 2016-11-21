import test from 'ava';

import endsWith from './endsWith';

test('endsWith', t => {
    t.truthy(
        endsWith('rpx', '200rpx'),
        '$content-max-width / 200',
        'is true if string ends with given pattern'
    );

    t.falsy(
        endsWith('rpx', '200px'),
        'is false if string doesn’t end with given pattern'
    );

    t.falsy(
        endsWith('rpx', 'px'),
        'is false if string is shorter than given pattern'
    );
});
