'use strict';

(function () {

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
    window.form.activate();
    window.backend.load(onSuccessLoad, onErrorLoad);

  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.util.setAttributeDisabled(filtersFieldsets);
    window.util.setAttributeDisabled(filtersSelect);
    window.pin.remove();
    window.card.onPopupRemove();
    removeErrorMessage();

  };

  window.map = {
    removeErrorMessage: removeErrorMessage,
    getArrayOffers: getArrayOffers,
    activate: activateMap,
    deactivate: deactivateMap


  };
})();
