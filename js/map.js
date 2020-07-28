'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
  var filtersSelect = mapFilters.querySelectorAll('select');
  var arrayOffers = [];

  var getArrayOffers = function () {
    return arrayOffers;
  };

  var onSuccessLoad = function (data) {
    arrayOffers = data;
    window.pin.render(window.filters.filterAdverts(data));
  };

  var errorMessage = null;
  var onErrorLoad = function (errMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-show');

    errorMessage.textContent = errMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.util.setDisabled(filtersFieldsets, false);
    window.util.setDisabled(filtersSelect, false);
    window.backend.load(onSuccessLoad, onErrorLoad);
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.util.setDisabled(filtersFieldsets, true);
    window.util.setDisabled(filtersSelect, true);
    window.pin.remove();
    window.filters.reset();
    window.card.close();
    window.pinMove.reset();
  };

  window.map = {
    getArrayOffers: getArrayOffers,
    activate: activateMap,
    deactivate: deactivateMap
  };
})();
