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