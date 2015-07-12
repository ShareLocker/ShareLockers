'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('stock/:local_name', function (local_name) {
	console.log(local_name);
	show('stock');
});