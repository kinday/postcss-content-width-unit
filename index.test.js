import fs from 'fs';
import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function contentsOf(filename) {
    return new Promise(function (resolve, reject) {
        return fs.readFile(filename, 'utf8', function (err, contents) {
            if (err) {
                return reject(err);
            }

            return resolve(contents);
        });
    });
}

function run(t, input, output, opts = { }) {
    return Promise.all([contentsOf(input), contentsOf(output)])
        .then((fixtures) => {
            var inputFixture = fixtures[0];
            var outputFixture = fixtures[1];

            return postcss([plugin(opts)]).process(inputFixture)
                .then(result => {
                    t.deepEqual(result.css, outputFixture);
                    t.deepEqual(result.warnings().length, 0);
                });
        });

}

test('postcss-content-width-unit', t => {
    run(
        t,
        'fixtures/convert-to-vw-and-mq.input.scss',
        'fixtures/convert-to-vw-and-mq.output.scss',
        { contentMaxWidth: '1280px' }
    );

    t.throws(
        () => postcss([plugin()]).process(''),
        /contentMaxWidth/i,
        'throws if contentMaxWidth option is not set'
    );
});
