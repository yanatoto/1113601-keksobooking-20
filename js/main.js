"use strict"
var HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X  = [20, 30, 35, 40, 50, 60, 65, 70];
var Y = [130, 140, 145, 150, 160, 200, 300, 500];

var address = '600, 350';
var price = 1000;
var rooms = 4;
var guests = 6;
var description = 'description';
var quantity = 8;

var createPins = function (quantity) {

  var pins = [];

   for (var i = 1; i <= quantity; i++) {
    var pin =
      {

        author: {
            avatar : 'img/avatars/user' + padNumber(i, 2) + '.png',
       },
        offer: {
          title: title,
          address: address,
          price: price,
          type: getRandomElement(HOUSING),
          rooms: rooms,
          guests: guests,
          checkin: getRandomElement(CHECKINS),
          checkout: getRandomElement(CHECKOUTS),
          features: getRandomElement(FEATURES),
          description: description,
          photos: PHOTOS
      },
      location: {
          x: getRandomElement(X),
          y: getRandomElement(Y)
      }
  }

   pins.push(pin);
   }
  return pins;
  };
var padNumber = function (num, size) {
  var s = num +"";

    while (s.length < size) s = "0" + s;
    return s;

}


console.log(pins);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * (array.length - 1));
  return array[randomIndex];
};


var mapPins = document.querySelectorAll('.map__pins');
var pinTemplate = document.querySelector('#pin')
 .content;

//console.log(pinTemplate);

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style = 'left:'+ pin.location.x + 'px; top:' + pin.location.y + 'px';


  return pinElement;
};

var pins = createPins(quantity);
var fragment = document.createDocumentFragment();

for (var i = 0; i < quantity; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);
