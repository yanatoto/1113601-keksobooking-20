'use strict';

// Модуль map.js
(function () {

  // активация страницы
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
  var filtersSelect = mapFilters.querySelectorAll('select');

  var map = document.querySelector('.map');

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeAttributeDisabled(adFormFieldsets);
    removeAttributeDisabled(filtersFieldsets);
    removeAttributeDisabled(filtersSelect);
    window.form.checkCapacity();
  };

  // дезактивация страницы
  var removeAttributeDisabled = function (array) {
    for (var j = 0; j < array.length; j++) {
      array[j].removeAttribute('disabled', 'disabled');
    }
  };

  // активация страницы левой кнопкой мыши
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      activate();
    }
  });

  // активация страницы клавишей ENTER
  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.which === 13) {
      activate();
    }
  });

  window.map = {
    activate: activate,
    removeAttributeDisabled: removeAttributeDisabled
  };
})();
