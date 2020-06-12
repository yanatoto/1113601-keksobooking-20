'use strict';
var quantity = 8;

var createPins = function (pinsQuantity) {

  var pins = [];

  for (var i = 1; i <= pinsQuantity; i++) {
    var pin =
      {

        author: {
          avatar: 'img/avatars/user' + padNumber(i, 2) + '.png',
        },
        offer: {
          title: 'title',
          address: '600, 350',
          price: 1000,
          type: 'palace',
          rooms: 6,
          guests: 8,
          checkin: '14:00',
          checkout: '12:00',
          features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
          description: 'description',
          photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
        },
        location: {
          x: getRandomArbitrary(0, ((document.querySelector('.map__pins').offsetWidth) - 10)),
          y: getRandomArbitrary(130, 630)
        }
      };

    pins.push(pin);
  }
  return pins;
};

var padNumber = function (num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var buttonTemplate = document.querySelector('button');

var renderPin = function (pin) {
  var pinElement = buttonTemplate.cloneNode(true);

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style = 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px';

  return pinElement;
};

var pins = createPins(quantity);
var fragment = document.createDocumentFragment();

for (var i = 0; i < quantity; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);

