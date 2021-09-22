(function() {

    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');




    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        //Actualizar registro
        formulario.addEventListener('submit', actualizarCliente);

        //Verificar el ID de la url
        //new URLSearchParams es una api busca parametros de url
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        console.log(idCliente);

        if (idCliente) {
            //se aplica un setTimeout porque se debe esperar a que cargue la base de datos
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 1000);
        }
    });



    function actualizarCliente(e) {
        e.preventDefault();
        if (nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value == '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //Actualizar cliente
        const clienteActualziado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualziado);

        transaction.oncomplete = function() {
            imprimirAlerta('Cliente editado exitosamente');
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 2000);
        }

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error', 'error');
        }

    }



    function obtenerCliente(id) {

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();

            }
        }
    }



    function llenarFormulario(datosCliente) {

        const { nombre, email, telefono, empresa } = datosCliente;

        nombreInput.value = nombre
        emailInput.value = email
        telefonoInput.value = telefono
        empresaInput.value = empresa


    }



})();