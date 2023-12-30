const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_PXnfFUsZ91zC4J92nCT3MaFEePP2PxEYl2lDCcREkECOfnvulI76tz9cBqXZvOUG';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_PXnfFUsZ91zC4J92nCT3MaFEePP2PxEYl2lDCcREkECOfnvulI76tz9cBqXZvOUG';


const spanError = document.getElementById('error');


// Load cats - this function load random cats from the API
async function loadRandomCats() {
  const res = await fetch(API_URL_RANDOM); // to indicate that it has an asynchronous call
  const data = await res.json();

  if (res.status != 200) {
    spanError.innerHTML= "It was an error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
 
    img1.src= data[0].url;
    img2.src= data[1].url;
  }
}

// Load favourite cats - this function POST the cats saved in favourites

async function loadFavourites() {
  const res = await fetch(API_URL_FAVOURITES); // to indicate that it has an asynchronous call
  const data = await res.json();
  console.log(data)

  if (res.status != 200) {
    spanError.innerHTML= "It was an error: " + res.status + data.message;
} 
}

// Save cats into favourites

async function saveFavouriteCats() {
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 'dje'
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status != 200) {
    spanError.innerHTML= "It was an error: " + res.status + data.message;
} 
}



loadRandomCats();
loadFavourites();
saveFavouriteCats();
