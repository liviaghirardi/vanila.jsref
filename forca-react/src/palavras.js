export const PALAVRAS = {
  Frameworks: ["REACT", "ANGULAR", "VUE", "SVELTE", "BOOTSTRAP", "NEXT"],
  Tecnologia: ["JAVASCRIPT", "GITHUB", "VERCEL", "NAVEGADOR", "SERVIDOR", "COMPONENTE"],
  Frutas: ["BANANA", "MORANGO", "ABACAXI", "MELANCIA", "MARACUJA", "LARANJA"],
  Animais: ["ELEFANTE", "GIRAFA", "TARTARUGA", "CACHORRO", "PINGUIM", "CAPIVARA"],
};

const aleatorio = (lista) => lista[Math.floor(Math.random() * lista.length)];

export function sortear() {
  const categoria = aleatorio(Object.keys(PALAVRAS));
  return { categoria, palavra: aleatorio(PALAVRAS[categoria]) };
}
