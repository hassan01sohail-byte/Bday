// Intro Stage DOM Elements
const introOverlay = document.getElementById('intro-overlay');
const stageBow = document.getElementById('stage-bow');
const stageDramatic = document.getElementById('stage-dramatic');
const stageTree = document.getElementById('stage-tree');
const growingHeart = document.getElementById('growingHeart');
const treeCanopy = document.getElementById('treeCanopy');
const proceedBookBtn = document.getElementById('proceedBookBtn');
const mainApp = document.getElementById('mainApp');

// Memory Book DOM Elements
const spiralBook = document.getElementById('spiralBook');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openBookBtn = document.getElementById('openBookBtn');
const controlsBar = document.getElementById('controlsBar');
const pageIndicator = document.getElementById('pageIndicator');
const celebrateBtn = document.getElementById('celebrateBtn');

// Quiz DOM Elements
const quizOptions = document.querySelectorAll('.quiz-opt');
const quizResult = document.getElementById('quizResult');

let currentPage = 0;
const totalPages = pages.length;

// AUTOMATIC 3-STEP HEART GROWING SEQUENCE
window.addEventListener('load', () => {
  setTimeout(animate3StepHeart, 800);
});

function animate3StepHeart() {
  growingHeart.classList.add('step-1');

  setTimeout(() => {
    growingHeart.classList.remove('step-1');
    growingHeart.classList.add('step-2');
  }, 800);

  setTimeout(() => {
    growingHeart.classList.remove('step-2');
    growingHeart.classList.add('step-3');
  }, 1600);

  setTimeout(() => {
    growingHeart.classList.remove('step-3');
    growingHeart.classList.add('pop');
    setTimeout(transitionToDramaticStage, 450);
  }, 2400);
}

function transitionToDramaticStage() {
  stageBow.classList.add('hidden');
  stageDramatic.classList.remove('hidden');
  setTimeout(transitionToTreeStage, 3500);
}

function transitionToTreeStage() {
  stageDramatic.classList.add('hidden');
  stageTree.classList.remove('hidden');
  setTimeout(bloomCanopyFull, 1800);
}

function bloomCanopyFull() {
  const bloomItems = ['💖', '🌸', '🌺', '💗', '🌹', '💓', '🌷', '💕', '❤️', '🌼'];
  const totalBlooms = 65;

  for (let i = 0; i < totalBlooms; i++) {
    setTimeout(() => {
      const item = document.createElement('div');
      item.className = 'bloom-item';
      item.innerHTML = bloomItems[Math.floor(Math.random() * bloomItems.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 110;
      
      const x = 200 + r * 1.35 * Math.pow(Math.sin(angle), 3);
      const y = 160 - r * (13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) - Math.cos(4*angle)) / 16;
      
      const size = 1.1 + Math.random() * 0.7;

      item.style.left = `${x - 12}px`;
      item.style.top = `${y - 12}px`;
      item.style.fontSize = `${size}rem`;

      treeCanopy.appendChild(item);
    }, i * 45);
  }

  setTimeout(() => {
    proceedBookBtn.classList.remove('hidden');
  }, totalBlooms * 45 + 400);
}

proceedBookBtn.addEventListener('click', () => {
  introOverlay.style.opacity = '0';
  setTimeout(() => {
    introOverlay.classList.add('hidden');
    mainApp.classList.remove('hidden');
  }, 1000);
});

// QUIZ EVENT LISTENERS
quizOptions.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const chosenOption = button.getAttribute('data-option');
    
    if (chosenOption === '5') {
      quizResult.textContent = '😂You are right';
      quizResult.className = 'quiz-result correct';
    } else {
      quizResult.textContent = '😒Wrong ,You are all of them🤣';
      quizResult.className = 'quiz-result incorrect';
    }
  });
});

// YOUR ORIGINAL MEMORY BOOK LOGIC
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

function updateBook() {
  if (currentPage === 0) {
    spiralBook.classList.add('closed');
    spiralBook.classList.remove('open');
    controlsBar.classList.add('hidden-bar');
  } else {
    spiralBook.classList.remove('closed');
    spiralBook.classList.add('open');
    controlsBar.classList.remove('hidden-bar');
  }

  pages.forEach((page, index) => {
    if (index === currentPage) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  prevBtn.disabled = currentPage === 1;

  if (currentPage > 0) {
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages - 1}`;
  }

  if (currentPage === totalPages - 1) {
    triggerConfetti();
  }
}

openBookBtn.addEventListener('click', () => {
  currentPage = 1;
  updateBook();
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateBook();
  } else {
    currentPage = 0;
    updateBook();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateBook();
  }
});

celebrateBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  triggerConfetti();
});