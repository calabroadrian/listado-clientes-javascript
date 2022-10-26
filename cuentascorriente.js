/* Segunda Pre Entrega .- Cuentas Corrientes*/

function mensaje(frase) {

    console.log(frase);
    alert(frase);

}

function guardarEnLocalStorage(){
    localStorage.setItem("Cliente", JSON.stringify(arrayClientes));
}

function guardarEnLocalStorageEliminado(){
    localStorage.setItem("ClienteEliminados", JSON.stringify(clienteEliminados));
}


//Clase Cliente

class Cliente {
    constructor(nombre, apellido, dni, saldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.saldo = saldo;
    }
}

const cliente1 = new Cliente("Pia", "Tevez", 12345678, 1000);
const cliente2 = new Cliente("Deborah", "Taino", 87654321, 8000);
const cliente3 = new Cliente("Roberto", "Carlos", 45789865, 3000);
const cliente4 = new Cliente("Pedro", "Capo", 33468789, 15000);

const arrayClientes = [];
const clienteEliminados = [];
clienteEliminados.push(cliente1);
arrayClientes.push(cliente2);
arrayClientes.push(cliente3);
arrayClientes.push(cliente4);
guardarEnLocalStorage();
guardarEnLocalStorageEliminado();

//Función con el menú de opciones:

/*function menu() {
    alert("Bienvenido a la Cuentas Corrientes de Clientes");
    let opcion = parseInt(prompt("Ingrese una opción: \n 1) Alta de cliente \n 2) Baja de cliente \n 3) Modificación de cliente \n 4) Consulta saldo de cliente \n 5) Consulta total de Saldos de Clientes \n 6) Ordenar Clientes segun Saldos Menor a Mayor \n 7) Ordenar Clientes segun Saldos Mayor a Menor  \n 8) Salir"));
    return opcion;
}
*/
//Función para dar de alta un cliente:
function altaDeCliente(){
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
    buscadorDeCliente();
    calcularTotal();
})
}

altaDeCliente()


//Eliminar un cliente:
function eliminarCliente(){
const formularioEliminarCliente = document.getElementById("formularioEliminarCliente");
const formularioOriginal = formularioEliminarCliente.innerHTML
formularioEliminarCliente.addEventListener("submit", (e) => {
    //Evito el comportamiento por default del formulario. 
    e.preventDefault();

    const dniaeliminar = parseInt(document.getElementById("dniaeliminar").value);
    const clienteaeliminar = arrayClientes.find(clienteaeliminar => clienteaeliminar.dni === dniaeliminar);
    const indice = arrayClientes.indexOf(clienteaeliminar);
    if (indice > -1){
    arrayClientes.splice(indice, 1);
    clienteEliminados.push(clienteaeliminar);

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
    buscadorDeCliente();
    }
    if (indice <= -1){

      formularioEliminarCliente.innerHTML += `<li>Cliente no encontrado</li>`
    }
calcularTotal();
})

}
eliminarCliente()

//Modificar un cliente:
function modificarCliente(){
    const formularioModificarCliente = document.getElementById("formularioModificarCliente");
    const formularioOriginal = formularioModificarCliente.innerHTML
    formularioModificarCliente.addEventListener("submit", (e) => {
        //Evito el comportamiento por default del formulario. 
        e.preventDefault();
    
        const dniModificar = parseInt(document.getElementById("dniModificar").value);
        const saldoModificado = parseInt(document.getElementById("saldoModificado").value);
        const clienteAmodificar = arrayClientes.find(clienteaeliminar => clienteaeliminar.dni === dniModificar);
        const indice = arrayClientes.indexOf(clienteAmodificar);
        if (indice > -1){
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
        buscadorDeCliente();
        }
        if (indice <= -1){
    
        formularioModificarCliente.innerHTML += `<li>Cliente no encontrado</li>`
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

const calcularTotal = () => {
    let totalCompra = 0; 
    arrayClientes.forEach((cliente) => {
        totalCompra += cliente.saldo;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}


//Función para Ordenar Clientes segun saldo menor a mayor
function ordenarClientesSaldoMenorMayor(){
    arrayClientes.sort( (a,b) => a.saldo - b.saldo);
    buscadorDeCliente();
}

//Función para Ordenar Clientes segun saldo mayor a menor
function ordenarClientesSaldoMayorMenor(){
    arrayClientes.sort( (a,b) => b.saldo - a.saldo);
    buscadorDeCliente();
}

//Función para salir del programa:

function salir() {
    alert("Gracias por utilizar Nuestra Cuentas Corrientes");
}

function mostrarInfoClientes() {

 
const clienteTabla = document.getElementById("InfoClientes");
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

mostrarInfoClientes();
