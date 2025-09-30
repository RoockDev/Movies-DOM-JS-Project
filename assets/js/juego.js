/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 *
 */
let intentosTotales = 0;
const MAX_INTENTOS_TOTALES = 10;
let personajesCorrectos = 0;
let peliculasCompletadas = 0;
const TOTAL_PELICULAS = 5;
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
    alert("No hay mas cartas");
  } else {
    const tarjeta = elementDeck.pop();

    return tarjeta;
  }
};

const removeMovieDeck = (deck) => {
  if (deck.length === 0) {
    alert("no quedan mas tarjetas");
  } else {
    return deck.pop();
  }
};
let peliculaActiva = null;

const btnShowMovie = () => {
  const btnMovie = document.querySelector("#btnMovie");
  const divMovie = document.querySelector("#pelicula-caratula");

  btnMovie.addEventListener("click", () => {
    //verificamos si se han completado los 3 personajes de la pelicula actual
    if (personajesCorrectos < 3 && peliculaActiva != null) {
      alert(
        "Debes completar los 3 personajes de la pelicula para poder avanzar"
      );
      return;
    }
    //Limpiamos los huecos
    document.getElementById("hueco1").innerHTML = "";
    document.getElementById("hueco2").innerHTML = "";
    document.getElementById("hueco3").innerHTML = "";

    document
      .getElementById("hueco1")
      .classList.remove("correcto", "incorrecto");
    document
      .getElementById("hueco2")
      .classList.remove("correcto", "incorrecto");
    document
      .getElementById("hueco3")
      .classList.remove("correcto", "incorrecto");

    //limpiar zona inferior
    document.getElementById("elementos-pelicula").innerHTML = "";

    //reiniciamos contadores
    personajesCorrectos = 0;

    //reiniciamos el mazo de personajes
    elementDeck = getElementsDeck();

    const movie = removeMovieDeck(movieDeck);
    if (movie) {
      const firstImg = divMovie.querySelector("img");
      firstImg.src = `assets/movies/${movie}.jpg`;
      peliculaActiva = movie; //con esto sabemos que hay pelicula activa para despues mostrar en adivina
    }
  });
};

const btnAdivinar = () => {
  const btnAdivina = document.getElementById("btnAdivina");
  const elementosPelicula = document.getElementById("elementos-pelicula");

  btnAdivina.addEventListener("click", () => {
    if (!peliculaActiva) {
      alert(
        "Debe haber una pelicula mostrada para poder pulsar el boton adiviar"
      );
    } else {
      const element = removeMovieDeck(elementDeck);
      if (element) {
        const newDiv = document.createElement("div");
        // añadimos un Id al personajes para la logica de despues
        /**
         * He estado buscando y he visto que con dataset puedes asignarle "atributos"
         * a un elemento html para despues poder llamarlo y acceder a el de manera mas facil,
         * por lo que he visto es la forma mas estandar y mas limpia actualmente
         * por ese motivo lo he utilizado aqui para luego poder comparar los elementos
         * y ver cual corresponde a la pelicula.
         */
        newDiv.dataset.personajeId = element;
        newDiv.className = "personaje-contenedor";
        newDiv.draggable = true;
        const img = document.createElement("img");
        img.src = `assets/characters/${element}.jpg`;
        img.alt = "";
        img.draggable = false;
        img.className = "recurso";
        newDiv.addEventListener("dragstart", (e) => {
          divActualmenteArrastrado = newDiv; //  guardamos el div que se arrastra
        });

        newDiv.appendChild(img);
        elementosPelicula.appendChild(newDiv);
      }
    }
  });
};

const peliculaAcertada = () => {
  if (personajesCorrectos === 3) {
    peliculasCompletadas++;
    document.getElementById("contador-completadas").textContent =
      peliculasCompletadas;
      
  }
};

const mostrarGameOverModal = () =>{
  document.getElementById('final-completadas').textContent = peliculasCompletadas;
  document.getElementById('gameOverModal').classList.remove('hidden');
}

const actualizarContadorIntentos = () =>{
  intentosTotales++;
  document.getElementById('contador-intentos').textContent = intentosTotales;
  
}

const iniHuecos = () => {
  const hueco1 = document.getElementById("hueco1");
  const hueco2 = document.getElementById("hueco2");
  const hueco3 = document.getElementById("hueco3");

  const permitirSoltar = (e) => {
    e.preventDefault(); // para que el navegador deje soltar
  };

  const manejarSoltar = (e) => {
    e.preventDefault();
    if (divActualmenteArrastrado) {
      // Verificamos si el hueco ya tiene un elemento (solo puede haber uno)
      if (e.currentTarget.children.length > 0) {
        return; // Si ya hay un elemento, no hacemos nada
      }

      // Obtenemos el ID del personaje arrastrado
      const personajeId = divActualmenteArrastrado.dataset.personajeId;

      // Verificamos si el personaje pertenece a la pelicula activa con substrings
      const esCorrecto =
        personajeId.substring(0, 2) == peliculaActiva.substring(0, 2);

      if (esCorrecto) {
        e.currentTarget.classList.remove("incorrecto");
        e.currentTarget.classList.add("correcto");
        personajesCorrectos += 1;
        //si la pelicula ha sido completada se le suma uno al contador
        peliculaAcertada();

        e.currentTarget.appendChild(divActualmenteArrastrado);
        // Aqui pondremos luego la logica para ver si la pelicula esta completamente bien
      } else {
        e.currentTarget.classList.add("incorrecto");
       
        actualizarContadorIntentos();
         if (intentosTotales == 10) {
          mostrarGameOverModal();
        }
      }

      divActualmenteArrastrado = null;
    }
  };

  [hueco1, hueco2, hueco3].forEach((hueco) => {
    hueco.addEventListener("dragover", permitirSoltar);
    hueco.addEventListener("drop", manejarSoltar);
  });
};

const inicializarBotonReiniciar = () =>{
  let btnReiniciar = document.getElementById('btnReiniciar');
  btnReiniciar.addEventListener('click' ,() =>{
    //Reiniciamos todas las variables
    peliculasCompletadas = 0;
    personajesCorrectos = 0;
    intentosTotales = 0;

    //reiniciamos los mazos
    movieDeck = getMoviesDeck();
    elementDeck = getElementsDeck();

    //ocultamos el modal
    document.getElementById('gameOverModal').classList.add('hidden');

    //limpiamos la pantalla
    document.getElementById('contador-completadas').textContent = '0';
    document.getElementById('contador-intentos').textContent = '0';
    document.getElementById('hueco1').innerHTML = '';
    document.getElementById('hueco2').innerHTML = '';
    document.getElementById('hueco3').innerHTML = '';
    document.getElementById('elementos-pelicula').innerHTML = '';

    //limpiamos los estilos que le dimos a los huecos de arriba cuando fuese correcto y cuando no
    document.getElementById('hueco1').classList.remove('correcto','incorrecto');
    document.getElementById('hueco2').classList.remove('correcto','incorrecto');
    document.getElementById('hueco3').classList.remove('correcto','incorrecto');

    //limpiamos la ultima imagen de la ultima pelicula a la que hemos jugado
    const firstImg = document.querySelector("#pelicula-caratula img");

    //reiniciamos pelicula activa para la logica del juego
    peliculaActiva = null;
  });
}



btnShowMovie();
btnAdivinar();
iniHuecos();
inicializarBotonReiniciar();
