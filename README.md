# PostCSS Content Width Unit [![Build Status][ci-img]][ci] [![Coverage Status][coveralls-img]][coveralls]

[PostCSS] plugin which adds limit to vw unit.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/kinday/postcss-content-width-unit.svg
[ci]: https://travis-ci.org/kinday/postcss-content-width-unit
[coveralls-img]: https://coveralls.io/repos/github/kinday/postcss-content-width-unit/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/kinday/postcss-content-width-unit?branch=master

```css
.foo {
  padding: 30rpx;
}
```

```css
/* assuming contentMaxWidth = '1280px' */
.foo {
  padding: 2.3437vw;
}

@media screen and (min-width: 1280px) {
  .foo {
    padding: 30px;
  }
}
```

## Usage

```js
var contentWidthUnit = require('postcss-content-width-unit');

postcss([
  contentWidthUnit({contentMaxWidth: '1280px'})
]);
```

## Options

### `contentMaxWidth: string`, **required**

The global `max-width` value. Can be a variable name.

### `unit: string`, **optional**, default: `rpx`

Content width unit which would be converted to regular CSS units.

-----

See [PostCSS] docs for examples for your environment.
