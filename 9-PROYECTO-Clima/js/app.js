const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    //Validar formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' && pais === '') {
        mostarError('Todos los campos son obligatorios');
    }
    /*   console.log(ciudad);
      console.log(pais); */

    //Consulta la API
    consultarAPI(ciudad, pais);
}



function mostarError(mensaje) {

    //evita que las alertas se propaguen
    const validarAlerta = document.querySelector('.alertaError');

    if (!validarAlerta) {

        //Crear una alerta

        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alertaError');

        alerta.innerHTML = `
        <strong class="font-bold">Error</strong>
        <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta);

        //eliminar la alerta 

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}



function consultarAPI(ciudad, pais) {

    const appID = 'bf0b7aac02616460e74ddadd431e2b5a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    console.log(url);


    Spinner(); //llama a un spinner


    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            //se limpia el html a qui porque si se pone en otro lugar podria saltr un error y borrar la consulta anterior
            limpiarHTML();
            
            if (datos.cod === '404') {
                mostarError('Ciudad no encontrada');
                return;
            }
            
            //imprimer la respuesta en el HTML
            
            mostrarClima(datos);
        })
        
    }
    
    function mostrarClima(datos) {
        
        console.log(datos);
    const { name, main: { temp, temp_max, temp_min, feels_like } } = datos;
    
    const centigrados = convertidorTemperatura(temp);
    const max = convertidorTemperatura(temp_max);
    const min = convertidorTemperatura(temp_min);
    const senTermica = convertidorTemperatura(feels_like);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `${name}`;
    nombreCiudad.classList.add('font-blod', 'text-6xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-blod', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`
    tempMaxima.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`
    tempMin.classList.add('text-xl');

    const sensacionTermica = document.createElement('p');
    sensacionTermica.innerHTML = `Sensación Térmica: ${senTermica} &#8451;`
    sensacionTermica.classList.add('text-xl');


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.appendChild(sensacionTermica);

    resultado.appendChild(resultadoDiv);
}



const convertidorTemperatura = temperatura => parseInt(temperatura - 273.15);



function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}


function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    `;


    resultado.appendChild(divSpinner);

}