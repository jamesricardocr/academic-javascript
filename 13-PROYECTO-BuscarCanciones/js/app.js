import * as UI from './interfaz.js'
import API from './api.js'

UI.formularioBuscar.addEventListener('submit', buscarCancion);


function buscarCancion(e) {
    e.preventDefault();

    //Obtener datos del formulario

    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    if (artista === '' || cancion === '') {
        //Validacion del formulario no se permiten campos vacios

        UI.divMensajes.textContent = 'Error... Todos lo campos son obligatorios'
        UI.divMensajes.classList.add('error');

        setTimeout(() => {
            UI.divMensajes.textContent = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
    }

    //Consultar la API
    const busqueda = new API(artista, cancion);
    busqueda.consultarAPI();



}