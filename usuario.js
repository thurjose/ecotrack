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

    lista.push(usuario);

    localStorage.setItem("listaUsuario", JSON.stringify(lista));

    mostrar();
}


function alterar(i){

    let lista = JSON.parse(localStorage.getItem("listaUsuario"));

    let usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        tipo: document.getElementById("tipo").value,
        situacao: document.getElementById("situacao").value
    };

    lista[i] = usuario;

    localStorage.setItem("listaUsuario", JSON.stringify(lista));

    mostrar();
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
    texto += "<th></th>";
    texto += "</tr>";

    for(let i = 0; i < lista.length; i++){

        texto += "<tr>";
        texto += "<td>" + lista[i].nome + "</td>";
        texto += "<td>" + lista[i].email + "</td>";
        texto += "<td>" + lista[i].telefone + "</td>";
        texto += "<td>" + lista[i].tipo + "</td>";
        texto += "<td>" + lista[i].situacao + "</td>";

        texto += "<td>";
        texto += "<button onclick='alterar(" + i + ")'>Alterar</button>";
        texto += "<button onclick='excluir(" + i + ")'>Excluir</button>";
        texto += "</td>";

        texto += "</tr>";
    }

    texto += "</table>";

    document.getElementById("lista").innerHTML = texto;
}

mostrar();
