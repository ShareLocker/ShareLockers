'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var showLists =require('../showLists');
var lockers =require('../controllers/locker-list');


router.route('dashboard', function () {
  show('dashboard');
	$('.this-user').html($('.user-id').attr('data-name'));
  lockers();
  
// RESPONSIVE DASHBOARD MENU
			
			(function () {
    
    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

}(this, this.document));
// api info for 'My Items' TAB IS BELOW	

$('.items').on('click', function() {

    $.ajax({
    			method: 'GET', 
    			url: '/api/owneditems/',
      		}).done(function (data){
    			console.log(data);
          showLists(data, 'my-items', '.generated');
    			
    });
   });
   
   
   $('.help').on('click', function() {

    $.ajax({
    			method: 'GET', 
    			url: '/api/help/',
      		}).done(function (data){
    			console.log(data);
          showLists(data, 'my-items', '.generated');
    			
    });
   });

//api info for LOCATION TAB IS BELOW

// $('.location').on('click', function() {
    
//     $.ajax({
//     			method: 'GET', 
//     			url: '/api/hubs/',
//       		}).done(function (data){
//     			console.log(data);
//           showLists(data, 'locations', '.generated');
    			
//     });

// });

//api info for PROFILES TAB IS BELOW
  var buyerId = $('.user-id').attr('data-id');
  
// $('.profile').on('click', function() {
     
//     $.ajax({
//     			method: 'GET', 
//     			url: '/api/profiles/' + buyerId,
//       		}).done(function (data){
//     			console.log(data);
//           showLists(data, 'profile', '.generated');
    			
//     });
//    });
});
    


	
			
			
			
		

