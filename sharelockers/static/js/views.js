require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"dashboard":"<div id=\"layout\">\n    <!-- Menu toggle -->\n    <a href=\"#menu\" id=\"menuLink\" class=\"menu-link\">\n        <!-- Hamburger icon -->\n        <span></span>\n    </a>\n\n    <div id=\"menu\">\n        <div class=\"pure-menu\">\n            <a class=\"pure-menu-heading\" href=\"#\"><img src=\"static/img/shareLOGO.svg\"></a>\n\n            <ul class=\"pure-menu-list\">\n              \n                <li class=\"pure-menu-item items\"><button class=\"icon-archive pure-menu-link\">My Items</button></li>         \n                \n                \n                <li class=\"pure-menu-item location\"><button class=\"icon-location pure-menu-link\">Locations</button></li>\n\n                 <li class=\"pure-menu-item profile\"><button class=\"icon-user-1 pure-menu-link\">My Profile</button></li>\n\n                \n                <li class=\"pure-menu-item logout\"><a href=\"logout/\"><button class=\"icon-sign-out pure-menu-link\">Log Out</button></a></li>\n            </ul>\n        </div>\n        <form action=\"/charge/\" method=\"POST\">\n  <script\n    src=\"https://checkout.stripe.com/checkout.js\" class=\"stripe-button\"\n    data-key=\"pk_test_6pRNASCoBOKtIshFeQd4XMUh\"\n    data-amount=\"2000\"\n    data-name=\"Demo Site\"\n    data-description=\"2 widgets ($20.00)\"\n    data-image=\"/128x128.png\">\n  </script>\n</form>\n    </div>\n\n<!--API SECTION is BELLOW-->\n    <div id=\"main\">\n        <div class=\"header\">\n            <h1 class=\"title\">Welcome <span class=\"this-user\"> </span></h1>\n            \n        </div>\n\n        <div class=\"content\">\n          <h2 class=\"center \"> Please select an option to the left to begin!</h2>\n          \n            <div class=\"center generated\"></div>\n            \n        </div>\n    </div>\n</div>\n\n","home":"<div class=\"my-page-header\">\n    <div>\n\n        <!--<a href=\" \"><img src=\"static/img/logo.svg\"></a>-->\n\n        <ul class=\"select\">\n            <!--<li><a href=\" \">Home</a></li>-->\n            <li><a href=\"/login\"><button class=\"login-btn\" >Log-in</button></a></li>\n            <li><a href=\"/register\"><button class=\"register-btn\">Register</button></a></li>\n\n        </ul>\n    </div>\n</div>\n\n<div  class=\"container hero-container\">\n  <h1 class=\"title\">Share Lockers</h1>\n    <h5 class=\"tagline\">Buy and Sell Locally with Confidence! </h5>\n\n  <a href=\"/register\"><button  class=\"register-btn\">Get Started</button></a>\n  \n  \n </div>\n \n\n<div class=\"container section1\">\n  <h2 class=\"info\">How Share Lockers Helps!</h2>\n \n     \n<div class=\"container home-icon-container section group\">\n     <div class=\"col span_1_of_4\">\n     <img class=\"home-icons\" src=\"static/img/clock.png\"></a>\n      \n      <a href=\"#/location/locker\"><h3>Immediate Access</h3></a>\n      <p>See something you want? Buy it in a few taps from your cell phone.</p>\n        <!--First Search for a Locker Stack in your area. Then View Items for sale using our Virtual Lockers.-->\n      \n      </div>\n      \n      <div class=\"col span_1_of_4\">\n        <img class=\"home-icons\" src=\"static/img/cart.png\"></a>\n        <a href=\"#/dashboard\"><h3>Simplicity</h3></a>\n        <p>See it. Buy it. Take it home.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_4\">\n        <img class=\"home-icons\" src=\"static/img/like.png\">\n        <h3>Local</h3>\n        <p>No shipping means you save money while staying green. Win Win.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_4\">\n        \n        <img class=\"home-icons\" src=\"static/img/thief.png\" height=\"128\" width=\"125\">\n        <h3>Trade Safely</h3>\n        <p>All lockers are located in public areas and sales are conducted via our secure e-commerce platform. </p>\n      </div>\n</div>      \n</div>\n\n\n<div class=\"container section2\">\n  <!--<h2 class=\"info\">How does it work?</h2>-->\n  <div class=\"section group\">\n    <div class=\" col span_1_of_2\"><img src=\"static/img/mockup.jpg\"></div>\n    \n    <div class=\"col span_2_of_2\">\n      <h3>Responsive design</h3>\n      <p>Share Lockers is Desktop, Tablet, & Mobile Ready. You can stock Items, add pictures, buy, and sell from any device! </p>\n    </div>\n  </div>\n</div>  \n\n\n<div class=\"container section3\">\n  <h2 class=\"info\">How it works!</h2>\n \n     \n<div class=\"home-icon-container section group\">\n     <div class=\"col span_1_of_3\">\n     <img class=\"home-icons\" src=\"static/img/search.png\"></a>\n      \n      <a href=\"#/location/locker\"><h3>Browse</h3></a>\n      <p>Check out Lockers in your area in person or through our web portal. Simply click an item's photo to find out more.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_3\">\n        <img class=\"home-icons\" src=\"static/img/cart.png\"></a>\n        <a href=\"#/dashboard\"><h3>Buy</h3></a>\n        <p>Provide your payment information to gain access to the locker and pay the seller. Reap the rewards of instant gratification.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_3\">\n        <img class=\"home-icons\" src=\"static/img/like.png\">\n        <h3>Sell</h3>\n        <p>Stock your item in an empty locker by providing basic information, an image, and a price. Or select a previously purchased item for resale.</p>\n      \n      </div>     \n</div>   \n   \n</div>\n\n\n<div class=\"container about-section\">\n  <h2 class=\"info\">Meet the Team!</h2>\n  <div class=\"home-icon-container section group\">\n     <div class=\"col span_1_of_5\">\n     <img class=\"headshot\" src=\"static/img/falon.jpg\"></a>\n      \n      <h3>Fa'lon</h3>\n      <a href=\"mailto:falont23@gmail.com\" class=\"icon-letter-mail\" ></a>\n        <a href=\"https://www.linkedin.com/pub/falon-thomas/83/618/495\" class=\"icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/falont23\" class=\"icon-fontawesome-webfont\" target=\"_blank\"></a>\n      <p>Front-End Engineer</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/brendan.jpg\"></a>\n        <h3>Brendan</h3>\n        <a href=\"mailto:brendan.c.collins@gmail.com\" class=\"icon-letter-mail\"></a>\n        <a href=\"https://github.com/wholetthedogsout\" class=\"icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://www.linkedin.com/in/brendanccollins\" class=\"icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <p>Front-End Engineer</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/alan.jpg\">\n        <h3>Alan</h3>\n        <a href=\"mailto:alan.rominger@gmail.com\" class=\"icon-letter-mail\"></a>\n        <a href=\"https://www.linkedin.com/pub/alan-rominger/18/365/402\" class=\"icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/AlanCoding\" class=\"icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <p>Python Engineer</p>\n      \n      </div>     \n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/john.png\"></a>\n        <h3>John</h3>\n        <a href=\"mailto:johnwaldrep@gmail.com\" class=\"icon-letter-mail\"></a>\n        <a href=\"https://github.com/jwaldrep\" class=\"icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <p>Python Engineer</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/manish.jpg\"></a>\n        <h3>Manish</h3>\n        <a href=\"mailto:maddypatel@gmail.com\" class=\"icon-letter-mail\"></a>\n        <a href=\"https://www.linkedin.com/in/maddypatel\" class=\"icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/maddypatel\" class=\"icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <p>Python Engineer</p>\n      \n      </div>\n</div>   \n</div>\n\n\n<div class=\"container section5\">\n  <input type=\"text\"placeholder=\"Email Adress\">\n  <button class=\"register-btn\" type=\"submit\">Join our NewsLetter</button>\n</div>\n\n<footer>© ShareLockers....add (facebook icon here)</footer>\n\n\n\n\n\n","locations":"<h2>Our Current Locations</h2>\n<div class=\"list-container\">\n       \n        \t<li class=\"list-item dash-card\">\n        \t\t\t\tname: <%- m.name %> \n\t\t\t\t\t\t\t\t\t<br>\n                Location: <%- m.location %> \n            </li>\n        \n</div>","locker-list":"<div class=\"header\">\n    <div>\n        <a href=\"\">(logo)Share Lockers</a>\n        <ul class=\"select\">\n            <li><a href=\"#\">Home</a></li>\n            <li><a href=\"/login\">Log-in</a></li>\n            <li><a href=\"/register\">Register</a></li>\n        </ul>\n    </div>\n</div>\n\n<h1 class=\"locker-header\">\n    Local Lockers\n</h1>\n\n\n<div class=\"locker-bank\">\n</div>\n\n<div class=\"vpopout\">\n\t\t<img class=\"item-photo\" src=''>\n\t\t<span class=\"lockerDetails\"></span>\n\t\t<button class=\"close\">X</button>\n\t\t<button class=\"open-button\" data-id =''>Open</button>\n\t\t<button class=\"stock-button\" data-id=''>STOCK</button>\n\t\t<button class=\"buy-button\" data-id = ''>Buy</button>\n</div>\n\n\n\n<div class=\"stock-wrapper\">\n</div>\n<div class=\"stock-container\">\n<button class=\"close\">X</button>\n<h4>Stock With an Item in Your Inventory</h4>\n\n<div class=\"item-select\">\n </div>\n\n<h4>or Stock With a New Item</h4>\n\n<form class=\"stock-item\">\n\t\n\t<input class=\"item-title\" placeholder=\"Title\">\n\t<textarea class=\"item-description\" rows=\"4\" cols=\"30\" placeholder=\"Item Description\"></textarea>\n\t<input class=\"item-price\" placeholder=\"price\"><br>\n\t<span>Image: </span><input class=\"photo-input\" type=\"file\">\n\t<input class=\"item-id\" type=\"hidden\">\n\t<button class=\"item-stock\">Stock Item</button>\t\n</form>\n   \n</div>\n\n<script language=\"JavaScript\" type=\"text/javascript\"> \nfunction makeFrame() { \n   ifrm = document.createElement(\"IFRAME\"); \n   ifrm.setAttribute(\"src\", \"http://localhost:8000/login/\"); \n   ifrm.style.width = 640+\"px\"; \n   ifrm.style.height = 480+\"px\"; \n   document.body.appendChild(ifrm); \n} \n</script> \n\n\n\n\n\n\n","my-items":"<h2>Your Current Items</h2>\n\n<div class=\"list-container \">\n        <% m.items.forEach(function (item) { %>\n        \t<li data-title=\"<%- item.title %>\" data-id=\"<%- item.locker %>\"  class=\"list-item dash-card\">\n        \t\t\n                Item: <%- item.title %> \n                  <br>\n                Price: <%- item.price %>\n                  <br>\n                Location: <%- item.locker %> \n                  <br>\n                <button class=\"lockerOpen\">Open</button>\n            </li>\n        <% }) %>\n</div>\n","profile":"<h2>My Profile</h2>\n\n<div class=\"list-container\">\n       \n        \t<li class=\"list-item dash-card\">\n        \t\t\t\tName: <%- m.user %> \n\t\t\t\t\t\t\t\t\t<br>\n                Location: <%- m.rating %> \n\t\t\t\t\t\t\t\t\t<br>\n            \t\tDescription: <%- m.description %> \n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\tAlias: <%- m.alias %> \n\t\t\t\t\t\t</li>\n        \n</div>","stock":"<select class=\"item-inventory\">\n\t  <option>-</option>\n\t  <% m.items.forEach(function (item) { %>\n        \t<option data-description=\"<%- item.description %>\" data-id=\"<%- item.id %>\"  data-title=\"<%- item.title %>\" data-price=\"<%- item.price %>\" class=\"inventory-item\">   \t\t\n                Item: <%- item.title %>,  Price: <%- item.price %>          \n            </option>\n       <% }) %>\n</select>\n\n\n\n\t\t\n\t\t"};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
