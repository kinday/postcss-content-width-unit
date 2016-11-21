# PostCSS Content Width Unit

[PostCSS] plugin which adds limit to vw unit.

[PostCSS]: https://github.com/postcss/postcss

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
