'use strict';

(function () {


  var activatePage = function () {
    window.form.activate();
    window.map.activate();

  };

  var deactivatePage = function () {
    window.form.reset();
    window.form.deactivate();
    window.map.deactivate();

  };

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };

}());
