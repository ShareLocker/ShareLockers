(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../router":7,"../show":8,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
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
			lockerGenerator(arr, 8);
			$(document).ready(function() {
		            $('.vlocker').mouseover(function() {
		                $(this).find('.vpopout').slideDown();
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
},{"../lockerGenerator":6,"../router":7,"../show":8,"jquery":"jquery","underscore":"underscore","views":"views"}],5:[function(require,module,exports){
// TODO: put initialization logic here
'use strict';


var router = require('./router');

require('./animations');

// Require all of our controllers
({"controllers":({"dashboard":require("./controllers/dashboard.js"),"home":require("./controllers/home.js"),"locker-list":require("./controllers/locker-list.js")})});

// Start the router
router.init();
},{"./animations":1,"./controllers/dashboard.js":2,"./controllers/home.js":3,"./controllers/locker-list.js":4,"./router":7}],6:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');



module.exports = function (arr, lockernumbers) {
  var i = 0;

	while ( i < lockernumbers) {

		var lockerTitle= arr[i].title;
		var lockerDetails= arr[i].details;

		var squareHtml = '<div class="vlocker"><span class="card animated"><span class="lockerTitle">'+ lockerTitle +'</span><div class="vpopout"><span class="lockerDetails">'+ lockerDetails+'</span></div></div>';
		console.log(squareHtml);
		$('.locker-bank').append(squareHtml);		

		

		i++;	 

	};

};
},{"jquery":"jquery","underscore":"underscore","views":"views"}],7:[function(require,module,exports){
'use strict';

var SortedRouter = require('./sorted-router');

module.exports = new SortedRouter();
},{"./sorted-router":9}],8:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],9:[function(require,module,exports){
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
=======
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("",function(){show("home"),$.ajax({method:"GET",url:"/api/profiles/"}).done(function(e){console.log(e)})});

},{"../router":6,"../show":7,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("location/locker",function(){function e(e){var o=views["locker-list"],t=_.template(o,{variable:"m"}),r=t({lockers:e});return $(".main-content").html(r),e}function o(e){var o=null;if(document.cookie&&""!=document.cookie)for(var t=document.cookie.split(";"),r=0;r<t.length;r++){var n=$.trim(t[r]);if(n.substring(0,e.length+1)==e+"="){o=decodeURIComponent(n.substring(e.length+1));break}}return console.log(o),o}$.ajax({method:"GET",url:"/api/lockers/"}).done(function(o){console.log(o),e(o)}),$.ajax({method:"GET",url:"/api/profiles/"}).done(function(e){console.log(e)}),$(document).on("click",".locker-container",function(){var e=this.getAttribute("data-id"),t=this.getAttribute("data-column"),r=this.getAttribute("data-row"),n=o("csrftoken");console.log(n),$.ajax({beforeSend:function(e){console.log(n),e.setRequestHeader("X-CSRFToken",n)},method:"PUT",url:"/api/lockers/"+e,data:{hub:1,row:r,column:t}}).done(function(e){console.log(e)})})});

},{"../router":6,"../show":7,"jquery":"jquery","underscore":"underscore","views":"views"}],5:[function(require,module,exports){
"use strict";var router=require("./router");require("./animations"),{controllers:{dashboard:require("./controllers/dashboard.js"),home:require("./controllers/home.js"),"locker-list":require("./controllers/locker-list.js")}},router.init();

},{"./animations":1,"./controllers/dashboard.js":2,"./controllers/home.js":3,"./controllers/locker-list.js":4,"./router":6}],6:[function(require,module,exports){
"use strict";var SortedRouter=require("./sorted-router");module.exports=new SortedRouter;

},{"./sorted-router":8}],7:[function(require,module,exports){
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views");module.exports=function(e,r){var i=views[e],t=_.template(i,{variable:"m"}),u=t(r);$(".main-content").html(u)};

},{"jquery":"jquery","underscore":"underscore","views":"views"}],8:[function(require,module,exports){
"use strict";var Backbone=require("backbone"),_=require("underscore"),SortedRouter=Backbone.Router.extend({sortedRoutes:{},route:function(){for(var e=arguments.length-1,t=arguments[arguments.length-1],r=0;e>r;++r)this.sortedRoutes[arguments[r]]=t},init:function(){var e=-1e6,t=this;_.chain(_.pairs(this.sortedRoutes)).sortBy(function(t){var r=t[0];return r.indexOf("*")>=0?e:-r.split(":").length}).each(function(e){Backbone.Router.prototype.route.apply(t,e)}),Backbone.history.start()}});module.exports=SortedRouter;

>>>>>>> 184e98407e275af120d79e584d5ff0022683403d
},{"backbone":"backbone","underscore":"underscore"}]},{},[5])


//# sourceMappingURL=app.js.map