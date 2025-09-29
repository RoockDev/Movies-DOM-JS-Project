/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 *
 */
let divActualmenteArrastrado = null;
const NMOVIES = 5;
const NELEMENTSPMOVIE = 3;
const getMoviesDeck = () => {
  let movieDeck = [];
  for (let i = 1; i <= NMOVIES; i++) {
    movieDeck.push("0" + i + "M");
  }
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
            // añadimos un Id al personajes para la logica de despues
            /**
             * He estado buscando y he visto que con dataset puedes asignarle "atributos" 
             * a un elemento html para despues poder llamarlo y acceder a el de manera mas facil,
             * por lo que he visto es la forma mas estandar y mas limpia actualmente
             * por ese motivo lo he utilizado aqui para luego poder comparar los elementos
             * y ver cual corresponde a la pelicula.
             */
            newDiv.dataset.personajeId = element; 
            newDiv.className = 'personaje-contenedor';
            newDiv.draggable = true;
            const img = document.createElement('img');
            img.src = `assets/characters/${element}.jpg`;
            img.alt = "";
            img.draggable = false;
            img.className = "recurso";
            newDiv.addEventListener('dragstart', (e) => {
            divActualmenteArrastrado = newDiv; //  guardamos el div que se arrastra
            });
            

            newDiv.appendChild(img);
            elementosPelicula.appendChild(newDiv);
        } 

        }
        
});
};

const iniHuecos = () =>{
  const hueco1 = document.getElementById("hueco1");
  const hueco2 = document.getElementById("hueco2");
  const hueco3 = document.getElementById("hueco3");

  const permitirSoltar = (e) =>{
    e.preventDefault(); // para que el navegador deje soltar
  };

  const manejarSoltar = (e) =>{
    e.preventDefault();
if (divActualmenteArrastrado) {
        // Verificamos si el hueco ya tiene un elemento (solo puede haber uno)
        if (e.currentTarget.children.length > 0) {
            return; // Si ya hay un elemento, no hacemos nada
        }

        // Obtenemos el ID del personaje arrastrado
        const personajeId = divActualmenteArrastrado.dataset.personajeId;
        
        // Verificamos si el personaje pertenece a la pelicula activa con substrings
        const esCorrecto = personajeId.substring(0,2) == peliculaActiva.substring(0,2);

        if (esCorrecto) {
          
            e.currentTarget.classList.remove('incorrecto');
            e.currentTarget.classList.add('correcto');
           
            e.currentTarget.appendChild(divActualmenteArrastrado);
            // Aqui pondremos luego la logica para ver si la pelicula esta completamente bien
        } else {
            e.currentTarget.classList.add('incorrecto');
        }

        divActualmenteArrastrado = null;
    }
    
  };

  [hueco1,hueco2,hueco3].forEach(hueco => {
    hueco.addEventListener('dragover',permitirSoltar);
    hueco.addEventListener('drop',manejarSoltar);
  });
};


btnShowMovie();
btnAdivinar();
iniHuecos();
