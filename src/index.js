import './style.scss';
import { createHeader } from './utils';
import { listFavorites } from './favorites';

let wWrap = document.createElement('div')
wWrap.id = 'w-wrap';
wWrap.style.display = 'none'

import { getWeatherData } from './utils';

function searchHandler(event) {
  event.preventDefault();
  getWeatherData(document.getElementById('search').value)  
}

const pageHeading = document.createElement('H1');
pageHeading.className = 'page-heading';
pageHeading.innerText = 'WEATHER WEBSITE';

const noticeBar = document.createElement('H7');
noticeBar.id = 'notice';

window.onload = () => {
  document.body.appendChild(pageHeading);
  document.body.appendChild(createHeader());
  document.body.appendChild(noticeBar);
  document.body.appendChild(wWrap);

  localStorage.removeItem('favorites');

  document.querySelector('#search-button').addEventListener('click', searchHandler)
  document.getElementById('favorites').addEventListener('click', listFavorites);
};

