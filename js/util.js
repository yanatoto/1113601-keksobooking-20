
'use strict';
(function () {

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
    removeAttributeDisabled: removeAttributeDisabled
  };
})();
