'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var lockerGenerator = require('../lockerGenerator');

router.route('location/locker', function () {
	var arr = [{title : 'teddy', details : 'A Really Big Teddy Bear'}, {title : 'car', details : 'A Super Fast car'}, {title : 'coat', details : 'A leather coat'}, {title : 'flowers', details : '1,000 Roses'}, {title : 'shoes', details : 'Air Jordans, size 9'}, {title : 'marbles', details : 'a million marbles'}, {title : 'liver', details : 'one human liver'}, {title : 'drugs', details : 'so many drugs'} ];
	
		
		$.ajax({
			method: 'GET', 
			url: '/api/lockers/',
  		}).done(function (data){
			console.log(data);
			showLockers(data);
			lockerGenerator(data);
			$(document).ready(function() {
		            $('.vlocker').click(function() {
						$(this).animate('flip');
		                $(this).find('.vpopout').show('duration fast');
		            });
		            $('.vlocker').mouseleave(function() {
		                $(this).find('.vpopout').hide('duration fast');
		            });
		    });
		});
		
		$.ajax({
			method: 'GET', 
			url: '/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
		

		
		
			
		
		
		function showLockers(data) {
			var lockerTemplate = views['locker-list'];
		    var templateFn = _.template(lockerTemplate, { variable: 'm' });
		    var lockerHTML = templateFn({ lockers: data });
			$('.main-content').html(lockerHTML);
			return data;
		}
		
		
		
		
		function getCookie(name) {
   			var cookieValue = null;
   			if (document.cookie && document.cookie != '') {
       		var cookies = document.cookie.split(';');
       		for (var i = 0; i < cookies.length; i++) {
           	var cookie = $.trim(cookies[i]);
           // Does this cookie string begin with the name we want?
           if (cookie.substring(0, name.length + 1) == (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
          	 }
       		}	
   		   }
		   console.log(cookieValue);
		   return cookieValue;
		}

});