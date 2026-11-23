// Jogo da Forca em Vanilla JS

const PALAVRAS = {
  Frameworks: ["REACT", "ANGULAR", "VUE", "SVELTE", "BOOTSTRAP", "NEXT"],
  Tecnologia: ["JAVASCRIPT", "GITHUB", "VERCEL", "NAVEGADOR", "SERVIDOR", "COMPONENTE"],
  Frutas: ["BANANA", "MORANGO", "ABACAXI", "MELANCIA", "MARACUJA", "LARANJA"],
  Animais: ["ELEFANTE", "GIRAFA", "TARTARUGA", "CACHORRO", "PINGUIM", "CAPIVARA"],
};

const MAX_ERROS = 6;
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Elementos da página
const elPalavra = document.getElementById("palavra");
const elCategoria = document.getElementById("categoria");
const elErros = document.getElementById("erros");
const elErradas = document.getElementById("erradas");
const elTeclado = document.getElementById("teclado");
const elMensagem = document.getElementById("mensagem");
const elMensagemTexto = document.getElementById("mensagem-texto");
const elReiniciar = document.getElementById("reiniciar");
const elVitorias = document.getElementById("vitorias");
const elDerrotas = document.getElementById("derrotas");
const partes = document.querySelectorAll(".forca .parte");

// Estado do jogo
let palavra = "";
let letrasCertas = new Set();
let letrasErradas = new Set();
let fimDeJogo = false;
const placar = { vitorias: 0, derrotas: 0 };

function sortear(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function novoJogo() {
  const categoria = sortear(Object.keys(PALAVRAS));
  palavra = sortear(PALAVRAS[categoria]);
  letrasCertas = new Set();
  letrasErradas = new Set();
  fimDeJogo = false;

  elCategoria.textContent = categoria;
  elMensagem.hidden = true;
  criarTeclado();
  atualizarTela();
}

function criarTeclado() {
  elTeclado.innerHTML = "";
  ALFABETO.forEach((letra) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = letra;
    botao.dataset.letra = letra;
    botao.addEventListener("click", () => chutar(letra));
    elTeclado.appendChild(botao);
  });
}

function chutar(letra) {
  if (fimDeJogo || letrasCertas.has(letra) || letrasErradas.has(letra)) return;

  const botao = elTeclado.querySelector(`[data-letra="${letra}"]`);
  botao.disabled = true;

  if (palavra.includes(letra)) {
    letrasCertas.add(letra);
    botao.classList.add("certa");
  } else {
    letrasErradas.add(letra);
    botao.classList.add("errada");
  }

  atualizarTela();
  verificarFim();
}

function atualizarTela() {
  elPalavra.textContent = palavra
    .split("")
    .map((l) => (letrasCertas.has(l) ? l : "_"))
    .join(" ");

  elErros.textContent = letrasErradas.size;
  elErradas.textContent = [...letrasErradas].join(" ");

  partes.forEach((parte, i) => {
    parte.classList.toggle("visivel", i < letrasErradas.size);
  });
}

function verificarFim() {
  const venceu = palavra.split("").every((l) => letrasCertas.has(l));
  const perdeu = letrasErradas.size >= MAX_ERROS;

  if (!venceu && !perdeu) return;

  fimDeJogo = true;
  if (venceu) {
    placar.vitorias++;
    elMensagemTexto.textContent = `🎉 Você venceu! A palavra era ${palavra}.`;
  } else {
    placar.derrotas++;
    elMensagemTexto.textContent = `💀 Você perdeu! A palavra era ${palavra}.`;
  }
  elVitorias.textContent = placar.vitorias;
  elDerrotas.textContent = placar.derrotas;
  elMensagem.hidden = false;
  elReiniciar.focus();
}

// Permite jogar pelo teclado físico
document.addEventListener("keydown", (e) => {
  const letra = e.key.toUpperCase();
  if (ALFABETO.includes(letra)) chutar(letra);
});

elReiniciar.addEventListener("click", novoJogo);

novoJogo();
