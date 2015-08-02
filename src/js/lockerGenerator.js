'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');



module.exports = function(arr) {
    var i = 0;

    while (i < arr.length) {
        console.log(arr);
        var lockerId = arr[i].id
        var lockerTitle = arr[i].local_code;
        var lockerActions = arr[i].actions;
        var currentUser = $('.user-id').attr('data-id');

        if (lockerActions[1] === "can_open") {
            var openHTML = '<div class="locker-wrapper" data-locker=' + lockerId + '><div class="vlocker"><span class="card animated"><span class="lockerTitle">' + lockerTitle + '<br>EMPTY</span></span></div></div>';
            $('.locker-bank').append(openHTML);
        } 
		else {
            var itemPhoto = arr[i].item_set[0].photo;
            var itemOwner = arr[i].item_set[0].owner;
            var itemTitle = arr[i].item_set[0].title;
            var itemDetails = arr[i].item_set[0].description;
            var itemId = arr[i].item_set[0].id;
            var itemPrice = arr[i].item_set[0].price;
	            if (itemPhoto === null) {
	                var html = '<div data-photo="' + itemPhoto + '" data-price=' + itemPrice + ' data-owner=' + itemOwner + ' data-details="' + itemDetails + '" data-id=' + itemId + ' data-locker=' + lockerId + ' class="locker-wrapper"><div class="vlocker"><span class="card animated"><span class="lockerTitle">' + lockerTitle + '<br>' + itemTitle + '</span></span></div></div>';
	                $('.locker-bank').append(html);
	            } 
				else {
	                var ownerHtml = '<div data-photo="' + itemPhoto + '" data-price=' + itemPrice + ' data-owner=' + itemOwner + ' data-details="' + itemDetails + '" data-id=' + itemId + ' data-locker=' + lockerId + ' class="locker-wrapper"><div class="vlocker"><span class="card animated"><div class="image-wrapper"><img src=' + itemPhoto + '></div><span class="lockerTitle">' + lockerTitle + '<br>' + itemTitle + '</span></span></div></div>';
	                $('.locker-bank').append(ownerHtml);
	            }

        }

        ++i;

    };

};