function contarRegistros(chave) {
  var lista = JSON.parse(localStorage.getItem(chave));

  if (lista == null) {
    return 0;
  }

  return lista.length;
}

function mostrarContadores() {
  var numeros = document.querySelectorAll("[data-contador]");

  for (var i = 0; i < numeros.length; i++) {
    numeros[i].textContent = contarRegistros(numeros[i].dataset.contador);
  }
}

mostrarContadores();

document.getElementById("ano").textContent = new Date().getFullYear();
