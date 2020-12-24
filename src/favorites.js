// eslint-disable-next-line import/no-cycle
import { alertNotice, getWeatherData } from './utils';

const fetchDataFromLocalStorage = (key) => new Promise((resolve, reject) => {
  try {
    let fav = localStorage[key];
    if (fav) {
      fav = JSON.parse(fav);
    } else {
      fav = {};
    }
    resolve(fav);
  } catch (e) {
    reject(e);
  }
});

const writeDataLocalStorage = async (key, data) => localStorage.setItem(key, JSON.stringify(data));

const removeFromFavorites = async (favLoc) => fetchDataFromLocalStorage('favorites').then(fav => {
  fav.locations.splice(fav.locations.indexOf(favLoc), 1);
  return writeDataLocalStorage('favorites', fav);
});

const showFavorite = (e) => {
  e.stopPropagation();
  getWeatherData(e.target.textContent);
};


const listFavorites = (event) => {
  if (event) {
    event.stopPropagation();
  }
  fetchDataFromLocalStorage('favorites').then(fav => {
    if (fav.locations && fav.locations.length) {
      const favWrap = document.getElementById('fav-wrap');
      favWrap.innerHTML = '';
      fav.locations.forEach(loc => {
        const listWrap = document.createElement('div');

        const liText = document.createElement('div');
        liText.className = 'fav-loc';
        listWrap.className = 'fav-list';
        liText.innerText = loc;
        listWrap.appendChild(liText);

        const favCloseButton = document.createElement('button');
        favCloseButton.className = 'fa fa-window-close';
        favCloseButton.id = 'fav-close-button';
        favCloseButton.setAttribute('aria-hidden', 'true');
        favCloseButton.setAttribute('data-id', loc);
        listWrap.appendChild(favCloseButton);

        favWrap.appendChild(listWrap);

        liText.addEventListener('click', showFavorite);

        favCloseButton.addEventListener('click', (e) => {
          e.stopPropagation();
          removeFromFavorites(e.target.dataset.id).then(() => {
            alertNotice('success', 'Removed from favorites!');
            getWeatherData(document.querySelector('.loc').textContent);
            listFavorites();
          });
        }, { once: true });
      });

      favWrap.style.display = 'block';

      document.body.addEventListener('click', () => {
        document.getElementById('fav-wrap').style.display = 'none';
      }, { capture: true });
    } else {
      document.getElementById('fav-wrap').style.display = 'none';
      alertNotice('warning', 'No saved locations in your favorites');
    }
  }).catch(() => alertNotice('warning', 'Sorry, but something went wrong!'));
};

const addToFavorite = () => {
  const favLoc = document.querySelector('.loc').textContent;
  fetchDataFromLocalStorage('favorites').then(fav => {
    if (!fav.locations) {
      fav.locations = [];
    }
    if (!fav.locations.find(e => e === favLoc)) {
      fav.locations.push(favLoc);
      writeDataLocalStorage('favorites', fav).then(() => {
        const favButton = document.getElementById('add-fav');
        favButton.innerText = ' Remove from favorites';
        favButton.id = 'rem-fav';
        favButton.addEventListener('click', (e) => {
          e.stopPropagation();
          removeFromFavorites().then(() => {
            alertNotice('success', 'Removed from favorites!');
            const favButton = document.getElementById('rem-fav');
            favButton.innerText = ' Add to favorites';
            favButton.id = 'add-fav';

            favButton.addEventListener('click', e => {
              e.stopPropagation();
              addToFavorite();
            }, { once: true });
          });
        }, { once: true });
        alertNotice('success', 'Added to favorites!');
      }).catch(e => {
        alertNotice('danger', e);
      });
    }
  }).catch(() => alertNotice('warning', 'Sorry, but something went wrong!'));
};


export {
  addToFavorite, listFavorites, removeFromFavorites, fetchDataFromLocalStorage,
};