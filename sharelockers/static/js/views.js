require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"dashboard":"<div id=\"layout\">\n    <!-- Menu toggle -->\n    <a href=\"#menu\" id=\"menuLink\" class=\"menu-link\">\n        <!-- Hamburger icon -->\n        <span></span>\n    </a>\n\n    <div id=\"menu\">\n        <div class=\"pure-menu\">\n            <a class=\"pure-menu-heading\" href=\"#\"><img src=\"static/img/shareLOGO.svg\"></a>\n\n            <ul class=\"pure-menu-list\">\n              \n                <li class=\"pure-menu-item items\"><button class=\"icon-archive pure-menu-link\"> My Items</button></li>        \n                \n                <li class=\"pure-menu-item help\"><button class=\"icon-question-1 pure-menu-link\"> Help  </button></li> \n                \n<!--                \n                <li class=\"pure-menu-item location\"><button class=\"icon-location pure-menu-link\">Locations</button></li>\n\n                 <li class=\"pure-menu-item profile\"><button class=\"icon-user-1 pure-menu-link\">My Profile</button></li>-->\n\n                \n                <li class=\"pure-menu-item logout\"><a href=\"logout/\"><button class=\"icon-sign-out pure-menu-link\"> Log Out</button></a></li>\n            </ul>\n        </div>\n        <form action=\"/charge/\" method=\"POST\">\n  <script\n    src=\"https://checkout.stripe.com/checkout.js\" class=\"stripe-button\"\n    data-key=\"pk_test_6pRNASCoBOKtIshFeQd4XMUh\"\n    data-amount=\"2000\"\n    data-name=\"Demo Site\"\n    data-description=\"2 widgets ($20.00)\"\n    data-image=\"/128x128.png\">\n  </script>\n</form>\n    </div>\n\n<!--API SECTION is BELLOW-->\n    <div id=\"main\">\n        <div class=\"header\">\n            <h1 class=\"title\">Welcome <span class=\"this-user\"> </span></h1>\n            \n        </div>\n\n        <div class=\"content\">\n          <h2 class=\"center \">Credits: <span class=\"this-credits\"></span></h2>\n          \n            <div class=\"generated\"></div>\n             <div class=\"faq\">\n               <h2>Help Section</h2>\n\n                <p> This will be istructions walking the user through the process!</p>\n                \n                <p> This will be istructions walking the user through the process!</p>\n                \n                <p> This will be istructions walking the user through the process!</p>\n                \n                <p> This will be istructions walking the user through the process!</p>\n             </div>\n        </div>\n    </div>\n</div>\n\n","help":"<h2>Help Section</h2>\n\n<p> This will be istructions walking the user through the process!</p>","home":"<div class=\"my-page-header\">\n    <div>\n\n        <!--<a href=\" \"><img src=\"static/img/logo.svg\"></a>-->\n\n        <ul class=\"select\">\n            <!--<li><a href=\" \">Home</a></li>-->\n            <li><a href=\"/login\"><button class=\"login-btn\" >Log-in</button></a></li>\n            <li><a href=\"/register\"><button class=\"register-btn\">Register</button></a></li>\n\n        </ul>\n    </div>\n</div>\n\n<div  class=\"container hero-container\">\n  <h1 class=\"title\">ShareLockers</h1>\n    <h5 class=\"tagline\">Buy and Sell Locally with Confidence. </h5>\n\n  <a href=\"#/dashboard\"><button  class=\"register-btn\">Get Started</button></a>\n  \n  \n </div>\n \n\n<div class=\"container section1\">\n  <h2 class=\" info\">ShareLockers are</h2>\n \n     \n<div class=\"container home-icon-container section group\">\n     <div class=\"col span_1_of_3\">\n     <img class=\"home-icons\" src=\"static/img/clock.png\"></a>\n      \n      <a href=\"#/dashboard\"> <h3>Instant</h3></a>\n      <p>See something you want? Buy it in a few taps from your cell phone.</p>\n        <!--First Search for a Locker Stack in your area. Then View Items for sale using our Virtual Lockers.-->\n      \n      </div>\n      \n      <!--<div class=\"col span_1_of_4\">\n        <img class=\"home-icons\" src=\"static/img/cart.png\"></a>\n        <a href=\"#/dashboard\"><h3>Simplicity</h3></a>\n        <p>See it. Buy it. Take it home.</p>\n      \n      </div>-->\n      \n      <div class=\"col span_1_of_3\">\n        <img class=\"home-icons\" src=\"static/img/map.png\">\n        <h3>Local</h3>\n        <p>No shipping means you save money while staying green. Win Win.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_3\">\n        \n        <img class=\"home-icons\" src=\"static/img/thief.png\" height=\"128\" width=\"125\">\n        <h3>Safe</h3>\n        <p>All lockers are located in public areas and sales are conducted via our secure e-commerce platform. </p>\n      </div>\n</div>      \n</div>\n\n\n<div class=\"container section2\">\n  <!--<h2 class=\"info\">How does it work?</h2>-->\n  <div class=\"section group\">\n    <div class=\" col span_1_of_2\"><img src=\"static/img/mockup.jpg\"></div>\n    \n\n    <div class=\"response col span_2_of_2\">\n      <h3>Responsive</h3>\n      <p>Share Lockers is Desktop, Tablet, & Mobile Ready. You can stock Items, add pictures, buy, and sell from any device! </p>\n    </div>\n  </div>\n</div>  \n\n\n<div class=\"container  section3\">\n  <h2 class=\"info\">How it Works</h2>\n \n     \n<div class=\"home-icon-container section group\">\n     <div class=\"col span_1_of_3\">\n     <img class=\"home-icons2\" src=\"static/img/search.png\"></a>\n      \n      <h3>Browse</h3>\n      <p>Check out ShareLockers in your area in person or through our web portal. Simply click an item's photo to find out more.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_3\">\n        <img class=\"home-icons2\" src=\"static/img/cart.png\"></a>\n        <h3>Buy</h3>\n        <p>Provide your payment information to gain access to the locker and pay the seller. Reap the rewards of instant gratification.</p>\n      \n      </div>\n      \n      <div class=\"col span_1_of_3\">\n        <img class=\"home-icons2\" src=\"static/img/buy.png\">\n        <h3>Sell</h3>\n        <p>Stock your item in an empty locker by providing basic information, an image, and a price. Or select a previously purchased item for resale.</p>\n      \n      </div>     \n</div>   \n   \n</div>\n\n\n<div class=\"container about-section\">\n  <h2 class=\"info\">Meet the Team</h2>\n  <div class=\"home-icon-container section group\">\n     <div class=\"col span_1_of_5\">\n     <img class=\"headshot\" src=\"static/img/falon.jpg\"></a>\n      \n      <h3>Fa'lon</h3>\n      <a href=\"mailto:falont23@gmail.com\" class=\"contact-icon icon-letter-mail\" ></a>\n        <a href=\"https://www.linkedin.com/pub/falon-thomas/83/618/495\" class=\"contact-icon icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/falont23\" class=\"contact-icon icon-fontawesome-webfont\" target=\"_blank\"></a>\n      <h6>Front-End Engineer</h6>\n      \n      </div>\n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/brendan.jpg\"></a>\n        <h3>Brendan</h3>\n        <a href=\"mailto:brendan.c.collins@gmail.com\" class=\"contact-icon icon-letter-mail\"></a>\n        <a href=\"https://www.linkedin.com/in/brendanccollins\" class=\"contact-icon icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/wholetthedogsout\" class=\"contact-icon icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <h6>Front-End Engineer</h6>\n      \n      </div>\n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/alan.jpg\">\n        <h3>Alan</h3>\n        <a href=\"mailto:alan.rominger@gmail.com\" class=\"contact-icon icon-letter-mail\"></a>\n        <a href=\"https://www.linkedin.com/pub/alan-rominger/18/365/402\" class=\"contact-icon icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/AlanCoding\" class=\"contact-icon icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <h6>Python Engineer</h6>\n      \n      </div>     \n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/john.png\"></a>\n        <h3>John</h3>\n        <a href=\"mailto:johnwaldrep@gmail.com\" class=\"contact-icon icon-letter-mail\"></a>\n        <a href=\"https://github.com/jwaldrep\" class=\"contact-icon icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <h6>Python Engineer</h6>\n      \n      </div>\n      \n      <div class=\"col span_1_of_5\">\n        <img class=\"headshot\" src=\"static/img/manish.jpg\"></a>\n        <h3>Manish</h3>\n        <a href=\"mailto:maddypatel@gmail.com\" class=\"contact-icon icon-letter-mail\"></a>\n        <a href=\"https://www.linkedin.com/in/maddypatel\" class=\"contact-icon icon-linkedin-alt\" target=\"_blank\"></a>\n        <a href=\"https://github.com/maddypatel\" class=\"contact-icon icon-fontawesome-webfont\" target=\"_blank\"></a>\n        <h6>Python Engineer</h6>\n      \n      </div>\n</div>   \n</div>\n\n\n<div class=\"container section5\">\n\n  <!-- Begin MailChimp Signup Form -->\n  <div id=\"mc_embed_signup\">\n  <form action=\"//sharelockers.us11.list-manage.com/subscribe/post?u=b3a788a60a3601f4af086ce0d&amp;id=14ea9f8640\" method=\"post\" id=\"mc-embedded-subscribe-form\" name=\"mc-embedded-subscribe-form\" class=\"validate\" target=\"_blank\" novalidate>\n      <div id=\"mc_embed_signup_scroll\">\n  \t\n  \t<input type=\"email\" value=\"\" name=\"EMAIL\" class=\"email\" id=\"mce-EMAIL\" placeholder=\"email address\" required>\n      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n      <div style=\"position: absolute; left: -5000px;\"><input type=\"text\" name=\"b_b3a788a60a3601f4af086ce0d_14ea9f8640\" tabindex=\"-1\" value=\"\"></div>\n      <div class=\"clear\"><button type=\"submit\" value=\"Subscribe\" name=\"subscribe\" id=\"mc-embedded-subscribe\" class=\"join register-btn\">Join Our Newsletter</button></div>\n      </div>\n  </form>\n  </div>\n  \n  <!--End mc_embed_signup-->\n\n</div>\n\n\n<div class=\"container section6\">\n  <h1 class=\"title\">ShareLockers</h1>\n    <h5 class=\"tagline\">Buy and Sell Locally with Confidence. </h5>\n\n  <a href=\"#/dashboard\"><button  class=\"register-btn\">Get Started</button></a>\n</div>\n\n<!--<footer>© ShareLockers....add (facebook icon here)</footer>-->\n\n\n\n\n\n\n","locations":"<h2>Our Current Locations</h2>\n<div class=\"list-container\">\n       \n        \t<li class=\"list-item dash-card\">\n        \t\t\t\tname: <%- m.name %> \n\t\t\t\t\t\t\t\t\t<br>\n                Location: <%- m.location %> \n            </li>\n        \n</div>","locker-list":"\n<h1 class=\"locker-header\">\n    Local Lockers\n</h1>\n\n\n\n<div class=\"locker-bank\">\n</div>\n<a class=\"make-reservation\" href=\"/reservations/\">Make Reservation</a>\n<div class=\"stock-wrapper\">\n</div>\n\n<div class=\"action-container\">\n<div class=\"vpopout\">\n\t\t<img class=\"item-photo\" src=''>\n\t\t<span class=\"lockerDetails\"></span>\n\t\t<button class=\"close\">X</button>\n\t\t<button class=\"open-button\" data-id =''>Open</button>\n\t\t<button class=\"stock-button\" data-id=''>STOCK</button>\n\t\t<button class=\"buy-button\" data-id = ''>Buy</button>\n</div>\n\n\n\n\n<div class=\"stock-container\">\n<div class=\"stock-box\">\n<h4>Stock with an existing item</h4>\n\n<div class=\"item-select\">\n </div>\n\n<h4>or create a new item to stock</h4>\n\n<div class=\"stock-item\">\n\t\n\t<input class=\"item-title\" placeholder=\"Title\">\n\t<textarea class=\"item-description\" rows=\"4\" cols=\"30\" placeholder=\"Item Description\"></textarea>\n\t<input class=\"item-price\" placeholder=\"Price\">\n\t<span>Image:  </span><input class=\"photo-input\" type=\"file\" placeholder=\"image\">\n\t<input class=\"item-id\" type=\"hidden\">\n\t\n</div>\n\t<button class=\"item-stock\">Stock Item</button>\t\n</div>\n\n</div>\n\n\t<div class=\"not-loggedin-container\">\n\t\t<button class=\"close\">X</button>\n\t\t<div class=\"not-loggedin\">\n\t\t\t<h4>Login to Proceed</h4>\n\t\t\t<input class=\"username-login\" placeholder=\"Username\">\n\t\t\t<input class=\"user-password\" placeholder=\"Password\" type=\"password\"><br>\n\t\t\t<button class=\"lgn-button\">Login</button>\n\t\t</div>\t\n\t</div>\n\t\n\t<div class=\"buy-confirmation-container\">\n\t\t<button class=\"close\">X</button>\n\t\t<div class=\"buy-confirmation\">\n\t\t\t<h4>Confirm</h4>\n\t\t\t<span class=\"cost-tag\">Your account will be charged $</span><span class=\"cost\"></span><br>\n\t\t\t<button class=\"confirm-btn\">Purchase</button><button class=\"cancel-btn\">Cancel</button>\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"buy-open-containter\">\n\t\t<button class=\"close\">X</button>\n\t\t<div class=\"buy-open\">\n\t\t\t<p>Congratulations. Your item was purchased.</p><br>\n\t\t\t<p>You can:</p>\n\t\t\t<button class=\"open-now\">Open Now</button><button class=\"open-later\">Open Later</button>\n\t\t\t\n\t\t</div> \n\t</div>\n</div>\n\n\n\n\n\n\n","my-items":"<h2>Your Current Items</h2>\n\n<div class=\"list-container \">\n        <% m.items.forEach(function (item) { %>\n        \t<li data-title=\"<%- item.title %>\" data-id=\"<%- item.locker %>\"  class=\"list-item dash-card\">\n        \t\t\n                Item: <%- item.title %> \n                  <br>\n                Price: <%- item.price %>\n                  <br>\n                Location: <%- item.locker %> \n                  <br>\n                <button class=\"lockerOpen\">Open</button>\n            </li>\n        <% }) %>\n</div>\n","profile":"<h2>My Profile</h2>\n\n<div class=\"list-container\">\n       \n        \t<li class=\"list-item dash-card\">\n        \t\t\t\tName: <%- m.user %> \n\t\t\t\t\t\t\t\t\t<br>\n                Location: <%- m.rating %> \n\t\t\t\t\t\t\t\t\t<br>\n            \t\tDescription: <%- m.description %> \n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\tAlias: <%- m.alias %> \n\t\t\t\t\t\t</li>\n        \n</div>","stock":"<select class=\"item-inventory\">\n\t  <option>-</option>\n\t  <% m.items.forEach(function (item) { %>\n        \t<option data-description=\"<%- item.description %>\" data-id=\"<%- item.id %>\"  data-title=\"<%- item.title %>\" data-price=\"<%- item.price %>\" class=\"inventory-item\">   \t\t\n                Item: <%- item.title %>,  Price: <%- item.price %>          \n            </option>\n       <% }) %>\n</select>\n\n\n\n\t\t\n\t\t"};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
