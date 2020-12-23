import { getWeatherData, showWeather } from './utils';

export function fetchDataFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      let fav = localStorage[key]
      if(fav){
        fav = JSON.parse(fav);
      }else {
        fav = {}
      }
      resolve(fav);      
    } catch (e) {
      reject(e)
    }
  }) 
}

function alertNotice(alertType, msg) {
  let notice = document.getElementById('notice');
  notice.className = `alert-${alertType}`;
  notice.innerText = (msg);
  notice.style.display = 'block';
}

async function writeDataLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return 'success';
  } catch (e) {
    throw(e)
  }
}

export async function removeFromFavorites(favLoc) {
  try {
    return await fetchDataFromLocalStorage('favorites').then(async (fav) => {
      fav.locations.splice(fav.locations.indexOf(favLoc), 1)
      return await writeDataLocalStorage('favorites', fav);
    }).catch(e => {
      throw(e)
    })
  } catch (e) {
    throw(e)
  }
}

function showFavorite(e) {
  e.stopPropagation();
  getWeatherData(e.target.textContent);
}


export function listFavorites(event) {
  if(event) {
    event.stopPropagation();    
  }
  fetchDataFromLocalStorage('favorites').then(fav => {
    if(fav.locations && fav.locations.length) {
      let favWrap = document.getElementById('fav-wrap');
      favWrap.innerHTML = '';
      console.log(fav.locations)
      fav.locations.forEach(loc => {
        const listWrap = document.createElement('div');
        const liText = document.createElement('div');
        liText.className = 'fav-loc'
        listWrap.className = 'fav-list';
        liText.innerText = loc;
        listWrap.appendChild(liText);

        const favCloseButton = document.createElement('button');
        favCloseButton.className = 'fa fa-window-close';
        favCloseButton.id = 'fav-close-button';
        favCloseButton.setAttribute('aria-hidden', "true");
        favCloseButton.setAttribute('data-id', loc);
        listWrap.appendChild(favCloseButton);

        favWrap.appendChild(listWrap);

        liText.addEventListener('click', showFavorite)

        favCloseButton.addEventListener('click', (e) => {
          e.stopPropagation();
          removeFromFavorites(e.target.dataset.id).then(() => {
            alertNotice('success', 'Removed from favorites!');
            getWeatherData(document.querySelector('.loc').textContent);
            listFavorites();
          })
        }, { once: true })
      });

      favWrap.style.display = 'block';

      document.body.addEventListener('click', (e) => {
        document.getElementById('fav-wrap').style.display = 'none';
      }, { capture: true})

    }else {
      document.getElementById('fav-wrap').style.display = 'none';
      alertNotice('warning','No saved locations in your favorites')
    }  
  }).catch(e => {
    console.log(e)
    alertNotice('warning', 'Sorry, but something went wrong!')
  })
}

function createAddFavoritesEvent() {
  const favButton = document.getElementById('rem-fav');
  favButton.innerText = ' Add to favorites';
  favButton.id = 'add-fav';

  favButton.addEventListener('click', e => {
    e.stopPropagation()
    addToFavorite();
  }, { once: true });
}

function createRemoveFavoriteEvent() {
  const favButton = document.getElementById('add-fav');
  favButton.innerText = ' Remove from favorites';
  favButton.id = 'rem-fav';
  favButton.addEventListener('click', (e) => {
    e.stopPropagation();
    removeFromFavorites().then(() => {
      alertNotice('success', 'Removed from favorites!');
      createAddFavoritesEvent();
    })
  }, { once: true })  
}

export function addToFavorite() {
  let favLoc = document.querySelector('.loc').textContent;
  fetchDataFromLocalStorage('favorites').then(fav => {
    if(!fav.locations) {
      fav.locations = [];
    }
    if(!fav.locations.find(e => e == favLoc)) {
      fav.locations.push(favLoc);
      writeDataLocalStorage('favorites', fav).then(() => {
        createRemoveFavoriteEvent()
        alertNotice('success', 'Added to favorites!');
      }).catch(e => {
        alertNotice('danger', e);
        notice.innerText = e;    
      })
    }
  }).catch(() => alertNotice('warning','Sorry, but something went wrong!'))
}