require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"dashboard":"<div id=\"layout\">\n    <!-- Menu toggle -->\n    <a href=\"#menu\" id=\"menuLink\" class=\"menu-link\">\n        <!-- Hamburger icon -->\n        <span></span>\n    </a>\n\n    <div id=\"menu\">\n        <div class=\"pure-menu\">\n            <a class=\"pure-menu-heading\" href=\"#\"><img src=\"static/img/shareLOGO.svg\"></a>\n\n            <ul class=\"pure-menu-list\">\n              \n                <li class=\"pure-menu-item items\"><button class=\"pure-menu-link\"><span class=\"flaticon-archive34\">My Items</button></li>         \n                \n                \n                <li class=\"pure-menu-item location\"><button class=\"pure-menu-link\"><span class=\"flaticon-computers7\">Locations</button></li>\n\n                 <li class=\"pure-menu-item profile\"><button class=\"pure-menu-link\"><span class=\"flaticon-internet16\">My Profile</button></li>\n\n                \n                <li class=\"pure-menu-item logout\"><button class=\"pure-menu-link\">Log Out</button></li>\n            </ul>\n        </div>\n        <form action=\"/charge/\" method=\"POST\">\n  <script\n    src=\"https://checkout.stripe.com/checkout.js\" class=\"stripe-button\"\n    data-key=\"pk_test_6pRNASCoBOKtIshFeQd4XMUh\"\n    data-amount=\"2000\"\n    data-name=\"Demo Site\"\n    data-description=\"2 widgets ($20.00)\"\n    data-image=\"/128x128.png\">\n  </script>\n</form>\n    </div>\n\n<!--API SECTION is BELLOW-->\n    <div id=\"main\">\n        <div class=\"header\">\n            <h1>Welcome\n            <a href=\"#\" class=\"user-id\" data-id=\"{{user.id}}\" data-alias=\"{{ user.profile.alias }}\">Falon</a></h1>\n        </div>\n\n        <div class=\"content\">\n          <h2 class=\"center\"> Please select an option to the left to begin!</h2>\n            <div class=\"center generated\"></div>\n            \n        </div>\n    </div>\n</div>\n\n","home":"<div class=\"my-page-header\">\n    <div>\n\n        <!--<a href=\" \"><img src=\"static/img/logo.svg\"></a>-->\n\n        <ul class=\"select\">\n            <!--<li><a href=\" \">Home</a></li>-->\n            <li><a href=\"/login\"><button class=\"login-btn\" >Log-in</button></a></li>\n            <li><a href=\"/register\"><button class=\"register-btn\">Register</button></a></li>\n\n        </ul>\n    </div>\n</div>\n\n<div  class=\"container hero-container\">\n  <h1 class=\"title\">Share Lockers</h1>\n    <h5 class=\"tagline\">Buy and Sell Locally with Confidence! </h5>\n\n  <a href=\"/register\"><button  class=\"register-btn\">Get Started</button></a>\n  \n  \n </div>\n \n\n<div class=\"container section1\">\n  <h2 class=\"info\">How Share Lockers Helps!</h2>\n \n     \n<div class=\"section group\">\n     <div class=\"col span_1_of_4\"><h3>Search Locally</h3><a href=\"#/location/locker\"><span class=\"slideRight flaticon-magnifying59\"></span>\n     <img class=\"slideRight\" src=\"static/img/search.png\"></a>\n      \n      \n      <p>First Search for a Locker Stack in your area. Then View Items for sale using our Virtual Lockers.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_4\"><h3>Buy </h3><a href=\"#/dashboard\"><span class=\"slideRight flaticon-payment7\">\n      <img class=\"slideRight\" src=\"static/img/cart.png\"></a>\n      \n        <p>Choose an Item that you wish to purchase via our virtual lockers on desktop, tablet or mobile. When you ready go to th Locker Stack and pay for the Item and open up the locker to retrieve it with the push of a button!</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_4\"><h3>Sell</h3><span class=\"slideRight flaticon-computers7\">\n      <img class=\"slideRight\" src=\"static/img/safe.png\">\n      \n        <p>Choose an Empty Locker via our Virtual Lockers. Provide an item name, description and Image and price. Go to the Locker Stack and stock your item in the assigned locker. Thats it, once your item is puchased the money will be credited to your account.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_4\">\n        <h3>Trade Safely</h3>\n        <img class=\"slideRight\" src=\"static/img/thief.png\">\n        <p>All lockers are located in a public areas. Buy and sell without the fear of getting robbed!!!!!! </p>\n      </div>\n</div>      \n      \n\n\n</div>\n\n\n<div class=\"container section2\">\n  <!--<h2 class=\"info\">How does it work?</h2>-->\n<div>\n    \n</div>\n\n\n</div>\n\n\n<div class=\" section3\">\n  <h1 class=\"action-call\">What are you waiting for!!</h1>\n</div>\n<footer>© ShareLockers....add (facebook icon here)</footer>\n\n\n\n\n\n","locations":"<h2>Our Current Locations</h2>\n<div class=\"list-container\">\n       \n        \t<li class=\"list-item dash-card\">\n        \t\t\t\tname: <%- m.name %> \n\t\t\t\t\t\t\t\t\t<br>\n                Location: <%- m.location %> \n            </li>\n        \n</div>","locker-list":"<div class=\"header\">\n    <div>\n        <a href=\"\">(logo)Share Lockers</a>\n        <ul class=\"select\">\n            <li><a href=\"#\">Home</a></li>\n            <li><a href=\"/login\">Log-in</a></li>\n            <li><a href=\"/register\">Register</a></li>\n        </ul>\n    </div>\n</div>\n\n<h1 class=\"locker-header\">\n    Local Lockers\n</h1>\n\n\n<div class=\"locker-bank\">\n</div>\n\n<div class=\"stock-wrapper\">\n</div>\n<div class=\"stock-container\">\n<button class=\"close\">X</button>\n<h4>Stock With an Item in Your Inventory</h4>\n\n<div class=\"item-select\">\n </div>\n\n<h4>or Stock With a New Item</h4>\n\n<form class=\"stock-item\">\n\t\n\t<input class=\"item-title\" placeholder=\"Title\">\n\t<textarea class=\"item-description\" rows=\"4\" cols=\"50\" placeholder=\"Item Description\"></textarea>\n\t<input class=\"item-price\" placeholder=\"price\"><br>\n\t<span>Image: </span><input class=\"item-photo\" type=\"file\">\n\t<input class=\"item-id\" type=\"hidden\">\n\t<button class=\"item-stock\">Stock Item</button>\t\n</form>\n   \n</div>\n\n\n\n\n","my-items":"<h2>Your Current Items</h2>\n\n<div class=\"list-container \">\n        <% m.items.forEach(function (item) { %>\n        \t<li data-title=\"<%- item.title %>\" data-id=\"<%- item.locker %>\"  class=\"list-item dash-card\">\n        \t\t\n                Item: <%- item.title %> \n                  <br>\n                Price: <%- item.price %>\n                  <br>\n                Location: <%- item.locker %> \n                  <br>\n                <button class=\"lockerOpen\">Open</button>\n            </li>\n        <% }) %>\n</div>","profile":"<h2>My Profile</h2>\n\n<div class=\"list-container\">\n       \n        \t<li class=\"list-item dash-card\">\n        \t\t\t\tName: <%- m.user %> \n\t\t\t\t\t\t\t\t\t<br>\n                Location: <%- m.rating %> \n\t\t\t\t\t\t\t\t\t<br>\n            \t\tDescription: <%- m.description %> \n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\tAlias: <%- m.alias %> \n\t\t\t\t\t\t</li>\n        \n</div>","stock":"<select class=\"item-inventory\">\n\t  <option>-</option>\n\t  <% m.items.forEach(function (item) { %>\n        \t<option data-description=\"<%- item.description %>\" data-id=\"<%- item.id %>\"  data-title=\"<%- item.title %>\" data-price=\"<%- item.price %>\" class=\"inventory-item\">   \t\t\n                Item: <%- item.title %>,  Price: <%- item.price %>          \n            </option>\n       <% }) %>\n</select>\n\n\n\n\t\t\n\t\t"};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
