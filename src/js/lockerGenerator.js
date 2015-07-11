'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');



module.exports = function (arr) {
  var i = 0;

	while ( i < arr.length) {

		var lockerTitle= arr[i].local_code;
		var lockerActions= arr[i].actions;
		
		if (lockerActions[0] === 'can_stock'){
		var squareHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'<br>EMPTY</span><div class="vpopout"><span class="lockerDetails">EMPTY</span><a href="#/dashboard/user" class="stock-button">STOCK</a></div></div>';
		$('.locker-bank').append(squareHtml);		
		}
		else {
		var squareHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ lockerActions +'</span><button class="buy-button">Buy</button></div></div>';
		$('.locker-bank').append(squareHtml);	
		}

		i++;	 
		
	};

};