import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiCountry from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');
const newApiCountry = new ApiCountry();

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  newApiCountry.query = evt.target.value.trim();
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';

  if (newApiCountry.query !== '') {
    newApiCountry.fetchCountries().then(result => {
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (result.length < 10 && result.length >= 2) {
        countryListRef.insertAdjacentHTML('afterbegin', listMarkup(result));
      } else {
        countryInfoRef.insertAdjacentHTML('afterbegin', cardMarkup(result));
      }
    });
  }
}

function cardMarkup(countries) {
  const cardMarkup = countries
    .map(i => {
      return `<div class='header'>
      <img width="20px" src='${i.flags.svg}' alt='${i.name.common} flag' />
      <b>${i.name.official}</b></div>
      <p><b>Capital:</b>${i.capital}</p>
      <p><b>Population:</b>${i.population}</p>
      <p><b>Languages:</b>${Object.values(i.languages)}</p>`;
    })
    .join('');
  return cardMarkup;
}
function listMarkup(countries) {
  const listMarkup = countries
    .map(i => {
      return `<li><div class="list-item">
    <img width="20px" src="${i.flags.svg}" alt="${i.name.common} flag" />
    <span>${i.name.common}</span></div></li>`;
    })
    .join('');
  return listMarkup;
}
