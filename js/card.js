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

    photos.forEach(function (item) {
      var photo = document.createElement('img');
      photo.src = item;
      photo.width = PHOTO_WIDTH;
      photo.height = PHOTO_HEIGHT;
      fragment.appendChild(photo);

    });
    return fragment;
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderCard = function (data) {
    var cardElement = cardTemplate.cloneNode(true);
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
    data.offer.features.forEach(function (item) {
      var str = item;
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + str);
      featuresList.appendChild(element);
    });

    return cardElement;
  };

  var onPopupPress = function (evt) {
    if (evt.key === 'Escape') {
      popupRemove();
    }
  };

  var popupRemove = function () {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
      window.pin.removeActive();
      document.removeEventListener('keydown', onPopupPress);
    }
  };

  var popupOpen = function (obj) {
    popupRemove();
    var newCard = renderCard(obj);
    var popupCloseBtn = newCard.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', popupRemove);
    document.addEventListener('keydown', onPopupPress);
    mapFiltersContainer.insertAdjacentElement('afterend', newCard);
  };


  window.card = {

    popupOpen: popupOpen,
    popupRemove: popupRemove


  };
})();
