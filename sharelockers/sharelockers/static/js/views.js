require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){

var views={"buy":"","dashboard":"","home":"<div class=\"my-page-header\">\n    <div>\n        <a href=\" \">(logo)Share Lockers</a>\n        <ul class=\"select\">\n            <!--<li><a href=\" \">Home</a></li>-->\n            <li><a href=\"/login\"><button >Log-in</button></a></li>\n            <li><a href=\"/register\"><button class=\"register-btn\" >Register</button></a></li>\n        </ul>\n    </div>\n</div>\n\n<div class=\"container hero-container\">\n  <h1>Share Lockers</h1>\n  <h5>Buy and Sell Locally with Confidence! </h5>\n  <a href=\"/register\"><button class=\"register-btn\">Get Started</button></a>\n </div>\n \n\n<div class=\"container section1\">\n  <h2>How Share Lockers Helps!</h2>\n</div>\n\n\n<div class=\"container section2\">\n  \n  <div class=\"pure-g\">\n     \n   <div class=\"info pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-3\"><a href=\"#/location/locker\"><h3>Search</h3><span class=\"icon flaticon-magnifying59\"></span></a>\n   \n    \n    \n    <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>\n    \n    </div>\n    \n    <div class=\"info pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-3\"><a href=\"#\"><h3>Buy</h3><span class=\"icon flaticon-payment7\"></a>\n    \n      <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>\n    \n    </div>\n    \n    <div class=\"info pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-3\"><a href=\"#\"><h3>Sell</h3><span class=\"icon flaticon-computers7\"></a>\n    \n      <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>\n    \n    </div>\n    \n  </div>\n</div>\n\n\n<div class=\" section3\">\n  <h1>What are you waiting for!!</h1>\n</div>\n\n\n\n\n\n","locker-list":"<div class=\"header\">\n    <div>\n        <a href=\"\">(logo)Share Lockers</a>\n        <ul class=\"select\">\n            <li><a href=\"#\">Home</a></li>\n            <li><a href=\"/login\">Log-in</a></li>\n            <li><a href=\"/register\">Register</a></li>\n        </ul>\n    </div>\n</div>\n\n<h1 class=\"locker-header\">\n    Local Lockers\n</h1>\n\n\n<div class=\"locker-bank\">\n</div>\n\n<!--<div class=\"list-container pure-menu custom-restricted-width\">\n    <ul class=\"pure-menu-list\">\n        <% m.lockers.forEach(function (locker) { %>\n        \t<li data-column=\"<%- locker.column %>\" data-row=\"<%- locker.row %>\" data-id=\"<%- locker.id %>\" class=\"locker-container pure-menu-item\">\n        \t\t\n                Column: <%- locker.column %>  Row: <%- locker.row %><br>\n        \t\tCurrently Rented By:\n        \t\t<%- locker.owner %>\n                <button class=\"lockerOpen\">Open</button>\n            </li>\n        <% }) %>\n    </ul>\n</div>-->\n\n\n","my-items":"","profile":"","sell":""};

if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
