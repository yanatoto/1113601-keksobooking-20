'use strict';


(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var userPhotoUpload = document.querySelector('.ad-form__upload input[type=file]');
  var userPhotoPreview = document.querySelector('.ad-form__photo');

  userPhotoUpload.addEventListener('change', function () {
    var file = userPhotoUpload.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userPhotoPreview.innerHTML = '';
        var photoItem = document.createElement('img');
        photoItem.src = reader.result;
        photoItem.classList.add('ad-form__photo');
        userPhotoPreview.appendChild(photoItem);
      });

      reader.readAsDataURL(file);
    }
  });
  window.userImages = {
    avatarPreview: avatarPreview,
    userPhotoPreview: userPhotoPreview
  };
})();
