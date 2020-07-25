'use strict';

(function () {

  var mainBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showSuccessMessage = function () {

    var successMessage = successTemplate.cloneNode(true);
    mainBlock.appendChild(successMessage);

    document.addEventListener('keydown', onDocumentKeydown);
    successMessage.addEventListener('click', function () {
      closeMessage();
    });
  };

  var showErrorMessage = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    error.querySelector('.error__button').addEventListener('click', function () {
      closeMessage();
    });
    error.addEventListener('mousedown', function (evt) {
      if (!evt.target.closest('.error__message')) {
        closeMessage();
      }
    });

    mainBlock.appendChild(error);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var onDocumentKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };
  var closeMessage = function () {
    var message = document.querySelector('.success,.error');
    if (message) {
      message.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  window.message = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
