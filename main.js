const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3";

async function reload() {
  const res = await fetch(API_URL); // para indicarle que tiene un llamado asincrono
  const data = await res.json();

  const img = document.querySelector("img");
  img.src = data[0].url;

  console.log(data);
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

// Ahora cuando damos click a recargar, nos deberia recargar una imagen. Para que no nos aparezca vacio  anadiremos

reload(); // llama a la funcion reload nada mas carga el código
