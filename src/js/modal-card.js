import NewApiService from './news-service';
import templatesModal from '../templates/modal.hbs';

const apiService = new NewApiService();

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
