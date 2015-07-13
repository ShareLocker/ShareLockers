'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');



module.exports = function (arr) {
  var i = 0;

	while ( i < arr.length) {
		console.log(arr);
		var lockerId = arr[i].id
		var lockerTitle= arr[i].local_code;
		var lockerActions= arr[i].actions;
		var currentUser = $('.user-id').attr('data-id');
		// var lockerRow = arr[i].row;
		// var lockerColumn = arr[i].column;
		
		
		
		if (lockerActions[1] === "can_open" ){
		var openHTML = '<div class="vlocker" ><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'<br>EMPTY</span><div class="vpopout"><span class="lockerDetails">EMPTY</span><a href="#/stock/'+ lockerId +
		'" class="stock-button">STOCK</a><button class="open-button" data-id = '+lockerId+'>Open</button></div></div>';
		$('.locker-bank').append(openHTML);
		}
		
		else if (lockerActions[0] === 'can_stock'){
		var stockHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'<br>EMPTY</span><div class="vpopout"><span class="lockerDetails">EMPTY</span><a href="#/stock/'+ lockerId +
		'" class="stock-button">STOCK</a></div></div>';
		$('.locker-bank').append(stockHtml);
		}
		
		
		else {
		var itemOwner = arr[i].item_set[0].owner;
		var itemTitle = arr[i].item_set[0].title;
		var itemDetails = arr[i].item_set[0].description;
		var itemId = arr[i].item_set[0].id;
		if (currentUser = itemOwner ) {
			var ownerHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle + '<br>' + itemTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ itemDetails +'</span><button class="open-button" data-id = '+lockerId+'>Open</button></div></div>';
			$('.locker-bank').append(ownerHtml);
		}
		else {
			var buyHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle + '<br>' + itemTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ itemDetails +'</span><button class="buy-button" data-id = '+itemId+'>Buy</button></div></div>';
			$('.locker-bank').append(buyHtml);
		}
		}

		++i;	 
		
	};

};