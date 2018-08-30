# babel-plugin-mix-import-module-exports

When we mixed use `import` and `module.exports`:

```js
import A from 'a';
// ...
module.exports = A
```

will lead to problems with bundling like this:

```js
TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
```

For more infomation, see these issues:

<https://github.com/almende/vis/issues/2934>
<https://github.com/webpack/webpack/issues/4039#issuecomment-281136701>
<https://github.com/webpack/webpack/issues/3491>
<https://stackoverflow.com/questions/42449999/webpack-import-module-exports-in-the-same-module-caused-error>

This plugin makes things work by transforming the code into:

```js
var __MIX_IMPORT_MODULE_EXPORTS__;
import A from 'a';
// ...
__MIX_IMPORT_MODULE_EXPORTS__ = A;
export default __MIX_IMPORT_MODULE_EXPORTS__;
```

[Note] This plugin is just for compatibility with old projects, **you should not use it in your new projects**.
