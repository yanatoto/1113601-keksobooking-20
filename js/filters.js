'use strict';


(function () {
  var DEFAULT_FILTER_VALUE = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var filterHousingType = (function (adv) {
    return housingType.value === DEFAULT_FILTER_VALUE || housingType.value === adv.offer.type;
  });

  var updateOffers = function () {
    var filterValue = window.map.getArrayOffers().filter(filterHousingType);
    window.pin.renderPins(filterValue);
  };

  mapFilters.addEventListener('change', (function () {
    window.card.popupRemove();
    window.pin.removePins();
    updateOffers();
  }));

  window.filters = {
    updateOffers: updateOffers
  };

}());
