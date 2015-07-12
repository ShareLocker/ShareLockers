'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('dashboard', function () {
		
	show('dashboard');
	$.ajax({
			method: 'GET', 
			url: '/api/dashboard',
  		}).done(function (data){
			console.log(data);
		});
	


});
