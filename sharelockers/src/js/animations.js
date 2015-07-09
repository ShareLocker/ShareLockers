var $ = require("jquery");

$(window).scroll(function() {
  if ($(this).scrollTop() > 1){  
    $('.my-page-header').addClass("sticky");
  } else {
    $('.my-page-header').removeClass("sticky");
  }
});

// $(window).scroll(function() {
//   if ($(this).scrollTop() > 1){  
//     $('.my-page-header').addClass("sticky");
//   } else if >1 {
//     $('.my-page-header').removeClass("sticky");
//   }
//   else{
    
//   }
// });