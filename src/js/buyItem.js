'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button) {
	var csrftoken = getCookie('csrftoken'); 
	$(document).on('click', button ,function () {
		console.log($('.user-id').length);
		if ($('.user-id').length === 1) {
				$('.not-loggedin-container').css("width", "100%");
				$('.stock-wrapper').show();
			 $('.close').click(function(){
				 $('.stock-wrapper').hide();
				 $('.not-loggedin-container').css("width", "0%");
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
					//dataType: 'json',
					data: {
					   "username": username,
					   "password": password
					}
					
		  		}).done(function (data){
					console.log(data);
					alert('yay');
					//setTimeout('parent.location.reload()',500);
				}).fail(function(data){
					alert('oh no');
					console.log(data);
				});
		})
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