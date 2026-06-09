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