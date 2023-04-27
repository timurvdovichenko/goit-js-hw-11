import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';

const FETCH_URL = 'https://pixabay.com/api/';
const API_KEY = '35728571-e5e325dee746f09c3ee4748c1';
const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
const quantityImg = 40;
let gallery = new SimpleLightbox('.photo-card a', {
  captionDelay: 150,
  captionsData: 'alt',
});

export default class ApiFetchService {
  constructor() {
    this.searchQuery = '';
    this.markupInsertHTML = '';
    this.page = 1;
    this.loadMorePositionData = '';
  }

  async fetchImages() {
    try {
      await this.#onAddClassBtn();
      const response = await axios.get(
        `${FETCH_URL}?key=${API_KEY}&q=${this.searchQuery}&${PARAMS}&per_page=${quantityImg}&page=${this.page}`,
      );
      const data = await response.data;
      let pagesToShow = Math.floor(data.totalHits / quantityImg);

      if (data.total === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      await this.#onImageMarkupCardList(data.hits);

      if (this.page === pagesToShow) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        return;
      } else if (pagesToShow === 0) {
        gallery.refresh();
        this.#onAddClassBtn();
        Notify.info(
          `Hooray! We found ${data.totalHits} images. Current page is ${this.page} from ${pagesToShow} pages`,
        );
        return;
      } else if (this.page >= 1 && this.page !== pagesToShow) {
        gallery.refresh();
        this.#onRemoveClassBtn();
        Notify.info(
          `Hooray! We found ${data.totalHits} images. Current page is ${this.page} from ${pagesToShow} pages`,
        );
        return;
      } else {
        gallery.refresh();
        this.#onRemoveClassBtn();
      }
    } catch (err) {
      console.log(err.message);
      Notify.failure(`Oops, something went wrong, error message is "${err.message}"`);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }

  set markupHtmlPosition(position) {
    this.markupInsertHTML = position;
  }
  set pageToLoad(pageNumber) {
    this.page = pageNumber;
  }
  get currentPage() {
    return this.page;
  }

  set loadMoreBtnPosition(position) {
    this.loadMorePositionData = position;
  }

  #onImageMarkupCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `<div class="photo-card">
<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: </b> ${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}
    </p>
  </div>
</div>`;
  }

  #onImageMarkupCardList(imagesCard) {
    const markup = imagesCard.map(image => this.#onImageMarkupCard(image)).join('');
    this.markupInsertHTML.insertAdjacentHTML('beforeend', markup);
  }
  #onRemoveClassBtn() {
    this.loadMorePositionData.classList.remove('is-hidden');
  }

  #onAddClassBtn() {
    this.loadMorePositionData.classList.add('is-hidden');
  }
}
