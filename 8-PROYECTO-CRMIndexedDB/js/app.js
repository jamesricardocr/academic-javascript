//CRUD Crear leer actualizar y borrar registros

//funcion ifi
(function() {

    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if (window.indexedDB.open('crm', 2)) {
            obtenerClientes();
        }

        listadoClientes.addEventListener('click', eliminarRegistro);
    });

    function eliminarRegistro(e) {

        if (e.target.classList.contains('eliminar')) {
            //dataset se usa para seleccionar los atributos personalizados
            const idEliminar = Number(e.target.dataset.cliente);

            const confirmar = confirm('Deseas eliminar este cliente?');

            if (confirmar) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function() {
                    console.log('Eliminando...');
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('hubo un error');
                }
            }

        }

    }

    //Crear la base de datos de indexDB

    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 2);

        //.onerror se ejecuta cuando hubo algun problema al crear la base de datos o el explorador no es compatible con indexDB
        crearDB.onerror = function() {
            console.log('hubo un error');
        }

        //.onsuccess se ejecuta cuando se crea la BD correctamente
        crearDB.onsuccess = function() {
            DB = crearDB.result;
        }

        //.onupgradeneeded se ejecuta una sola vez normalmente se ejecuta uan vez se crea la DB
        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true })

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            //si se ejecuta el console log significa que se crearon todos los campos correctamente
            console.log('DB lista y creada');
        }

    }


    function obtenerClientes() {

        const abrirConexion = window.indexedDB.open('crm', 2);

        abrirConexion.onerror = function() {
            console.log('hubo un error');
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;

                if (cursor) {
                    const { nombre, empresa, email, telefono, id } = cursor.value;
                    console.log(cursor.value);
                    listadoClientes.innerHTML +=
                        ` <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                    </td>
                        </tr `;
                    cursor.continue();
                } else {
                    console.log('no hay más registros...')
                }
            }

        }
    }

})();