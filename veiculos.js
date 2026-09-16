let idEmEdicao = null;
function salvar() {
    let lista =  JSON.parse(localStorage.getItem("listaVeiculo"));
    if (lista == null){
        lista = [];
    }

    let veiculo = { 
        identificacao: document.getElementById("identificacao").value,
        capacidade: document.getElementById("capacidade").value,
        tipo_veiculo: document.getElementById("tipo_veiculo").value,
        id_organizacao: document.getElementById("id_organizacao").value,
        situacao_veiculo: document.getElementById("situacao_veiculo").value
    };
    if(idEmEdicao ==null){
        veiculo.id_veiculo = gerarId();
    lista.push(veiculo);
    }else{
        veiculo.id_veiculo = idEmEdicao;
        for(let i = 0; i< lista.length; i++){
            if (lista[i].id_veiculo == idEmEdicao){
                lista[i] = veiculo;
            }
        }
        idEmEdicao = null;
    }
    localStorage.setItem("listaVeiculo", JSON.stringify(lista));
    alert("Veiculo cadastrado ");

    document.getElementById("identificacao").value ="";
    document.getElementById("capacidade").value = "";
    document.getElementById("tipo_veiculo").value = "";
    mostrar();

//JSON.parse(localStorage.getItem("listaVeiculo")) para pauxar a lista de salvos 
}
function mostrar(){
    let lista = JSON.parse(localStorage.getItem("listaVeiculo"));
    if(lista == null){
        lista = [];
    }
    let texto = "<table border = '1'>";
    texto += "<tr>";
    texto += "<th>ID</th>";
    texto += "<th>Identificação</th>";
    texto += "<th>Capacidade</th>";
    texto += "<th>Tipo</th>";
    texto += "<th>Organização</th>";
    texto += "<th>Situação</th>";
    texto += "<th>Ações</th>";
    texto +="</tr>";
    
    for(let i = 0; i <lista.length; i++){
        texto +="<tr>";
        texto +="<td>" + lista[i].id_veiculo + "</td>";
        texto +="<td>" + lista[i].identificacao + "</td>";
        texto +="<td>" + lista[i].capacidade + "</td>";
        texto +="<td>" + lista[i].tipo_veiculo + "</td>";
        texto +="<td>" + lista[i].id_organizacao + "</td>";
        texto +="<td>" + lista[i].situacao_veiculo + "</td>";
        texto += "<td>";
        texto += "<button onclick='editar(" + lista[i].id_veiculo + ")'>Editar</button>"; 
        texto += "<button onclick='excluir(" + lista[i].id_veiculo + ")'>Excluir</button>";
        texto += "</td>";
        texto +="</tr>";
    }


    texto += "</table>";
    document.getElementById("lista").innerHTML = texto;

}


function gerarId(){
    let lista = JSON.parse(localStorage.getItem("listaVeiculo"));
    if (lista == null || lista.length == 0){
        return 1;
    }
   let maior = 0;
    for(let i = 0; i < lista.length; i++){
        if(lista[i].id_veiculo > maior){
            maior = lista[i].id_veiculo;
        }
    }
    return maior + 1;
}
function editar(id){
    let lista = JSON.parse(localStorage.getItem("listaVeiculo"));
    for(let i = 0; i < lista.length; i++){
        if (lista[i].id_veiculo == id){
            document.getElementById("identificacao").value = lista[i].identificacao;
            document.getElementById("capacidade").value = lista[i].capacidade;
            document.getElementById("tipo_veiculo").value = lista[i].tipo_veiculo;
            document.getElementById("id_organizacao").value = lista[i].id_organizacao;
            document.getElementById("situacao_veiculo").value = lista[i].situacao_veiculo;
        }
    }
    idEmEdicao = id;
}

function excluir(id){
    if(!confirm("Confirmar exclusão")){
        return;
    }
    let lista = JSON.parse(localStorage.getItem("listaVeiculo"));
    let novaLista = [];

    for(let i = 0; i <lista.length; i ++){
        if(lista[i].id_veiculo != id){
            novaLista.push(lista[i]);
        }

    }
        localStorage.setItem("listaVeiculo", JSON.stringify(novaLista));
        mostrar();
        }
    