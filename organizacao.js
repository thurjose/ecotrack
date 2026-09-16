function salvar(){
    let lista = JSON.parse(localStorage.getItem("listaOrganizacao"));

    if(lista == null){
        lista = [];
    }

    let organizacao = {
       nome: document.getElementById("nome").value,
       tipoOrganizacao: document.getElementById("tipoOrganizacao").value,
       telefone: document.getElementById("telefone").value,
       email: document.getElementById("email").value,
       areaAtuacao: document.getElementById("areaAtuacao").value,
       situacaoOrganizacao: document.getElementById("situacaoOrganizacao").value
    }

    lista.push(organizacao);
    localStorage.setItem("listaOrganizacao", JSON.stringify(lista));

    mostrar();
}

function mostrar(){
    let lista = JSON.parse(localStorage.getItem("listaOrganizacao"));

    if(lista == null){
        lista = [];
    }

    let texto = "<table>";
    texto += "<tr>";
    texto += "<th>Nome</th>";
    texto += "<th>Tipo</th>"
    texto += "<th>Telefone</th>";
    texto += "<th>Email</th>";
    texto += "<th>Área de atuação</th>";
    texto += "<th>Situação</th>";
    texto += "<th>Ações</th>";
    texto += "</tr>";

for(let i = 0; i < lista.length; i++){
    texto += "<td>" + lista[i].nome + "</td>";
    texto += "<td>" + lista[i].tipoOrganizacao + "</td>";
    texto += "<td>" + lista[i].telefone + "</td>";
    texto += "<td>" + lista[i].email + "</td>";
    texto += "<td>" + lista[i].areaAtuacao + "</td>";
    texto += "<td>" + lista[i].situacaoOrganizacao + "</td>";

    texto += "<td>";
    texto += "<button onclick='editar("+ i +")'>Alterar</button>";
    texto += "<button onclick='excluir("+ i +")'>Excluir</button>";
    texto += "</td>";

    texto += "</tr>";
}

texto += "</table>";

document.getElementById("lista").innerHTML = texto;
}

mostrar()

function editar(i){
    let lista = JSON.parse(localStorage.getItem("listaOrganizacao"));

    document.getElementById("nome").value = lista[i].nome;
    document.getElementById("tipo_organizacao").value = lista[i].tipoOrganizacao;
    document.getElementById("telefone").value = lista[i].telefone;
    document.getElementById("email").value = lista[i].email;
    document.getElementById("area_atuacao").value = lista[i].areaAtuacao;
    document.getElementById("situacao_organizacao").value = lista[i].situacaoOrganizacao;

    document.querySelector("button[onclick='salvar()']").onclick = function() { alterar(i); };
}

function alterar(i){
    let lista = JSON.parse(localStorage.getItem("listaOrganizacao"));

    let organizacao = {
       nome: document.getElementById("nome").value,
       tipoOrganizacao: document.getElementById("tipo_organizacao").value,
       telefone: document.getElementById("telefone").value,
       email: document.getElementById("email").value,
       areaAtuacao: document.getElementById("area_atuacao").value,
       situacaoOrganizacao: document.getElementById("situacao_organizacao").value
    };

    lista[i] = organizacao;

    localStorage.setItem("listaOrganizacao", JSON.stringify(lista));

    document.querySelector("button").onclick = salvar;

    mostrar();
}

function excluir(i){
    let lista = JSON.parse(localStorage.getItem("listaOrganizacao"));

    lista.splice(i, 1);

    localStorage.setItem("listaOrganizacao", JSON.stringify(lista));

    mostrar();
}