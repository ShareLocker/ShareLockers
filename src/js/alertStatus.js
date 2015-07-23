'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');

module.exports = function (msg) {
	$('.message').html(msg);
 	$('.alert-container').show();
  	$('.message').html(msg);
	$('.close-alert').click(function(){
		 $('.alert-container').hide();
	 });
	$('.alert-button').click(function(){
		 $('.alert-container').hide();
	});
};