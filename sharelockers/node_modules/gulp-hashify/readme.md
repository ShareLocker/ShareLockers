# gulp-hashify

A gulp plugin for turning a stream of files into a JavaScript object.

[![Build Status](https://travis-ci.org/chrisdavies/gulp-hashify.svg?branch=master)](https://travis-ci.org/chrisdavies/gulp-hashify)

## Installation

```
npm install --save-dev gulp-hashify
```

## Usage

```javascript
var hashify = require('gulp-hashify');

gulp.task('hashify', function () {
  return gulp.src('./src/views/**/*.html')
    .pipe(hashify('views.js'))
    .pipe(gulp.dest('./dist/js'));
});
```

After running the `hashify` task, there will be a `./dist/js/views.js` file. Let's say that the
`./src/views/` directory looked like this:

```
/views
  /errors
    404.html
    500.html
  index.html
  users.html
```

Then, `./dist/js/views.js` would end up looking like this:

```javascript
var views = {
  'errors/404': '<h1>Not found or whatever the content of /views/errors/404.html was</h1>',
  'errors/500': '<h1>Doh!</h1>',
  'index': 'The contents of /views/index.html',
  'users': 'The contents of /views/users.html'
};

if (typeof module !== "undefined" && module.exports) { 
  module.exports = views; 
}
```

## Arguments

The hashify function takes two arguments:

- *fileName* = the name of the file to be output
- *varName* = (optional) the name of the variable to be included in the output file. Defaults to `views`. If varName has a `.` in it, then it will not produce a variable declaration at all.

### Example  

```javascript
var hashify = require('gulp-hashify');

gulp.task('hashify', function () {
  return gulp.src('./src/views/**/*.html')
    .pipe(hashify('views.js', 'app.templates'))
    .pipe(gulp.dest('./dist/js'));
});
```

Would produce a file that looked like this:

```javascript
app.templates = {
  'errors/404': '<h1>Not found or whatever the content of /views/errors/404.html was</h1>',
  'errors/500': '<h1>Doh!</h1>',
  'index': 'The contents of /views/index.html',
  'users': 'The contents of /views/users.html'
};

if (typeof module !== "undefined" && module.exports) { 
  module.exports = app.templates; 
}
```

### Browserify example

This task will find all `.html` files in `./src/views` and bundle them into an external browserify bundle. The 
views object can then be imported via `var views = require('views');`, provided `./dist/js/views.js` is referred 
to in the HTML file.

```javascript
var gulp = require('gulp');
var browserify = require('browserify');
var hashify = require('gulp-hashify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var tap = require('gulp-tap');

gulp.task('js:views', function () {
  return gulp.src('./src/views/**/*.html')
    .pipe(hashify('bundled-views.js'))
    .pipe(tap(function(file) {
      return browserify()
        .require(file, { expose: 'views' })
        .bundle()
        .pipe(source('views.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js'));
    }));
});
```

---

## License MIT

Copyright (c) 2015 Chris Davies

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
