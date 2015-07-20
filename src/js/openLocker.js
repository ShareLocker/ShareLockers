'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button, user) {
	$(document).on('click', button ,function () {
			console.log(this);
			var id = this.getAttribute('data-locker');
			var profile = user;
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
					alert("Locker Open");
					setTimeout('parent.location.reload()',500);
				}).fail(function (data){
					console.log(data);
					alert("Unable to Open at this Time");
				})
		});
	
}