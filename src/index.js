import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

import ApiCountry from './fetchCountries';

const inputRef = document.querySelector('#search-box');
const newApiCountry = new ApiCountry();

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  newApiCountry.query = evt.target.value.trim();
  if (newApiCountry.query !== '') {
    newApiCountry.fetchCountries().then(result => {
      console.log(result.length);
    });
  }
}
