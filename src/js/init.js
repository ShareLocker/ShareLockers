// TODO: put initialization logic here
'use strict';

var bulk = require('bulk-require');
var router = require('./router');

require('./animations');

// Require all of our controllers
bulk(__dirname, ['controllers/**/*.js']);

// Start the router
router.init();