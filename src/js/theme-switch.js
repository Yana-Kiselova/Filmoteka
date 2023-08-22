import { setLocalStorage, getLocalStorage } from './local-storage';

const refs = {
  body: document.querySelector('.body'),
  input: document.querySelector('#checkbox'),
};
refs.input.addEventListener('change', themesWitch);

// ======== coхранение в localStorage ========
function checkedTheme() {
  const theme = getLocalStorage('theme');
  if (theme) {
    if (theme === 'dark') {
      refs.body.classList.add('dark-theme');
      refs.body.classList.remove('light-theme');
      refs.input.checked = true;
    } else {
      refs.body.classList.add('light-theme');
      refs.body.classList.remove('dark-theme');
      refs.input.checked = false;
    }
  } else {
    refs.body.classList.add('light-theme');
  }
}

checkedTheme();

function themesWitch(evt) {
  if (evt.target.checked) {
    refs.body.classList.add('dark-theme');
    refs.body.classList.remove('light-theme');
    setLocalStorage('theme', 'dark');
  } else {
    refs.body.classList.remove('dark-theme');
    refs.body.classList.add('light-theme');
    setLocalStorage('theme', 'light');
  }
}
