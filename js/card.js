'use strict';
(function () {
  var HOUSING_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };
  var FEATURES = {
    'wifi': 'Wi-Fi',
    'dishwasher': 'Посудомоечная машина',
    'parking': 'Парковка',
    'washer': 'Стиральная машина',
    'elevator': 'Лифт',
    'conditioner': 'Кондиционер'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderCard = function () {

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = window.data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = window.data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = window.data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSING_TYPES[window.data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = window.data.offer.rooms + ' комнаты' + ' для ' + window.data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__features').textContent = FEATURES[window.data.offer.features];
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.offer.checkin + ', ' + 'выезд до ' + window.data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = window.data.offer.description;
    cardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = window.data.offer.photos;
    cardElement.src = window.data.author.avatar;


    return cardElement;

  };

  var firstCard = cardTemplate;
  mapFiltersContainer.insertAdjacentElement('afterend', firstCard);

  window.card = {
    renderCard: renderCard

  };
})();
