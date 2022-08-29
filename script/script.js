const getParticipants = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
const getMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
let userUser;
let aReceber ='Todos'
 


async function executarLogin(){
    let userName = document.querySelector('.initial-text').value
    userUser = userName

    let sendLogin = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: userName});
    await sendLogin.then(mostrarChat)
    sendLogin.catch(falhaAoLogar)

    
}

function estaOnline(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: userUser});
}

getMessages.then(listaDeMensagens)

function listaDeMensagens(mensagensServidor){
    
    console.log(typeof(mensagensServidor))

    const listaMensagens = mensagensServidor.data

    let mensagem = document.querySelector('.conteudo-site')

    for(let i = 0 ; i < listaMensagens.length ; i++){
        
        if(listaMensagens[i].type == "message"){
            mensagem.innerHTML += `
            <div class="mensagem msg">
                <span>&#40;${mensagensServidor.data[i].time}&#41;</span>
                <span><span class="negrito">${mensagensServidor.data[i].from}</span> para <span class="negito">${mensagensServidor.data[i].to}</span>:</span>
                <span>${mensagensServidor.data[i].text}</span>
            </div>
        `
        } else if(listaMensagens[i].type == "status"){
            mensagem.innerHTML += `
            <div class="entrou-saiu msg">
                <span>&#40;${mensagensServidor.data[i].time}&#41;</span>
                <span><span class="negrito">${mensagensServidor.data[i].from}</span> para <span class="negito">${mensagensServidor.data[i].to}</span>:</span>
                <span>${mensagensServidor.data[i].text}</span>
            </div>
        `
        } else if(listaMensagens[i].type == "private_mensage"){
            mensagem.innerHTML += `
            <div class="reservadamente msg">
                <span>&#40;${mensagensServidor.data[i].time}&#41;</span>
                <span><span class="negrito">${mensagensServidor.data[i].from}</span> para <span class="negito">${mensagensServidor.data[i].to}</span>:</span>
                <span>${mensagensServidor.data[i].text}</span>
            </div>
        `
        }     
    }
    let ultimaMsg = document.querySelectorAll('.msg')
    ultimaMsg[ultimaMsg.length-1].scrollIntoView()
}


function mostrarChat(){
    const pagina = document.querySelector('.initial-style')

    pagina.classList.add('show')

    setInterval(listaDeContatos, 3000);
    setInterval(estaOnline, 5000);

}


getParticipants.then(listaDeContatos)
function listaDeContatos(respostaServidor){

    const listaContatos = respostaServidor.data
    let pessoas = document.querySelector('.m-site-pessoas')
    
    for(let i = 0 ; i < listaContatos.length ; i++){
        pessoas.innerHTML += `
                <div class="m-site-pessoa">
                    <img src="../imagens/persona.png" alt="">
                    <span>${respostaServidor.data[i].name}</span>
                </div>
        `
    }
}


function sendMessage(){

    let texto = document.querySelector('.caixa-rodape')
    
    let msgEnviar = {
        from: userUser,     
        to: aReceber,
        text: texto.value,
        type: "message"
    }

    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msgEnviar) 
    texto.value = ""
}


function selecionaCadeado(){
    let cadeadoSelecionado = document.querySelector('.icon1')
    let cadeadoSelecionado1 = document.querySelector('.icon2')

    cadeadoSelecionado.classList.toggle('show')
    cadeadoSelecionado1.classList.toggle('show')
}



// ***** MENU MOSTRAR E ESCONDER *************************************************************

function showMenu() {
    const menu = document.querySelector('.menu-site')
    menu.classList.add('menu-site-aparecer')
}

function hideMenu() {
    const menu = document.querySelector('.menu-site')
    menu.classList.remove('menu-site-aparecer')
    
}

// ***** ERROS AO EXECUTAR LOGIN *************************************************************

function falhaAoLogar(item) {

    if(item.response.status == 400) 
        alert("[ERRO] NickName já está sendo utilizado, por favor escolha outro.");
    else
        mostrarChat();
} 




setInterval(listaDeMensagens, 3000);
setInterval(listaDeContatos, 10000);
setInterval(estaOnline, 5000) 