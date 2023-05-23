import axios from 'axios';

const API_KEY = '36367044-f4fa31148b8b4325aabe9da60';
const BASE_URL = 'https://pixabay.com/api/';
const OTHER_PARAMS = 'image_type=photo&orientation=horizontal&per_page=12';
export const PER_PAGE = 12;

export const fetchFotos = (textSearch, page) => {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${textSearch}&page=${page}&${OTHER_PARAMS}`
    )
    .then(response => {
      return response.data;
    });
};

// простой fetch =================================

// export const fetchFotos = (textSearch, page) => {
//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${textSearch}&page=${page}&${OTHER_PARAMS}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(`Нет фото с названием ${textSearch}`);
//     }
//     return response.json();
//   });
// };

// async axios =====================================

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// export const fetchFotos = async (textSearch, page) => {
//   const params = {
//     q: textSearch,
//     key: API_KEY,
//     page: page,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: PER_PAGE,
//   };

//   const response = await axios.get('/', {
//     params,
//   });

//   return response.data;
// };
