var hashify = require('../');
var should = require('should');
var path = require('path');
var assert = require('stream-assert');
var test = require('./test-stream');
var File = require('gulp-util').File;
var gulp = require('gulp');
require('mocha');

var fixtures = function (glob) { 
  return path.join(__dirname, 'fixtures', glob); 
}

function getHash(d, varName) {
  var fn = new Function(d.contents.toString() + ' return ' + (varName || 'views'));
  return fn();
}

function getExportedHash(d, varName) {
  var fn = new Function('module', d.contents.toString() + ' return ' + (varName || 'views'));
  var moduleObj = { exports: {} };
  fn(moduleObj);
  return moduleObj.exports;
}

describe('gulp-hashify', function() {
  it('should throw, when arguments is missing', function () {
    (function() {
      hashify();
    }).should.throw('Missing fileName option for gulp-hashify');
  });
  
  it('should ignore null files', function (done) {
    var stream = hashify('test.js');
    stream
      .pipe(assert.length(0))
      .pipe(assert.end(done));
    stream.write(new File());
    stream.end();
  });

  it('should emit error on streamed file', function (done) {
    gulp.src(fixtures('*'), { buffer: false })
      .pipe(hashify('test.js'))
      .on('error', function (err) {
        err.message.should.eql('Streaming not supported');
        done();
      });
  });

  it('should hashify one file', function (done) {
    test('wadap')
      .pipe(hashify('test.js'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) {
        getHash(d).file0.should.eql('wadap'); 
      }))
      .pipe(assert.end(done));
  });

  it('should hashify multiple files', function (done) {
    test('wadap', 'doe')
      .pipe(hashify('test.js'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { 
        var hash = getHash(d);
        hash.file0.should.eql('wadap');
        hash.file1.should.eql('doe'); 
      }))
      .pipe(assert.end(done));
  });

  it('should preserve relative path from files', function (done) {
    test('wadap', 'doe')
      .pipe(hashify('test.js'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { d.relative.should.eql('test.js'); }))
      .pipe(assert.end(done));
  });
  
  it('should allow for a custom variable name', function (done) {
    test('wadap', 'doe')
      .pipe(hashify('test.js', 'foo'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { 
        getHash(d, 'foo').file0.should.eql('wadap'); 
      }))
      .pipe(assert.end(done));
  });

  it('should allow for a property setter instead of variable', function (done) {
    test('wadap', 'doe')
      .pipe(hashify('test.js', 'foo.bar'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { 
        d.contents.toString().indexOf('foo.bar=').should.eql(0);
      }))
      .pipe(assert.end(done));
  });
  
  it('should export the views', function (done) {
    test('wadap', 'doe')
      .pipe(hashify('test.js', 'foo'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { 
        getExportedHash(d, 'foo').file0.should.eql('wadap'); 
      }))
      .pipe(assert.end(done));
  });

  it('should support nested files', function (done) {
    gulp.src(fixtures('**/*'))
      .pipe(hashify('all.js'))
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) {
        var hash = getHash(d);
        hash.one.should.eql('<h1>One</h1>');
        hash.uno.should.eql('<h1>Uno</h1>');
        hash['err/404'].should.eql('<h1>Not Found</h1>');
      }))
      .pipe(assert.end(done));
  });

  describe('should not fail if no files were input', function () {
    it('when argument is a string', function(done) {
      var stream = hashify('test.js');
      stream.end();
      done();
    });

    it('when argument is an object', function(done) {
      var stream = hashify({path: 'new.txt'});
      stream.end();
      done();
    });
  });

});