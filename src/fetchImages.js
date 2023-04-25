import axios from 'axios';

const FETCH_URL = 'https://pixabay.com/api/';
const API_KEY = '35728571-e5e325dee746f09c3ee4748c1';

export default function fetchImages(value) {
  return axios
    .get(
      `${FETCH_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`,
    )
    .then(response => {
      // console.log(response);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response;
    });
}
