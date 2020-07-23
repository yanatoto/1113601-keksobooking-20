'use strict';

(function () {


  var activatePage = function () {
    window.form.activateForm();
    window.map.activateMap();

  };

  var deactivatePage = function () {
    window.form.formReset();
    window.form.deactivateForm();
    window.map.deactivateMap();
    // window.message.closeMessage();


  };

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };

}());
