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

// Confetti Cannon Effect
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// Update Book Display & Manage Video Autoplay
function updateBook() {
  // 1. Toggle book open/closed state & control bar visibility
  if (currentPage === 0) {
    spiralBook.classList.add('closed');
    spiralBook.classList.remove('open');
    controlsBar.classList.add('hidden-bar');
  } else {
    spiralBook.classList.remove('closed');
    spiralBook.classList.add('open');
    controlsBar.classList.remove('hidden-bar');
  }

  // 2. Flip page and handle video play/pause
  pages.forEach((page, index) => {
    const video = page.querySelector('video');

    if (index === currentPage) {
      page.classList.add('active');
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    } else {
      page.classList.remove('active');
      if (video) {
        video.pause();
      }
    }
  });

  // 3. Control button states
  prevBtn.disabled = currentPage === 1;

  if (currentPage > 0) {
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages - 1}`;
  }

  // 4. Trigger confetti on final page
  if (currentPage === totalPages - 1) {
    triggerConfetti();
  }
}

// Event Listeners
openBookBtn.addEventListener('click', () => {
  currentPage = 1;
  updateBook();
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateBook();
  } else {
    currentPage = 0; // Return to cover when clicking past the last page
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