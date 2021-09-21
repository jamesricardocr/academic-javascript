//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//Eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}



//Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        //el restante inicial es el mismo presupuesto inicial
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();

    }

    calcularRestante() {
        //reduce 
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

    }


    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id != id);
        console.log(this.gastos);
        this.calcularRestante();
    }

}




class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo el valor
        const { presupuesto, restante } = cantidad;

        //incluyendo el HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        //validar
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //insertar en HTML

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //quitar HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }

    mostrarGastos(gastos) {
        this.limpiarHTML(); //Elimina el HTML previo

        //iterar sobre los gastos
        gastos.forEach(gasto => {


            const { cantidad, nombre, id } = gasto;

            //Crear LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';

            //setAtribute se usa para agregar una etiqueta o atributo html5 con un valor que queramos;
            // nuevoGasto.setAttribute('data-id', id);
            //se usa esta sntaxis es mucho mas nueva
            nuevoGasto.dataset.id = id;


            //Agregar el HTML
            nuevoGasto.innerHTML = ` ${nombre} <span class ='badge badge-primary badge-pill'> $ ${cantidad} </span>`;

            //Boton para borrrar gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'borrar &times'
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);


            //Agregar HTML
            gastoListado.appendChild(nuevoGasto);


        });


    }

    //limpiar HTML
    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    };

    comprobarPresupuesto(presupuestOBJ) {
        const { presupuesto, restante } = presupuestOBJ;

        const restanteDiv = document.querySelector('.restante');
        //comprobar 25%

        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        //si el total es 0 menor 

        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}


const ui = new UI();
let presupuesto;



//Funciones


function preguntarPresupuesto() {
    const presupuestoUsuario = Number(prompt('¿Cual es tu presupuesto?'));


    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
}



function agregarGasto(e) {
    e.preventDefault();

    //Leer datos del formulario

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar

    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;

    } else if (cantidad === '' || cantidad === null || isNaN(cantidad) || cantidad <= 0) {
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    //Generar un objeto con el gasto
    //Mejorira del objeto literal object literal enhancement
    const gasto = { nombre, cantidad, id: Date.now() };

    presupuesto.nuevoGasto(gasto);

    //Mensaje de validacion correcta
    ui.imprimirAlerta('Gasto agregado correctamente');

    //imprimir los gastos
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);


    //Reinicia el formulario
    formulario.reset();

}

function eliminarGasto(id) {
    //Elimina del objeto
    presupuesto.eliminarGasto(id);

    //elimina los gastos el HTML
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
}