// HEADER ANIMATION

var $ = require("jquery");

$(window).scroll(function() {
  if ($(this).scrollTop() > 1){
    $('.my-page-header').addClass("sticky");
  } else {
    $('.my-page-header').removeClass("sticky");
  }
});

// Scroll Indicator

$(window).scroll(function() {
		$('.scroll').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+400) {
				$(this).addClass(".pulse");
			}
		});
	});

// $(document).ready(function(){
//   $(".scroll").animate( ".scroll" , 1000 , swing, complete);
// });