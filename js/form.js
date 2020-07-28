'use strict';

(function () {
  var adFormInput = document.querySelector('.ad-form');
  var setupPrice = adFormInput.querySelector('#price');
  var housingType = document.querySelector('#type');
  var adFormFieldsets = adFormInput.querySelectorAll('fieldset');
  var timeinSelect = adFormInput.querySelector('#timein');
  var timeoutSelect = adFormInput.querySelector('#timeout');
  var regTimeFieldset = adFormInput.querySelector('.ad-form__element--time');
  var addressInput = adFormInput.querySelector('#address');

  var activate = function () {
    adFormInput.classList.remove('ad-form--disabled');
    window.util.removeAttributeDisabled(adFormFieldsets);
    checkCapacity();
  };
  var deactivate = function () {
    adFormInput.classList.add('ad-form--disabled');
    window.util.setAttributeDisabled(adFormFieldsets);
  };
  deactivate();

  var formResetButton = adFormInput.querySelector('.ad-form__reset');

  var onResetClick = function () {
    reset();
  };
  var reset = function () {
    adFormInput.reset();
    deactivate();
    window.map.deactivate();

  };


  formResetButton.addEventListener('click', onResetClick);

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

  regTimeFieldset.addEventListener('change', function (evt) {
    var time = evt.target.value;
    if (evt.target === timeinSelect) {
      timeoutSelect.value = time;
    } else {
      timeinSelect.value = time;
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

  var avatarInput = adFormInput.querySelector('#avatar');
  var checkAvatarInput = function () {
    if (avatarInput.files[0].type !== 'image/jpeg/png') {
      avatarInput.setCustomValidity('Аватар должен быть изображением в формате jpg или png');
    }
  };
  avatarInput.addEventListener('change', checkAvatarInput);

  var imageInput = adFormInput.querySelector('#images');

  var checkImageInput = function () {
    if (imageInput.files[0].type !== 'image/jpeg/png') {
      imageInput.setCustomValidity('Фотография должна быть изображением в формате jpg или png');
    }
  };
  imageInput.addEventListener('change', checkImageInput);


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

  var setAddress = function (address) {
    addressInput.value = address;

  };

  var onSuccessload = function () {
    window.message.showSuccessMessage();
    window.main.deactivatePage();

  };

  var onErrorload = function () {
    window.message.showErrorMessage();
    window.main.deactivatePage();

  };

  var onSubmitSend = function (evt) {
    window.backend.upload(new FormData(adFormInput), onSuccessload, onErrorload);
    evt.preventDefault();
  };

  adFormInput.addEventListener('submit', onSubmitSend);

  window.form = {
    reset: reset,
    setAddress: setAddress,
    activate: activate,
    deactivate: deactivate

  };
})();
