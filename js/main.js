'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var locationX = getRandomArbitrary(0, ((document.querySelector('.map__pins').offsetWidth) - 100)) - PIN_WIDTH / 2;
var locationY = getRandomArbitrary(130, 630) - PIN_HEIGHT;
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
          address: locationX + ', ' + locationY,
          price: getRandomArbitrary(10000, 50000),
          type: getRandomElement(['palace', 'flat', 'house', 'bungalo']),
          rooms: getRandomArbitrary(1, 5),
          guests: getRandomArbitrary(1, 10),
          checkin: getRandomElement(['12:00', '13:00', '14:00']),
          checkout: getRandomElement(['12:00', '13:00', '14:00']),
          features: getRandomSubset(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),

          description: 'description',
          photos: getRandomSubset(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
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

var padNumber = function (num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

var getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * (array.length - 1));
  return array[randomIndex];
};


var getRandomSubset = function (array) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.3) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var buttonTemplate = document.querySelector('#pin').content.querySelector('button');

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
