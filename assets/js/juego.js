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
    for (let j = 0; j < NELEMENTSPMOVIE; j++) {
      elementDeck.push("0" + i + "C" + j);
    }
  }
  //Barajamos
  elementDeck = _.shuffle(elementDeck);
  return elementDeck;
};

let movieDeck = getMoviesDeck();
let elementDeck = getElementsDeck();

const getElement = (elementDeck) => {
  if (elementDeck.length === 0) {
    throw "No hay mas cartas";
  } else {
    const tarjeta = elementDeck.pop();

    return tarjeta;
  }
};

const removeMovieDeck = (deck) => {
    if (deck.length === 0){
      throw new Error("no quedan mas tarjetas");
      
    }else{
        return deck.pop();
    }
    
};
let peliculaActiva = null 

const btnShowMovie = () => {
  const btnMovie = document.querySelector("#btnMovie");
  const divMovie = document.querySelector("#pelicula-caratula");

  btnMovie.addEventListener("click", () => {
    const movie = removeMovieDeck(movieDeck);
    if (movie) {
        const firstImg = divMovie.querySelector('img');
        firstImg.src = `assets/movies/${movie}.jpg`;
        peliculaActiva = movie; //con esto sabemos que hay pelicula activa para despues mostrar en adivina
    }

  });
};

const btnAdivinar = () =>{
const btnAdivina = document.getElementById('btnAdivina');
    const elementosPelicula = document.getElementById('elementos-pelicula');



btnAdivina.addEventListener('click', () => {

        if (!peliculaActiva) {
            alert("Debe haber una pelicula mostrada para poder pulsar el boton adiviar");
        }else{
          const element = removeMovieDeck(elementDeck);
        if (element) {
            const newDiv = document.createElement('div');
            newDiv.className = 'elemento';
            newDiv.innerHTML = `<img class="recurso" src="assets/characters/${element}.jpg" alt="">`;
            elementosPelicula.appendChild(newDiv);
        } 

        }
        
});
};


btnShowMovie();
btnAdivinar();



