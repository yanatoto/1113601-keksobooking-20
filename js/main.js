// Модуль util.js
'use strict';
(function () {
// создание числа с 0 впереди
  var padNumber = function (num, size) {
    var s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  };
  // получение случайного числа в заданном диапазоне
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

  window.util = {
    padNumber: padNumber,
    getRandomArbitrary: getRandomArbitrary,
    getRandomElement: getRandomElement,
    getRandomSubset: getRandomSubset
  };
})();


// Модуль data.js
// 'use strict';
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

// Модуль map.js
// 'use strict';
(function () {

  // активация страницы
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var filtersFieldsets = mapFilters.querySelectorAll('fieldset');
  var filtersSelect = mapFilters.querySelectorAll('select');

  var map = document.querySelector('.map');

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeAttributeDisabled(adFormFieldsets);
    removeAttributeDisabled(filtersFieldsets);
    removeAttributeDisabled(filtersSelect);
    window.form.checkCapacity();
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

  window.map = {
    activate: activate,
    removeAttributeDisabled: removeAttributeDisabled
  };
})();

// 'use strict';
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
  var quantity = 8;
  var pins = window.data.createPins(quantity);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);

  window.pin = {
    renderPin: renderPin
  };
})();


// 'use strict';
// Модуль form.js
(function () {
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
  window.form = {
    checkCapacity: checkCapacity
  };
})();
