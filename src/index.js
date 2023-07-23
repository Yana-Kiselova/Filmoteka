import debounce from 'lodash.debounce';
import templatesCard from './templates/film-card.hbs';
import templates from './templates/appenFilmMarkup.hbs';
import NewApiService from './js/news-service';

//получаю доступ у элементам//
const inputEl = document.querySelector('#header-input');
const galeryEl = document.querySelector('.gallery-list');
// coздаю новый класс//
const apiService = new NewApiService();
apiService.filmRequest();

inputEl.addEventListener('input', debounce(filmName, 1000));
//если инпут пустая строка =>галерея пустая и выходим
function filmName(e) {
  if (e.target.value.trim() === '') {
    galeryEl.innerHTML = '';
    return;
  }
  //если длина массива =0 =>алерт и выход
  apiService.setSearchQuery(e.target.value);
  apiService.filmRequest().then(data => {
    if (data.length === 0) {
      return alert('проверте правильность ввода');
    }
    addListTemplates(data);
  });
}
// добавляем разметку галлереи по шаблону//
function addListTemplates(results) {
  console.log(results, galeryEl);
  galeryEl.insertAdjacentHTML('beforeend', templates(results));
}
// рендер 1й карточки//
const galleryItem = document.querySelector('.gallery-item');

// galleryItem.addEventListener('clic', onModalTeamOpen);
// Модальное окно для полноразмерного изображения
// Для того чтобы открыть, необходимо добавить на gallery-item CSS-класс is-open
// function onModalTeamOpen() {
//   sectionEl.insertAdjacentHTML('beforeend', templatesCard(results));
// }
