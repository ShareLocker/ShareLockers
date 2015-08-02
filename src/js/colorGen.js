'use strict';

var $ = require('jquery');
var _ = require('underscore');

module.exports = function(selector) {
    $(document).on('click', function() {
        var hex = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
        }
        $(selector).css("border-color", color);
        $(selector).css({
            boxShadow: '1px 3px 6px' + color + ''
        });

    });
};

