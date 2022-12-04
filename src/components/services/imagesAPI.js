import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30836581-5201b2d4b86300260b3de2e16';

export const fetchImages = (page, query) => {
  return axios({
    params: {
      key: API_KEY,
      q: query,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};
