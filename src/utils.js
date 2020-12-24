// eslint-disable-next-line import/no-cycle
import { addToFavorite, removeFromFavorites, fetchDataFromLocalStorage } from './favorites';

const showForm = () => {
  const searchCityForm = document.createElement('input');
  searchCityForm.type = 'text';
  searchCityForm.id = 'search-city';
  searchCityForm.name = 'search-city';
  searchCityForm.placeholder = 'Search city';

  const searchCountryForm = document.createElement('input');
  searchCountryForm.type = 'text';
  searchCountryForm.id = 'search-country';
  searchCountryForm.name = 'search-country';
  searchCountryForm.placeholder = 'Country code';

  const faIcon = document.createElement('i');
  faIcon.className = 'fa fa-search';

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.id = 'search-button';
  searchButton.appendChild(faIcon);

  const formWrap = document.createElement('form');
  formWrap.id = 'form-wrap';

  formWrap.appendChild(searchCityForm);
  formWrap.appendChild(searchCountryForm);
  formWrap.appendChild(searchButton);
  return formWrap;
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const alertNotice = (alertType, msg) => {
  const notice = document.getElementById('notice');
  notice.className = `alert-${alertType}`;
  notice.innerText = (msg);
  notice.style.display = 'block';
};

function getImgSrc(str) {
  return str.split(' ').map(e => e.toLowerCase()).join('-');
}

const showWeather = (wObject, wrap) => {
  const closeButton = document.createElement('button');
  closeButton.className = 'fa fa-window-close';
  closeButton.id = 'w-close-button';
  closeButton.setAttribute('aria-hidden', 'true');
  wrap.appendChild(closeButton);

  const location = document.createElement('p');
  location.className = 'w-info loc';
  location.innerText = wObject.location;
  wrap.appendChild(location);

  const cloud = document.createElement('p');
  cloud.className = 'w-info';
  cloud.innerText = wObject.cloudCond.split(' ').map(e => capitalize(e)).join(' ');
  wrap.appendChild(cloud);

  wrap.className = getImgSrc(wObject.cloudCond);

  const icon = document.createElement('img');
  icon.className = 'w-icon';
  icon.src = wObject.icon;
  wrap.appendChild(icon);


  const temp = document.createElement('span');
  temp.className = 'w-info temp';

  const tempVal = document.createElement('span');
  tempVal.className = 'temp-fah';
  tempVal.innerText = wObject.tempFah;
  temp.appendChild(tempVal);

  const tempUnit = document.createElement('span');
  tempUnit.className = 't-unit';
  tempUnit.innerHTML = ' <sup><a href="#" class="fah" style="color:#202124;">&deg;F<a>&nbsp; | &nbsp;<a href="#" class="cel" style="color:#1a0dab;">&deg;C</a></sup>';
  temp.appendChild(tempUnit);
  wrap.appendChild(temp);

  const sideWrap = document.createElement('div');
  sideWrap.className = 'side-wrap';

  const humidity = document.createElement('p');
  humidity.className = 'w-info';
  humidity.innerText = wObject.humidity;
  sideWrap.appendChild(humidity);

  const windSpeed = document.createElement('p');
  windSpeed.className = 'w-info';
  windSpeed.innerText = wObject.windSpeed;
  sideWrap.appendChild(windSpeed);

  wrap.appendChild(sideWrap);

  const addFav = document.createElement('button');
  addFav.type = 'button';
  addFav.id = 'add-fav';
  addFav.className = 'add-fav fa fa-plus-square';

  fetchDataFromLocalStorage('favorites').then(fav => {
    if (fav.locations && fav.locations.find(loc => loc === wObject.location)) {
      addFav.innerText = ' Remove from favorites';
      addFav.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromFavorites();
      });
    } else {
      addFav.innerText = ' Add to favorites';
      addFav.addEventListener('click', (e) => {
        e.stopPropagation();
        addToFavorite();
      });
    }
    wrap.appendChild(addFav);
  });

  wrap.style.display = 'block';

  wrap.className = getImgSrc(wObject.cloudCond);

  document.querySelector('.cel').addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const tempStr = document.querySelector('.temp-fah');
    if (tempStr) {
      const tempVal = parseFloat(tempStr.innerText);
      const cel = (((tempVal - 32) * 5) / 9).toFixed();
      tempStr.className = 'temp-cel';
      tempStr.innerText = cel;
      document.querySelector('.fah').style.color = '#1a0dab';
      document.querySelector('.cel').style.color = '#202124';
    }
  });

  document.querySelector('.fah').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const tempStr = document.querySelector('.temp-cel');
    if (tempStr) {
      const tempVal = parseFloat(tempStr.innerText);
      const fah = (tempVal * 1.8 + 32).toFixed();
      tempStr.className = 'temp-fah';
      tempStr.innerText = fah;
      document.querySelector('.cel').style.color = '#1a0dab';
      document.querySelector('.fah').style.color = '#202124';
    }
  });

  document.getElementById('w-close-button').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('w-wrap').style.display = 'none';
  });

  document.getElementById('notice').style.display = 'none';
};


const createHeader = () => {
  const headerWrap = document.createElement('div');
  headerWrap.id = 'header-wrap';

  const favLink = document.createElement('a');
  favLink.className = 'favorites';
  favLink.id = 'favorites';
  favLink.href = '#';
  favLink.innerHTML = 'Favorites <i class="fa fa-angle-double-right"></i>';
  headerWrap.appendChild(favLink);

  const favWrap = document.createElement('div');
  favWrap.className = 'fav-wrap';
  favWrap.id = 'fav-wrap';
  favWrap.style.display = 'none';
  headerWrap.appendChild(favWrap);

  headerWrap.appendChild(showForm());

  return headerWrap;
};


async function fetchJSON(url) {
  return fetch(url).then(response => response.json());
}

function resetSearchForm() {
  let textField = document.getElementById('search-city');
  textField.value = '';
  textField.placeholder = 'Search city';

  textField = document.getElementById('search-country');
  textField.value = '';
  textField.placeholder = 'Country code';
}


function processWeather(rawWeather) {
  return {
    location: `${rawWeather.name}, ${rawWeather.sys.country}`,
    cloudCond: rawWeather.weather[0].description,
    tempFah: ((rawWeather.main.temp - 273.15) * 1.8 + 32).toFixed(),
    humidity: `Humidity: ${(rawWeather.main.humidity).toFixed()}%`,
    windSpeed: `Wind: ${(rawWeather.wind.speed).toFixed()} mph`,
    icon: `http://openweathermap.org/img/wn/${rawWeather.weather[0].icon}@2x.png`,
  };
}

const getWeatherData = (city, countryCode) => {
  if (city) {
    const wWrap = document.getElementById('w-wrap');
    fetchJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=ee0d92f2309953f56ed99eb09e4e1159`).then(jsonData => {
      wWrap.innerHTML = '';
      showWeather(processWeather(jsonData), document.getElementById('w-wrap'));
      resetSearchForm();
    }).catch(() => alertNotice('danger', 'Oops! Something went wrong.\n Check your input and try again!'));
  } else {
    alertNotice('warning', "input can't be blank");
  }
};

export {
  getWeatherData, createHeader, showWeather, alertNotice, showForm,
};