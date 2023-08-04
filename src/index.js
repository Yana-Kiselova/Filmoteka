import debounce from 'lodash.debounce';
import templates from './templates/appenFilmMarkup.hbs';
import NewApiService from './js/news-service';
import './js/header';
import './js/modal-card';

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
