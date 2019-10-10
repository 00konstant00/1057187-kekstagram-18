'use strict';

var names = ['Артемий', 'Ксенья', 'Эдуардо', 'Иван', 'Стивен', 'Константин', 'Олег', 'Дарья', 'Владимир', 'Юлия', 'Дмитрий', 'Николай', 'Елена', 'Алексей', 'Джон', 'Светлана', 'Ангелина', 'Мария', 'Борис', 'Анатолий', 'Гарри', 'Виталий', 'Ольга', 'Нина', 'Молли'];
var comment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', ' Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var desc= ['У меня все отлично', 'Радуюсь', 'Просто крутая картинка', 'Случайно нашел в тырнетах ваших!'];

var minLikes = 15;
var maxLikes = 999;

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var fragment = document.createDocumentFragment();
var photos = [];

var getRandomNumber = function (min, max) {
  var random = (min + Math.random() * (max + 1 - min));
  return Math.round(random);
};

var getPhoto = function (user, comments, arrayForObject) {
  for (var i = 0; i < names.length; i++) {
    arrayForObject[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(minLikes, maxLikes),
      description: desc[getRandomNumber(0, desc.length - 1)],
      comments: {
        avatar: 'img/avatar- ' + (i + 1) + '.svg',
        message: comment[getRandomNumber(0, comment.length - 1)],
        name: names[getRandomNumber(0, names.length - 1)],
      }
    };
  }
  return arrayForObject;
};

var getTemplatesElements = function (templateElement, objectsArray,) {
  for (var i = 0; i < objectsArray.length; i++) {
    var element = templateElement.cloneNode(true);
    var object = objectsArray[i];
    element.querySelector('.picture__comments').textContent = object.comments;
    element.querySelector('.picture__likes').textContent = object.likes;
    element.querySelector('.picture__img').setAttribute('src', object.url);
    fragment.appendChild(element);

  }

  return element;
};

var insertElements = function (locationOfInsertion) {
  locationOfInsertion.appendChild(fragment);
};

getPhoto(name, comment, photos);
getTemplatesElements(pictureTemplate, photos);
insertElements(pictures);
// ---------------------------------------------------------------------------------------------------------------------------------
var uploadFile = document.querySelector('#upload-file');
var formImg = document.querySelector('.img-upload__overlay');
var closeButton = document.querySelector('#upload-cancel');
var CODE_KEY = {
  ENTER: 13,
  ESC: 27
};

var onEscKeydown = function (evt) {
  if (evt.keyCode === CODE_KEY.ESC) {
    closeOverlay();
  }
};

var onEnterKeydown  = function (evt) {
  if (evt.keyCode === CODE_KEY.ENTER) {
    closeOverlay();
  }
};

var openOverlay = function () {
  formImg.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
};

var closeOverlay = function () {
  formImg.classList.add('hidden');
  uploadFile.value = null;
};

uploadFile.addEventListener('change', function () {
  openOverlay();
  getScaleValue(scaleValue);
});

closeButton.addEventListener('click', function () {
  closeOverlay();
});
// ------------------------------------------------------------------
var VALUE_MAX = 100;
var GAP_SCALE = 25;
var scaleControl = document.querySelector('.img-upload__scale');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
scaleControlValue.setAttribute('value', VALUE_MAX);
var scaleValue = scaleControlValue.value;

scaleControl.addEventListener('click', function (evt) {
  scaleControlValue.setAttribute('value', VALUE_MAX);
  var target = evt.target;
  var typeButton = target.type === 'button';
  if (typeButton && target.classList.contains('scale__control--bigger')) {
    var increaseScale = scaleValue + GAP_SCALE;
    scaleValue = increaseScale > VALUE_MAX ? VALUE_MAX : increaseScale;
  } else if (typeButton && target.classList.contains('scale__control--smaller')) {
    var reductionScale = scaleValue - GAP_SCALE;
    scaleValue = reductionScale < GAP_SCALE ? GAP_SCALE : reductionScale;
  }
  getScaleValue(scaleValue);
});

var getScaleValue = function (val) {
  scaleControlValue.setAttribute('value', val + '%'); //
  imgUploadPreview.style.transform = 'scale(' + val / VALUE_MAX + ')';
};
