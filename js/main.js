'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var quantity = 8;

var createPins = function (pinsQuantity) {

  var pins = [];

  for (var i = 1; i <= pinsQuantity; i++) {
    var locationX = getRandomArbitrary(0, ((document.querySelector('.map__pins').offsetWidth) - 100) - PIN_WIDTH / 2);
    var locationY = getRandomArbitrary(130, 630) - PIN_HEIGHT;

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

// создание цифры с 0 впереди

var padNumber = function (num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

// получение случайного чила из ограниченного диапазона

var getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

// получение случайного эл-та массива

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * (array.length - 1));
  return array[randomIndex];
};

// получение группы случайных эл-в массива

var getRandomSubset = function (array) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.3) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

// отрисовка пина
var mapPins = document.querySelector('.map__pins');
var buttonTemplate = document.querySelector('#pin').content.querySelector('button');

var renderPin = function (pin) {
  var pinElement = buttonTemplate.cloneNode(true);

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style = 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px';

  return pinElement;
};

// создание пинов из шаблона
var pins = createPins(quantity);
var fragment = document.createDocumentFragment();

for (var i = 0; i < quantity; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);


var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
var filtersSelect = mapFilters.querySelectorAll('select');


// активация страницы
var map = document.querySelector('.map');

var activate = function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  removeAttributeDisabled(adFormFieldsets);
  removeAttributeDisabled(filtersFieldsets);
  removeAttributeDisabled(filtersSelect);
  checkCapacity();
};

// дезактивация страницы
var removeAttributeDisabled = function (array) {
  for (var j = 0; j < array.length; j++) {
    array[j].removeAttribute('disabled', 'disabled');
  }
};

// активация страницы левой кнопкой мыши
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.which === 1) {
    activate();
  }
});

// активация страницы клавишей ENTER
mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.which === 13) {
    activate();
  }
});
// валиция цен в зависимости от типа жилья
var adFormInput = document.querySelector('.ad-form');
var setupPrice = adFormInput.querySelector('#price');
var housingType = document.querySelector('#type');

housingType.addEventListener('change', function () {
  if (housingType.value === 'bungalo') {
    setupPrice.setAttribute('min', '0');
    setupPrice.setAttribute('placeholder', '0');

  } else if (housingType.value === 'flat') {
    setupPrice.setAttribute('min', '1000');
    setupPrice.setAttribute('placeholder', '1000');

  } else if (housingType.value === 'house') {
    setupPrice.setAttribute('min', '5000');
    setupPrice.setAttribute('placeholder', '5000');

  } else if (housingType.value === 'palace') {
    setupPrice.setAttribute('min', '10000');
    setupPrice.setAttribute('placeholder', '10000');

  } else if (setupPrice.validity.rangeOverflow) {
    setupPrice.setCustomValidity('Цена не должна превышать 10000 рублей');
  } else if (setupPrice.validity.valueMissing) {
    setupPrice.setCustomValidity('Обязательное поле');
  } else {
    setupPrice.setCustomValidity('');
  }
});

// валидация заголовка
var titleInput = adFormInput.querySelector('#title');

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

// валидация фотографий
var avatarInput = document.querySelector('#avatar');

avatarInput.addEventListener('invalid', function () {
  if (avatarInput.validity.typeMismatch) {
    avatarInput.setCustomValidity('Аватар должен быть изображением');
  } else {
    avatarInput.setCustomValidity('');
  }
});

var images = document.querySelector('.ad-form__photo-container');
var imagesInput = images.querySelector('#images');

imagesInput.addEventListener('invalid', function () {
  if (imagesInput.validity.typeMismatch) {
    imagesInput.setCustomValidity('Аватар должен быть изображением');
  } else {
    imagesInput.setCustomValidity('');
  }
});

// валидация комнат и гостей
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var checkCapacity = function () {
  var numberRoom = roomNumberSelect.value;
  var numberCapacity = capacitySelect.value;
  if (numberRoom === '100' && numberCapacity !== '0') {
    capacitySelect.setCustomValidity('можно выбрать только не для гостей');
  } else if (numberRoom < numberCapacity || (numberRoom !== '100' && numberCapacity === '0')) {
    capacitySelect.setCustomValidity('Выберите нужное кол-во гостей: кол-во гостей не может превышать кол-во комнат');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

roomNumberSelect.addEventListener('change', function () {
  checkCapacity();
  capacitySelect.reportValidity();
});

capacitySelect.addEventListener('change', function () {
  checkCapacity();
  capacitySelect.reportValidity();
});

