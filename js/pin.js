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


    pinElement.addEventListener('click', function () {
      window.card.popupOpen(pin);
      pinElement.classList.add('map__pin--active');

    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.popupOpen(pin);
        pinElement.classList.add('map__pin--active');
      }
    });
    return pinElement;
  };

  var USER_COUNT = 5;
  var renderPins = function (users) {
    var activeAds = users.slice(0, Math.min(users.length, USER_COUNT));
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < activeAds.length; i++) {
      fragment.appendChild(renderPin(activeAds[i]));

    }
    mapPins.appendChild(fragment);

  };
  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      pins[j].remove();
    }
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins,
    removeActivePin: removeActivePin,
    removePins: removePins

  };
})();
