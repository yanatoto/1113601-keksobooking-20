'use strict';
// Модуль data.js
// Генерирует массив объектов из случайных значений
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var createPins = function (pinsQuantity) {

    var pins = [];

    for (var i = 1; i <= pinsQuantity; i++) {
      var locationX = window.util.getRandomArbitrary(0, ((document.querySelector('.map__pins').offsetWidth) - 100) - PIN_WIDTH / 2);
      var locationY = window.util.getRandomArbitrary(130, 630) - PIN_HEIGHT;

      var pin =
        {

          author: {
            avatar: 'img/avatars/user' + window.util.padNumber(i, 2) + '.png',
          },
          offer: {
            title: 'title',
            address: locationX + ', ' + locationY,
            price: window.util.getRandomArbitrary(10000, 50000),
            type: window.util.getRandomElement(['palace', 'flat', 'house', 'bungalo']),
            rooms: window.util.getRandomArbitrary(1, 5),
            guests: window.util.getRandomArbitrary(1, 10),
            checkin: window.util.getRandomElement(['12:00', '13:00', '14:00']),
            checkout: window.util.getRandomElement(['12:00', '13:00', '14:00']),
            features: window.util.getRandomSubset(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),

            description: 'description',
            photos: window.util.getRandomSubset(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
          },
          location: {
            x: locationX,
            y: locationY
          }
        };

      pins.push(pin);
    }
    return pins;
  };
  window.data = {
    createPins: createPins
  };
})();
