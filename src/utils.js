export function showForm() {
  const searchForm = document.createElement('input');
  searchForm.type = 'text';
  searchForm.id = 'search';
  searchForm.name = 'search';
  searchForm.placeholder = 'Search city';

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

function getImgSrc(str) {
  return str.split(' ').map(e => e.toLowerCase()).join('-');  
}

export function showWeather(wObject, wrap) {
  const closeButton = document.createElement('button');
  closeButton.className = 'fa fa-window-close';
  closeButton.id = 'w-close-button';
  closeButton.setAttribute('aria-hidden', "true");
  wrap.appendChild(closeButton);

  const location = document.createElement('p');
  location.className = 'w-info';
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

  let sideWrap = document.createElement('div');
  sideWrap.className = 'side-wrap';
  
  const humidity = document.createElement('p');
  humidity.className = 'w-info';
  humidity.innerText = wObject.humidity;
  sideWrap.appendChild(humidity);

  let windSpeed = document.createElement('p');
  windSpeed.className = 'w-info';
  windSpeed.innerText = wObject.windSpeed;
  sideWrap.appendChild(windSpeed);

  wrap.appendChild(sideWrap);

  const addFav = document.createElement('button');
  addFav.type = 'button';
  addFav.className = 'add-fav fa fa-plus-square';
  addFav.innerText = ' Add to favorites';
  wrap.appendChild(addFav);

  wrap.style.display = 'block';

  wrap.className = getImgSrc(wObject.cloudCond);

  // let imgSrc = getImgSrc(wObject.cloudCond);
  // wrap.style.backgroundImage = `url("./images/${imgSrc}.jpeg")`

  document.querySelector('.cel').addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    let tempStr;
    if(tempStr = document.querySelector('.temp-fah')){
      let tempVal = parseFloat(tempStr.innerText)
      let cel = ((tempVal - 32) * 5/9).toFixed();
      tempStr.className = 'temp-cel';
      tempStr.innerText = cel;
      document.querySelector('.fah').style.color = '#1a0dab'; 
      document.querySelector('.cel').style.color = '#202124';     
    }
  })

  document.querySelector('.fah').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let tempStr;
    if(tempStr = document.querySelector('.temp-cel')){
      let tempVal = parseFloat(tempStr.innerText)
      let fah = (tempVal * 1.8 + 32).toFixed()
      tempStr.className = 'temp-fah';
      tempStr.innerText = fah;
      document.querySelector('.cel').style.color = '#1a0dab';  
      document.querySelector('.fah').style.color = '#202124';      
    }
  })

  document.getElementById('w-close-button').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('w-wrap').style.display = 'none';
  })  
}


export function createHeader() {
  let headerWrap = document.createElement('div');
  headerWrap.id = 'header-wrap';

  const favLink = document.createElement('a');
  favLink.className = 'favorites';
  favLink.id = 'favorites';
  favLink.href = '#';
  favLink.innerHTML = 'Favorites <i class="fa fa-angle-double-right"></i>';

  headerWrap.appendChild(favLink);
  headerWrap.appendChild(showForm());

  return headerWrap;
}