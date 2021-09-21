//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
//a qui se van almacenar los tweets
let tweets = [];



//Event Listeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    })
}




//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Seleccionamos el textArea
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if (tweet == '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    //este objeto se usa para incluir informacion para completa al tweet
    const twetObj = {
        id: Date.now(),
        tweet //se pued eusar tweet: tweet pero en js moderno si se nombran igual se puede solo dejar el mismo nombre
    }

    //Añadir al arreglo de tweets
    //usamos express operator para tomar una copia del arreglo e irle incliuyendo nuevos datos

    tweets = [...tweets, twetObj];

    //una vez agregado se crea el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 seg
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //agregar un botton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el Html
            const li = document.createElement('li');

            //añadir el texto
            //tweet.tweet es poque se selecciona las key de tweet de cada objeto dentro de tweet.
            li.innerText = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);
            //insertando en el html
            listaTweets.appendChild(li);

        });
    };
    sicronizarStorage();

};

//agrega los tweets actuales al localstorage
function sicronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimiar tweet

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id != id);
    crearHTML();
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}