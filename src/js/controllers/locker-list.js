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

module.exports = function () {


		$.ajax({
			method: 'GET',
			url: '/api/lockers/',
  		}).done(function (data){

			console.log(data);
			showLockers(data);
			lockerGenerator(data);
			stock();
			$(document).ready(function() {
<<<<<<< HEAD
		            $('.vlocker').click(function() {
		                $(this).find('.vpopout').slideDown('duration fast');
=======
				var currentUser = parseInt($('.user-id').attr('data-id'));
		            $('.locker-wrapper').click(function() {
						if ($(this).data('id') !== undefined) {
							if ($(this).data('photo') === null ) {
								$('.item-photo').hide();
							}
							 else {
								$('.item-photo').attr('src', $(this).data('photo'));
								$('.item-photo').show();
							 }
			                $('.lockerDetails').html($(this).data('details'));
							$('.lockerDetails').append('<br>$');
							$('.lockerDetails').append($(this).data('price'));
							if ($(this).data('owner') === currentUser){
								$('.open-button').attr('data-id', $(this).data('locker'));
								$('.stock-button').hide();
								$('.open-button').show();


							}
							else {
								$('.buy-button').attr('data-id', $(this).data('id'));
								$('.stock-button').hide();
								$('.buy-button').show();
							}
						}
						else {
							$('.open-button').attr('data-id', $(this).data('locker'));
							$('.stock-button').attr('data-id', $(this).data('locker'));
							$('.item-photo').hide();
							$('.lockerDetails').html('EMPTY');
							$('.stock-button').show();
							$('.open-button').show();
							$('.buy-button').hide();
						}
						$('.action-container').slideDown('duration fast');
>>>>>>> 43cf0006fd49ecd2eae2b607278b2e27a623c00e
						$('.stock-wrapper').fadeIn('duration fast');

		            });
<<<<<<< HEAD
		            $('.vlocker').mouseleave(function() {
		                $(this).find('.vpopout').hide('duration fast');
						$('.stock-wrapper').hide();
=======
		            $('.close').click(function() {
		                $('.action-container').fadeOut('duration fast');
						$('.stock-wrapper').fadeOut('duration fast');
>>>>>>> 43cf0006fd49ecd2eae2b607278b2e27a623c00e
		            });
					openLocker('.open-button');
					buyItem('.buy-button');
		    });
			// $('.login-submit').on('click', function(){
			// 	var username =$('.login-username').val();
			// })
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
			$('.content').append(lockerHTML);
			return data;
		}


};
