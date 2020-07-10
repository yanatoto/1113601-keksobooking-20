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

    // console.log(pin.author.avatar);
    pinElement.addEventListener('click', function () {
      window.card.popupOpen(pin);
      pinElement.classList.add('map__pin--active');

    });
    // var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    // console.log(pins);
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.popupOpen(pin);
        pinElement.classList.add('map__pin--active');
      }
    });
    return pinElement;
  };


  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPin(array[i]));
    }
    mapPins.appendChild(fragment);

  };
  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins,
    removeActivePin: removeActivePin

  };
})();
