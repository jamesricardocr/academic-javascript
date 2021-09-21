//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');


//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



eventListeners();

function eventListeners() {
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos de formulario

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);
    //Enviar email
    formulario.addEventListener('submit', enviarEmail);

}

//funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50'); //clases del framework telwind
}

function validarFormulario(e) {
    console.log(e);
    
    if (e.target.value.length > 0) {
        //elimina los errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son requeridos');
    }

    if (e.target.type === 'email') {

        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');

        }
    }
    if (er.test(email.value) && asunto.value != '' && mensaje.value != '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); //clases del framework telwind

    } else {
        console.log('Hay campos por validar')
    }
};



function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {

        formulario.appendChild(mensajeError);
    }
}

//envia el email

function enviarEmail(e) {
    e.preventDefault();
    //mostrar spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Después de 3 segundos ocultyar el spinner y mostrar el mensaje

    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje de envio correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje fue enviado correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        //inserta el mensaje en el spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 3000);
    }, 2000);

}

//Funcion que resetea el formulario
function resetearFormulario(e) {
    e.preventDefault();
    formulario.reset();
    iniciarApp();
    coloresForm();
}

//elimina los colores del formulario

function coloresForm() {
    email.classList.remove('border-red-500', 'border-green-500');
    asunto.classList.remove('border-red-500', 'border-green-500');
    mensaje.classList.remove('border-red-500', 'border-green-500');
}