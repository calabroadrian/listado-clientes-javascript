function buscadorDeCliente() {

    const resultadoBuscador = document.getElementById("resultadoBuscador");

    const formularioBuscador = document.getElementById("formularioBuscador");

    calcularTotal();

    const filtrar = () => {

        resultadoBuscador.innerHTML = '';

        let tabla = document.createElement("table");
        tabla.className = "table table-hover";
        let tablaBody = document.createElement("tbody");

        const texto = formularioBuscador.value.toLowerCase();
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
        for (let clientebuscador of arrayClientes) {

            let nombre = clientebuscador.nombre.toLowerCase();

            if (nombre.indexOf(texto) !== -1) {
                tablaBody.innerHTML += `
            <tr>
                <td>${clientebuscador.nombre}</td>
                <td>${clientebuscador.apellido}</td>
                <td>${clientebuscador.dni}</td>
                <td>${clientebuscador.saldo}</td>
                <td>${clientebuscador.saldoDolar.toFixed(2)}</td>
            </tr>
            `;
            }
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
        if (tablaBody.innerHTML === '') {
            Toastify({
                
                text: "Cliente no Encontrado",
                duration: 1000,
                gravity: "bottom",
                position: "right",
                style:
                {
                    background: "RED",
                }
            }).showToast();
        }
        tabla.append(tablaBody);
        resultadoBuscador.append(tabla);




    }

    formularioBuscador.addEventListener('keyup', filtrar)
    filtrar();


}