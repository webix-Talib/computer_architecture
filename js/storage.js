(function () {
  function initCacheSimulation() {
    const button = document.getElementById('accessDataBtn');
    const status = document.getElementById('cacheResult');
    if (!button || !status) return;

    const outcomes = [
      { label: 'L1 Hit', text: 'Cache hit = requested data was found in cache.' },
      { label: 'L2 Hit', text: 'The data was found in a slightly slower cache layer.' },
      { label: 'L3 Hit', text: 'The processor found the data in a larger shared cache.' },
      { label: 'RAM Access', text: 'Cache miss = the data was not found and memory had to be checked.' }
    ];

    button.addEventListener('click', () => {
      const selected = outcomes[Math.floor(Math.random() * outcomes.length)];
      status.textContent = `${selected.label}: ${selected.text}`;
    });
  }

  function initIODeviceDetails() {
    const deviceButtons = document.querySelectorAll('.io-card');
    const detail = document.getElementById('ioDetail');
    if (!deviceButtons.length || !detail) return;

    const deviceRoutes = {
      Keyboard: 'Device → I/O Controller → Bus → CPU / Memory',
      Mouse: 'Device → I/O Controller → Bus → CPU / Memory',
      Microphone: 'Device → I/O Controller → Bus → CPU / Memory',
      Camera: 'Device → I/O Controller → Bus → CPU / Memory',
      Monitor: 'Device → I/O Controller → Bus → CPU / Memory → Output',
      Speaker: 'Device → I/O Controller → Bus → CPU / Memory → Output',
      Printer: 'Device → I/O Controller → Bus → CPU / Memory → Output'
    };

    deviceButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const device = button.dataset.device || 'Keyboard';
        detail.innerHTML = `<h3>${device}</h3><p>${deviceRoutes[device] || deviceRoutes.Keyboard}</p>`;
      });
    });
  }

  window.StorageExplorer = {
    init() {
      initCacheSimulation();
      initIODeviceDetails();
    }
  };
})();
