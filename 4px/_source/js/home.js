$(function () {
  // отслеживание события drag
  let dragging = false;
  $('body').on('touchmove', e => {
    dragging = true;
  });
  $('body').on('touchstart', e => {
    dragging = false;
  });

  // массив пар имён классов, меняющих контент табов
  const changeList = new Map([
    ['js-carbody-list__name', 'js-model-list'],
    ['js-model-list__unit', 'car-info']
  ]);
  //вешаем событие клика на смену табов
  for (let arr of changeList.entries()) {
    let changing = new Changer(arr[0], arr[1]);

    $(changing.element).on('click touchend', e => {
      if (!dragging) changing.change(e.currentTarget);
    });
  }

  //карусель на меланьких разрешениях
  owlInit();

  //переключатель кредит/лизинг
  $('.credit-type__credit-name, .credit-type__credit-switch').click('click', e => {
    if ( $(e.currentTarget).hasClass('credit-type__credit-name_active') ) return;
    let father = $(e.currentTarget).parent();
    father.find('.credit-type__switcher').toggleClass('credit-type__switcher_position_right').toggleClass('credit-type__switcher_position_left');
    father.find('.credit-type__credit-name').toggleClass('credit-type__credit-name_active');
  });

  //фэнсибокс
  $('.js-car-info__proposal').fancybox({
    type: 'inline',
    content: $('.modal'),
    padding: 0
  });

  //маска инпута
  $('.modal__phone-input').mask('+7 (999) 999-99-99', { autoclear: false });
  
  // форма отправки сообщения
  $('.modal__proposal').click(e => {
    e.preventDefault();
    let val = $('.modal__phone-input').val();
    let clear = val.replace(/[^\d]/g, '');
    let inner = $(e.currentTarget).html();
    let loader = '<img src="/_source/css/module/fancybox_loading.gif">';
    let form = $('.modal__get-proposal')[0];
    let formdata = {
      'tel' : val
    };

    if (clear.length < 11) {
      inputError();
      return 0;
    }

    if (form.reportValidity()) {
      $(e.currentTarget).html(loader);

      $.post('/_source/module/mail.php', formdata, answer => {
        $(e.currentTarget).html(inner);
        // успех        
        if (answer.result == 'success') {
          $('.modal__get-proposal').hide();
          $('.modal__answer').show();
          setTimeout(() => {
            $.fancybox.close();
          }, 3000);
        }
        // ошибка
        if (answer.result == 'error') {
          inputError();
        }
      }, 'json');
    }
  });
});

$(window).resize(function() {
  owlInit();
});