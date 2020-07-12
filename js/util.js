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
  var setAttributeDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = !array[i].disabled;
    }
  };
  var removeAttributeDisabled = function (array) {
    for (var j = 0; j < array.length; j++) {
      array[j].removeAttribute('disabled', 'disabled');
    }
  };

  window.util = {
    setAttributeDisabled: setAttributeDisabled,
    padNumber: padNumber,
    getRandomArbitrary: getRandomArbitrary,
    getRandomElement: getRandomElement,
    getRandomSubset: getRandomSubset,
    removeAttributeDisabled: removeAttributeDisabled
  };
})();
