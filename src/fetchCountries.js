import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default class ApiCountryService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}${this.searchQuery}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('error 404');
        }
      })
      .then(data => {
        return data;
      })
      .catch(() => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
