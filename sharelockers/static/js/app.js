(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require("jquery");

// HEADER ANIMATION
$(function () {
	
	$(window).scroll(function() {
	  if ($(this).scrollTop() > 1){
	    $('.my-page-header').addClass("sticky");
	  } else {
	    $('.my-page-header').removeClass("sticky");
	  }
	});
	
	// Scroll Indicator
	var homeIconContainerTop = $('.home-icons').offset().top - ($(window).height());
	
	$(window).scroll(function() {
		
		if ($(window).scrollTop () > homeIconContainerTop) {
			$('.home-icons').addClass('slideRight');
		}
			
	});

});

// $(document).ready(function(){
//   $(".scroll").animate( ".scroll" , 1000 , swing, complete);
// });
},{"jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button) {
	$(document).on('click', button ,function () {
			console.log(this);
			var itemId = this.getAttribute('data-id');
			var buyerId = $('.user-id').attr('data-id');
			var csrftoken = getCookie('csrftoken'); 
			console.log(csrftoken);
				$.ajax({
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'POST', 
					url: '/api/purchases/',
					data: {
					   "item": itemId,
					   "buyer": buyerId
					}
		  		}).done(function (data){
					console.log(data);
					alert("The Item is Yours!")
				}).fail(function(data){
					console.log(data);
				});
				
				document.location.href = '/#/location/locker'
		});
	
}
},{"../js/getCookie":9,"jquery":"jquery","underscore":"underscore","views":"views"}],3:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');

module.exports = function (selector) {
	$(document).on('click', function (){
      var hex = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += hex[Math.floor(Math.random() * 16)];
      }
	 $(selector).css("border-color", color);
       $(selector).css({ boxShadow: '1px 3px 6px' + color +''});
      
});
};


},{"jquery":"jquery","underscore":"underscore"}],4:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var showLists =require('../showLists');


router.route('dashboard', function () {
  show('dashboard');
	$('.this-user').html($('.user-id').attr('data-name'));
  
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

//api info for LOCATION TAB IS BELOW

$('.location').on('click', function() {
    
    $.ajax({
    			method: 'GET', 
    			url: '/api/hubs/',
      		}).done(function (data){
    			console.log(data);
          showLists(data, 'locations', '.generated');
    			
    });

});

//api info for PROFILES TAB IS BELOW
  var buyerId = $('.user-id').attr('data-id');
  
$('.profile').on('click', function() {
     
    $.ajax({
    			method: 'GET', 
    			url: '/api/profiles/' + buyerId,
      		}).done(function (data){
    			console.log(data);
          showLists(data, 'profile', '.generated');
    			
    });
   });
});
    


	
			
			
			
		


},{"../router":13,"../show":14,"../showLists":15,"jquery":"jquery","underscore":"underscore","views":"views"}],5:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('', function () {
		
	show('home');
	$.ajax({
			method: 'GET', 
			url: '/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
	


});
},{"../router":13,"../show":14,"jquery":"jquery","underscore":"underscore","views":"views"}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var getCookie = require('../getCookie');
var lockerGenerator = require('../lockerGenerator');
var openLocker = require('../openLocker');
var buyItem = require('../buyItem');
var stock = require('../stock');
var colorGen = require('../colorGen');

router.route('location/locker', function () {
	//var arr = [{title : 'teddy', details : 'A Really Big Teddy Bear'}, {title : 'car', details : 'A Super Fast car'}, {title : 'coat', details : 'A leather coat'}, {title : 'flowers', details : '1,000 Roses'}, {title : 'shoes', details : 'Air Jordans, size 9'}, {title : 'marbles', details : 'a million marbles'}, {title : 'liver', details : 'one human liver'}, {title : 'drugs', details : 'so many drugs'} ];
	
		
		$.ajax({
			method: 'GET', 
			url: '/api/lockers/',
  		}).done(function (data){
			console.log(data);
			showLockers(data);
			lockerGenerator(data);
			stock();
			colorGen('.card');
			$(document).ready(function() {
		            $('.vlocker').click(function() {
		                $(this).find('.vpopout').show('duration fast');
		            });
		            $('.vlocker').mouseleave(function() {
		                $(this).find('.vpopout').hide('duration fast');
		            });
					openLocker('.open-button');
					buyItem('.buy-button');
		    });
		});
		
		$.ajax({
			method: 'GET', 
			url: '/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
		

		function showLockers(data) {
			var lockerTemplate = views['locker-list'];
		    var templateFn = _.template(lockerTemplate, { variable: 'm' });
		    var lockerHTML = templateFn({ lockers: data });
			$('.main-content').html(lockerHTML);
			return data;
		}


});
},{"../buyItem":2,"../colorGen":3,"../getCookie":9,"../lockerGenerator":11,"../openLocker":12,"../router":13,"../show":14,"../stock":17,"jquery":"jquery","underscore":"underscore","views":"views"}],8:[function(require,module,exports){
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
},{"../getCookie":9,"../openLocker":12,"../router":13,"../show":14,"../showLists":15,"jquery":"jquery","underscore":"underscore","views":"views"}],9:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');

module.exports = function getCookie(name) {
   			var cookieValue = null;
   			if (document.cookie && document.cookie != '') {
       		var cookies = document.cookie.split(';');
       		for (var i = 0; i < cookies.length; i++) {
           	var cookie = $.trim(cookies[i]);
           // Does this cookie string begin with the name we want?
           if (cookie.substring(0, name.length + 1) == (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
          	 }
       		}	
   		   }
		   console.log(cookieValue);
		   return cookieValue;
		
};
},{"jquery":"jquery","underscore":"underscore","views":"views"}],10:[function(require,module,exports){
// TODO: put initialization logic here
'use strict';


var router = require('./router');

require('./animations');

// Require all of our controllers
({"controllers":({"dashboard":require("./controllers/dashboard.js"),"home":require("./controllers/home.js"),"locations":require("./controllers/locations.js"),"locker-list":require("./controllers/locker-list.js"),"my-items":require("./controllers/my-items.js")})});

// Start the router
router.init();
},{"./animations":1,"./controllers/dashboard.js":4,"./controllers/home.js":5,"./controllers/locations.js":6,"./controllers/locker-list.js":7,"./controllers/my-items.js":8,"./router":13}],11:[function(require,module,exports){
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
		
		
		
		
		if (lockerActions[1] === "can_open" ){
		var openHTML = '<div class="vlocker" ><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'<br>EMPTY</span><div class="vpopout"><span class="lockerDetails">EMPTY</span><button data-id='+ lockerId +
		' class="stock-button">STOCK</button><button class="open-button" data-id = '+lockerId+'>Open</button></div></div>';
		$('.locker-bank').append(openHTML);
		}
		
		// else if (lockerActions[0] === 'can_stock'){
		// var stockHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'<br>EMPTY</span><div class="vpopout"><span class="lockerDetails">EMPTY</span><a href="#/stock/'+ lockerId +
		// '" class="stock-button">STOCK</a></div></div>';
		// $('.locker-bank').append(stockHtml);
		// }
		
		
		else {
		var itemPrice = arr[i].item_set[0].price;
		var itemOwner = arr[i].item_set[0].owner;
		var itemTitle = arr[i].item_set[0].title;
		var itemDetails = arr[i].item_set[0].description;
		var itemId = arr[i].item_set[0].id;
		var itemPrice = arr[i].item_set[0].price;
		
		if (currentUser == itemOwner ) {
			
			var ownerHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle + '<br>' + itemTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ itemDetails +'<br>'+'$'+ itemPrice + '</span><button class="open-button" data-id = '+lockerId+'>Open</button></div></div>';
			$('.locker-bank').append(ownerHtml);
			console.log(currentUser);
			console.log(itemOwner);
		}
		else {
			var buyHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle + '<br>' + itemTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ itemDetails + ' '+ itemPrice +' credits </span><button class="buy-button" data-id = '+itemId+'>Buy</button></div></div>';
			$('.locker-bank').append(buyHtml);
		}
		}

		++i;	 
		
	};

};
},{"jquery":"jquery","underscore":"underscore","views":"views"}],12:[function(require,module,exports){
'use strict';

var $ = require ('jquery');
var _ = require ('underscore');
var views = require ('views');
var getCookie = require ('../js/getCookie');

module.exports = function (button) {
	$(document).on('click', button ,function () {
			console.log(this);
			var id = this.getAttribute('data-id');
			var profile = $('.user-id').attr('data-id');
			var csrftoken = getCookie('csrftoken'); 
			console.log(csrftoken);
				$.ajax({
					beforeSend: function (request){
					console.log(csrftoken)
		            request.setRequestHeader('X-CSRFToken', csrftoken);
		           },
					method: 'POST', 
					url: '/api/unlocks/',
					data: {
					   "waiting": true,
					   "profile": profile,
					   "locker": id
					}
		  		}).done(function (data){
					console.log(data);
				});
		});
	
}
},{"../js/getCookie":9,"jquery":"jquery","underscore":"underscore","views":"views"}],13:[function(require,module,exports){
'use strict';

var SortedRouter = require('./sorted-router');

module.exports = new SortedRouter();
},{"./sorted-router":16}],14:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');

module.exports = function (templateName, model) {
  var rawTemplate = views[templateName];
  var templateFn = _.template(rawTemplate, { variable: 'm' });
  var hydratedHTML = templateFn(model);
  
  $('.main-content').html(hydratedHTML);
};
},{"jquery":"jquery","underscore":"underscore","views":"views"}],15:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');

module.exports = function showLists(data, view, html) {
			var listTemplate = views[view];
		    var templateFn = _.template(listTemplate, { variable: 'm' });
		    var listHTML = templateFn({ items: data });
			$(html).html(listHTML);
			return data;
		};
},{"jquery":"jquery","underscore":"underscore","views":"views"}],16:[function(require,module,exports){
'use strict';
 
var Backbone = require('backbone');
var _ = require('underscore');
 
var SortedRouter = Backbone.Router.extend({
  sortedRoutes: {},
  
  // Overwrite the Backbone.Router.route method so we can 
  // register routes in the correct order.
  route: function () {
    var len = arguments.length - 1,
        callback = arguments[arguments.length - 1];
 
    for (var i = 0; i < len; ++i) {
      this.sortedRoutes[arguments[i]] = callback;
    }
  },
  
  init: function () {
    // A magic number to force a route to be lowest specificity
    // Number.MIN_VALUE didn't work...
    var lowestRoute = -1000000;
    var me = this;
 
    // Register all routes, sorted by specificity
    _.chain(_.pairs(this.sortedRoutes))
      .sortBy(function (route) {
        var url = route[0];
 
        if (url.indexOf('*') >= 0) {
          return lowestRoute;
        } else {
          return -url.split(':').length;
        }
      })
      .each(function (route) {
        Backbone.Router.prototype.route.apply(me, route);
      });
 
    // Start the backbone routing subsystem
    Backbone.history.start();
  }
});
 
module.exports = SortedRouter;
},{"backbone":"backbone","underscore":"underscore"}],17:[function(require,module,exports){
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
},{"../js/getCookie":9,"../js/router":13,"../js/show":14,"../js/showLists":15,"jquery":"jquery","underscore":"underscore","views":"views"}]},{},[10])


//# sourceMappingURL=app.js.map