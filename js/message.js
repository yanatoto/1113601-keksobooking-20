'use strict';

(function () {

  var mainBlock = document.querySelector('main');

  var showSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    mainBlock.appendChild(successMessage);

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('mousedown', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('mousedown', closeSuccessMessage);
  };

  var showErrorMessage = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    error.querySelector('.error__button').addEventListener('click', closeErrorMessage);
    mainBlock.appendChild(error);

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('mousedown', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('mousedown', closeErrorMessage);
  };


  var onDocumentKeydown = function (evt) {
    if (showSuccessMessage && document.querySelector('.success')) {
      if (evt.key === 'Escape') {
        closeSuccessMessage();
      }
    } else if (showErrorMessage && document.querySelector('.error')) {
      if (evt.key === 'Escape') {
        closeErrorMessage();
      }
    }
  };

  window.message = {

    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage

  };
})();
