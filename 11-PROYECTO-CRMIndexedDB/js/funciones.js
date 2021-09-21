let DB
const formulario = document.querySelector('#formulario')


function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 2);

    abrirConexion.onerror = function() {
        console.log('Hubo un error');

    }

    abrirConexion.onsuccess = function() {
        DB = abrirConexion.result;

    }
}


function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alerta');

    //el alerta se esta usando para evitar el re uso del boton, esta verificando si la calase alertar existe en el documento condiciones..
    if (!alerta) {

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if (tipo === 'error') {
            divMensaje.classList.add('bg-red-200', 'border-red-400', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-200', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }
}