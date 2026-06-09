const slides = [
    {
        imagem: "./img/slide-1.png",
        titulo: "Monitoramento por satélite",
        texto: "Dados orbitais simulados ajudam a identificar riscos climáticos."
    },
    {
        imagem: "./img/slide-2.png",
        titulo: "Sensores locais",
        texto: "O sistema usa sensores para confirmar as condições do ambiente."
    },
    {
        imagem: "./img/slide-3.png",
        titulo: "Alerta climático",
        texto: "Quando há risco, o ClimaSat Alert emite avisos para a comunidade."
    }
];

let slideAtual = 0;

const slideImagem = document.querySelector("#slideImagem");
const slideTitulo = document.querySelector("#slideTitulo");
const slideTexto = document.querySelector("#slideTexto");
const btnAnterior = document.querySelector("#btnAnterior");
const btnProximo = document.querySelector("#btnProximo");

function mostrarSlide(posicao) {
    slideImagem.src = slides[posicao].imagem;
    slideImagem.alt = slides[posicao].titulo;
    slideTitulo.textContent = slides[posicao].titulo;
    slideTexto.textContent = slides[posicao].texto;
}

btnProximo.addEventListener("click", function () {
    slideAtual++;

    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);
});

btnAnterior.addEventListener("click", function () {
    slideAtual--;

    if (slideAtual < 0) {
        slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);
});



const formAlerta = document.querySelector("#formAlerta");
const mensagemFormulario = document.querySelector("#mensagemFormulario");

formAlerta.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const cidade = document.querySelector("#cidade").value.trim();
    const risco = document.querySelector("#risco").value;

    if (nome === "" || email === "" || cidade === "" || risco === "") {
        mensagemFormulario.textContent = "Preencha todos os campos antes de enviar.";
        mensagemFormulario.className = "mensagem-form erro";
        return;
    }

    mensagemFormulario.textContent = "Cadastro realizado com sucesso!";
    mensagemFormulario.className = "mensagem-form sucesso";

    formAlerta.reset();
});



const perguntas = [
    {
        pergunta: "O que o ClimaSat Alert monitora?",
        alternativas: ["Riscos climáticos", "Jogos online", "Compras digitais", "Redes sociais"],
        correta: 0
    },
    {
        pergunta: "Qual componente controla o sistema?",
        alternativas: ["Arduino Uno", "Mouse", "Monitor", "Teclado"],
        correta: 0
    },
    {
        pergunta: "Qual sensor mede temperatura e umidade?",
        alternativas: ["DHT22", "HC-SR04", "Buzzer", "LED"],
        correta: 0
    },
    {
        pergunta: "O sensor HC-SR04 simula qual condição?",
        alternativas: ["Nível da água", "Velocidade do vento", "Luminosidade", "Som ambiente"],
        correta: 0
    },
    {
        pergunta: "O potenciômetro representa o quê?",
        alternativas: ["Dado orbital simulado", "Botão de energia", "Alto-falante", "Tela do LCD"],
        correta: 0
    },
    {
        pergunta: "Qual componente emite alerta sonoro?",
        alternativas: ["Buzzer", "DHT22", "Potenciômetro", "Resistor"],
        correta: 0
    },
    {
        pergunta: "O LED vermelho indica qual estado?",
        alternativas: ["Crítico", "Normal", "Desligado", "Carregando"],
        correta: 0
    },
    {
        pergunta: "O botão SOS representa qual ação?",
        alternativas: ["Emergência manual", "Troca de tema", "Reinício do quiz", "Slideshow"],
        correta: 0
    },
    {
        pergunta: "Por que o projeto se relaciona com o espaço?",
        alternativas: ["Usa dados orbitais simulados", "Usa foguete real", "Controla satélite real", "Usa GPS obrigatório"],
        correta: 0
    },
    {
        pergunta: "Qual é o objetivo principal do sistema?",
        alternativas: ["Gerar alertas preventivos", "Vender produtos", "Criar jogos", "Enviar mensagens pessoais"],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontos = 0;
let bloqueado = false;

const quizPergunta = document.querySelector("#quizPergunta");
const quizAlternativas = document.querySelector("#quizAlternativas");
const quizResultado = document.querySelector("#quizResultado");
const btnReiniciarQuiz = document.querySelector("#btnReiniciarQuiz");

function carregarPergunta() {
    bloqueado = false;
    quizResultado.textContent = "";

    const item = perguntas[perguntaAtual];

    quizPergunta.textContent = (perguntaAtual + 1) + ". " + item.pergunta;
    quizAlternativas.innerHTML = "";

    item.alternativas.forEach(function (alternativa, indice) {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.className = "alternativa";

        botao.addEventListener("click", function () {
            verificarResposta(indice, botao);
        });

        quizAlternativas.appendChild(botao);
    });
}

function verificarResposta(indiceSelecionado, botaoSelecionado) {
    if (bloqueado) {
        return;
    }

    bloqueado = true;

    const item = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".alternativa");

    if (indiceSelecionado === item.correta) {
        pontos++;
        botaoSelecionado.classList.add("correta");
    } else {
        botaoSelecionado.classList.add("errada");
        botoes[item.correta].classList.add("correta");
    }

    setTimeout(function () {
        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            mostrarResultado();
        }
    }, 800);
}

function mostrarResultado() {
    quizPergunta.textContent = "Quiz finalizado!";
    quizAlternativas.innerHTML = "";

    let mensagem = "";

    if (pontos >= 8) {
        mensagem = "Excelente! Você entendeu muito bem o projeto ClimaSat Alert.";
    } else if (pontos >= 5) {
        mensagem = "Bom resultado! Você já conhece os principais pontos do projeto.";
    } else {
        mensagem = "Continue estudando o projeto para entender melhor a solução.";
    }

    quizResultado.textContent = "Você acertou " + pontos + " de " + perguntas.length + " perguntas. " + mensagem;
    btnReiniciarQuiz.style.display = "inline-block";
}

btnReiniciarQuiz.addEventListener("click", function () {
    perguntaAtual = 0;
    pontos = 0;
    btnReiniciarQuiz.style.display = "none";

    carregarPergunta();
});

carregarPergunta();



const botoesTema = document.querySelectorAll("[data-tema]");

botoesTema.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const tema = botao.getAttribute("data-tema");

        document.body.classList.remove("tema-espacial", "tema-oceano", "tema-alerta");
        document.body.classList.add(tema);
    });
});