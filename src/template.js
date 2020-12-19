import { capitalize } from './utils'

class Page {
  constructor(wObject) {
    let wrap = document.getElementById('w-wrap');
    // wrap.id = 'w-wrap';

    const location = document.createElement('p');
    location.className = 'w-info';
    location.innerText = wObject.location;
    wrap.appendChild(location);

    const cloud = document.createElement('p');
    location.className = 'w-info';
    cloud.innerText = wObject.cloudCond.split(' ').map(e => capitalize(e)).join(' ');
    wrap.appendChild(cloud);

    const temp = document.createElement('p');
    temp.className = 'w-info';
    temp.innerText = wObject.tempFah;
    wrap.appendChild(temp);

    const windSpeed = document.createElement('p');
    windSpeed.className = 'w-info';
    windSpeed.innerText = wObject.windSpeed;
    wrap.appendChild(windSpeed);

    this.content = wrap;
  }
}