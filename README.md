#  metalsmith-github-markdown

 [![Build Status](https://semaphoreci.com/api/v1/cusxio/metalsmith-github-markdown/branches/master/badge.svg)](https://semaphoreci.com/cusxio/metalsmith-github-markdown)

> Convert markdown with Github Markdown

## Why ?

GitHub has the best syntax highlighting. Nothing beats it.

## Usage

```bash
$ npm install --save-dev metalsmith-github-markdown
```

## Example

GitHub's Markdown API has a rate-limit of 60 requests per hour for unauthenticated request.

Therefore, by default, this plugin is rate limited to 60 requests per hour. You can increase this to 5000 requests per hour by adding your [personal](https://github.com/blog/1509-personal-api-tokens) GitHub API token.

```js
import metalsmith from 'metalsmith'
import markdown from 'metalsmith-github-markdown';

const accessToken = process.env.ACCESS_TOKEN;

metalsmith(__dirname)
    .use(markdown({
        accessToken: accessToken, // GitHub API Token.
    }))
    .build((err) => {
        if (err) {
            process.exit(1);
        }

        console.log('Success !');
    });
```

## API

### markdown([options])

#### options
Type: `Object`

#### accessToken
Type: `String`

Default: `undefined`

## License

MIT © Jonathan Chan