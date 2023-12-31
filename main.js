const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4&api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_FAVOTITES_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random');
  console.log(data);

  if (res.status !== 200) {
      spanError.innerHTML = 'Hubo un error: ' + res.status;
  } else {
      const img1 = document.getElementById('img1');
      const img2 = document.getElementById('img2');
      const img3 = document.getElementById('img3');
      const img4 = document.getElementById('img4');
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');
      const btn3 = document.getElementById('btn3');
      const btn4 = document.getElementById('btn4');

      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url; // Set the src for img3
      img4.src = data[3].url; // Set the src for img4

      btn1.onclick = () => saveFavouriteMichi(data[0].id);
      btn2.onclick = () => saveFavouriteMichi(data[1].id);
      btn3.onclick = () => saveFavouriteMichi(data[2].id); // Assign a click handler for btn3
      btn4.onclick = () => saveFavouriteMichi(data[3].id); // Assign a click handler for btn4
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES, {
      method: 'GET',
      headers: {
          'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46'
      }
  });
  const data = await res.json();
  console.log('Favoritos');
  console.log(data);

  if (res.status !== 200) {
      spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
  } else {
      const section = document.getElementById('favoriteMichis');
      section.innerHTML = ''; // Clear existing content before adding new


      // Use a promise to wait for all images to load before updating the UI
      const imageLoadPromises = data.map(async (michi) => {
          const article = document.createElement('article');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          const btnText = document.createTextNode('Delete');

          img.onload = () => {
              // Image has loaded, add it to the DOM
              article.appendChild(img);
              article.appendChild(btn);
              btn.appendChild(btnText);
              btn.onclick = () => deleteFavouriteMichi(michi.id);
              img.width = 300;
              img.height = 300;
              article.appendChild(img);
              article.appendChild(btn);
              section.appendChild(article);
          };

          img.src = michi.image.url;
          img.width = 150;
      });

      // Wait for all images to load before updating the UI
      await Promise.all(imageLoadPromises);
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });

  const data = await res.json();
  console.log(data.message);

  // You can optionally update the UI here without calling saveFavouriteMichi() again

  console.log("prueba", res);
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46'
    }
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi eliminado de favoritos')
    loadFavouriteMichis();
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  const res = await fetch(API_URL_FAVOTITES_UPLOAD, {
      method: 'POST',
      headers: {
          'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
      },
      body: formData,
  });

  const data = await res.json();

  if (res.status !== 201) {
      spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`;
  } else {
      console.log("Foto de michi cargada :)");
      console.log({ data });
      console.log(data.url);
      saveFavouriteMichi(data.id); // para agregar el michi cargado a favoritos.
  }
}

loadRandomMichis();
loadFavouriteMichis();
saveFavouriteMichi()
deleteFavouriteMichi()
uploadMichiPhoto();