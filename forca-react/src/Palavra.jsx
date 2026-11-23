export default function Palavra({ palavra, chutes }) {
  const letras = [...palavra].map((l) => (chutes.includes(l) ? l : "_"));
  return (
    <p className="palavra" aria-live="polite">
      {letras.join(" ")}
    </p>
  );
}
