'use strict';

// Модуль map.js
(function () {

  var arrayOffers = [];

  var getArrayOffers = function () {

    return arrayOffers;
  };
  // var MAX_PIN_COUNT = 5;
  var onSuccessLoad = function (data) {
    arrayOffers = data;
    window.pin.renderPins(window.filters.filterAdverts(data));


  };
  // var getSlicedArray = function (array, itemCount) {
  //   var resultItemCount = Math.min(array.length, itemCount);
  //   return array.slice(0, resultItemCount);
  // };

  var errorMessage = null;
  var onErrorLoad = function (errMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-show');

    errorMessage.textContent = errMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  var removeErrorMessage = function () {
    if (errorMessage) {
      errorMessage.remove();
    }
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
    window.backend.load(onSuccessLoad, onErrorLoad);

  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.util.setAttributeDisabled(filtersFieldsets);
    window.util.setAttributeDisabled(filtersSelect);
    window.pin.removePins();
    window.card.popupRemove();
    removeErrorMessage();

  };

  window.map = {
    removeErrorMessage: removeErrorMessage,
    getArrayOffers: getArrayOffers,
    activateMap: activateMap,
    deactivateMap: deactivateMap


  };
})();
