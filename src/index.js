import axios from 'axios';
// import fetchImages from './fetchImages';
import { Notify } from 'notiflix';
import ApiFetchService from './apiFetchService';

// const getImages = fetchImages('cat').then(data => console.log(data));
// const getImages = fetchImages('cat');
// console.log(getImages);

const refs = {
  form: document.querySelector('#search-form'),
  // markupCard: document.body,
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');

const apiFetchService = new ApiFetchService();

function onSubmitSearch(evt) {
  evt.preventDefault();
  // console.log(evt);
  clearGalleryMarkup();
  apiFetchService.pageToLoad = 1;
  apiFetchService.query = evt.target.firstElementChild.value.trim();
  apiFetchService.markupHtmlPosition = refs.gallery;
  // console.log(apiFetchService.query);
  apiFetchService.loadMoreBtnPosition = refs.loadMoreBtn;

  apiFetchService.fetchImages();
}

function onLoadMore(params) {
  apiFetchService.pageToLoad = apiFetchService.currentPage + 1;
  apiFetchService.fetchImages();

  console.log(apiFetchService.currentPage);
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
