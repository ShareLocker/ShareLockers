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
								$('.open-button').attr('data-locker', $(this).data('locker'));
								$('.stock-button').hide();
								$('.open-button').show();


							}
							else {
								$('.buy-button').attr('data-id', $(this).data('id'));
								$('.buy-button').attr('data-price', $(this).data('price'));
								$('.buy-button').attr('data-locker', $(this).data('locker'));
								$('.stock-button').hide();
								$('.buy-button').show();
							}
						}
						else {
							$('.open-button').attr('data-locker', $(this).data('locker'));
							$('.stock-button').attr('data-locker', $(this).data('locker'));
							$('.item-photo').hide();
							$('.lockerDetails').html('EMPTY');
							$('.stock-button').show();
							$('.open-button').show();
							$('.buy-button').hide();
						}
						$('.action-container').slideDown('duration fast');
						$('.stock-wrapper').fadeIn('duration fast');

		            });
		            $('.close').click(function() {
		                $('.action-container').fadeOut('duration fast');
						$('.stock-wrapper').fadeOut('duration fast');
		            });
					openLocker('.open-button', currentUser);
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
