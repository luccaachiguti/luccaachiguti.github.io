let lista=[]
let listaValidacao;
let editar=0;
let indiceEdicao;

document.addEventListener('DOMContentLoaded', function(){
    let enviar=document.getElementById('enviar');
    enviar.addEventListener('click', function(){
        let nome=document.getElementById('nome').value;
        let email=document.getElementById('email').value;
        let telefone=document.getElementById('telefone').value;
        let cpf=document.getElementById('cpf').value;
        let contato=document.querySelector('input[name="contato"]:checked').value;
        let horario=document.getElementById('horario').value;
        let agendamentos=document.getElementById('agendamentos');
        listaValidacao={'nome':nome, 'email':email, 'telefone':telefone, 'cpf':cpf, 'contato':contato, 'horario':horario};
        if(editar==1 && validar(listaValidacao, lista))
        {
            console.log(indiceEdicao);
            lista[indiceEdicao]=listaValidacao;
            editar=0;
            adicionarTabela(lista);
        }
        else if(editar==0 && validar(listaValidacao,lista)){
            lista.push(listaValidacao);
            adicionarTabela(lista);
        }
    });
});

function adicionarTabela(lista){
        document.getElementById('agendamentos').innerHTML='';
        lista.forEach(function(i, index){
            let novoAgendamento=document.createElement('tr');
            novoAgendamento.innerHTML=`
                <td>${i.nome}</td>
                <td>${i.email}</td>
                <td>${i.telefone}</td>
                <td>${i.cpf}</td>
                <td>${i.contato}</td>
                <td>${i.horario}</td>
                <td>
                    <button class="material-symbols-outlined"  onclick="clicarEditar(${index}, lista)">
                            edit
                    </button>
                    <button class="material-symbols-outlined" onclick="clicarExcluir(${index}, lista)">
                        delete
                    </button>
                </td>
                `
            agendamentos.append(novoAgendamento);
        });
        
        if(editar==0){
            document.getElementById('nome').value='';
            document.getElementById('email').value='';
            document.getElementById('telefone').value='';
            document.getElementById('cpf').value=''; 
        }
                   
}

function validar(listaValidacao,lista){
    let erros=[];
    let horarios=[];
    lista.forEach(function(i){
        horarios.push(i.horario);
    });
    console.log(horarios);
    for(let key in listaValidacao){
        if(listaValidacao[key]==""){
            erros.push(key);
        }
    }
    if(listaValidacao['cpf'].length!=11){
        erros.push('cpf');
    }
    if(listaValidacao['email'].indexOf("@")==-1){
        erros.push('email');
    }
    if(erros.length!=0){
        alert(`Erro no campo(s): ${erros}`);
        return 0;
    }
    console.log(horarios.includes(listaValidacao['horario']));
    if(horarios.includes(listaValidacao['horario']))
    {
        alert(`Horário das ${listaValidacao['horario']} já reservado`);
        return 0;
    }
    return 1;
}

function clicarEditar(index, lista)
{
    console.log(index);
    let obj=lista[index];
    editar=1;
    indiceEdicao=index;
    nome=document.getElementById('nome').value=obj.nome;
    email=document.getElementById('email').value=obj.email;
    telefone=document.getElementById('telefone').value=obj.telefone;
    cpf=document.getElementById('cpf').value=obj.cpf;
    contato=document.querySelector('input[name="contato"]:checked').value=obj.contato;
    horario=document.getElementById('horario').value=obj.horario;
    lista[index].horario="";
}

function clicarExcluir(index, lista)
{
    if(confirm(`Tem certeza que deseja excluir o item?`)) {
        lista.splice(index, 1);
        console.log(lista);
        adicionarTabela(lista);
    }
}
