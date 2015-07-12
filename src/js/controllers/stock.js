'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var getCookie = require('../getCookie');
var show = require('../show');

router.route('stock/:stockURL', function (stockURL) {
	
	show('stock');
	$('.item-stock').click(function (e) {
		e.preventDefault();
		var csrftoken = getCookie('csrftoken');
		var title = $('.item-title').val();
		var description = $('.item-description').val();
		var price = $('.item-price').val();
		var owner = $('.owner').val();

		
		$.ajax({
			
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'POST', 
					url: '/api/owneditems/',
					data: {	"title": title,
							"description": description,
							"price": price,
							"owner": owner,
							"locker": stockURL					
						}
		  		}).done(function (data){
					console.log(data);
				});
			window.location.href = '/#/location/locker';
	})
	
});