require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"buy":"","dashboard":"","home":"<div class=\"header\">\n    <div>\n        <a href=\"\">(logo)Share Lockers</a>\n        <ul class=\"select\">\n            <li><a href=\"#\">Home</a></li>\n            <li><a href=\"/login\">Log-in</a></li>\n            <li><a href=\"/register\">Register</a></li>\n        </ul>\n    </div>\n</div>\n\n<div class=\" container hero-container\">\n    <div>\n        <h1>Share <br> Lockers</h1>\n        <h3>\n            Buy and Sell Locally with Confidence!\n        </h3>\n        <p>\n            <a href=\"#\" class=\"\">Get Started</a>\n        </p>\n    </div>\n</div>\n \n\n<div class=\" container section1\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><a href=\"#/location/locker\">Search</a></div>\n    <div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><a href=\"#\">Buy</a></div>\n    <div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><a href=\"#\">Sell</a></div>\n    <div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"></div>\n  </div>\n</div>\n\n\n","locker-list":"<div class=\"header\">\n    <div>\n        <a href=\"\">(logo)Share Lockers</a>\n        <ul class=\"select\">\n            <li><a href=\"#\">Home</a></li>\n            <li><a href=\"/login\">Log-in</a></li>\n            <li><a href=\"/register\">Register</a></li>\n        </ul>\n    </div>\n</div>\n\n<div class=\" container hero-container\">\n    <div>\n        <h1>Share <br> Lockers</h1>\n        <h3>\n            Buy and Sell Locally with Confidence!\n        </h3>\n    </div>\n</div>\n\n\n<div class=\"pure-menu custom-restricted-width\">\n    <ul class=\"pure-menu-list\">\n        <% m.lockers.forEach(function (locker) { %>\n        \t<li class=\"locker-container pure-menu-item\">\n        \t\tLocation:\n                <%- locker.column %>, <%- locker.row %><br>\n        \t\tCurrently Rented By:\n        \t\t<%- locker.owner %>\n                <script><%- locker.id %></script>\n                <button class=\"lockerOpen\">Open</button>\n            </li>\n            \n        <% }) %>\n    </ul>\n</div>\n\n","sell":""};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
