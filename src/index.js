import ApiFetchService from './apiFetchService';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');

const apiFetchService = new ApiFetchService();

async function onSubmitSearch(evt) {
  evt.preventDefault();

  clearGalleryMarkup();
  if (evt.target.firstElementChild.value.trim() === '') {
    apiFetchService.newSearchQuery = '';
    Notify.info('Please enter the query parameters.');
    return;
  }
  apiFetchService.pageToLoad = 1;
  apiFetchService.query = evt.target.firstElementChild.value.trim();
  apiFetchService.markupHtmlPosition = refs.gallery;
  apiFetchService.loadMoreBtnPosition = refs.loadMoreBtn;

  apiFetchService.fetchImages();
}

function onLoadMore() {
  apiFetchService.pageToLoad = apiFetchService.currentPage + 1;
  apiFetchService.fetchImages();

  // console.log(apiFetchService.currentPage);
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
