'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button) {
	$(document).on('click', button ,function () {
			console.log(this);
			var id = this.getAttribute('data-id');
			var profile = $('.user-id').attr('data-id');
			var csrftoken = getCookie('csrftoken'); 
			console.log(csrftoken);
				$.ajax({
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'POST', 
					url: '/api/unlocks/',
					data: {
					   "waiting": true,
					   "profile": profile,
					   "locker": id
					}
		  		}).done(function (data){
					console.log(data);
				});
		});
	
}