'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../js/router');
var getCookie = require('../js/getCookie');
var show = require('../js/show');
var showLists = require('../js/showLists');

module.exports = function () {
	 $('.stock-button').click(function() {
		 var lockerId = $(this).attr('data-id');
		 console.log(lockerId);
		 $('.stock-wrapper').fadeIn('duration fast');
		 $('.stock-container').fadeIn('duration fast');
		 $('.close').click(function(){
			 $('.stock-wrapper').hide();
		 	 $('.stock-container').hide();
		 })
	
	$.ajax({
			method: 'GET', 
			url: '/api/owneditems/',
  		}).done(function (data){
			console.log(data);
			showLists(data, 'stock', '.item-select');
			$('.item-inventory').on('change', function () {
				$('.item-title').val($(".item-inventory option:selected").data('title'));
				$('.item-description').val($(".item-inventory option:selected").data('description'));
				$('.item-price').val($(".item-inventory option:selected").data('price'));
				$('.item-id').val($(".item-inventory option:selected").data('id'));
			});
				$('.item-stock').click(function (e) {
				e.stopPropagation();	
				e.preventDefault();
				var csrftoken = getCookie('csrftoken');
				var title = $('.item-title').val();
				var description = $('.item-description').val();
				var price = $('.item-price').val();
				var owner = $('.user-id').attr('data-id');
					if ($('.item-id').val() == 0) {
						$.ajax({		
						beforeSend: function (request){
			            request.setRequestHeader('X-CSRFToken', csrftoken);
			           },
						method: 'POST', 
						url: '/api/owneditems/',
						data: {	"title": title,
								"description": description,
								"price": price,
								"owner": owner,
								"locker": lockerId					
							}
			  			}).done(function (data){
							console.log(data);
						});
						document.location.href = '/#/location/locker';
					}
					else {
						var itemId = $('.item-id').val();
						$.ajax({		
						beforeSend: function (request){
			            request.setRequestHeader('X-CSRFToken', csrftoken);
			           },
						method: 'PUT', 
						url: '/api/owneditems/'+itemId,
						data: {	"title": title,
								"description": description,
								"price": price,
								"owner": owner,
								"locker": lockerId					
							}
			  			}).done(function (data){
							console.log(data);
						});
						document.location.href = '/#/location/locker';
					}
				});
		  });
	});
};