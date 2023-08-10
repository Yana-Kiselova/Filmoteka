import debounce from 'lodash.debounce';
import NewApiService from './news-service';
import galleryTemplates from '../templates/appenFilmMarkup.hbs';
import homeTemplate from '../templates/header-home.hbs';
import libraryTemplate from '../templates/header-library.hbs';
import { getLocalStorage } from './local-storage';

const apiService = new NewApiService();

const refs = {
  header: document.querySelector('.header'),
  libraryLink: document.querySelector('.link-library-js'),
  homeLink: document.querySelector('.link-home-js'),
  headerContent: document.querySelector('.header-content'),
  input: document.querySelector('#header-input'),
  galery: document.querySelector('.gallery-list'),
  buttonHeaderWatched: document.querySelector('.button-header-watched-js'),
  buttonHeaderQueue: document.querySelector('.button-header-queue-js'),
};

refs.libraryLink.addEventListener('click', myLibrary);
refs.homeLink.addEventListener('click', home);

function initializeHeader() {
  refs.headerContent.insertAdjacentHTML('beforeend', homeTemplate());
  refs.input = document.querySelector('#header-input');
  refs.input.addEventListener('input', debounce(filmName, 1000));
  apiService.setSearchQuery('');
  fetchTrending();
}
// ========= инициализация хедера и запрос популярных =========
initializeHeader();

/////// рендер популярных фильмов //////
function fetchTrending() {
  apiService.fetchArticles().then(data => {
    addListTemplates(data);
  });
}

// ========= если инпут пустая строка =>галерея пустая и выходим =========
function filmName(e) {
  if (e.target.value.trim() === '') {
    refs.galery.innerHTML = '';
    apiService.setSearchQuery('');
    apiService.resetPage();
    fetchTrending();
    return;
  }
  if (apiService.searchQuery !== e.target.value) {
    apiService.resetPage();
  }
  //если длина массива =0 =>алерт и выход
  apiService.setSearchQuery(e.target.value);
  apiService.filmRequest().then(data => {
    if (data.length === 0) {
      return alert('проверте правильность ввода');
    }
    refs.galery.innerHTML = '';
    addListTemplates(data);
  });
}

// добавляем разметку галлереи по шаблону//
function addListTemplates(results) {
  refs.galery.insertAdjacentHTML('beforeend', galleryTemplates(results));
}

function myLibrary(evt) {
  evt.preventDefault();
  refs.input.removeEventListener('input', debounce(filmName, 1000));
  refs.headerContent.innerHTML = '';
  refs.headerContent.insertAdjacentHTML('beforeend', libraryTemplate());
  refs.libraryLink.classList.add('active');
  refs.homeLink.classList.remove('active');
  refs.header.classList.add('library');
  addLibraryButtonsListeners();
}

function addLibraryButtonsListeners() {
  refs.buttonHeaderQueue = document.querySelector('.button-header-queue-js');
  refs.buttonHeaderWatched = document.querySelector(
    '.button-header-watched-js'
  );
  refs.buttonHeaderQueue.classList.add('active');

  refs.buttonHeaderQueue.addEventListener('click', renderQueueList);
  refs.buttonHeaderWatched.addEventListener('click', renderWathedList);
  refs.galery.innerHTML = '';
  renderQueueList();
}

function renderWathedList() {
  // 1. Снять класс актив с кнопки Кью и повесить на Вотчед
  refs.buttonHeaderWatched.classList.add('active');
  refs.buttonHeaderQueue.classList.remove('active');
  // 2. Получить список вотчед из локалсторадж
  const watched = getLocalStorage('watched');
  // 3. Сделать иф если вотчед есть делаем АПИ запрос по каждому элементу, если нет рендерим заглушку
  if (watched && watched.length) {
    const movieArr = watched.map(id => {
      return apiService.getFilmById(id);
    });
    Promise.all(movieArr).then(data => {
      // 4. Очищащем галлерею и рендерим данные, которые получили с АПИ запроса
      refs.galery.innerHTML = '';
      refs.galery.insertAdjacentHTML('beforeend', galleryTemplates(data));
    });
  } else {
    alert('нет просмотренных фильмов');
  }
}

function renderQueueList() {
  // 1. Снять класс актив с кнопки Вотчед и повесить на Кью
  refs.buttonHeaderWatched.classList.remove('active');
  refs.buttonHeaderQueue.classList.add('active');
  // 2. Получить список кью из локалсторадж
  const queue = getLocalStorage('queue');
  // 3. Сделать иф если кью делаем АПИ запрос по каждому элементу, если нет рендерим заглушку
  if (queue && queue.length) {
    const movieArr = queue.map(id => {
      return apiService.getFilmById(id);
    });
    // 4. Очищащем галлерею и рендерим данные, которые получили с АПИ запроса
    Promise.all(movieArr).then(data => {
      refs.galery.innerHTML = '';
      refs.galery.insertAdjacentHTML('beforeend', galleryTemplates(data));
    });
  } else {
    alert('нет фильмов к просмотру');
  }
}

function home(evt) {
  evt.preventDefault();
  refs.headerContent.innerHTML = '';
  initializeHeader();
  refs.header.classList.remove('library');
  refs.libraryLink.classList.remove('active');
  refs.homeLink.classList.add('active');
}
