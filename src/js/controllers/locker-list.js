'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var getCookie = require('../getCookie');
var lockerGenerator = require('../lockerGenerator');
var openLocker = require('../openLocker');
var buyItem = require('../buyItem');
var stock = require('../stock');
var colorGen = require('../colorGen');

router.route('location/locker', function () {
	//var arr = [{title : 'teddy', details : 'A Really Big Teddy Bear'}, {title : 'car', details : 'A Super Fast car'}, {title : 'coat', details : 'A leather coat'}, {title : 'flowers', details : '1,000 Roses'}, {title : 'shoes', details : 'Air Jordans, size 9'}, {title : 'marbles', details : 'a million marbles'}, {title : 'liver', details : 'one human liver'}, {title : 'drugs', details : 'so many drugs'} ];
	
		
		$.ajax({
			method: 'GET', 
			url: '/api/lockers/',
  		}).done(function (data){
			 
			console.log(data);
			showLockers(data);
			lockerGenerator(data);
			stock();
			$(document).ready(function() {
		            $('.vlocker').click(function() {
		                $(this).find('.vpopout').slideDown('duration fast');
						$('.stock-wrapper').fadeIn('duration fast');
		            });
		            $('.vlocker').mouseleave(function() {
		                $(this).find('.vpopout').hide('duration fast');
						$('.stock-wrapper').hide();
		            });
					openLocker('.open-button');
					buyItem('.buy-button');
		    });
		});
		
		// $.ajax({
		// 	method: 'GET', 
		// 	url: '/api/profiles/',
  		// }).done(function (data){
		// 	console.log(data);
		// });
		

		function showLockers(data) {
			var lockerTemplate = views['locker-list'];
		    var templateFn = _.template(lockerTemplate, { variable: 'm' });
		    var lockerHTML = templateFn({ lockers: data });
			$('.main-content').html(lockerHTML);
			return data;
		}


});