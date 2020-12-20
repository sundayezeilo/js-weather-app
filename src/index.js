import './style.scss';
import fetch from 'node-fetch';
import { showForm, showWeather } from './utils';

const fetchJSON = async (url) => {
  const response = await fetch(url);
  return await response.json();
}

function resetSearchForm() {
  let textField = document.getElementById('search');
  textField.value = '';
  textField.placeholder = 'Search city';
}


function processWeather(rawWeather) {
  return {
    location: `${rawWeather.name}, ${rawWeather.sys.country}`,
    cloudCond: rawWeather['weather'][0]['description'],
    tempFah: ((rawWeather['main']['temp'] - 273.15) * 1.8 + 32).toFixed(),
    humidity: 'Humidity: ' + (rawWeather.main.humidity).toFixed() + '%',
    windSpeed: 'Wind: ' + (rawWeather['wind']['speed']).toFixed() + ' mph',
    icon: `http://openweathermap.org/img/wn/${rawWeather.weather[0].icon}@2x.png`,
  }
}


let wWrap = document.createElement('div')
wWrap.id = 'w-wrap';
wWrap.style.display = 'none'

function searchHandler(event) {
  event.preventDefault();
  const searchText = document.getElementById('search').value;
  if(searchText){
    let city = searchText.split(/[\s, ]+/)[0];
    let country = searchText.split(/[\s, ]+/)[1];
    fetchJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=ee0d92f2309953f56ed99eb09e4e1159`).then(jsonData => {
      wWrap.innerHTML = '';   
      showWeather(processWeather(jsonData), document.getElementById('w-wrap'));
      resetSearchForm();
    }).catch(e => console.log(e))
  }else{
    alert("input can't be blank");
  }
}

window.onload = () => {
  document.body.appendChild(showForm());
  document.body.appendChild(wWrap);

  document.querySelector('#search-button').addEventListener('click', searchHandler)
};

