'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_ACTIVE_HEIGHT = 84;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var mainPin = document.querySelector('.map__pin--main');
  var initStyle = mainPin.getAttribute('style');

  var mapBorder = {
    top: LOCATION_Y_MIN - MAIN_PIN_ACTIVE_HEIGHT,
    bottom: LOCATION_Y_MAX - MAIN_PIN_ACTIVE_HEIGHT,
    left: LOCATION_X_MIN - Math.round(MAIN_PIN_WIDTH / 2),
    right: LOCATION_X_MAX - Math.round(MAIN_PIN_WIDTH / 2)
  };

  var getCoordinates = function () {
    var shiftY = (window.main.isActive()) ? MAIN_PIN_ACTIVE_HEIGHT : MAIN_PIN_HEIGHT / 2;
    var x = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    var y = Math.round(mainPin.offsetTop + shiftY);

    return x + ', ' + y;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 1) {
      window.main.activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      if (mainPin.offsetLeft - shift.x < mapBorder.left) {
        mainPin.style.left = mapBorder.left + 'px';
      } else if (mainPin.offsetLeft - shift.x > mapBorder.right) {
        mainPin.style.left = mapBorder.right + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (mainPin.offsetTop - shift.y < mapBorder.top) {
        mainPin.style.top = mapBorder.top + 'px';
      } else if (mainPin.offsetTop - shift.y > mapBorder.bottom) {
        mainPin.style.top = mapBorder.bottom + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.setAddress(getCoordinates());
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('click', function () {
    window.main.activatePage();
  });

  var reset = function () {
    mainPin.style = initStyle;
  };

  window.pinMove = {
    reset: reset,
    getCoordinates: getCoordinates,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_ACTIVE_HEIGHT: MAIN_PIN_ACTIVE_HEIGHT
  };
})();
