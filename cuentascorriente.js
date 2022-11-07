/** CRIPTO YA **/

const criptoYa = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("divDolar");

let dolarOficial = 0;

const interval = setInterval(() => {
    fetch(criptoYa)
        .then(response => response.json())
        .then(({ oficial }) => {
            divDolar.innerHTML = `
            <button type="button" class="btn btn-success">
  Dolar Oficial: <span class="badge badge-success">${oficial}</span>
</button>
                `
            dolarOficial = oficial;

            precargaClientes();
            buscadorDeCliente();

        })
        .catch(error => console.error(error))
        .finally(() => console.log("Proceso Finalizado"))
    if (dolarOficial !== null) {
        clearInterval(interval);
    }
}, 0)

function mensaje(frase) {

    console.log(frase);
    alert(frase);

}

function guardarEnLocalStorage() {
    localStorage.setItem("Cliente", JSON.stringify(arrayClientes));
}

function guardarEnLocalStorageEliminado() {
    localStorage.setItem("ClienteEliminados", JSON.stringify(clienteEliminados));
}


//Clase Cliente

class Cliente {
    constructor(nombre, apellido, dni, saldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.saldo = saldo;
        this.saldoDolar = saldo / dolarOficial;
    }
}

const arrayClientes = [];
let clienteEliminados = [];

function precargaClientes() {
    const cliente1 = new Cliente("Pia", "Tevez", 12345678, 1000);
    const cliente2 = new Cliente("Deborah", "Taino", 87654321, 8000);
    const cliente3 = new Cliente("Roberto", "Carlos", 45789865, 3000);
    const cliente4 = new Cliente("Pedro", "Capo", 33468789, 15000);

    arrayClientes.push(cliente2);
    arrayClientes.push(cliente3);
    arrayClientes.push(cliente4);
    guardarEnLocalStorage();
    guardarEnLocalStorageEliminado();
}

//Función para dar de alta un cliente:
function altaDeCliente() {
    const formulario = document.getElementById("formulario");


    formulario.addEventListener("submit", (e) => {
        //Evito el comportamiento por default del formulario. 
        e.preventDefault();

        const nombre = document.getElementById("nombre");
        const apellido = document.getElementById("apellido");
        const dni = document.getElementById("dni");
        const saldo = document.getElementById("saldo");
        console.log("Formulario Enviado");

        //Creamos un objeto Cliente: 
        const cliente = new Cliente(nombre.value, apellido.value, +dni.value, +saldo.value);
        arrayClientes.push(cliente);

        //  Guardo en el localstorage
        guardarEnLocalStorage();
        //Verificamos por consola:
        console.log(arrayClientes);

        //Reseteamos el formulario: 
        formulario.reset();
        mostrarInfoClientes();
        calcularTotal();
        Swal.fire({
            title: "Cliente agregado Exitosamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#B7950B",
            background: "#FDEBD0",
        })
    })
}

altaDeCliente()


//Eliminar un cliente:
function eliminarCliente() {
    const formularioEliminarCliente = document.getElementById("formularioEliminarCliente");
    const formularioOriginal = formularioEliminarCliente.innerHTML
    formularioEliminarCliente.addEventListener("submit", (e) => {
        //Evito el comportamiento por default del formulario. 
        e.preventDefault();

        const dniaeliminar = parseInt(document.getElementById("dniaeliminar").value);
        const clienteaeliminar = arrayClientes.find(clienteaeliminar => clienteaeliminar.dni === dniaeliminar);
        const indice = arrayClientes.indexOf(clienteaeliminar);
        if (indice > -1) {
            arrayClientes.splice(indice, 1);
            clienteEliminados.push(clienteaeliminar);
            Swal.fire({
                title: "Cliente eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#B7950B",
                background: "#FDEBD0",
            })

            //  Guardo en el localstorage
            guardarEnLocalStorage();
            guardarEnLocalStorageEliminado();
            //Verificamos por consola:
            console.log(arrayClientes);

            //Reseteamos el formulario: 
            formularioEliminarCliente.innerHTML = '';
            formularioEliminarCliente.innerHTML = formularioOriginal;
            formularioEliminarCliente.reset();
            mostrarInfoClientes();
            mostrarInfoClientesEliminados();
        }
        if (indice <= -1) {
            Swal.fire({
                title: "Cliente no Encontrado",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#B7950B",
                background: "#FDEBD0",
            })
        }
        calcularTotal();
    })

}
eliminarCliente();

//Modificar un cliente:
function modificarCliente() {
    const formularioModificarCliente = document.getElementById("formularioModificarCliente");
    const formularioOriginal = formularioModificarCliente.innerHTML
    formularioModificarCliente.addEventListener("submit", (e) => {
        //Evito el comportamiento por default del formulario. 
        e.preventDefault();

        const dniModificar = parseInt(document.getElementById("dniModificar").value);
        const saldoModificado = parseInt(document.getElementById("saldoModificado").value);
        const clienteAmodificar = arrayClientes.find(clienteaeliminar => clienteaeliminar.dni === dniModificar);
        const indice = arrayClientes.indexOf(clienteAmodificar);
        if (indice > -1) {
            arrayClientes[indice].saldo = saldoModificado;

            //  Guardo en el localstorage
            guardarEnLocalStorage();
            guardarEnLocalStorageEliminado();
            //Verificamos por consola:
            console.log(arrayClientes);

            //Reseteamos el formulario: 
            formularioModificarCliente.innerHTML = '';
            formularioModificarCliente.innerHTML = formularioOriginal;
            formularioModificarCliente.reset();
            mostrarInfoClientes();
            Swal.fire({
                title: "Cliente Modificado con Éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#B7950B",
                background: "#FDEBD0",
            })
        }
        if (indice <= -1) {

            Swal.fire({
                title: "Cliente no Encontrado",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#B7950B",
                background: "#FDEBD0",
            })
        }
        calcularTotal();
    })

}
modificarCliente()

//Función para consultar un cliente:
//
function consultaSaldoCliente() {
    let dni = parseInt(prompt("Ingrese el DNI del cliente: "));
    let cliente = arrayClientes.find(cliente => cliente.dni === dni);
    mensaje(`El saldo actual de ${cliente.nombre} es de $ ${cliente.saldo}`);
}

// Funcion para Consultar Saldo total de clientes

const total = document.getElementById("total");

let totalSaldo = 0;

const calcularTotal = () => {
    totalSaldo = 0;
    arrayClientes.forEach((cliente) => {
        totalSaldo += cliente.saldo;
        //+= es igual a poner totalSaldo = totalSaldo + producto.precio * producto.cantidad;
    })
    total.innerHTML = `
    <h5 class="card-title">Cantidad de registros: ${arrayClientes.length}</h5>
    `;
    total.innerHTML += `Total: $${totalSaldo}`;
    mostrarInfoClientes();
}


//Función para Ordenar Clientes segun saldo menor a mayor
function ordenarClientesSaldoMenorMayor() {
    arrayClientes.sort((a, b) => a.saldo - b.saldo);
    mostrarInfoClientes();
}

//Función para Ordenar Clientes segun saldo mayor a menor
function ordenarClientesSaldoMayorMenor() {
    arrayClientes.sort((a, b) => b.saldo - a.saldo);
    mostrarInfoClientes();
}

//Función para salir del programa:

function salir() {
    alert("Gracias por utilizar Nuestra Cuentas Corrientes");
}

function mostrarInfoClientes(){


    const clienteTabla = document.getElementById("resultadoBuscador");
    //creamos la tabla y el tbody
    const tabla = document.createElement("table");
    tabla.className = "table table-hover";
    const tablaBody = document.createElement("tbody");
    clienteTabla.innerHTML = "";

    //recorro el array de Clientes
    const clientesLocalStorage = arrayClientes;
    tabla.innerHTML += `
    <thead class="thead-dark">
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">DNI</th>
      <th scope="col">Saldo</th>
      <th scope="col">Saldo Dolar</th>
    </tr>
  </thead>
  `;
    for (const cliente of clientesLocalStorage) {
        tablaBody.innerHTML += `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.dni}</td>
            <td>${cliente.saldo}</td>
            <td>${cliente.saldoDolar.toFixed(2)}</td>
    `;
    }
    tablaBody.innerHTML += `
    <tfoot>
    <tr>
      <th id="total" colspan="3">Total :</th>
      <td>${totalSaldo}</td>
      <td>${(totalSaldo/dolarOficial).toFixed(2)}</td>
    </tr>
   </tfoot>
   `;

    tabla.append(tablaBody);
    clienteTabla.append(tabla);
}

mostrarInfoClientes();

function mostrarInfoClientesEliminados() {

 
    const clienteTabla = document.getElementById("InfoClientesEliminados");
    //creamos la tabla y el tbody
    const tabla = document.createElement("table");
    tabla.className="table table-striped";
    const tablaBody = document.createElement("tbody");
    clienteTabla.innerHTML = "";
    
    //recorro el array de Clientes
    const clientesLocalStorage = JSON.parse(localStorage.getItem("ClienteEliminados"));
    for(const cliente of clientesLocalStorage){
        tablaBody.innerHTML += `
            <tr>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.dni}</td>
                <td>${cliente.saldo}</td>
            </tr>
        `;
    }
    
    tabla.append(tablaBody);
    clienteTabla.append(tabla);
    }
    
    mostrarInfoClientesEliminados();

    function eliminarHistorial(){
		localStorage.clear();
        clienteEliminados = [];
        mostrarInfoClientesEliminados();
		}

