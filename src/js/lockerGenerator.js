'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');



module.exports = function (arr) {
  var i = 0;
  var j = 0;

	while ( i < arr.length) {
		console.log(arr);
		var lockerTitle= arr[i].local_code;
		var lockerActions= arr[i].actions;
		var lockerRow = 1;
		var lockerColumn = 1;
		
		if (lockerActions[0] === 'can_stock'){
		var stockHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'<br>EMPTY</span><div class="vpopout"><span class="lockerDetails">EMPTY</span><a href="#/stock/'+ lockerTitle +
		'" class="stock-button">STOCK</a></div></div>';
		$('.locker-bank').append(stockHtml);
		
		}
		else {
		var itemTitle = arr[i].item_set[0].title;
		var itemDetails = arr[i].item_set[0].description;
		var buyHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle + '<br>' + itemTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ itemDetails +'</span><button class="buy-button">Buy</button></div></div>';
		$('.locker-bank').append(buyHtml);
		 
		}

		++i;	 
		
	};

};