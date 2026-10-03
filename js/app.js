(function () {
  function updateProgressFill() {
    const fill = document.getElementById('progressFill');
    if (!fill) return;
    const progress = window.StorageLocal.getProgress();
    const allValues = Object.values(progress).map((value) => Number(value || 0));
    const total = allValues.reduce((sum, value) => sum + value, 0);
    const average = allValues.length ? total / allValues.length : 0;
    fill.style.width = `${Math.min(average, 100)}%`;
  }

  function registerProgress(sectionId, level = 100) {
    const progress = window.StorageLocal.getProgress();
    progress[sectionId] = level;
    window.StorageLocal.setProgress(progress);
    updateProgressFill();
  }

  function initBookMarks() {
    const bookmarks = window.StorageLocal.getBookmarks();
    const container = document.getElementById('bookmarksList');
    if (container) {
      container.innerHTML = bookmarks.length ? bookmarks.map((item) => `<li>${item}</li>`).join('') : '<li>No bookmarks yet.</li>';
    }

    document.querySelectorAll('.bookmark-btn').forEach((button) => {
      const label = button.dataset.bookmark || 'CPU';
      const bookmarked = bookmarks.includes(label);
      button.textContent = bookmarked ? '★' : '☆';
      button.addEventListener('click', () => {
        const next = window.StorageLocal.toggleBookmark(label);
        button.textContent = next.includes(label) ? '★' : '☆';
        if (container) {
          container.innerHTML = next.length ? next.map((item) => `<li>${item}</li>`).join('') : '<li>No bookmarks yet.</li>';
        }
      });
    });
  }

  function initQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    const result = document.getElementById('quizResult');
    if (!options.length || !result) return;
    options.forEach((option) => {
      option.addEventListener('click', () => {
        const isCorrect = option.dataset.correct === 'true';
        result.textContent = isCorrect ? 'Correct. The ALU performs arithmetic and logical operations inside the CPU.' : 'Not quite. The ALU performs arithmetic and logic operations.';
        result.style.color = isCorrect ? '#34d399' : '#fbbf24';
      });
    });
  }

  function initSectionProgressTracking() {
    const sections = ['cpu', 'memory', 'storage', 'io', 'os', 'data-flow', 'glossary'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            registerProgress(sectionId, 100);
          }
        }
      });
    }, { threshold: 0.35 });

    document.querySelectorAll('.section').forEach((section) => observer.observe(section));
  }

  function initGlobalInteractions() {
    document.querySelectorAll('.explore-card').forEach((card) => {
      card.addEventListener('click', () => {
        registerProgress('cpu', 100);
      });
    });

    document.querySelectorAll('.mini-card, .register-card, .io-card').forEach((button) => {
      button.addEventListener('click', () => {
        registerProgress('cpu', 100);
      });
    });
  }

  function initBinaryConverter() {
    const button = document.getElementById('convertBinaryBtn');
    const input = document.getElementById('decimalInput');
    const result = document.getElementById('binaryResult');

    if (button && input && result) {
      button.addEventListener('click', () => {
        const value = Number(input.value);
        if (!Number.isFinite(value) || value < 0) {
          result.textContent = 'Please enter a valid non-negative integer.';
          return;
        }
        const binary = value.toString(2);
        result.innerHTML = `<strong>Binary:</strong> ${binary}<br><strong>Hexadecimal:</strong> ${value.toString(16).toUpperCase()}`;
      });
    }

    const hexButton = document.getElementById('convertHexBtn');
    const hexInput = document.getElementById('hexInput');
    const hexResult = document.getElementById('hexResult');

    if (hexButton && hexInput && hexResult) {
      hexButton.addEventListener('click', () => {
        const raw = hexInput.value.trim();
        const value = Number.parseInt(raw, 16);
        if (Number.isNaN(value)) {
          hexResult.textContent = 'Please enter a valid hexadecimal value.';
          return;
        }
        hexResult.innerHTML = `<strong>Decimal:</strong> ${value}<br><strong>Binary:</strong> ${value.toString(2)}`;
      });
    }
  }

  function initDom() {
    window.Navigation.init();
    window.Search.init();
    window.CPUExplorer.init();
    window.MemoryExplorer.init();
    window.StorageExplorer.init();
    window.DataFlowExplorer.init();
    window.Scheduler.init();
    window.Glossary.init();
    initBookMarks();
    initQuiz();
    initSectionProgressTracking();
    initGlobalInteractions();
    initBinaryConverter();
    updateProgressFill();
  }

  document.addEventListener('DOMContentLoaded', initDom);
})();
