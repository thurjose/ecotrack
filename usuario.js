let indiceEdicao = -1;

function salvar(){
    let lista = JSON.parse(localStorage.getItem("listaUsuario"));

    if(lista == null){
        lista = [];
    }

    let usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        tipo: document.getElementById("tipo").value,
        situacao: document.getElementById("situacao").value
    };

    // Lógica inteligente de Create/Update
    if (indiceEdicao == -1) {
        lista.push(usuario); 
    } else {
        lista[indiceEdicao] = usuario; 
        indiceEdicao = -1; 
    }

    localStorage.setItem("listaUsuario", JSON.stringify(lista));

    limparCampos();
    mostrar();
}


function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("tipo").value = "cidadao"; 
    document.getElementById("situacao").value = "ativa"; 
}


function editar(i){
    let lista = JSON.parse(localStorage.getItem("listaUsuario"));


    document.getElementById("nome").value = lista[i].nome;
    document.getElementById("email").value = lista[i].email;
    document.getElementById("telefone").value = lista[i].telefone;
    document.getElementById("tipo").value = lista[i].tipo;
    document.getElementById("situacao").value = lista[i].situacao;


    indiceEdicao = i;
}

function excluir(i){
    let lista = JSON.parse(localStorage.getItem("listaUsuario"));

    lista.splice(i, 1);

    localStorage.setItem("listaUsuario", JSON.stringify(lista));

    mostrar();
}

function mostrar(){
    let lista = JSON.parse(localStorage.getItem("listaUsuario"));

    if(lista == null){
        lista = [];
    }

    let texto = "<table>";
    texto += "<tr>";
    texto += "<th>Nome</th>";
    texto += "<th>E-mail</th>";
    texto += "<th>Telefone</th>";
    texto += "<th>Tipo</th>";
    texto += "<th>Situação</th>";
    texto += "<th>Ações</th>";
    texto += "</tr>";

    for(let i = 0; i < lista.length; i++){

        texto += "<tr>";
        texto += "<td>" + lista[i].nome + "</td>";
        texto += "<td>" + lista[i].email + "</td>";
        texto += "<td>" + lista[i].telefone + "</td>";
        texto += "<td>" + lista[i].tipo + "</td>";
        texto += "<td>" + lista[i].situacao + "</td>";

        texto += "<td>";
  
        texto += "<button onclick='editar(" + i + ")'>Alterar</button>";
        texto += "<button onclick='excluir(" + i + ")'>Excluir</button>";
        texto += "</td>";

        texto += "</tr>";
    }

    texto += "</table>";

    document.getElementById("lista").innerHTML = texto;
}

mostrar();