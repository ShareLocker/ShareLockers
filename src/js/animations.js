var $ = require("jquery");

// HEADER ANIMATION
$(function () {
	
	$(window).scroll(function() {
	  if ($(this).scrollTop() > 1){
	    $('.my-page-header').addClass("sticky");
	  } else {
	    $('.my-page-header').removeClass("sticky");
	  }
	});
	
	// Scroll Indicator
	//var homeIconContainerTop = $('.home-icons').offset().top - ($(window).height());
	
	$(window).scroll(function() {
		
		if ($(window).scrollTop () > homeIconContainerTop) {
			$('.home-icons').addClass('slideRight');
		}
			
	});

});

// $(document).ready(function(){
//   $(".scroll").animate( ".scroll" , 1000 , swing, complete);
// });