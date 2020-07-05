'use strict';
(function () {
  var HOUSING_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.src = photos[i];
      photo.width = PHOTO_WIDTH;
      photo.height = PHOTO_HEIGHT;
      fragment.appendChild(photo);
    }
    return fragment;
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardElement = cardTemplate.cloneNode(true);

  var renderCard = function (data) {
    popupRemove();

    var cardPhotos = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSING_TYPES[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты' + ' для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', ' + 'выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(renderPhotos(data.offer.photos));

    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    for (var i = 0; i < data.offer.features.length; i++) {
      var str = data.offer.features[i];
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + str);
      featuresList.appendChild(element);

    }
    var popupCloseBtn = cardElement.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', popupRemove);

    document.addEventListener('keydown', onPopupPress);

    return cardElement;
  };
  var onPopupPress = function (evt) {
    if (evt.key === 'Escape' && cardElement !== null) {
      popupRemove();
    }
  };

  var popupRemove = function () {
    if (cardElement !== null) {
      cardElement.remove();
      document.removeEventListener('keydown', onPopupPress);
    }
  };
  var open = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var newCard = fragment.appendChild(renderCard(array[i]));
    }
    mapFiltersContainer.insertAdjacentElement('afterend', newCard);

  };
  // console.log(mapFiltersContainer.innerHTML);

  window.card = {
    renderCard: renderCard,
    open: open

  };
})();
