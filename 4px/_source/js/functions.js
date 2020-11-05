const inputError = function() {
  $('.modal__phone-input').toggleClass('modal__phone-input_invalid');
  setTimeout(() => {
    $('.modal__phone-input').toggleClass('modal__phone-input_invalid');
    $('.modal__phone-input').focus();
  }, 2000);
}

const owlInit = function() {
  if ($(window).width() < 1200) {
    $('.owl-carousel').owlCarousel({
      items: 1,
      //loop: true,
      autoWidth: true,
      dots: false
    });
  } else $('.owl-carousel').owlCarousel('destroy');
}