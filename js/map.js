'use strict';

// Модуль map.js
(function () {


  var onSuccessLoad = function (offer) {
    window.pin.renderPins(offer);

  };
  // активация страницы

  var mapFilters = document.querySelector('.map__filters');
  var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
  var filtersSelect = mapFilters.querySelectorAll('select');
  var map = document.querySelector('.map');


  var activate = function () {
    map.classList.remove('map--faded');
    window.util.removeAttributeDisabled(filtersFieldsets);
    window.util.removeAttributeDisabled(filtersSelect);
    window.form.setAddress();
    // var pins = window.data.createPins(8);
    // window.pin.renderPins(pins);
    window.form.activate();
    window.backend.load(onSuccessLoad, function () {});


  };

  window.map = {
    activate: activate


  };
})();
