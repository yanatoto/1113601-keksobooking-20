'use strict';

(function () {
  var setDisabled = function (list, value) {
    list.forEach(function (it) {
      it.disabled = value;
    });
  };

  window.util = {
    setDisabled: setDisabled
  };
})();
