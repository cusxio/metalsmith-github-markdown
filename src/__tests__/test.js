import { resolve, join } from 'path';
import ava from 'ava';
import metalsmith from 'metalsmith';
import equal from 'assert-dir-equal';
import markdown from '../../lib';

const root = resolve('.', 'src', '__tests__', 'fixtures');

ava('should convert markdown using Github API', (t) => new Promise((resolve) => {
    metalsmith(root)
        .use(markdown())
        .build((err) => {
            t.falsy(err, 'should not error');
            t.notThrows(() => equal(join(root, 'build'), join(root, 'expected')));
            resolve();
        });
}));
