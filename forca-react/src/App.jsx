import { useEffect, useState } from "react";
import Forca from "./Forca";
import Palavra from "./Palavra";
import Teclado, { ALFABETO } from "./Teclado";
import { sortear } from "./palavras";

const MAX_ERROS = 6;

export default function App() {
  const [jogo, setJogo] = useState(sortear);
  const [chutes, setChutes] = useState([]);
  const [placar, setPlacar] = useState({ vitorias: 0, derrotas: 0 });

  // Valores derivados do estado: nada é alterado "na mão" no DOM
  const { palavra, categoria } = jogo;
  const erradas = chutes.filter((l) => !palavra.includes(l));
  const venceu = [...palavra].every((l) => chutes.includes(l));
  const perdeu = erradas.length >= MAX_ERROS;
  const fim = venceu || perdeu;

  function chutar(letra) {
    if (fim || chutes.includes(letra)) return;
    const novos = [...chutes, letra];
    setChutes(novos);

    const ganhou = [...palavra].every((l) => novos.includes(l));
    const errou = novos.filter((l) => !palavra.includes(l)).length >= MAX_ERROS;
    if (ganhou) setPlacar((p) => ({ ...p, vitorias: p.vitorias + 1 }));
    else if (errou) setPlacar((p) => ({ ...p, derrotas: p.derrotas + 1 }));
  }

  function reiniciar() {
    setJogo(sortear());
    setChutes([]);
  }

  // Permite jogar pelo teclado físico
  useEffect(() => {
    function aoTeclar(e) {
      const letra = e.key.toUpperCase();
      if (ALFABETO.includes(letra)) chutar(letra);
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  });

  return (
    <main className="game">
      <header>
        <h1>Jogo da Forca</h1>
        <p className="placar">
          Vitórias: <strong>{placar.vitorias}</strong> · Derrotas:{" "}
          <strong>{placar.derrotas}</strong>
        </p>
      </header>

      <section className="tabuleiro">
        <Forca erros={erradas.length} />
        <div className="info">
          <p className="categoria">Categoria: {categoria}</p>
          <Palavra palavra={palavra} chutes={chutes} />
          <p className="tentativas">Erros: {erradas.length} / {MAX_ERROS}</p>
          <p className="erradas">{erradas.join(" ")}</p>
        </div>
      </section>

      <Teclado chutes={chutes} palavra={palavra} onChute={chutar} />

      {fim && (
        <div className="mensagem">
          <p>
            {venceu ? "🎉 Você venceu!" : "💀 Você perdeu!"} A palavra era {palavra}.
          </p>
          <button type="button" onClick={reiniciar} autoFocus>
            Jogar novamente
          </button>
        </div>
      )}
    </main>
  );
}
