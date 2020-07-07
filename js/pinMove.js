'use strict';
(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_ACTIVE_HEIGHT = 84;

  // ограничение перемещения по карте
  var mapBorder = {
    top: window.data.LOCATION_Y_MIN - MAIN_PIN_ACTIVE_HEIGHT,
    bottom: window.data.LOCATION_Y_MAX - MAIN_PIN_ACTIVE_HEIGHT,
    left: window.data.LOCATION_X_MIN - Math.round(MAIN_PIN_WIDTH / 2),
    right: window.data.LOCATION_X_MAX - Math.round(MAIN_PIN_WIDTH / 2)
  };

  // Перемещение пина
  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
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

      // Функция проверки пределов перемещения
      if (window.map.mapPinMain.offsetLeft - shift.x < mapBorder.left) {
        window.map.mapPinMain.style.left = mapBorder.left + 'px';
      } else if (window.map.mapPinMain.offsetLeft - shift.x > mapBorder.right) {
        window.map.mapPinMain.style.left = mapBorder.right + 'px';
      } else {
        window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (window.map.mapPinMain.offsetTop - shift.y < mapBorder.top) {
        window.map.mapPinMain.style.top = mapBorder.top + 'px';
      } else if (window.map.mapPinMain.offsetTop - shift.y > mapBorder.bottom) {
        window.map.mapPinMain.style.top = mapBorder.bottom + 'px';
      } else {
        window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + 'px';
      }

      window.form.inputDefaultAddressEnabled();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.pinMove = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_ACTIVE_HEIGHT: MAIN_PIN_ACTIVE_HEIGHT

  };
})();
