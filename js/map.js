'use strict';

// Модуль map.js
(function () {


  var onSuccessLoad = function (data) {
    arrayOffers = data;
    window.filters.updateOffers();
    window.main.activatePage();


  };

  var arrayOffers = [];
  var getArrayOffers = function () {
    return arrayOffers;
  };


  var mapFilters = document.querySelector('.map__filters');
  var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
  var filtersSelect = mapFilters.querySelectorAll('select');
  var map = document.querySelector('.map');


  var activateMap = function () {
    map.classList.remove('map--faded');
    window.util.removeAttributeDisabled(filtersFieldsets);
    window.util.removeAttributeDisabled(filtersSelect);
    window.form.setAddress();
    window.form.activateForm();
    window.backend.load(onSuccessLoad, function () {});

  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.util.setAttributeDisabled(filtersFieldsets);
    window.util.setAttributeDisabled(filtersSelect);
    window.pin.removePins();
    window.card.popupRemove();

  };

  window.map = {
    getArrayOffers: getArrayOffers,
    activateMap: activateMap,
    deactivateMap: deactivateMap


  };
})();
