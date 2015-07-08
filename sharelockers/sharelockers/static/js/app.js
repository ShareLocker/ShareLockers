(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $=require("jquery");$(window).scroll(function(){$(this).scrollTop()>1?$(".my-page-header").addClass("sticky"):$(".my-page-header").removeClass("sticky")});

},{"jquery":"jquery"}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("",function(){show("home"),$.ajax({method:"GET",url:"/api/profiles/"}).done(function(e){console.log(e)})});


},{"../router":7,"../show":8,"jquery":"jquery","underscore":"underscore","views":"views"}],4:[function(require,module,exports){
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views"),router=require("../router"),show=require("../show");router.route("location/locker",function(){function e(e){var o=views["locker-list"],t=_.template(o,{variable:"m"}),r=t({lockers:e});return $(".main-content").html(r),e}function o(e){var o=null;if(document.cookie&&""!=document.cookie)for(var t=document.cookie.split(";"),r=0;r<t.length;r++){var n=$.trim(t[r]);if(n.substring(0,e.length+1)==e+"="){o=decodeURIComponent(n.substring(e.length+1));break}}return console.log(o),o}$.ajax({method:"GET",url:"/api/lockers/"}).done(function(o){console.log(o),e(o)}),$.ajax({method:"GET",url:"/api/profiles/"}).done(function(e){console.log(e)}),$(document).on("click",".locker-container",function(){var e=this.getAttribute("data-id"),t=this.getAttribute("data-column"),r=this.getAttribute("data-row"),n=o("csrftoken");console.log(n),$.ajax({beforeSend:function(e){console.log(n),e.setRequestHeader("X-CSRFToken",n)},method:"PUT",url:"/api/lockers/"+e,data:{hub:1,row:r,column:t}}).done(function(e){console.log(e)}),alert("yay")})});


},{"../router":8,"../show":9,"jquery":"jquery","underscore":"underscore","views":"views"}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
"use strict";var router=require("./router");require("./animations"),{controllers:{buy:require("./controllers/buy.js"),dashboard:require("./controllers/dashboard.js"),home:require("./controllers/home.js"),"locker-list":require("./controllers/locker-list.js"),sell:require("./controllers/sell.js")}},router.init();

},{"./animations":1,"./controllers/buy.js":2,"./controllers/dashboard.js":3,"./controllers/home.js":4,"./controllers/locker-list.js":5,"./controllers/sell.js":6,"./router":8}],8:[function(require,module,exports){
"use strict";var SortedRouter=require("./sorted-router");module.exports=new SortedRouter;

},{"./sorted-router":10}],9:[function(require,module,exports){
"use strict";var $=require("jquery"),_=require("underscore"),views=require("views");module.exports=function(e,r){var i=views[e],t=_.template(i,{variable:"m"}),u=t(r);$(".main-content").html(u)};

},{"jquery":"jquery","underscore":"underscore","views":"views"}],10:[function(require,module,exports){
"use strict";var Backbone=require("backbone"),_=require("underscore"),SortedRouter=Backbone.Router.extend({sortedRoutes:{},route:function(){for(var e=arguments.length-1,t=arguments[arguments.length-1],r=0;e>r;++r)this.sortedRoutes[arguments[r]]=t},init:function(){var e=-1e6,t=this;_.chain(_.pairs(this.sortedRoutes)).sortBy(function(t){var r=t[0];return r.indexOf("*")>=0?e:-r.split(":").length}).each(function(e){Backbone.Router.prototype.route.apply(t,e)}),Backbone.history.start()}});module.exports=SortedRouter;

},{"backbone":"backbone","underscore":"underscore"}]},{},[7])


//# sourceMappingURL=app.js.map