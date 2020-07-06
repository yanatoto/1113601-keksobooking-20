'use strict';

// Модуль map.js
(function () {

  // активация страницы

  var mapFilters = document.querySelector('.map__filters');
  var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
  var filtersSelect = mapFilters.querySelectorAll('select');

  var map = document.querySelector('.map');

  var activate = function () {
    map.classList.remove('map--faded');
    window.util.removeAttributeDisabled(filtersFieldsets);
    window.util.removeAttributeDisabled(filtersSelect);
    var pins = window.data.createPins(8);
    window.pin.renderPins(pins);
    window.form.activate();

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
    activate: activate

  };
})();
