'use strict';
// Модуль pin.js
(function () {
  var buttonTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPins = document.querySelector('.map__pins');
  var renderPin = function (pin) {
    var pinElement = buttonTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.style = 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px';

    return pinElement;
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPin(array[i]));
    }
    mapPins.appendChild(fragment);

  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins
  };
})();
