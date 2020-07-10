'use strict';

(function () {
  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 5000;

  var createXhr = function (xhr, onSuccess, onError) {

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


  };
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    createXhr(xhr, onSuccess, onError);
    xhr.open('GET', URL.GET);
    xhr.send();

  };


  window.backend = {
    load: load
  };
})();
