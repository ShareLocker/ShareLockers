'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('help', function () {
		
	show('help');
	$.ajax({
			method: 'GET', 
			url: '/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
	


});