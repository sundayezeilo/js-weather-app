import './style.scss';
import fetch from 'node-fetch';
import { showForm, showWeather } from './utils';

const fetchJSON = async (url) => {
  const response = await fetch(url);
  return await response.json();
}


function processWeather(rawWeather) {
  return {
    location: `${rawWeather.name}, ${rawWeather.sys['country']}`,
    cloudCond: rawWeather['weather'][0]['description'],
    tempFah: ((rawWeather['main']['temp'] - 273.15) * 1.8 + 32).toFixed(2),
    windSpeed: rawWeather['wind']['speed'],
  }
}


let wWrap = document.createElement('div')
wWrap.id = 'w-wrap';
wWrap.style.display = 'none'

function searchHandler(event) {
  event.preventDefault()
  const searchText = document.getElementById('search').value;
  if(searchText){
    let city = searchText.match(/\w+(?:'\w+)*/g)[0];
    let country = searchText.match(/\w+(?:'\w+)*/g)[1];
    fetchJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=ee0d92f2309953f56ed99eb09e4e1159`).then(jsonData => {
      wWrap.innerHTML = '';    
      showWeather(processWeather(jsonData), wWrap)
    }).catch(e => alert(e))
  }else{
    alert("input can't be blank");
  }
}

window.onload = () => {
  document.body.appendChild(showForm());
  document.body.appendChild(wWrap);

  let searchButton = document.querySelector('#search-button')
  searchButton.addEventListener('click', searchHandler)
};

