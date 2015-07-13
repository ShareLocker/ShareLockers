<<<<<<< HEAD
=======
'use strict';

>>>>>>> 0f5338f2fd2613239551a04f511fb52df9b445fd
var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
<<<<<<< HEAD

router.route('dashboard/user', function () {
	
			$(document).on('click', '.locker-container' , function () {
			var id = this.getAttribute('data-id');
			var col =this.getAttribute('data-column');
			var row =this.getAttribute('data-row');
			var csrftoken = getCookie('csrftoken'); 
			console.log(csrftoken);
				$.ajax({
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'PUT', 
					url: '/api/lockers/'+id,
					data: {	"hub": 1,
							"row": row,
							"column": col
						}
		  		}).done(function (data){
					console.log(data);
				});
		});
	
})
=======
var show = require('../show');


router.route('dashboard', function () {
		
	show('dashboard');
	$.ajax({
			method: 'GET', 
			url: '/api/profiles/',
  		}).done(function (data){
			console.log(data);

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

		});
	


});
>>>>>>> 0f5338f2fd2613239551a04f511fb52df9b445fd
