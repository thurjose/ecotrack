var CHAVE_ARMAZENAMENTO = "atendimento";
 
var form = document.getElementById("form-atendimento");
var campoIdOrganizacao = document.getElementById("campo-id-organizacao");
var campoIdOcorrencia = document.getElementById("campo-id-ocorrencia");
var campoIdVeiculo = document.getElementById("campo-id-veiculo");
var campoDataAceite = document.getElementById("campo-data-aceite");
var campoDataInicio = document.getElementById("campo-data-inicio");
var campoDataConclusao = document.getElementById("campo-data-conclusao");
var campoResultado = document.getElementById("campo-resultado");
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
    if (lista[i].id_atendimento > maiorId) {
      maiorId = lista[i].id_atendimento;
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
 
  var html = "<table border='1'>";
  html += "<tr><th>ID</th><th>Organização</th><th>Ocorrência</th><th>Veículo</th><th>Aceite</th><th>Início</th><th>Conclusão</th><th>Resultado</th><th>Ações</th></tr>";
 
  for (var i = 0; i < registros.length; i++) {
    var r = registros[i];
 
    html += "<tr>";
    html += "<td>" + r.id_atendimento + "</td>";
    html += "<td>" + r.id_organizacao + "</td>";
    html += "<td>" + r.id_ocorrencia + "</td>";
    html += "<td>" + r.id_veiculo + "</td>";
    html += "<td>" + r.data_aceite + "</td>";
    html += "<td>" + r.data_inicio + "</td>";
    html += "<td>" + r.data_conclusao + "</td>";
    html += "<td>" + r.resultado_atendimento + "</td>";
    html += "<td>";
    html += "<button type='button' onclick='iniciarEdicao(" + r.id_atendimento + ")'>Editar</button>";
    html += "<button type='button' onclick='excluirRegistro(" + r.id_atendimento + ")'>Excluir</button>";
    html += "</td>";
    html += "</tr>";
  }
 
  html += "</table>";
  areaLista.innerHTML = html;
}
 
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
 
  var registros = carregarTodos();
  var idAtual = campoIdEditando.value;
 
  if (idAtual === "") {
    registros.push({
      id_atendimento: proximoId(registros),
      id_organizacao: Number(campoIdOrganizacao.value),
      id_ocorrencia: Number(campoIdOcorrencia.value),
      id_veiculo: Number(campoIdVeiculo.value),
      data_aceite: campoDataAceite.value,
      data_inicio: campoDataInicio.value,
      data_conclusao: campoDataConclusao.value,
      resultado_atendimento: campoResultado.value
    });
  } else {
    for (var i = 0; i < registros.length; i++) {
      if (registros[i].id_atendimento === Number(idAtual)) {
        registros[i].id_organizacao = Number(campoIdOrganizacao.value);
        registros[i].id_ocorrencia = Number(campoIdOcorrencia.value);
        registros[i].id_veiculo = Number(campoIdVeiculo.value);
        registros[i].data_aceite = campoDataAceite.value;
        registros[i].data_inicio = campoDataInicio.value;
        registros[i].data_conclusao = campoDataConclusao.value;
        registros[i].resultado_atendimento = campoResultado.value;
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
    if (registros[i].id_atendimento === id) {
      campoIdEditando.value = registros[i].id_atendimento;
      campoIdOrganizacao.value = registros[i].id_organizacao;
      campoIdOcorrencia.value = registros[i].id_ocorrencia;
      campoIdVeiculo.value = registros[i].id_veiculo;
      campoDataAceite.value = registros[i].data_aceite;
      campoDataInicio.value = registros[i].data_inicio;
      campoDataConclusao.value = registros[i].data_conclusao;
      campoResultado.value = registros[i].resultado_atendimento;
    }
  }
}
 
function excluirRegistro(id) {
  var registros = carregarTodos();
  var novaLista = [];
 
  for (var i = 0; i < registros.length; i++) {
    if (registros[i].id_atendimento !== id) {
      novaLista.push(registros[i]);
    }
  }
 
  salvarTodos(novaLista);
  renderizarLista();
}
 
renderizarLista();

