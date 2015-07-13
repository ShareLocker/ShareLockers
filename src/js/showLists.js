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