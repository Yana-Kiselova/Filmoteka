import NewApiService from './news-service';
import templatesModal from '../templates/modal.hbs';
import { setLocalStorage, getLocalStorage } from './local-storage';
import { renderQueueList, renderWathedList } from './header';

const apiService = new NewApiService();

let movieId = '';
const refs = {
  galleryList: document.querySelector('.gallery-list'),
  backdrop: document.querySelector('.backdrop'),
  buttonModalClose: document.querySelector('.modal-close'),
  modalContent: document.querySelector('.modal-content'),
  buttonWatched: document.querySelector('.button-watched-js'),
  buttonQueue: document.querySelector('.button-queue-js'),
  body: document.querySelector('.body'),
  headerButtonQueue: document.querySelector('.button-header-queue-js'),
  headerButtonWatched: document.querySelector('.button-header-watched-js'),
};

refs.galleryList.addEventListener('click', evt => {
  openModalFilm(evt);
});

/////// открыть модолку при клике на img вешаем класс/////
function openModalFilm(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  getMovieId(evt);
  refs.backdrop.classList.add('is-open');
  refs.body.classList.add('no-scroll');
  addModalListeners();
}
///////закрытие модалки при клике на бекдроп//////
function closeBackdrop(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalFilm();
  }
}
/////////закрытие модалки при нажатии кнопки Esc///////////////
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModalFilm();
  }
}
/////////закрытие модалки при нажатии на крестик///////////////
function closeModalFilm(evt) {
  refs.backdrop.classList.remove('is-open');
  refs.modalContent.innerHTML = '';
  refs.body.classList.remove('no-scroll');
  removeModalListeners();
}
/////////добавляем слушатели при открытии модалки///////////////
function addModalListeners() {
  refs.buttonModalClose.addEventListener('click', closeModalFilm);
  refs.backdrop.addEventListener('click', closeBackdrop);
  refs.body.addEventListener('keyup', closeEsc);
}
/////////удаляем слушатели при закрытии модалки///////////////
function removeModalListeners() {
  refs.buttonModalClose.removeEventListener('click', closeModalFilm);
  refs.backdrop.removeEventListener('click', closeBackdrop);
  refs.body.removeEventListener('keyup', closeEsc);
}
// //////////рендер  модалки////
function getMovieId(evt) {
  movieId = evt.target.getAttribute('data-movie-id');
  // зaрос данных фильма по ID
  apiService
    .getFilmById(movieId)
    .then(movie => {
      refs.modalContent.insertAdjacentHTML('beforeend', templatesModal(movie));
      setButtonsListeners();
    })
    .catch(err => {
      console.log(err);
    });
}

// ======== coхранение в localStorage ========
// ======== ищем кнопки и вешаем слушатели на них ========
function setButtonsListeners() {
  refs.buttonWatched = document.querySelector('.button-watched-js');
  refs.buttonQueue = document.querySelector('.button-queue-js');
  refs.buttonWatched.addEventListener('click', addWatched);
  refs.buttonQueue.addEventListener('click', addQueue);
  // ======== проверяем фильм в списках и добавляем класс active на кнопку ========
  checkLocalStorage();
}

// ======== проверяем фильм в списках и добавляем класс active на кнопку ========
function checkLocalStorage() {
  const watched = getLocalStorage('watched');
  if (watched && watched.includes(movieId)) {
    refs.buttonWatched.classList.add('button-active');
  }
  const queue = getLocalStorage('queue');
  if (queue && queue.includes(movieId)) {
    refs.buttonQueue.classList.add('button-active');
  }
}

// ======== при нажатии на buttonWatched добавляем фильи в watched ========
function addWatched(evt) {
  evt.preventDefault();
  // ======== получаем список фильмов watched из localStorage или null ========
  const watched = getLocalStorage('watched');
  if (watched) {
    if (watched.includes(movieId)) {
      // ======== удаляем фильм из watched в locatStorage, если он уже есть ========
      removeFromLocalStorage('watched', watched, refs.buttonWatched);
      refs.headerButtonQueue = document.querySelector(
        '.button-header-queue-js'
      );
      if (refs.headerButtonQueue) {
        if (refs.headerButtonQueue.classList.contains('button-active')) {
          //TODO: Обновляем гарелерею из либрари Queue
          renderQueueList();
        } else {
          //TODO: Обновляем гарелерею из либрари Watched
          renderWathedList();
        }
      }
      return;
    }
    // ======== добавляем фильм в watched в localStorage ========
    watched.push(movieId);
    setLocalStorage('watched', watched);
    // ======== вешаем класс active на кпопку buttonWatched ========
    refs.buttonWatched.classList.add('button-active');
  } else {
    // ======== создаем новый массив и записываем фильм в watched в localStorage ========
    addToLocalStorage('watched');
  }
  // ======== удаляем фильм в Queue из localStorage, если такой фильм есть ========
  removeFromQueue();
  refs.headerButtonQueue = document.querySelector('.button-header-queue-js');
  if (refs.headerButtonQueue) {
    if (refs.headerButtonQueue.classList.contains('button-active')) {
      //TODO: Обновляем гарелерею из либрари Queue
      renderQueueList();
    } else {
      //TODO: Обновляем гарелерею из либрари Watched
      renderWathedList();
    }
  }
}

// ======== при нажатии на buttonQueue добавляем фильмы в queue ========
function addQueue(evt) {
  evt.preventDefault();
  // ======== получаем список фильмов queue из localStorage или null ========
  const queue = getLocalStorage('queue');
  refs.headerButtonWatched = document.querySelector(
    '.button-header-watched-js'
  );
  if (queue) {
    if (queue.includes(movieId)) {
      // ======== удаляем фильм из queue в locatStorage, если он уже есть ========
      removeFromLocalStorage('queue', queue, refs.buttonQueue);
      if (refs.headerButtonWatched) {
        if (refs.headerButtonWatched.classList.contains('button-active')) {
          //TODO: Обновляем гарелерею из либрари Watched
          renderWathedList();
        } else {
          //TODO: Обновляем гарелерею из либрари Queue
          renderQueueList();
        }
      }
      return;
    }
    // ======== добавляем фильм в queue в localStorage ========
    queue.push(movieId);
    setLocalStorage('queue', queue);
    // ======== вешаем класс active на кпопку buttonQueue ========
    refs.buttonQueue.classList.add('button-active');
  } else {
    // ======== создаем новый массив и записываем фильм в queue в localStorage ========
    addToLocalStorage('queue');
  }
  // ======== удаляем фильм в Watched из localStorage, если такой фильм есть ========
  removeFromWatched();
  if (refs.headerButtonWatched) {
    if (refs.headerButtonWatched.classList.contains('button-active')) {
      //TODO: Обновляем гарелерею из либрари Watched
      renderWathedList();
    } else {
      //TODO: Обновляем гарелерею из либрари Queue
      renderQueueList();
    }
  }
}

// ======== при нажатии на buttonWatched удаляем фильм в queue ========
function removeFromQueue() {
  const queue = getLocalStorage('queue');
  if (queue && queue.includes(movieId)) {
    removeFromLocalStorage('queue', queue, refs.buttonQueue);
  }
}

// ======== при нажатии на buttonQueue удаляем фильм в watched ========
function removeFromWatched() {
  const watched = getLocalStorage('watched');
  if (watched && watched.includes(movieId)) {
    removeFromLocalStorage('watched', watched, refs.buttonWatched);
  }
}

//======== функция добавления нового массива в список по ключу ========
function addToLocalStorage(key) {
  const arr = [];
  arr.push(movieId);
  setLocalStorage(key, arr);
}

// ======== функция удаление фильма из localStorage ========
function removeFromLocalStorage(key, array, button) {
  const newArr = array.filter(id => id !== movieId);
  setLocalStorage(key, newArr);
  button.classList.remove('button-active');
  button.blur();
}
