import debounce from 'lodash.debounce';
import templates from './templates/appenFilmMarkup.hbs';
import templatesModal from './templates/modal.hbs';
import NewApiService from './js/news-service';

const apiService = new NewApiService();

/////// рендер популярных фильмов //////
function fetchTrending() {
  apiService.fetchArticles().then(data => {
    addListTemplates(data);
  });
}
fetchTrending();
//////////////////////////////////////////////
//получаю доступ у элементам//
const inputEl = document.querySelector('#header-input');
const galeryEl = document.querySelector('.gallery-list');

inputEl.addEventListener('input', debounce(filmName, 1000));
//если инпут пустая строка =>галерея пустая и выходим
function filmName(e) {
  if (e.target.value.trim() === '') {
    galeryEl.innerHTML = '';
    fetchTrending();
    return;
  }
  //если длина массива =0 =>алерт и выход
  apiService.setSearchQuery(e.target.value);
  apiService.filmRequest().then(data => {
    if (data.length === 0) {
      return alert('проверте правильность ввода');
    }
    galeryEl.innerHTML = '';
    addListTemplates(data);
  });
}
// добавляем разметку галлереи по шаблону//
function addListTemplates(results) {
  console.log(results, galeryEl);
  galeryEl.insertAdjacentHTML('beforeend', templates(results));
}

///////////////////////////modal////////////////////////////
const refs = {
  galleryList: document.querySelector('.gallery-list'),
  galleryItem: document.querySelector('.gallery-item'),
  backdrop: document.querySelector('.backdrop'),
  buttonModalClose: document.querySelector('.modal-close'),
  modalContent: document.querySelector('.modal-content'),
};

refs.galleryList.addEventListener('click', evt => {
  openModalFilm(evt);
});

/////// открыть модолку при клике на img вешаем класс/////
function openModalFilm(evt) {
  if (!evt.target.nodeName === 'IMG') {
    return;
  }
  getMovieId(evt);
  refs.backdrop.classList.add('is-open');
  refs.buttonModalClose.addEventListener('click', closeModalFilm);
}

function closeModalFilm(evt) {
  refs.backdrop.classList.remove('is-open');
  refs.buttonModalClose.removeEventListener('click', closeModalFilm);
  refs.modalContent.innerHTML = '';
}
// //////////рендер  модалки////
function getMovieId(evt) {
  const movieId = evt.target.getAttribute('data-movie-id');
  console.log(movieId);
  // зaрос данных фильма по ID
  apiService
    .getFilmById(movieId)
    .then(movie => {
      console.log(movie);
      // TODO: Add template for render movie in modal
      // TODO: Insert template in modal html

      refs.modalContent.insertAdjacentHTML('beforeend', templatesModal(movie));
    })
    .catch(err => {
      console.log(err);
    });
}
