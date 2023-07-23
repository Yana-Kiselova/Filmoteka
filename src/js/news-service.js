const API_KEY = 'b32f977d148061c9ab22a471ff2c7792';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  filmRequest() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.incrementPage();
        return data.results;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  setSearchQuery(data) {
    this.searchQuery = data;
  }
}
