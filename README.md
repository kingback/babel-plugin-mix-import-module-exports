# babel-plugin-mix-import-module-exports

## Why we use it

When mixed use `import` and `module.exports`:

```js
import A from 'a';
// ...
module.exports = A
```

it will lead to problems with bundling like this:

```js
TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
```

For more infomation, see these issues:

<https://github.com/almende/vis/issues/2934>

<https://github.com/webpack/webpack/issues/4039#issuecomment-281136701>

<https://github.com/webpack/webpack/issues/3491>

<https://stackoverflow.com/questions/42449999/webpack-import-module-exports-in-the-same-module-caused-error>

## How it works

This plugin makes things work by transforming the code into:

```js
var __MIX_IMPORT_MODULE_EXPORTS__;
import A from 'a';
// ...
__MIX_IMPORT_MODULE_EXPORTS__ = A;
export default __MIX_IMPORT_MODULE_EXPORTS__;
```

or sometimes maybe we have multiple `module.exports` in our module:

```js
var __MIX_IMPORT_MODULE_EXPORTS__;
import A from 'a';
import B from 'b';
// ...
if (B) {
  __MIX_IMPORT_MODULE_EXPORTS__ = B;
} else {
  __MIX_IMPORT_MODULE_EXPORTS__ = A;
}
export default __MIX_IMPORT_MODULE_EXPORTS__;
```

## Important Note

**This plugin is just for compatibility with old projects, you should not use it in your new projects**.
