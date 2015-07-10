'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');



module.exports = function (arr, lockernumbers) {
  var i = 0;

	while ( i < lockernumbers) {

		var lockerTitle= arr[i].title;
		var lockerDetails= arr[i].details;

		var squareHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ lockerDetails+'</span><button class="buy-button">Buy</button></div></div>';
		console.log(squareHtml);
		$('.locker-bank').append(squareHtml);		

		

		i++;	 

	};

};