component-resolve-list
======================

returns list of files which will affect the build

assists in setting up watch tasks for component builds which follow symbolic links etc

example: 

```js
gulp.task('scripts', function () {
    var component = require('gulp-component-builder');
    
    return gulp.src('component.json')
        .pipe(component.scripts({ development: false }))
        .pipe(gulp.dest('build'))
})

gulp.task('watch-scripts', [ 'scripts' ], function () {
	var resolve = require('component-resolve-list');

    resolve.scripts(function(filelist) {
        gulp.watch(filelist, { read: false, debounceDelay: 500 }, [ 'scripts' ]);
    });
});
```