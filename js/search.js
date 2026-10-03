(function () {
  const searchableItems = [
    { title: 'CPU', sectionId: 'cpu' },
    { title: 'Cache', sectionId: 'cache' },
    { title: 'Memory', sectionId: 'memory' },
    { title: 'RA M', sectionId: 'ram' },
    { title: 'RAM', sectionId: 'ram' },
    { title: 'Storage', sectionId: 'storage' },
    { title: 'I/O', sectionId: 'io' },
    { title: 'Buses', sectionId: 'buses' },
    { title: 'Data Flow', sectionId: 'data-flow' },
    { title: 'Operating System', sectionId: 'os' },
    { title: 'ALU', sectionId: 'alu' },
    { title: 'Register', sectionId: 'registers' },
    { title: 'Virtual Memory', sectionId: 'virtual-memory' },
    { title: 'Interrupt', sectionId: 'interrupts' },
    { title: 'Glossary', sectionId: 'glossary' }
  ];

  function renderResults(query) {
    const results = document.getElementById('searchResults');
    if (!results) return;
    const cleanedQuery = query.trim().toLowerCase();
    if (!cleanedQuery) {
      results.innerHTML = '<div class="search-item"><span>Type a concept to search.</span></div>';
      return;
    }

    const filtered = searchableItems.filter((item) => item.title.toLowerCase().includes(cleanedQuery));
    if (!filtered.length) {
      results.innerHTML = '<div class="search-item"><span>No matching concept found.</span></div>';
      return;
    }

    results.innerHTML = filtered.map((item) => `
      <button class="search-item" data-target="${item.sectionId}" type="button">
        <span>${item.title}</span>
        <small>Open section</small>
      </button>
    `).join('');

    results.querySelectorAll('.search-item').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        document.getElementById('searchOverlay').classList.add('hidden');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('globalSearchInput');
    if (!overlay || !input) return;
    overlay.classList.remove('hidden');
    input.focus();
    input.value = '';
    renderResults('');
  }

  function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) overlay.classList.add('hidden');
  }

  window.Search = {
    init() {
      const toggle = document.querySelector('.search-toggle');
      const closeButton = document.querySelector('.close-search');
      const input = document.getElementById('globalSearchInput');
      const overlay = document.getElementById('searchOverlay');

      if (toggle) {
        toggle.addEventListener('click', openSearch);
      }
      if (closeButton) {
        closeButton.addEventListener('click', closeSearch);
      }
      if (overlay) {
        overlay.addEventListener('click', (event) => {
          if (event.target === overlay) closeSearch();
        });
      }
      if (input) {
        input.addEventListener('input', (event) => renderResults(event.target.value));
      }

      document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault();
          openSearch();
        }
        if (event.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
          closeSearch();
        }
      });
    }
  };
})();
