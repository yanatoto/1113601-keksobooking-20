'use strict';


(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var MAX_PIN_COUNT = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('#housing-features input:checked');

  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var filterAdverts = function (data) {
    var filtered = [];
    var item;

    for (var i = 0; i < data.length; i++) {
      item = data[i];
      var labelHousingFeatures = false;
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

      } else if (!(housingRooms.value === DEFAULT_FILTER_VALUE || housingRooms.value === item.offer.value)) {
        continue;
      } else if (!(housingGuests.value === DEFAULT_FILTER_VALUE || housingGuests.value === item.offer.value)) {
        continue;

      } else if (housingFeatures.length > 0) {
        for (var k = 0; k < housingFeatures.length; k++) {
          if (item.offer.features.indexOf(housingFeatures[k].value) === -1) {
            labelHousingFeatures = true;
          }
        }
      }

      if (labelHousingFeatures) {
        continue;
      }

      filtered.push(item);

      if (filtered.length >= MAX_PIN_COUNT) {
        break;
      }
    }
    return filtered;
  };
  var updateFilteredOffers = function (data) {
    mapFilters.addEventListener('change', window.debounce(function () {
      window.card.popupRemove();
      window.pin.removePins();
      window.pin.renderPins(filterAdverts(data));

    }));
  };


  window.filters = {
    updateFilteredOffers: updateFilteredOffers

  };

}());
