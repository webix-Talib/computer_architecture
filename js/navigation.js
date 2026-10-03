(function () {
  function initTheme() {
    const savedTheme = window.StorageLocal.getTheme();
    const body = document.body;
    const isLight = savedTheme === 'light';
    body.classList.toggle('light-theme', isLight);
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.textContent = isLight ? '☾' : '☼';
      toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }

  function initHamburger() {
    const button = document.querySelector('.nav-toggle');
    const panel = document.querySelector('.nav-panel');
    if (!button || !panel) return;
    button.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function initThemeToggle() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      button.textContent = isLight ? '☾' : '☼';
      button.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      window.StorageLocal.setTheme(isLight ? 'light' : 'dark');
    });
  }

  function initProgressBar() {
    const fill = document.getElementById('progressFill');
    if (!fill) return;
    const progress = window.StorageLocal.getProgress();
    const values = Object.values(progress);
    const average = values.length ? values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length : 0;
    fill.style.width = `${Math.min(average, 100)}%`;
  }

  function initLearningMode() {
    const trigger = document.getElementById('startLearningBtn');
    const modal = document.getElementById('learning-mode');
    const closeButton = document.getElementById('closeLearningBtn');
    if (!trigger || !modal || !closeButton) return;
    const sequence = [
      'What is a Computer?',
      'CPU',
      'Memory',
      'Storage',
      'Buses',
      'I/O',
      'Operating System',
      'Data Flow'
    ];
    const list = document.getElementById('learningSequence');
    if (list) {
      list.innerHTML = sequence.map((item, index) => `<li>${index + 1}. ${item}</li>`).join('');
    }
    trigger.addEventListener('click', () => modal.classList.remove('hidden'));
    closeButton.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }

  window.Navigation = {
    init() {
      initTheme();
      initHamburger();
      initThemeToggle();
      initProgressBar();
      initLearningMode();
    }
  };
})();
