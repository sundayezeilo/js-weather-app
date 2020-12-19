export function showForm() {
  const searchForm = document.createElement('input');
  searchForm.type = 'text';
  searchForm.id = 'search';
  searchForm.name = 'search';
  searchForm.placeholder = 'London, UK, Lagos NG, etc';

  const faIcon = document.createElement('i');
  faIcon.className = "fa fa-search";

  let searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.id = 'search-button';
  searchButton.appendChild(faIcon);

  const formWrap = document.createElement('form');
  formWrap.id = 'form-wrap';

  formWrap.appendChild(searchForm);
  formWrap.appendChild(searchButton);
  return formWrap;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1); 
}


export function showWeather(wObject, wrap) {
  const location = document.createElement('p');
  location.className = 'w-info';
  location.innerText = wObject.location;
  wrap .appendChild(location);

  const cloud = document.createElement('p');
  cloud.className = 'w-info';
  cloud.innerText = wObject.cloudCond.split(' ').map(e => capitalize(e)).join(' ');
  wrap .appendChild(cloud);

  const temp = document.createElement('p');
  temp.className = 'w-info';
  temp.innerText = wObject.tempFah;
  wrap .appendChild(temp);

  const windSpeed = document.createElement('p');
  windSpeed.className = 'w-info';
  windSpeed.innerText = wObject.windSpeed;
  wrap .appendChild(windSpeed);

  wrap.style.display = 'block';
}
