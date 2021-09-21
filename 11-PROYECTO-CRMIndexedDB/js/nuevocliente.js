(function() {


    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });




    function validarCliente(e) {
        e.preventDefault();

        //Leer todos los inputs

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '', email === '', telefono === '', empresa === '') {

            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        //Crear un objeto con la infomacion

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCliente(cliente);

    }



    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = () => imprimirAlerta('No se pudo agregar el cliente', 'error');

        transaction.oncomplete = () => {
            imprimirAlerta('Cliente se agrego correctamente');

            setTimeout(() => {
                window.location.href = 'index.html'
            }, 2000);
        }

    }

})();