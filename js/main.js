'use strict';

var names = ['Артемий', 'Ксенья', 'Эдуардо', 'Иван', 'Стивен', 'Константин', 'Олег', 'Дарья', 'Владимир', 'Юлия', 'Дмитрий', 'Николай', 'Елена', 'Алексей', 'Джон', 'Светлана', 'Ангелина', 'Мария', 'Борис', 'Анатолий', 'Гарри', 'Виталий', 'Ольга', 'Нина', 'Молли'];

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.','В конце концов это просто непрофессионально.',' Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var minLikes = 15;
var maxLikes = 999;

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var fragment = document.createDocumentFragment();
var photos = [];

// содает случайное число
var getRandomNumber = function (min, max) {
  var random = (min + Math.random() * (max + 1 - min));
  return Math.floor(random);
};

// создает сгенерированный массив
var getPhoto = function (user, comment, arrayForObject) {
  for (var i = 0; i < names.length; i++) {
    arrayForObject[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(minLikes, maxLikes),
      name: user[getRandomNumber(0, user.length - 1)],
      comments: comment[getRandomNumber(0, comment.length - 1)]
    };
  }
  return arrayForObject;
};

getPhoto(names, comments, photos);

var getTemplatesElements = function (templateElement, objectsArray) {
  for (var i = 0; i < objectsArray.length; i++) {
    var element = templateElement.cloneNode(true);
    var object = objectsArray[i];
    element.querySelector('.picture__comments').textContent = object.message;
    element.querySelector('.picture__likes').textContent = object.likes;
    element.querySelector('.picture__img').setAttribute('src', object.url);
    fragment.appendChild(element);
  }

  return element;
};

getTemplatesElements(pictureTemplate, photos);

// вставляет элементы из шаблона на страницу
var insertElements = function (locationOfInsertion) {
  locationOfInsertion.appendChild(fragment);
};

insertElements(pictures);
