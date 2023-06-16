const URL = "https://api.thecatapi.com/v1/images/search";

fetch(URL)
  .then((res) => res.json()) // El metodo fetch me devuelve una promesa y las promesas las podemos resolver con el metodo then. Debo convertir ese then a un objeto de JavaScript. Esto nos devuelve otra promesa
  .then((data) => {
    const img = document.querySelector("img"); // Esto significa que agarramos el módulo
    img.src = data[0].url; // en este caso haremos que la URL aparezca en la etiqueta img y src del HTML
    // Data ya tiene todo lo que venga de esa API. Si entramos ah’i tenemos un JSON y cada vez que recargamos la p’agina nos da una URL distinta. Para consumir estas APIs desde el navegador, podemos usar la extension de chrome de Google y cada vez que tengamos una respuesta de JSON le dará estilo para que sea legible y lo podamos entender mucho más facilmente
  });
