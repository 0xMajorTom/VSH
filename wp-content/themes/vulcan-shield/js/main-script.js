"use strict";
var $ = jQuery;
function updateWrapper() {
    var windowHeight = $(window).height(),
		headerHeight = $("#pageHeader").outerHeight(),
        footerHeight = $(".footer-wrapper").outerHeight();
    $("#wrapper").css({ marginBottom:-footerHeight });
    $('.main-content-wrapper').css({ paddingBottom: footerHeight });
    //$('.main-slider .item').css('height', windowHeight);
}

$(window).load(function() {
    setTimeout(function(){
        updateWrapper();    
    },3000);
});

$(document).ready(function () {
    updateContainer();
    $(window).resize(function() {
        updateContainer();
    });
  
	$('.nav-container .nav').meanmenu({
		meanScreenWidth:"767.98"
	});
    
    $('.showmenu').click(function(){
        $("body").toggleClass('scrollLock');
		$(this).toggleClass('open');
		$('.mobileMenu').toggleClass('show');
	});
    
    //Header Nav
	jQuery('.mobileMainMenu').navAccordion({
		expandButtonText: '<i class="fa fa-angle-down"></i>',  //Text inside of buttons can be HTML
		collapseButtonText: '<i class="fa fa-angle-up"></i>'
	});
    
    $('#quicksearch').on('shown.bs.modal', function() {
        $('input[name=quickSearch]').trigger('focus');
    });
});

function updateContainer() {
	$('.inner-menu').next().remove('a.mean-expand');
}

window.addEventListener("load", function(){
	$('body, #wrapper, .footer-wrapper').css({opacity:1});
});

jQuery("img").removeAttr("width").removeAttr("height");

//Match title height
function MatchHeight() {
    $('.bannerIcon-box').matchHeight();
	$('.ytam-content-box h4').matchHeight();
	$('.group-ytam-icon').matchHeight();
	$('.group-ytam-box h4').matchHeight();
	$('.ytam-content-box').matchHeight();
	$('.product-itemBox a h6').matchHeight();
	$('.pro-category-content h6').matchHeight();
	
}

$(document).ready(function() {
    //$("#pageHeader").sticky({topSpacing:0});
    $('.meanmenu-reveal').on('click', function() {
        $(".headerTop").toggleClass('active');
    });
    
    var sliderInit = $(".homeBannerSlider");
    sliderInit.slick({
        fade: false,
        dots: false,
        speed: 1500,
        arrows: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 5000,
    });
    sliderInit.slickAnimation();
	
    $('.eos-slider').slick({
        dots: false,
		speed: 1000,
		arrows: true,
		infinite: true,
		autoplay: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
		prevArrow: '<button class="left-slick slick-prev" aria-label="Previous" type="button"><i class="fa-solid fa-angle-left"></i></button>',
    	nextArrow: '<button class="right-slick slick-next" aria-label="Next" type="button"><i class="fa-solid fa-angle-right"></i></button>', 
        responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768.98,
				settings: {
					slidesToShow: 1,
				}
			}
		]
    });

	$('.csm-productImgSlider').slick({
		dots: false,
		speed: 500,
		arrows: false,
		autoplay: false,
		infinite: false,
		slidesToShow: 1,
		draggable: false,
		slidesToScroll: 1,
		autoplaySpeed: 1000,
		focusOnSelect: true,
		accessibility: false,
	});
			
	$('.csm-productThumbSlider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 4,
		draggable: true,
		slidesToScroll: 1,
		autoplaySpeed: 1000,
		focusOnSelect: true,
		accessibility: false,
		vertical: true,
		verticalSwiping: true,
		asNavFor: '.csm-productImgSlider',
		responsive: [
			{
				breakpoint: 768.98,
				settings: {
					slidesToShow: 3,
					vertical: false,
				}
			},
			{
				breakpoint: 479.98,
				settings: {
					slidesToShow: 2,
					vertical: false,
				}
			}
		]
	});

	//Drag n Drop
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
		const dropZoneElement = inputElement.closest(".drop-zone");
  
		dropZoneElement.addEventListener("click", (e) => {
		  inputElement.click();
		});
  
		inputElement.addEventListener("change", (e) => {
		  if (inputElement.files.length) {
			updateThumbnail(dropZoneElement, inputElement.files[0]);
		  }
		});
  
		dropZoneElement.addEventListener("dragover", (e) => {
		  e.preventDefault();
		  dropZoneElement.classList.add("drop-zone--over");
		});
  
		["dragleave", "dragend"].forEach((type) => {
		  dropZoneElement.addEventListener(type, (e) => {
			dropZoneElement.classList.remove("drop-zone--over");
		  });
		});
  
		dropZoneElement.addEventListener("drop", (e) => {
		  e.preventDefault();
  
		  if (e.dataTransfer.files.length) {
			inputElement.files = e.dataTransfer.files;
			updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
		  }
  
		  dropZoneElement.classList.remove("drop-zone--over");
		});
	});

	/** Updates the thumbnail on a drop zone element. */
    function updateThumbnail(dropZoneElement, file) {
		let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
		// First time - remove the prompt
		if (dropZoneElement.querySelector(".drop-zone__prompt")) {
		  dropZoneElement.querySelector(".drop-zone__prompt").remove();
		}
  
		// First time - there is no thumbnail element, so lets create it
		if (!thumbnailElement) {
		  thumbnailElement = document.createElement("div");
		  thumbnailElement.classList.add("drop-zone__thumb");
		  dropZoneElement.appendChild(thumbnailElement);
		}
  
		thumbnailElement.dataset.label = file.name;
  
		// Show thumbnail for image files
		if (file.type.startsWith("image/")) {
		  const reader = new FileReader();
  
		  reader.readAsDataURL(file);
		  reader.onload = () => {
			thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
		  };
		} else {
		  thumbnailElement.style.backgroundImage = null;
		}
	  }
	
    $(".form-group select, .NiceSelect select").niceSelect();

    $("select").on("change", function () {
        $(this).parent().addClass("nice-selected");
    });
	
	jQuery().UItoTop({ easingType: 'easeOutQuart' });

	MatchHeight();

	$(".pro-categoryListing").loadMore({
        selector: '.pro-categoryItem',
        loadBtn: '#loadMoreBtn',
        limit: 9,
        load: 3,
        animate: false,
        //animateIn: 'fadeInUp',
    });
    
    //Accordion Nav
	jQuery('.pro-categoryFilter').navAccordion({
		expandButtonText: '<i class="fa-solid fa-caret-right"></i>',
		collapseButtonText: '<i class="fa-solid fa-caret-down"></i>'
	},
	function(){
		console.log('Callback')
	});

});

(function($, window) {
	var adjustAnchor= function() {
		var $anchor = $(':target');
        //var pageHeaderHeight = 0;
		var pageHeaderHeight = $("#pageHeader").height();
		if ($anchor.length > 0) {
			$('html, body').stop().animate({scrollTop: $anchor.offset().top-(pageHeaderHeight+1)}, 1000);
		}
	};
	$(window).on('hashchange load', function() {
		adjustAnchor();
	});
})(jQuery, window);