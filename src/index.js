import './styles.css';
import { alert } from '@pnotify/core';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import picsTpl from './templates/markup.hbs';
import PicsApiService from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  picsGallery: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPics);

//

function onSearch(evt) {
  evt.preventDefault();

  picsApiService.query = evt.currentTarget.elements.query.value;
  clearPicsGallery();
  if (picsApiService.query === '') {
    return alert({
      text: 'Try again :)',
    });
  }

  loadMoreBtn.show();
  picsApiService.resetPage();
  clearPicsGallery();
  fetchPics();
}

function fetchPics() {
  loadMoreBtn.disable();

  picsApiService
    .fetchPics()
    .then(hits => {
      if (hits.length > 11) {
        appendPicsMarkup(hits);
        loadMoreBtn.show();
        loadMoreBtn.enable();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } else if (hits.length <= 11 && hits.length > 0) {
        appendPicsMarkup(hits);
        loadMoreBtn.hide();
      } else if (hits.length === 0) {
        error('No results were found!');
        loadMoreBtn.hide();
      }
    })
    .catch(error => console.log(error));
}

function appendPicsMarkup(hits) {
  refs.picsGallery.insertAdjacentHTML('beforeend', picsTpl(hits));
}

function clearPicsGallery() {
  refs.picsGallery.innerHTML = '';
}
