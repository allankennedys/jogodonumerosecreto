//let titulo = document.querySelector('h1');
//titulo.innerHTML = "NÚMERO SECRETO";

//let paragrago = document.querySelector('p');
//paragrago.innerHTML = "Escolha um número entre 1 e 1000";
let listaDeNumerosSorteados = [];

let numeroSecreto = gerarNumeroAleatorio();

let tentativas = 1;

//A função abaixo faz com que o programa gere um número aleatório inteiro entre 1 e 1000
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 1000 + 1);
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}


// A função abaixo permite manipular as mensagens na tela substituindo, ao chamar a função, 
//os parâmetros tag, campo e texto pelos desejados.
//A função será chamada posteriormente de acordo com as condições do chute do usuário
function exibirTextoNaTela(tag, texto){
let campo = document.querySelector(tag);
campo.innerHTML = texto;
responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

//A função abaixo utiliza da função criada anteriormente (exibirTextoNaTela) para que possamos
//retornar mais facilmente para a mensagem inicial ao reinciarmos o jogo, ao invés de repetir
//todo o código.
function exibirMensagemInicial(){
exibirTextoNaTela('h1',"NÚMERO SECRETO")
exibirTextoNaTela('p', "Escolha um número entre 1 e 1000")
}

exibirMensagemInicial()


//A função abaixo define o que deve ocorrer ao apertar o botão "Novo Jogo"
//Respectivamente: atualiza o valor do numeroSecreto, gerando um novo; reinicia a contagem de
//tentativas; limpa o campo de resposta(input); retorna p/ mensagem de tela inicial e 
//desabilita novamente o botão "Novo Jogo".

    function reiniciar() {
        numeroSecreto = gerarNumeroAleatorio();
        tentativas = 1;
        limparCampo();
        exibirMensagemInicial()
        document.getElementById('reiniciar').setAttribute('disabled', true);
        
    }




function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `O número secreto é ${numeroSecreto}. Você levou ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p',mensagemTentativas);
        exibirTextoNaTela('h1',"Você acertou!");
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto){
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}`)
        limparCampo();
    } else{
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}`)
        limparCampo();
    }
    tentativas++;
    
 
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

