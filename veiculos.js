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

mostrar();

/*
 
FORMULÁRIO:
HTML 30-46
 
PEGAR VALORES DOS CAMPOS:
JS 8-13
Ex: getElementById("identificacao").value
 
CRIAR OBJETO:
JS 8-14 -> let veiculo = {...}
 
CADASTRAR:
JS 15-17
-> gerarId() + lista.push(veiculo)
 
EDITAR:
JS 18-25 -> salva alteração
JS 88-99 -> carrega dados nos campos
-> lista[i] = veiculo
 
EXCLUIR:
JS 102-116
-> confirm + novaLista
 
ALERT:
JS 28
-> alert("Veiculo cadastrado ");
 
CONFIRM:
JS 103
-> confirm("Confirmar exclusão")
 
VALIDAÇÃO:
NÃO TEM.
Modelo:
if(document.getElementById("campo").value == ""){
    alert("Preencha o campo");
    return;
}
 
LOCALSTORAGE - BUSCAR:
JS 3, 38, 76, 89, 106
-> localStorage.getItem("listaVeiculo")
 
JSON.parse:
JS 3, 38, 76, 89, 106
-> String para Array/Objeto
 
LOCALSTORAGE - SALVAR:
JS 27 e 115
-> localStorage.setItem(...)
 
JSON.stringify:
JS 27 e 115
-> Array/Objeto para String
 
MOSTRAR / TABELA:
JS 37-70
Cabeçalhos -> 44-50
Dados -> 55-60
Colocar na tela -> 70
 
FOR / PERCORRER LISTA:
JS 20, 53, 81, 90, 109
 
GERAR ID:
JS 75-87
 
idEmEdicao:
JS 1
null = cadastro novo
com ID = edição
 
BOTÃO SALVAR:
HTML 46 -> onclick="salvar()"
 
BOTÕES EDITAR/EXCLUIR:
JS 62-63
 
SELECT ORGANIZAÇÃO:
HTML 35-38
 
SELECT SITUAÇÃO:
HTML 40-44
 
ADICIONAR NOVA OPÇÃO:
copiar um <option> das linhas HTML 36-37 ou 41-43
 
NOVO CAMPO:
usar como modelo:
HTML 31-33 -> criar input
JS 9-13 -> colocar no objeto
JS 92-96 -> colocar no editar
JS 55-60 -> colocar na tabela
 
REMOVER/ALTERAR COLUNA:
JS 44-50 -> título
JS 55-60 -> valor
 
ALTERAR MENSAGEM:
JS 28 -> alert
JS 103 -> confirmação
 
LIMPAR CAMPOS:
JS 30-32
 
ATUALIZAR TELA:
JS 33 e 116 -> mostrar()
 
RESUMO:
push() = cadastrar
lista[i] = veiculo = editar
novaLista = excluir
getItem + parse = buscar
stringify + setItem = salvar
*/