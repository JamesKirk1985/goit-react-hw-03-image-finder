import axios from 'axios';

export async function imgGetFunction(searchKey, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_kEY = '40414908-c5b127de93d48db35f1a240f6';
  const params = new URLSearchParams({
    key: API_kEY,
    q: searchKey,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });
  const response = await axios(`${BASE_URL}?${params}`);
  return response.data;
}
