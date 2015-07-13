(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// HEADER ANIMATION

var $ = require("jquery");

$(window).scroll(function() {
  if ($(this).scrollTop() > 1){
    $('.my-page-header').addClass("sticky");
  } else {
    $('.my-page-header').removeClass("sticky");
  }
});




},{"jquery":"jquery"}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
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
},{"../router":10,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
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

},{"../router":9,"../show":10,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
>>>>>>> 0f5338f2fd2613239551a04f511fb52df9b445fd
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
},{"../router":10,"../show":11,"jquery":"jquery","underscore":"underscore","views":"views"}],5:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var lockerGenerator = require('../lockerGenerator');

router.route('location/locker', function () {
	var arr = [{title : 'teddy', details : 'A Really Big Teddy Bear'}, {title : 'car', details : 'A Super Fast car'}, {title : 'coat', details : 'A leather coat'}, {title : 'flowers', details : '1,000 Roses'}, {title : 'shoes', details : 'Air Jordans, size 9'}, {title : 'marbles', details : 'a million marbles'}, {title : 'liver', details : 'one human liver'}, {title : 'drugs', details : 'so many drugs'} ];
	
		
		$.ajax({
			method: 'GET', 
			url: '/api/lockers/',
  		}).done(function (data){
			console.log(data);
			showLockers(data);
			lockerGenerator(data);
			$(document).ready(function() {
		            $('.vlocker').click(function() {
						$(this).animate('flip');
		                $(this).find('.vpopout').show('duration fast');
		            });
		            $('.vlocker').mouseleave(function() {
		                $(this).find('.vpopout').hide('duration fast');
		            });
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
		
		
		
		
		function getCookie(name) {
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
		}

});
},{"../lockerGenerator":9,"../router":10,"../show":11,"jquery":"jquery","underscore":"underscore","views":"views"}],6:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],7:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('stock/:local_name', function (local_name) {
	console.log(local_name);
	show('stock');
});
},{"../router":10,"../show":11,"jquery":"jquery","underscore":"underscore","views":"views"}],8:[function(require,module,exports){
// TODO: put initialization logic here
'use strict';


var router = require('./router');

require('./animations');

// Require all of our controllers
({"controllers":({"buy":require("./controllers/buy.js"),"dashboard":require("./controllers/dashboard.js"),"home":require("./controllers/home.js"),"locker-list":require("./controllers/locker-list.js"),"sell":require("./controllers/sell.js"),"stock":require("./controllers/stock.js")})});

// Start the router
router.init();
},{"./animations":1,"./controllers/buy.js":2,"./controllers/dashboard.js":3,"./controllers/home.js":4,"./controllers/locker-list.js":5,"./controllers/sell.js":6,"./controllers/stock.js":7,"./router":10}],9:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],10:[function(require,module,exports){
'use strict';

var SortedRouter = require('./sorted-router');

module.exports = new SortedRouter();
},{"./sorted-router":12}],11:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],12:[function(require,module,exports){
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
},{"backbone":"backbone","underscore":"underscore"}]},{},[8])


//# sourceMappingURL=app.js.map