import homeTemplate from '../templates/header-home.hbs';
import libraryTemplate from '../templates/header-library.hbs';

const refs = {
  header: document.querySelector('.header'),
  libraryLink: document.querySelector('.link-library-js'),
  homeLink: document.querySelector('.link-home-js'),
  // headerButtonWrapper: document.querySelector('.header-button-wrapper'),
  // input: document.querySelector('.header-input-wrapped'),
  headerContent: document.querySelector('.header-content'),
};

refs.libraryLink.addEventListener('click', myLibrary);
refs.homeLink.addEventListener('click', home);

function initializeHeader() {
  refs.headerContent.insertAdjacentHTML('beforeend', homeTemplate());
}
initializeHeader();

function myLibrary(evt) {
  evt.preventDefault();
  refs.headerContent.innerHTML = '';
  refs.headerContent.insertAdjacentHTML('beforeend', libraryTemplate());
  refs.libraryLink.classList.add('active');
  refs.homeLink.classList.remove('active');
  refs.header.classList.add('library');
}

function home(evt) {
  evt.preventDefault();
  refs.headerContent.innerHTML = '';
  initializeHeader();
  refs.header.classList.remove('library');
  refs.libraryLink.classList.remove('active');
  refs.homeLink.classList.add('active');
}
