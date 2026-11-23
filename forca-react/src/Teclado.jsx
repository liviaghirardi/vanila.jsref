export const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Teclado({ chutes, palavra, onChute }) {
  return (
    <section className="teclado" aria-label="Teclado">
      {ALFABETO.map((letra) => {
        const usada = chutes.includes(letra);
        const classe = !usada ? "" : palavra.includes(letra) ? "certa" : "errada";
        return (
          <button
            key={letra}
            type="button"
            className={classe}
            disabled={usada}
            onClick={() => onChute(letra)}
          >
            {letra}
          </button>
        );
      })}
    </section>
  );
}
