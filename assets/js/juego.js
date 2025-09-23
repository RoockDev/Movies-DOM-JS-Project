/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 *
 */
const NMOVIES = 5;
const NELEMENTSPMOVIE = 3;
const getMoviesDeck = () => {
  let movieDeck = [];
  for (let i = 1; i <= NMOVIES; i++) {
    movieDeck.push("0" + i + "M");
  }
  //Barajamos con un método dela librería Underscore. Esta librería ofrece muchas funciones,
  //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
  movieDeck = _.shuffle(movieDeck);
  return movieDeck;
};

const getElementsDeck = () => {
  let elementDeck = [];
  for (let i = 1; i <= NMOVIES; i++) {
    for (let j = 1; j <= NELEMENTSPMOVIE; j++) {
      elementDeck.push("0" + i + "C" + j);
    }
  }
  //Barajamos
  elementDeck = _.shuffle(elementDeck);
  return elementDeck;
};

let movieDeck = getMoviesDeck();
let elementDeck = getElementsDeck();

const getMovie = (movieDeck) => {
  if (movieDeck.length === 0) {
    throw "No hay mas peliculas";
  } else {
    const tarjeta = movieDeck.pop();

    return tarjeta;
  }
};

const btnShowMovie = () => {
  const btnMovie = document.querySelector("#btnMovie");

  const divPelicula = document.querySelector("#pelicula-caratula");

  btnMovie.addEventListener("click", () => {
    let movie = getMovie(movieDeck);

    const existeImagen = divPelicula.querySelector("img");
    if (existeImagen) {
      divPelicula.removeChild(existeImagen);
    }
    
    const imgElement = document.createElement("img");
    imgElement.src = `assets/movies/${movie}.jpg`;
    imgElement.classList.add("elemento");
    divPelicula.appendChild(imgElement);
  });
};

btnShowMovie();
