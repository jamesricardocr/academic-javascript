const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


//empieza a escucchar el evento cuando la evntana de window carga

window.onload = () => {
    formulario.addEventListener('submit', valdiarFormulario);
}

function valdiarFormulario(e) {
    //detiene el evento default del boton submit
    e.preventDefault();

    //validar formulario

    const terminoDeBusqueda = document.querySelector('#termino').value;

    if (terminoDeBusqueda === '') {
        mostrarAlerta('Agrega un termino de busqueda');
        return;
    }

    buscarImagenes(terminoDeBusqueda);

}

function mostrarAlerta(mensaje) {

    //condicional para evitar que se mustren multiples alertas 
    const existeAlerta = document.querySelector('.validacion');

    if (!existeAlerta) {

        const alerta = document.createElement('p');

        //scripting de la alerta
        alerta.classList.add('validacion', 'bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-4', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML =
            `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
            `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

function buscarImagenes(termino) {


    const key = '12256738-9341c5b2aa57384bb5323e12e';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits);
            console.log(resultado.hits);
        })
}

function mostrarImagenes(imagenes) {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    //iterar sobre el arreglo de imagenes y costruir el HTML

    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML +=
            `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
            <img class="w-full" src="${previewURL}">

            <div class="p-4">
                <p class="font-bold"> ${likes} <span class="font-light"> Me gusta </span></p>
                <p class="font-bold"> ${views} <span class="font-light"> Veces vistas </span></p>
                <a class="block w-full bg-yellow-500 hover:bg-yellow-500 text-black uppercase font-bold text-center rounded mt-5 p-1"  href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver imagen</a>
            </div>
            </div>
        </div>
        
        `
    });
}