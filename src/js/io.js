import { apiService, addListTemplates } from './header';

const onEntry = entries => {
  entries.forEach(entry => {
    //если entry пересекает порт, делаем новый запрос за фильмами ////
    if (
      entry.isIntersecting &&
      apiService.searchQuery.trim() === '' &&
      apiService.page > 1
    ) {
      apiService.fetchArticles().then(data => {
        addListTemplates(data);
      });
    }
    if (
      entry.isIntersecting &&
      apiService.searchQuery.trim() !== '' &&
      apiService.page > 1
    ) {
      apiService.filmRequest().then(data => {
        addListTemplates(data);
      });
    }
  });
};

const options = {
  rootMargin: '600px',
};

///////регистрируем IntersectionObserver////////
export const observer = new IntersectionObserver(onEntry, options);
