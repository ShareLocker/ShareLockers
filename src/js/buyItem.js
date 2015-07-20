'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button) {
	var csrftoken = getCookie('csrftoken'); 
	$(document).on('click', button, function (e) {
		console.log($('.user-id').html().length);
		if ($('.user-id').html().length === 1) {
				$('.not-loggedin-container').css("width", "100%");
				$('.stock-wrapper').show();
			 $('.close').click(function(){
				 $('.stock-wrapper').hide();
				 $('.not-loggedin-container').css("width", "0%");
				 $('.buy-confirmation-container').css("width", "0%");
				})
		$('.lgn-button').click(function(){
				var data = new FormData();
				var username = $('.username-login').val();
				var password =$('.user-password').val();
				data.append('username', username);
				data.append('password', username);
				$.ajax({
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'POST', 
					url: '/login/',
					data: {
					   "username": username,
					   "password": password
					}
					
		  		}).then(getCredits()).fail(function(data){
					alert('oh no! try again');
					console.log(data);
				});
			});
		}
		

		// 	var itemId = this.getAttribute('data-id');
		// 	var buyerId = $('.user-id').attr('data-id');
		// 	console.log(csrftoken);
		// 		$.ajax({
		// 			beforeSend: function (request){
		// 			console.log(csrftoken)
		//             request.setRequestHeader('X-CSRFToken', csrftoken);
		//            },
		// 			method: 'POST', 
		// 			url: '/api/purchases/',
		// 			data: {
		// 			   "item": itemId,
		// 			   "buyer": buyerId
		// 			}
		//   		}).done(function (data){
		// 			console.log(data);
		// 			setTimeout('parent.location.reload()',500);
		// 			alert("The Item is Yours!")
		// 		}).fail(function(data){
		// 			console.log(data);
		// 		});
				
		// 		document.location.href = '/#/dashboard'
		// });
	
});
}

		function getCredits() {
						alert('yay');
						$.ajax({
							method: 'GET',
							dataType: 'text',
							URL: 'api/mycredits/',
							}).done(function (data){
							console.log(data);
						// var credits = $('.user-id').attr('data-credits');
						// 	$('.credits').html(credits);
							$('.buy-confirmation-container').css("width", "100%");
						}).fail(function(data){
							alert('oh no! try again');
							console.log(data);
						})
			}