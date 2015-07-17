'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button) {
	$(document).on('click', button ,function () {
			console.log(this);
			var itemId = this.getAttribute('data-id');
			var buyerId = $('.user-id').attr('data-id');
			var csrftoken = getCookie('csrftoken'); 
			console.log(csrftoken);
				$.ajax({
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'POST', 
					url: '/api/purchases/',
					data: {
					   "item": itemId,
					   "buyer": buyerId
					}
		  		}).done(function (data){
					console.log(data);
					setTimeout('parent.location.reload()',500);
					alert("The Item is Yours!")
				}).fail(function(data){
					console.log(data);
				});
				
				document.location.href = '/#/location/locker'
		});
	
}