'use strict';

(function () {


  var activatePage = function () {
    window.form.activateForm();
    window.map.activateMap();
  };

  var deactivatePage = function () {
    window.form.deactivateForm();
    window.map.deactivateMap();
    window.form.resetForm();

  };

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };

}());
