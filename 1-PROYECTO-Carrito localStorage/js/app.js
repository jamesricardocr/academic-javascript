//Variable
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {

    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //vaciasr el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        console.log('Vanciando el carrito');
        articulosCarrito = [];
        limpiarHTML();
    });

};

//funciones
function agregarCurso(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
};

//elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo articulos
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}


//lee el contenido HTML al dar clic
function leerDatosCursos(curso) {
    //crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }


    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //agregando elementos al arreglo de carrito
    carritoHTML();
};

//mustra el carrito de compras en el html

function carritoHTML() {
    //limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> 
            <img src = "${imagen}" width = 100></td>  
            <td> ${titulo}</td>  
            <td> ${precio}</td>  
            <td> ${cantidad}</td> 
            <td> <a href='#' class = 'borrar-curso' data-id="${id}" > X </td> 
        `;
        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    //Agregar el carrito de compras al storage
    sincrinizarStorage();
};

function sincrinizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
//Elimina los cursos del tbody

function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}