function fetchDataFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    let fav = localStorage[key]
    if(fav){
      resolve(JSON.parse(fav));
    }else {
      reject({});
    }
  }) 
}

async function writeDataLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return 'success';
  } catch (e) {
    throw(e)
  }
}

export function listFavorites(event) {
  event.stopPropagation();
  fetchDataFromLocalStorage('favorites').then(fav => {
    if(fav.locations.length) {
      let favWrap = document.getElementById('fav-wrap');
      favWrap.innerHTML = '';
      console.log(fav.locations)
      fav.locations.forEach(loc => {
        const li = document.createElement('p');
        li.className = 'fav-list';
        li.innerText = loc;
        favWrap.appendChild(li);
      });
      favWrap.style.display = 'block';
      document.body.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('fav-wrap').style.display = 'none';
      }, { once: true })
    }else {
      alert('No saved locations in your favorites')
    }  
  }).catch (e => alert('No saved locations in your favorites'))
}

export async function showFavorite() {
  // return await localStorage.getItem("location");
}

export function addToFavorite(event) {
  event.stopPropagation();
  let newFav;
  let notice = document.getElementById('notice');
  notice.style.display = 'block';
  let favLoc = document.querySelector('.loc').textContent;
  fetchDataFromLocalStorage('favorites').then(fav => {    
    newFav = fav;
  }).finally(() => {
    if(!newFav) {
      newFav = { locations: [] };
    }
    newFav.locations.push(favLoc);
    writeDataLocalStorage('favorites', newFav).then(() => {
      document.getElementById('add-fav').style.display = 'none';
      notice.innerText = 'Added to favorites!';
      notice.className = 'alert-success';
    }).catch(e => {
      notice.innerText = e;
      notice.className = 'alert-danger';      
    })    
  })
}