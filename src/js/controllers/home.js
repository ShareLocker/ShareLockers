'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('', function () {
		
	show('home');
	$.ajax({
			method: 'GET', 
			url: 'https://sharelockers.herokuapp.com/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
	


});