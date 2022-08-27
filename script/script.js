let pessoasNaSala = []

const getAPI = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')

const nome = window.prompt('Entre com seu nome de usuário:')
const nameUser = {name:nome}

axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameUser)





getAPI.then(listaDeContatos)

function listaDeContatos(respostaServidor){

    let pessoas = document.querySelector('.m-site-pessoas')
    
    for(let i = 0 ; i < respostaServidor.data.length ; i++){
        console.log(respostaServidor.data[i].name)

        pessoas.innerHTML += `
                <div class="m-site-pessoa">
                    <img src="../imagens/persona.png" alt="">
                    <span>${respostaServidor.data[i].name}</span>
                </div>
        `
    }
}


//setInterval(funcao, 1000ms)

// ***** Botões do Menu ******************************************************************

function showMenu(){
    const item = document.querySelector('.menu-site')
    item.classList.toggle('menu-site-aparecer')
}

function hideMenu(){
    const item = document.querySelector('.menu-site')
    item.classList.toggle('menu-site-aparecer')
}

// ***** Acrescentar pessoas na sala ******************************************************
