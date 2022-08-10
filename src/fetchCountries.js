const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default class ApiCountryService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}${this.searchQuery}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        return data;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
