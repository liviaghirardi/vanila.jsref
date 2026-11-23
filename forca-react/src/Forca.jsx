// Cada parte do boneco aparece conforme o número de erros
const PARTES = [
  <circle key="cabeca" cx="150" cy="70" r="20" />,
  <line key="corpo" x1="150" y1="90" x2="150" y2="150" />,
  <line key="braco-e" x1="150" y1="105" x2="125" y2="130" />,
  <line key="braco-d" x1="150" y1="105" x2="175" y2="130" />,
  <line key="perna-e" x1="150" y1="150" x2="130" y2="185" />,
  <line key="perna-d" x1="150" y1="150" x2="170" y2="185" />,
];

export default function Forca({ erros }) {
  return (
    <svg className="forca" viewBox="0 0 200 250" aria-label="Desenho da forca">
      <line x1="20" y1="230" x2="120" y2="230" />
      <line x1="60" y1="230" x2="60" y2="20" />
      <line x1="60" y1="20" x2="150" y2="20" />
      <line x1="150" y1="20" x2="150" y2="50" />
      {PARTES.slice(0, erros)}
    </svg>
  );
}
