function buscadorDeCliente() {

const resultadoBuscador = document.getElementById("resultadoBuscador");

const formularioBuscador = document.getElementById("formularioBuscador");

calcularTotal();

const filtrar = () =>{

    resultadoBuscador.innerHTML = '';
    
    let tabla = document.createElement("table");
    tabla.className="table table-striped";
    let tablaBody = document.createElement("tbody");

    const texto = formularioBuscador.value.toLowerCase();
    tabla.innerHTML += `
    <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">DNI</th>
      <th scope="col">Saldo</th>
    </tr>
  </thead>
  `;
    for ( let clientebuscador of arrayClientes ){

        let nombre = clientebuscador.nombre.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            tablaBody.innerHTML += `
            <tr>
                <td>${clientebuscador.nombre}</td>
                <td>${clientebuscador.apellido}</td>
                <td>${clientebuscador.dni}</td>
                <td>${clientebuscador.saldo}</td>
            </tr>
            `;
        }
        else{
            resultadoBuscador.innerHTML === '' 
            resultadoBuscador.innerHTML += `<li>Cliente no encontrado</li>`
        }
    }
    tabla.append(tablaBody);
    resultadoBuscador.append(tabla);
    

    
    resultadoBuscador.innerHTML += `
    <h5 class="card-title">Cantidad de registros: ${arrayClientes.length}</h5>
    `;

}

formularioBuscador.addEventListener('keyup', filtrar)
filtrar();


}

buscadorDeCliente();
