var CHAVE_ARMAZENAMENTO = "tipo_residuo";

var form = document.getElementById("form-residuo");
var campoNome = document.getElementById("campo-nome");
var campoReciclavel = document.getElementById("campo-reciclavel");
var campoPerigoso = document.getElementById("campo-perigoso");
var campoIdEditando = document.getElementById("campo-id-editando");
var areaLista = document.getElementById("area-lista");

function carregarTodos() {
  var texto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
  if (texto) {
    return JSON.parse(texto);
  } else {
    return [];
  }
}

function salvarTodos(lista) {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(lista));
}

function proximoId(lista) {
  if (lista.length === 0) {
    return 1;
  }

  var maiorId = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id_tipo_residuo > maiorId) {
      maiorId = lista[i].id_tipo_residuo;
    }
  }
  return maiorId + 1;
}

function renderizarLista() {
  var registros = carregarTodos();

  if (registros.length === 0) {
    areaLista.innerHTML = "<p>Nenhum registro ainda.</p>";
    return;
  }

  var html = "<table>";
  html += "<tr><th>ID</th><th>Nome</th><th>Reciclável</th><th>Perigoso</th><th>Ações</th></tr>";

  for (var i = 0; i < registros.length; i++) {
    var r = registros[i];
    var textoReciclavel = r.e_reciclavel ? "Sim" : "Não";
    var textoPerigoso = r.e_perigoso ? "Sim" : "Não";

    html += "<tr>";
    html += "<td>" + r.id_tipo_residuo + "</td>";
    html += "<td>" + r.nome + "</td>";
    html += "<td>" + textoReciclavel + "</td>";
    html += "<td>" + textoPerigoso + "</td>";
    html += "<td>";
    html += "<button type='button' onclick='iniciarEdicao(" + r.id_tipo_residuo + ")'>Editar</button>";
    html += "<button type='button' onclick='excluirRegistro(" + r.id_tipo_residuo + ")'>Excluir</button>";
    html += "</td>";
    html += "</tr>";
  }

  html += "</table>";
  areaLista.innerHTML = html;
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nome = campoNome.value.trim();
  if (nome.length === 0 || nome.length > 50) {
    alert("Nome inválido.");
    return;
  }

  var registros = carregarTodos();
  var idAtual = campoIdEditando.value;

  if (idAtual === "") {
    registros.push({
      id_tipo_residuo: proximoId(registros),
      nome: nome,
      e_reciclavel: campoReciclavel.checked,
      e_perigoso: campoPerigoso.checked
    });
  } else {
    for (var i = 0; i < registros.length; i++) {
      if (registros[i].id_tipo_residuo === Number(idAtual)) {
        registros[i].nome = nome;
        registros[i].e_reciclavel = campoReciclavel.checked;
        registros[i].e_perigoso = campoPerigoso.checked;
      }
    }
  }

  salvarTodos(registros);
  form.reset();
  campoIdEditando.value = "";
  renderizarLista();
});

function iniciarEdicao(id) {
  var registros = carregarTodos();

  for (var i = 0; i < registros.length; i++) {
    if (registros[i].id_tipo_residuo === id) {
      campoIdEditando.value = registros[i].id_tipo_residuo;
      campoNome.value = registros[i].nome;
      campoReciclavel.checked = registros[i].e_reciclavel;
      campoPerigoso.checked = registros[i].e_perigoso;
    }
  }
}

function excluirRegistro(id) {
  var registros = carregarTodos();
  var novaLista = [];

  for (var i = 0; i < registros.length; i++) {
    if (registros[i].id_tipo_residuo !== id) {
      novaLista.push(registros[i]);
    }
  }

  salvarTodos(novaLista);
  renderizarLista();
}

renderizarLista();