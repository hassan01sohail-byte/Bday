// ===============================
// INTRO STAGE DOM ELEMENTS
// ===============================
const introOverlay = document.getElementById('intro-overlay');
const stageBow = document.getElementById('stage-bow');
const stageDramatic = document.getElementById('stage-dramatic');
const stageTree = document.getElementById('stage-tree');
const growingHeart = document.getElementById('growingHeart');
const treeCanopy = document.getElementById('treeCanopy');
const mainApp = document.getElementById('mainApp');

// ===============================
// MEMORY BOOK DOM ELEMENTS
// ===============================
const spiralBook = document.getElementById('spiralBook');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openBookBtn = document.getElementById('openBookBtn');
const controlsBar = document.getElementById('controlsBar');
const pageIndicator = document.getElementById('pageIndicator');
const celebrateBtn = document.getElementById('celebrateBtn');

// ===============================
// QUIZ DOM ELEMENTS
// ===============================
const quizOptions = document.querySelectorAll('.quiz-opt');
const quizResult = document.getElementById('quizResult');

// ===============================
// STATE
// ===============================
let currentPage = 0;
const totalPages = pages.length;

let introTimers = [];
let hasCelebratedFinalPage = false;
let introFinished = false;

// ===============================
// HELPER: CLEAR INTRO TIMERS
// ===============================
function clearIntroTimers() {
  introTimers.forEach(timer => clearTimeout(timer));
  introTimers = [];
}

// ===============================
// AUTOMATIC 3-STEP HEART SEQUENCE
// ===============================
window.addEventListener('load', () => {
  const timer = setTimeout(animate3StepHeart, 800);
  introTimers.push(timer);
});

function animate3StepHeart() {
  if (!growingHeart) return;

  growingHeart.classList.remove('step-1', 'step-2', 'step-3', 'pop');

  // Step 1
  growingHeart.classList.add('step-1');

  const step2Timer = setTimeout(() => {
    growingHeart.classList.remove('step-1');
    growingHeart.classList.add('step-2');
  }, 800);

  // Step 2
  const step3Timer = setTimeout(() => {
    growingHeart.classList.remove('step-2');
    growingHeart.classList.add('step-3');
  }, 1600);

  // Step 3 + pop
  const popTimer = setTimeout(() => {
    growingHeart.classList.remove('step-3');
    growingHeart.classList.add('pop');

    const transitionTimer = setTimeout(
      transitionToDramaticStage,
      450
    );

    introTimers.push(transitionTimer);
  }, 2400);

  introTimers.push(step2Timer, step3Timer, popTimer);
}

// ===============================
// TRANSITION TO DRAMATIC STAGE
// ===============================
function transitionToDramaticStage() {
  if (!stageBow || !stageDramatic) return;

  stageBow.classList.add('stage-fade-out');

  const timer = setTimeout(() => {
    stageBow.classList.add('hidden');
    stageBow.classList.remove('stage-fade-out');

    stageDramatic.classList.remove('hidden');

    requestAnimationFrame(() => {
      stageDramatic.classList.add('stage-visible');
    });

    const treeTimer = setTimeout(
      transitionToTreeStage,
      3500
    );

    introTimers.push(treeTimer);
  }, 650);

  introTimers.push(timer);
}

// ===============================
// TRANSITION TO TREE STAGE
// ===============================
function transitionToTreeStage() {
  if (!stageDramatic || !stageTree) return;

  stageDramatic.classList.remove('stage-visible');
  stageDramatic.classList.add('stage-fade-out');

  const timer = setTimeout(() => {
    stageDramatic.classList.add('hidden');
    stageDramatic.classList.remove('stage-fade-out');

    stageTree.classList.remove('hidden');

    requestAnimationFrame(() => {
      stageTree.classList.add('stage-visible');
    });

    const bloomTimer = setTimeout(
      bloomCanopyFull,
      1600
    );

    introTimers.push(bloomTimer);
  }, 800);

  introTimers.push(timer);
}

// ===============================
// BLOOM TREE
// ===============================
function bloomCanopyFull() {
  if (!treeCanopy) return;

  // Prevent duplicate flowers if this function is ever called again.
  treeCanopy.innerHTML = '';

  const bloomItems = [
    '💖',
    '🌸',
    '🌺',
    '💗',
    '🌹',
    '💓',
    '🌷',
    '💕',
    '❤️',
    '🌼'
  ];

  const totalBlooms = 110;
  const bloomDelay = 25;
  const bloomAnimationDuration = 850;

  for (let i = 0; i < totalBlooms; i++) {
    const timer = setTimeout(() => {
      const item = document.createElement('div');

      item.className = 'bloom-item';

      item.textContent =
        bloomItems[
          Math.floor(Math.random() * bloomItems.length)
        ];

      // Generate a random point inside the heart.
      const t = Math.random() * Math.PI * 2;

      // sqrt gives a more natural distribution.
      const randomRadius =
        Math.sqrt(Math.random());

      // Heart curve.
      const hx =
        16 * Math.pow(Math.sin(t), 3);

      const hy =
        -(
          13 * Math.cos(t)
          - 5 * Math.cos(2 * t)
          - 2 * Math.cos(3 * t)
          - Math.cos(4 * t)
        );

      // Controlled scaling.
      const spread = 0.72 + randomRadius * 0.28;

      const leftPercent =
        50 + (hx / 16) * 38 * spread;

      const topPercent =
        30 + (hy / 17) * 32 * spread;

      const size =
        0.75 + Math.random() * 0.65;

      const rotation =
        -20 + Math.random() * 40;

      item.style.left = `${leftPercent}%`;
      item.style.top = `${topPercent}%`;
      item.style.fontSize = `${size}rem`;

      // IMPORTANT:
      // Do not use transform here.
      // CSS handles translate/scale/rotation so the
      // bloom animation doesn't fight with JavaScript.
      item.style.setProperty(
        '--bloom-rotation',
        `${rotation}deg`
      );

      treeCanopy.appendChild(item);
    }, i * bloomDelay);

    introTimers.push(timer);
  }

  // Wait for the last bloom to appear AND finish animating.
  const totalBloomTime =
    (totalBlooms - 1) * bloomDelay
    + bloomAnimationDuration;

  const transitionTimer = setTimeout(() => {
    finishIntro();
  }, totalBloomTime + 1800);

  introTimers.push(transitionTimer);
}

// ===============================
// FINISH INTRO
// ===============================
function finishIntro() {
  if (introFinished) return;

  introFinished = true;

  if (!introOverlay || !mainApp) return;

  introOverlay.classList.add('intro-ending');

  const timer = setTimeout(() => {
    introOverlay.classList.add('hidden');

    mainApp.classList.remove('hidden');

    requestAnimationFrame(() => {
      mainApp.classList.add('app-visible');
    });

    updateBook();
  }, 1000);

  introTimers.push(timer);
}

// ===============================
// QUIZ
// ===============================
quizOptions.forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();

    const chosenOption =
      button.getAttribute('data-option');

    quizOptions.forEach(option => {
      option.classList.remove('selected');
    });

    button.classList.add('selected');

    if (chosenOption === '5') {
      quizResult.textContent =
        '😂 You are right!';

      quizResult.className =
        'quiz-result correct';

      triggerConfetti();
    } else {
      quizResult.textContent =
        '😒 Wrong, you are all of them 🤣';

      quizResult.className =
        'quiz-result incorrect';
    }
  });
});

// ===============================
// CONFETTI
// ===============================
function triggerConfetti() {
  if (typeof confetti !== 'function') {
    return;
  }

  confetti({
    particleCount: 150,
    spread: 80,
    origin: {
      y: 0.6
    }
  });
}

// ===============================
// UPDATE MEMORY BOOK
// ===============================
function updateBook() {
  if (!spiralBook) return;

  // COVER
  if (currentPage === 0) {
    spiralBook.classList.add('closed');
    spiralBook.classList.remove('open');

    controlsBar?.classList.add('hidden-bar');

    if (pageIndicator) {
      pageIndicator.textContent =
        `Cover`;
    }
  }

  // INSIDE PAGES
  else {
    spiralBook.classList.remove('closed');
    spiralBook.classList.add('open');

    controlsBar?.classList.remove('hidden-bar');

    if (pageIndicator) {
      pageIndicator.textContent =
        `Page ${currentPage} of ${totalPages - 1}`;
    }
  }

  // Activate only the current page.
  pages.forEach((page, index) => {
    page.classList.toggle(
      'active',
      index === currentPage
    );
  });

  // PREVIOUS BUTTON
  // Now the user can return to the cover.
  if (prevBtn) {
    prevBtn.disabled = currentPage === 0;
  }

  // NEXT BUTTON
  if (nextBtn) {
    nextBtn.disabled = false;
  }

  // FINAL PAGE CONFETTI
  if (
    currentPage === totalPages - 1
    && !hasCelebratedFinalPage
  ) {
    hasCelebratedFinalPage = true;

    const timer = setTimeout(() => {
      triggerConfetti();
    }, 300);

    introTimers.push(timer);
  }

  // Reset final-page confetti state when leaving final page.
  if (currentPage !== totalPages - 1) {
    hasCelebratedFinalPage = false;
  }
}

// ===============================
// OPEN BOOK
// ===============================
openBookBtn?.addEventListener('click', event => {
  event.stopPropagation();

  currentPage = 1;

  updateBook();
});

// ===============================
// NEXT PAGE
// ===============================
nextBtn?.addEventListener('click', event => {
  event.stopPropagation();

  if (currentPage < totalPages - 1) {
    currentPage++;

    updateBook();
  } else {
    // Return to cover after final page.
    currentPage = 0;

    updateBook();
  }
});

// ===============================
// PREVIOUS PAGE
// ===============================
prevBtn?.addEventListener('click', event => {
  event.stopPropagation();

  if (currentPage > 0) {
    currentPage--;

    updateBook();
  }
});

// ===============================
// CELEBRATE BUTTON
// ===============================
celebrateBtn?.addEventListener('click', event => {
  event.stopPropagation();

  triggerConfetti();
});

// ===============================
// KEYBOARD NAVIGATION
// ===============================
document.addEventListener('keydown', event => {
  // Don't interfere with typing in inputs/textareas.
  const activeElement = document.activeElement;

  if (
    activeElement &&
    (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA'
    )
  ) {
    return;
  }

  if (event.key === 'ArrowRight') {
    if (
      !nextBtn?.disabled &&
      !mainApp?.classList.contains('hidden')
    ) {
      nextBtn.click();
    }
  }

  if (event.key === 'ArrowLeft') {
    if (
      !prevBtn?.disabled &&
      !mainApp?.classList.contains('hidden')
    ) {
      prevBtn.click();
    }
  }
});

// ===============================
// SAFETY: UPDATE INITIAL BOOK STATE
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  updateBook();
});