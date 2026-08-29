const spiralBook = document.getElementById('spiralBook');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openBookBtn = document.getElementById('openBookBtn');
const controlsBar = document.getElementById('controlsBar');
const pageIndicator = document.getElementById('pageIndicator');
const celebrateBtn = document.getElementById('celebrateBtn');

let currentPage = 0;
const totalPages = pages.length;

// Confetti Effect
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// Update Book State
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

// Actions
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