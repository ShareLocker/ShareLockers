(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],2:[function(require,module,exports){
// var $ = require("jquery");
//
// // HEADER ANIMATION
// $(function () {
//
// 	$(window).scroll(function() {
// 	  if ($(this).scrollTop() > 1){
// 	    $('.my-page-header').addClass("sticky");
// 	  } else {
// 	    $('.my-page-header').removeClass("sticky");
// 	  }
// 	});
//
// 	// Scroll Indicator
// 	var homeIconContainerTop = $('.home-icons').offset().top - ($(window).height());
//
// 	var homeIconContainerTop2 = $('.home-icons2').offset().top - ($(window).height());
//
// 	$(window).scroll(function() {
//
// 		if ($(window).scrollTop () > homeIconContainerTop) {
// 			$('.home-icons').addClass('slideRight');
// 		}
// 		if ($(window).scrollTop () > homeIconContainerTop2) {
// 			$('.home-icons2').addClass('slideRight');
// 		}
//
// 	});
//
// });
//
// // $(document).ready(function(){
// //   $(".scroll").animate( ".scroll" , 1000 , swing, complete);
// // });

},{}],3:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var getCookie = require('../js/getCookie');
var openLocker = require('../js/openLocker');
var alertStatus = require('../js/alertStatus');

module.exports = function(button) {
    var csrftoken = getCookie('csrftoken');
    $(document).on('click', button, function(e) {
        console.log($(this));
        $('.lgn-button').attr('data-price', $(this).data('price'));
        $('.lgn-button').attr('data-id', $(this).data('id'));
        $('.lgn-button').attr('data-locker', $(this).data('locker'));
        console.log($('.user-id').html().length);
        if ($('.user-id').html().length === 1) {
            $('.not-loggedin-container').css("width", "100%");
            $('.stock-wrapper').show();
            $('.close').click(function() {
                $('.stock-wrapper').hide();
                $('.not-loggedin-container').css("width", "0%");
                $('.buy-confirmation-container').css("width", "0%");
                $('.buy-open-container').css("width", "0%");
            });
            $('.lgn-button').click(function() {
                $('.buy-confirmation-container').css("width", "100%")
                $('.cost').html($(this).data('price'));
                $('.confirm-btn').attr('data-price', $(this).data('price'));
                $('.confirm-btn').attr('data-id', $(this).data('id'));
                $('.confirm-btn').attr('data-locker', $(this).data('locker'));
                var username = $('.username-login').val();
                var password = $('.user-password').val();
                $.ajax({
                    beforeSend: function(request) {
                        request.setRequestHeader('X-CSRFToken', csrftoken);
                    },
                    method: 'POST',
                    url: '/login/',
                    data: {
                        "username": username,
                        "password": password
                    }

                }).done(function(data) {
                    console.log(data);
                    var id = data.match(/data-id="(\d+)/);
                    var user = parseInt(id[1]);
                    $('.confirm-btn').attr('data-owner', user);
                }).fail(function(data) {
                    alertStatus('oh no! try again');
                });
            });
            $('.close').click(function() {
                parent.location.reload();
            });
            $('.cancel-btn').click(function() {
                parent.location.reload();
            });
            $('.open-later').click(function() {
                parent.location.reload();
            });
        } else {
            var user = parseInt($('.user-id').data('id'));
            console.log(user);
            $('.buy-confirmation-container').css("width", "100%")
            $('.cost').html($(this).data('price'));
            $('.confirm-btn').attr('data-price', $(this).data('price'));
            $('.confirm-btn').attr('data-id', $(this).data('id'));
            $('.confirm-btn').attr('data-owner', user);
            $('.confirm-btn').attr('data-locker', $(this).data('locker'));
            $('.close').click(function() {
                $('.stock-wrapper').hide();
                $('.not-loggedin-container').css("width", "0%");
                $('.buy-confirmation-container').css("width", "0%");
                $('.buy-open-container').css("width", "0%");
            });
        }
        $('.confirm-btn').click(function() {
            var csrftoken = getCookie('csrftoken');
            var itemId = this.getAttribute('data-id');
            var user = this.getAttribute('data-owner');
            $('.open-now').attr('data-locker', $(this).data('locker'));
            console.log(csrftoken);
            $.ajax({
                beforeSend: function(request) {
                    console.log(csrftoken)
                    request.setRequestHeader('X-CSRFToken', csrftoken);
                },
                method: 'POST',
                url: '/api/purchases/',
                data: {
                    "item": itemId,
                    "buyer": user
                }
            }).done(function(data) {
                console.log(data);

                $('.buy-open-containter').css("width", "100%");
                console.log($(this).data('locker'));
                openLocker('.open-now', user);
            }).fail(function(data) {
                alertStatus("Item could not be purchased");
                console.log(data.responseText);
            });

        });

        $('.cancel-btn').click(function() {
            $('.not-loggedin-container').css("width", "0%");
            $('.buy-confirmation-container').css("width", "0%");
        });
        $('.open-later').click(function() {
            $('.not-loggedin-container').css("width", "0%");
            $('.buy-confirmation-container').css("width", "0%");
            setTimeout('parent.location.reload()', 100);
        });
        document.location.href = '/#/dashboard'
    });
}

},{"../js/alertStatus":1,"../js/getCookie":10,"../js/openLocker":13,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
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
  $(".this-credits").html($(".user-id").attr("data-credits"));
  
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
  window.location.href = '/reservations/';
  // //$(".generated").show();
  // $(".faq").hide();
  //   $.ajax({
  //   			method: 'GET', 
  //   			url: '/api/owneditems/',
  //     		}).done(function (data){
  //   			console.log(data);
  //         showLists(data, 'my-items', '.generated');
    		
    // });
   });
   
   

$(".help").click(function(){
  
    $(".faq-container").show();
    $(".faq").show();
    $(".generated").hide();
});

$(".close-help").click(function(){
    $(".faq-container").hide();
})

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
    


	
			
			
			
		


},{"../controllers/locker-list":8,"../router":14,"../show":15,"../showLists":16,"jquery":"jquery","underscore":"underscore","views":"views"}],5:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');

router.route('help', function () {
		
	show('help');
	$.ajax({
			method: 'GET', 
			url: '/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
	


});
},{"../router":14,"../show":15,"jquery":"jquery","underscore":"underscore","views":"views"}],6:[function(require,module,exports){
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
			url: 'https://sharelockers.herokuapp.com/api/profiles/',
  		}).done(function (data){
			console.log(data);
		});
	


});
},{"../router":14,"../show":15,"jquery":"jquery","underscore":"underscore","views":"views"}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
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


module.exports = function () {


		$.ajax({
			method: 'GET',
			url: '/api/lockers/',
  		}).done(function (data){

			console.log(data);
			showLockers(data);
			lockerGenerator(data);
			stock();
			$(document).ready(function() {
				var currentUser = parseInt($('.user-id').attr('data-id'));
		            $('.locker-wrapper').click(function() {
						if ($(this).data('id') !== undefined) {
							if ($(this).data('photo') === null ) {
								$('.item-photo').hide();
							}
							 else {
								$('.item-photo').attr('src', $(this).data('photo'));
								$('.item-photo').show();
							 }
			                $('.lockerDetails').html($(this).data('details'));
							$('.lockerDetails').append('<br>$');
							$('.lockerDetails').append($(this).data('price'));
							if ($(this).data('owner') === currentUser){
								$('.open-button').attr('data-locker', $(this).data('locker'));
								$('.stock-button').hide();
								$('.open-button').show();


							}
							else {
								$('.buy-button').attr('data-id', $(this).data('id'));
								$('.buy-button').attr('data-price', $(this).data('price'));
								$('.buy-button').attr('data-locker', $(this).data('locker'));
								$('.stock-button').hide();
								$('.buy-button').show();
							}
						}
						else {
							$('.open-button').attr('data-locker', $(this).data('locker'));
							$('.stock-button').attr('data-locker', $(this).data('locker'));
							$('.item-photo').hide();
							$('.lockerDetails').html('EMPTY');
							$('.stock-button').show();
							$('.open-button').hide();
							$('.buy-button').hide();
						}
						$('.action-container').slideDown('duration fast');
						$('.stock-wrapper').fadeIn('duration fast');

		            });
		            $('.close').click(function() {
		                $('.action-container').fadeOut('duration fast');
						$('.stock-wrapper').fadeOut('duration fast');
						$('.stock-container').css('width', "0%");
		            });
					openLocker('.open-button', currentUser);
					buyItem('.buy-button');
		    });
			// $('.login-submit').on('click', function(){
			// 	var username =$('.login-username').val();
			// })
		});

		// $.ajax({
		// 	method: 'GET',
		// 	url: '/api/profiles/',
  		// }).done(function (data){
		// 	console.log(data);
		// });


		function showLockers(data) {
			var lockerTemplate = views['locker-list'];
		    var templateFn = _.template(lockerTemplate, { variable: 'm' });
		    var lockerHTML = templateFn({ lockers: data });
			$('.content').append(lockerHTML);
			return data;
		}


};

},{"../buyItem":3,"../getCookie":10,"../lockerGenerator":12,"../openLocker":13,"../router":14,"../show":15,"../stock":18,"jquery":"jquery","underscore":"underscore","views":"views"}],9:[function(require,module,exports){
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
},{"../getCookie":10,"../openLocker":13,"../router":14,"../show":15,"../showLists":16,"jquery":"jquery","underscore":"underscore","views":"views"}],10:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],11:[function(require,module,exports){
// TODO: put initialization logic here
'use strict';


var router = require('./router');

require('./animations');

// Require all of our controllers
({"controllers":({"dashboard":require("./controllers/dashboard.js"),"help":require("./controllers/help.js"),"home":require("./controllers/home.js"),"locations":require("./controllers/locations.js"),"locker-list":require("./controllers/locker-list.js"),"my-items":require("./controllers/my-items.js")})});

// Start the router
router.init();
},{"./animations":2,"./controllers/dashboard.js":4,"./controllers/help.js":5,"./controllers/home.js":6,"./controllers/locations.js":7,"./controllers/locker-list.js":8,"./controllers/my-items.js":9,"./router":14}],12:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],13:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var getCookie = require('../js/getCookie');
var alertStatus = require('../js/alertStatus');

module.exports = function(button, user) {
    $(document).on('click', button, function() {
        console.log(this);
        var id = this.getAttribute('data-locker');
        var profile = user;
        var csrftoken = getCookie('csrftoken');
        console.log(csrftoken);
        $.ajax({
            beforeSend: function(request) {
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
        }).done(function(data) {
            console.log(data);
            alertStatus("Locker open");
            setTimeout('parent.location.reload()', 100);
        }).fail(function(data) {
            console.log(data);
            alertStatus("Unable to open at this time");
        })
    });

}
},{"../js/alertStatus":1,"../js/getCookie":10,"jquery":"jquery","underscore":"underscore","views":"views"}],14:[function(require,module,exports){
'use strict';

var SortedRouter = require('./sorted-router');

module.exports = new SortedRouter();
},{"./sorted-router":17}],15:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],16:[function(require,module,exports){
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
},{"jquery":"jquery","underscore":"underscore","views":"views"}],17:[function(require,module,exports){
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
},{"backbone":"backbone","underscore":"underscore"}],18:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../js/router');
var getCookie = require('../js/getCookie');
var show = require('../js/show');
var showLists = require('../js/showLists');
var openLocker = require('../js/openLocker');
var alertStatus = require('../js/alertStatus');

module.exports = function() {

    $('.stock-button').click(function() {
        if ($('.user-id').html().length === 1) {
            $('.not-loggedin-container').css("width", "100%");
            $('.stock-wrapper').show();
            $('.lgn-button').click(function() {
                var csrftoken = getCookie('csrftoken');
                var username = $('.username-login').val();
                var password = $('.user-password').val();
                $.ajax({
                    beforeSend: function(request) {
                        request.setRequestHeader('X-CSRFToken', csrftoken);
                    },
                    method: 'POST',
                    url: '/login/',
                    data: {
                        "username": username,
                        "password": password
                    }
                }).done(function(data) {
                    console.log(data);
                    var id = data.match(/data-id="(\d+)/);
                    var user = parseInt(id[1]);
                    setTimeout('parent.location.reload()', 500);
                }).fail(function(data) {
                    alertStatus('Unable to open at this time');
                    console.log(data);
                });
            });
            $('.close').click(function() {
                $('.stock-wrapper').hide();
                $('.not-loggedin-container').css("width", "0%");
            });
        } else {
            $('.stock-container').css("width", "100%");
        };

        var lockerId = $(this).attr('data-locker');
        console.log(lockerId);
        $.ajax({
            method: 'GET',
            url: '/api/owneditems/',
        }).done(function(data) {
            console.log(data);
            showLists(data, 'stock', '.item-select');
            $('.item-inventory').on('change', function() {
                $('.item-title').val($(".item-inventory option:selected").data('title'));
                $('.item-description').val($(".item-inventory option:selected").data('description'));
                $('.item-price').val($(".item-inventory option:selected").data('price'));
                $('.item-id').val($(".item-inventory option:selected").data('id'));
            });


            $('.item-stock').click(function(e) {
                openLocker('.item-stock', owner);
                e.stopPropagation();
                e.preventDefault();
                var data = new FormData();
                var file = $('.photo-input').get(0).files[0];
                var csrftoken = getCookie('csrftoken');
                var title = $('.item-title').val();
                var description = $('.item-description').val();
                var price = $('.item-price').val();
                var owner = $('.user-id').attr('data-id');
                var photo = $('.photo-input').val();
                console.log(photo);
                data.append('photo', file);
                data.append('title', title);
                data.append('description', description);
                data.append('price', price);
                data.append('owner', owner);
                data.append('locker', lockerId);

                if ($('.item-id').val() == 0) {
                    if (photo == 0) {
                        $.ajax({
                            beforeSend: function(request) {
                                console.log(csrftoken)
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            console.log(x);
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },
                                method: 'POST',
                                url: '/api/owneditems/',
                                data: {
                                    'title': title,
                                    'description': description,
                                    'price': price,
                                    'owner': owner,
                                    'locker': lockerId
                                }
                            }).done(function(data) {
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            console.log(data);
                            alertStatus("Unable to open at this time");
                        })

                    } else {
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },

                                method: 'POST',
                                url: '/api/owneditems/',
                                data: data,
                                dataType: 'json',
                                processData: false, // Don't process the files
                                contentType: false
                            }).done(function(data) {
                                console.log(data);
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            alertStatus("Unable to open at this time");
                        })

                    }
                } else {
                    var itemId = $('.item-id').val();
                    if (photo == 0) {
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },

                                method: 'PUT',
                                url: '/api/owneditems/' + itemId,
                                data: {
                                    'title': title,
                                    'description': description,
                                    'price': price,
                                    'owner': owner,
                                    'locker': lockerId
                                }
                            }).done(function(data) {
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            alertStatus("Unable to open at this time");
                        })

                    } else {
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },
                                method: 'PUT',
                                url: '/api/owneditems/' + itemId,
                                data: data,
                                dataType: 'json',
                                processData: false, // Don't process the files
                                contentType: false
                            }).done(function(data) {
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            alertStatus("Unable to open at this time");
                        })

                    }

                }

            });
        });
    });

};

},{"../js/alertStatus":1,"../js/getCookie":10,"../js/openLocker":13,"../js/router":14,"../js/show":15,"../js/showLists":16,"jquery":"jquery","underscore":"underscore","views":"views"}]},{},[11])


//# sourceMappingURL=app.js.map