const cartas = [
  "💰", "💰", 
  "🗼", "🗼",
  "🚭", "🚭",
  "📵", "📵",
  "🧲", "🧲",
  "📱", "📱"
];
let cartasViradas = [], paresEncontrados = 0, movimentos = 0; 

// embaralhar as cartas
const embaralharCartas = () => cartas.sort(() => Math.random() - 0.5);

// Função para criar uma carta no tabuleiro
const criarCarta = (conteudo) => {
  const carta = document.createElement('div'); 
  carta.className = 'col-3 d-flex align-items-center justify-content-center border rounded bg-light p-3'; // Aplica classes de estilo
  carta.dataset.content = conteudo; 
  carta.innerHTML = "?"; // Exibe um ponto de interrogação inicialmente
  carta.style.fontSize = "24px"; // TAMANHO DO ?
  carta.style.height = "100px"; 
  carta.style.cursor = "pointer"; 
  carta.addEventListener('click', () => virarCarta(carta)); // clique para virar a carta
  return carta; // Retorna a carta criada
};

// Atualiza o placar exibindo pares encontrados e movimentos realizados
const atualizarPlacar = () => document.getElementById('score').textContent = `Pares encontrados: ${paresEncontrados} | Movimentos: ${movimentos}`;

// Função para virar uma carta
const virarCarta = (carta) => {
  if (carta.classList.contains('flipped') || cartasViradas.length === 2) return; // Evita virar mais de 2 cartas ao mesmo tempo
  carta.classList.add('flipped', 'bg-secondary', 'text-white'); 
  carta.innerHTML = carta.dataset.content; // MOSTRA o símbolo da carta
  cartasViradas.push(carta); 

  if (cartasViradas.length === 2) { // Verifica se duas cartas estão viradas
    movimentos++; 
    atualizarPlacar(); // Atualiza o placar
    verificarPar(); // Verifica se as cartas viradas formam um par
  }
};

// Função para verificar se as duas cartas viradas formam um par
const verificarPar = () => {
  const [carta1, carta2] = cartasViradas; 
  if (carta1.dataset.content === carta2.dataset.content) { 
    paresEncontrados++; 
    atualizarPlacar(); // Atualiza o placar
    cartasViradas = []; // Reseta o array de cartas viradas
    if (paresEncontrados === cartas.length / 2) setTimeout(() => alert("Parabéns, você venceu!"), 300); // Exibe mensagem de vitória se todos os pares forem encontrados
  } else {
    setTimeout(() => { // Se os símbolos forem diferentes:
      carta1.classList.remove('flipped', 'bg-secondary', 'text-white'); 
      carta2.classList.remove('flipped', 'bg-secondary', 'text-white'); 
      carta1.innerHTML = "?"; 
      carta2.innerHTML = "?"; 
      cartasViradas = []; 
    }, 1000); // Aguarda 1 segundo antes de desvirar as cartas
  }
};

// Função para inicializar ou reiniciar o jogo
const inicializarJogo = () => {
  const tabuleiroJogo = document.getElementById('game-board');
  tabuleiroJogo.innerHTML = ""; // Limpa o tabuleiro
  embaralharCartas().forEach(conteudo => tabuleiroJogo.appendChild(criarCarta(conteudo))); 
  paresEncontrados = movimentos = 0; 
  atualizarPlacar(); // Atualiza o placar
};

// para clicar no botao e começar o jogo de novo
document.getElementById('restart-btn').addEventListener('click', inicializarJogo);


inicializarJogo();