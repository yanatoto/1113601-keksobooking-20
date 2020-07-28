'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var MAX_PIN_COUNT = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var filterAdverts = function (data) {
    var filteredAdverts = [];
    var item;
    var checkedFeatures = Array.from(mapFilters.querySelectorAll('#housing-features input:checked'));
    for (var i = 0; i < data.length; i++) {
      item = data[i];

      if (!(housingType.value === DEFAULT_FILTER_VALUE || housingType.value === item.offer.type)) {
        continue;
      }

      var checkPrice = false;
      switch (housingPrice.value) {
        case 'any':
          checkPrice = true;
          break;
        case 'low':
          checkPrice = item.offer.price <= PRICE_LOW;
          break;
        case 'high':
          checkPrice = item.offer.price >= PRICE_HIGH;
          break;
        case 'middle':
          checkPrice = PRICE_LOW < item.offer.price && item.offer.price < PRICE_HIGH;
          break;
      }

      if (!checkPrice) {
        continue;
      } else if (!(housingRooms.value === DEFAULT_FILTER_VALUE || Number(housingRooms.value) === item.offer.rooms)) {
        continue;
      } else if (!(housingGuests.value === DEFAULT_FILTER_VALUE || Number(housingGuests.value) <= item.offer.guests)) {
        continue;
      }

      var checkFeatures = checkedFeatures.every(function (element) {
        return item.offer.features.includes(element.value);
      });
      if (!checkFeatures) {
        continue;
      }

      filteredAdverts.push(item);

      if (filteredAdverts.length >= MAX_PIN_COUNT) {
        break;
      }
    }
    return filteredAdverts;
  };

  var reset = function () {
    mapFilters.reset();
  };

  mapFilters.addEventListener('change', window.debounce(function () {
    window.card.close();
    window.pin.remove();
    window.pin.render(filterAdverts(window.map.getArrayOffers()));
  }));

  window.filters = {
    filterAdverts: filterAdverts,
    reset: reset
  };

}());
