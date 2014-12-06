component-resolve-list
======================

returns an array of files resolved from component.json

allows you to specify which fields of component.json are used for local
and remote components.

components which have been linked using `component link` can optionally use the same fields as local components

useful for setting up watch tasks for component builds which follow symbolic links and bundling test scripts

### Usage ###

`resolve.scripts(options?, done)`
`resolve.files(options?, done)`
`resolve.styles(options?, done)`
`resolve.custom(options, done)`

options: see [component-resolve-fields](https://github.com/frankwallis/component-resolve-fields)
done: callback function which takes an array of filenames as first parameter

### Example ###

```js
gulp.task('watch-scripts', [ 'scripts' ], function () {
	var resolve = require('component-resolve-list');

	var options = {
		localFields: ["scripts", "specs", "mocks"],
		remoteFields: ["scripts"],
		linkedLocals: true
	}

    resolve.custom(options, function(filelist) {
        gulp.watch(filelist, { read: false }, [ 'build' ]);
    });
});
```