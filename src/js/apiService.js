const apiKey = '19817444-e2944238b0133b6bab479e2af';
const baseUrl = 'https://pixabay.com/api/';
export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPics() {
    const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.setPage();

        return hits;
      });
  }

  setPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
