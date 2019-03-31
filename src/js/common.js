$(document).ready(function () {
  $(".phone-input").mask("+7 (999) 999-9999");
  lazy();
  pd();
  tabs();
  media();
  offersSlider();
  cards();
  landingScroll();
  popup();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  pd();
});

//global variables
var innerWidth = $('body').innerWidth();

//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}
//padding-home
function pd() {
  var height = $('.header').height();
  $('.home').css('padding-top', height);
}
//tabs
function tabs() {
  var tabLink = $('.media_nav li a'),
      tab = $('.tab-pane'),
      index;
  
  tabLink.on('click', function(e) {
    index = $(this).parent().index();
    e.preventDefault();
    tabLink.parent().removeClass('active');
    $(this).parent().addClass('active');
    tab.hide().eq(index).fadeIn(300);
  })
}
//media-slider
function media() {
  var slider = $('.media__slider');
  
  slider.slick({
    arrows: true,
    slidesToScroll: 2,
    slidesToShow: 2,
    dots: false,
    prevArrow: slider.parents('.slider').find('.slider__prev'),
    nextArrow: slider.parents('.slider').find('.slider__next'),
    responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  slider.on('beforeChange', function () {
    lazy();
  });
  slider.on('afterChange', function () {
    lazy();
  });
}
//offers-slider
function offersSlider() {
  var slider = $('.other-offers__slider'),
      tabLink = $('.other-offers-nav__item'),
      tabItem = $('.other-offers__tab');
  
  function tabs() {
    tabItem.not(':first-child').hide();
    tabLink.on('click', function() {
      var indexTab = $(this).index();
      tabItem.removeClass('other-offers__tab_active').hide().eq(indexTab).show().addClass('other-offers__tab_active');
      tabLink.removeClass('other-offers-nav__item_active');
      $(this).addClass('other-offers-nav__item_active');
      tabItem.eq(indexTab).find('.other-offers__slider').slick('setPosition');
      lazy();
    })
  }
  slider.on('init', function(){
    tabs();
  });
  slider.each(function() {
    $(this).slick({
      arrows: true,
      slidesToScroll: 4,
      slidesToShow: 4,
      dots: false,
      prevArrow: $(this).parents('.slider').find('.slider__prev'),
      nextArrow: $(this).parents('.slider').find('.slider__next'),
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  })
  slider.on('beforeChange', function () {
    lazy();
  });
  slider.on('afterChange', function () {
    lazy();
  });


}
function cards() {
  var block = $('.other-offers-slide__container'),
      flag;

  function state() {
    block.each(function() {
      if($(this).hasClass('other-offers-slide__container_active')) {
        $(this).find('.other-offers-slide__text').slideDown(200);
      } else {
        $(this).find('.other-offers-slide__text').slideUp(200);
      }
    })
  }
  state();
  $(document).on('click touchstart touchend', function (e) {
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if ($(e.target).parents('.other-offers-slide').length > 0) {
        block.removeClass('other-offers-slide__container_active');
        $(e.target).parents('.other-offers-slide').find('.other-offers-slide__container').addClass('other-offers-slide__container_active');
        state();
      } else if ($(e.target).parents('.other-offers-slide').length < 1) {
        block.removeClass('other-offers-slide__container_active');
        state();
      }
    }
  });
  block.on('mouseenter mouseleave', function(event) {
    if(event.type == 'mouseenter') {
      $(this).addClass('other-offers-slide__container_active');
      state();
    } else {
      block.removeClass('other-offers-slide__container_active');
      state();
    }
  })
}
//якорные ссылки
function landingScroll() {
  var scrollLink = $('.scroll-link');

  scrollLink.click(function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    event.preventDefault();
    $('body,html').animate({
      scrollTop: top
    }, 400);
  })
}
//popup
function popup() {
  var openButton = $('.popup-link');
  var closeButton = $('.popup__overlay, .popup__close');
  var popup = $('.popup');

  function closePopup() {
    popup 
      .animate({opacity: 0}, 200, 
        function(){ 
          $(this).css('display', 'none');
      });
    $('body').css('overflow', 'visible');
  }

  openButton.click( function(event){
    event.preventDefault();
    $($(this).attr('href')).css('display', 'block').animate({opacity: 1}, 200);
    $('body').css('overflow', 'hidden');
  });
  closeButton.click( function(){
    closePopup();
  });
}
