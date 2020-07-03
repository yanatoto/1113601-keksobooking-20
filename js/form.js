'use strict';
// Модуль form.js


(function () {
  var adFormInput = document.querySelector('.ad-form');
  var setupPrice = adFormInput.querySelector('#price');
  var housingType = document.querySelector('#type');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');

    window.util.removeAttributeDisabled(adFormFieldsets);
    window.form.checkCapacity();
  };

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
    checkCapacity: checkCapacity,
    activate: activate
  };
})();
