'use strict';

(function () {
  var isActive = false;
  var activatePage = function () {
    if (isActive) {
      return;
    }
    isActive = true;
    window.form.activate();
    window.map.activate();
  };

  var deactivatePage = function () {
    isActive = false;
    window.map.deactivate();
    window.form.deactivate();
    window.form.setAddress(window.pinMove.getCoordinates());
  };

  var getIsActive = function () {
    return isActive;
  };

  window.main = {
    isActive: getIsActive,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };

  deactivatePage();
}());
