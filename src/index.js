/* eslint-disable array-callback-return */

import { extname } from 'path';
import fetch from 'node-fetch';

export default function (opts = {}) {
    const accessToken = opts.accessToken || process.env.ACCESS_TOKEN || null;

    const url = accessToken === null ? 'https://api.github.com/markdown' : `https://api.github.com/markdown?access_token=${accessToken}`;

    return async function markdown(files, metalsmith, done) {
        await Promise.all(
            Object.keys(files)
            .filter((file) => {
                const ext = extname(file);
                return ext === '.md' || ext === '.markdown';
            })
            .map(async (file) => {
                const str = String(files[file].contents);

                const results = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ text: str }),
                });
                const data = await results.text();
                return { data, file };
            })
        )
        .then((results) => {
            results.map((result) => {
                const file = result.file;
                const ext = extname(file);

                files[file].contents = new Buffer(result.data);

                const data = files[file];

                delete files[file];

                files[file.replace(ext, '.html')] = data;
            });
            done();
        });
    };
}

