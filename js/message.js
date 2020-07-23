'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successText = successTemplate.cloneNode(true);
  var errorText = errorTemplate.cloneNode(true);
  var mainBlock = document.querySelector('main');

  var errorButton = errorTemplate.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);

  var showMessage = function (result) {
    switch (result) {
      case 'success':
        document.body.appendChild(successText);

        break;
      case 'error':
        mainBlock.appendChild(errorText);

        break;
    }
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', closeMessage);

  };


  var onDocumentKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeMessage();
      window.main.deactivatePage();
    }
  };

  var closeMessage = function (evt) {

    var element = document.querySelector('.success__message');
    if (element) {
      element.remove(evt);
      document.removeEventListener('keydown', onDocumentKeydown);

    }
  };

  window.message = {
    closeMessage: closeMessage,
    showMessage: showMessage

  };
})();
