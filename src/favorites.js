export async function listFavorites() {
  return await localStorage;
}

export async function showFavorite() {
  return await localStorage.getItem("location");
}

export async function addFavorites (fav) {
  let favArray = await localStorage.setItem('location', fav.location);
  // favArray.push
}

// JSON.stringify(fav)