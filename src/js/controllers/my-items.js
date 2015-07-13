var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var showLists = require('../showLists')
var getCookie = require('../getCookie')
var openLocker = require('../openLocker')

router.route('my-items/user', function () {
	
	
		$.ajax({
			method: 'GET', 
			url: '/api/owneditems/',
  		}).done(function (data){
			console.log(data);
			showLists(data, 'my-items', '.main-content');
			openLocker('.list-item');
		  });
		
 });