$( function () {

	var timerId, ScreenWidth;

	ScreenWidth = $(window).width();

	$(window).on('resize', function(e){
		ScreenWidth = $(window).width();
	});

	if( ScreenWidth <= 768 ){

		if( $('#video-bg-tmp-m').length ){
			$('.js-front-video-bg').append( $('#video-bg-tmp-m').html() );		

			var video = document.getElementById('video-bg-m');

			$(document).on('preloader_faded', function(e){
				
				if( !video.ended ){				
					video.play();
				}
			});
		}		
	}
	else{

		if( $('#video-bg-tmp').length ){
			$('.js-front-video-bg').append( $('#video-bg-tmp').html() );

			var video = document.getElementById('video-bg');

			$('.js-front-video-bg').on('mousewheel', function(e){
				if( !video.ended ){
					e.preventDefault();

					video.play();
				}		
			});			
		}
	}




	// Gif hover
	$(".best-item").mouseenter(function () {
		var src = $(this).find('.best-item__pict img').attr('src');
		var gif = $(this).find('.best-item__pict img').data("gif");
		$(this).find('.best-item__pict img').attr("src", gif);
		$(this).find('.best-item__pict img').attr("data-gif", src);
	});
	$(".best-item").mouseleave(function () {
		var src = $(this).find('.best-item__pict img').data('src');
		var gif = $(this).find('.best-item__pict img').attr("src");
		$(this).find('.best-item__pict img').attr("data-gif", gif);
		$(this).find('.best-item__pict img').attr("src", src);
	});

	if (window.matchMedia('(min-width: 1200px)').matches) {

		var el_height = $('.promo-item').height();

		var promo_height = promo_duration = $('.promo').height(),
			 promo_length = $('.promo-item').length;

		$('.promo-item').each(function(idx, el){			

			var pi_height = $(el).height();
			var $pic_blur = $(el).find('.promo-item__pict_blur');

			gsap.to($(el), {
			  scrollTrigger: {
			    trigger: ".promo",
			  	 start: (idx) * ( 0.5 * promo_duration ) + "", 
			    toggleClass: {targets: $(el), className: "active"},
				 onToggle: function(self){
				  	console.log('1');
				 }			    
			  }
			});

			console.log('значени ' + idx + ' ' + promo_duration);

			$(el).find('ul.promo-item-list li').each(function(ul_idx, ul_el){
				var str = 150 + 100*ul_idx + 0.5 * promo_duration * idx + " top";
				
				gsap.fromTo(ul_el, 
					{opacity: 0, y: 50}, 
					{opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.promo', start: str, end: "+=200", scrub: .5 } }
				);				
			});

			if( idx < promo_length - 1 ){
				gsap.to(".promo-sl", { 
					xPercent: -100 * (idx + 1), 
					duration: 5, 
					scrollTrigger: { trigger: ".promo", 
										  start: (idx + 1) * ( 0.5 * promo_duration - pi_height ) + "", 
										  end: "+=" + pi_height, 
										  scrub: .5,
										  onToggle: function(self){
										  	console.log('2');
										  }
										} 
				});
			}			
		});
	}
	else{
		//Слайдер
		$('.promo-sl').slick({
			// autoplay: true,
			// autoplaySpeed: 3000,
			// fade: true,
			dots: false,
			arrows: false,
			infinite: false,
			// responsive: [{
			// 	breakpoint: 992,
			// 	settings: {
			// 		adaptiveHeight: true
			// 	}
			// }
			// ]
		});
	}


	ScrollTrigger.matchMedia({
		'(min-width: 1200px)': function() {
			gsap.to('.horizon-pict', {
				width: '100%',
				duration: .5,
				scrollTrigger: {
					trigger: ".horizon",
					start: "top 67%",
					end: "bottom bottom",
					scrub: true,
				}		
			});
		},
		'(max-width: 1199px)': function() {
			gsap.to('.horizon-pict', {
				width: '100%',
				duration: .5,
				scrollTrigger: {
					trigger: ".horizon",
					start: "bottom bottom",
					end: "+=200",
					scrub: true,
				}		
			});
		}
	});


	$(window).on('load resize', function () {
		if (window.matchMedia('(max-width: 992px)').matches) {
			// Video hover
			$(".comfort-item__video").on("click", function () {
				this.find('video').pause();
				this.find('video').prop('muted', 'true');
			});
		} else {
			// Video hover
			$(".comfort-item__video video").on("mouseover", function () {
				this.play();
				this.prop('muted', 'false');
			});
			$(".comfort-item__video video").on("mouseleave", function () {
				this.pause();
				this.prop('muted', 'true');
			});
		}
	});

});