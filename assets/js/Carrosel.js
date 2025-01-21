const track = document.querySelector(".carousel-track");
const cards = Array.from(track.children);
const nextButton = document.querySelector(".carousel-button.next");
const prevButton = document.querySelector(".carousel-button.prev");

let currentIndex = 0;
const cardWidth = cards[0].getBoundingClientRect().width;

// Clonando os cards para o loop contínuo
const cloneCards = () => {
  const clonedNodes = cards.map((card) => card.cloneNode(true));
  clonedNodes.forEach((clone) => track.appendChild(clone));
  return clonedNodes;
};

const duplicatedCards = cloneCards();

// Atualizando o array de todos os cards
const allCards = cards.concat(duplicatedCards);

// Alinha todos os cards
allCards.forEach((card, index) => {
  card.style.left = cardWidth * index + "px";
});

const moveToCard = (index) => {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  if (index >= cards.length) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(0px)`;
      currentIndex = 0;
    }, 500); // Tempo para a transição completar
  }
};

const moveNext = () => {
  currentIndex++;
  moveToCard(currentIndex);
  if (currentIndex >= cards.length) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(moveNext, 3000);
  }
};

const movePrev = () => {
  currentIndex--;
  if (currentIndex < 0) {
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth * (cards.length - 1)}px)`;
    currentIndex = cards.length - 1;
    track.offsetHeight; // Força o navegador a reprocessar o layout
    track.style.transition = ""; // Re-adiciona a transição
  }
  moveToCard(currentIndex);
};

// Rotação automática
let autoSlideInterval = setInterval(moveNext, 3000);

// Pausar rotação automática ao interagir com os botões
nextButton.addEventListener("click", () => {
  moveNext();
  clearInterval(autoSlideInterval); // Pausar
  autoSlideInterval = setInterval(moveNext, 3000); // Reiniciar
});

prevButton.addEventListener("click", () => {
  movePrev();
  clearInterval(autoSlideInterval); // Pausar
  autoSlideInterval = setInterval(moveNext, 3000); // Reiniciar
});
