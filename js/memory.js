(function () {
  const memoryFacts = {
    Registers: 'Registers are extremely small and very fast storage locations inside the CPU.',
    Cache: 'Cache stores frequently used data close to the CPU so it responds faster than RAM.',
    RAM: 'RAM temporarily holds the data and instructions a running program needs right now.',
    SSD: 'SSD storage is persistent and much faster than older mechanical storage.',
    HDD: 'HDD storage retains data on magnetic platters and is generally slower but can be cost-effective.'
  };

  function initMemoryHierarchy() {
    document.querySelectorAll('.pyramid-layer').forEach((layer) => {
      layer.addEventListener('click', () => {
        const memoryType = layer.dataset.memory || 'Registers';
        const detail = document.getElementById('ramDetail');
        if (!detail) return;
        detail.innerHTML = `<h3>${memoryType}</h3><p>${memoryFacts[memoryType] || memoryFacts.Registers}</p>`;
      });
    });
  }

  function initRamMemory() {
    document.querySelectorAll('.ram-row').forEach((row) => {
      row.addEventListener('click', () => {
        const address = row.dataset.address || '0x001';
        const value = row.dataset.value || '0';
        const detail = document.getElementById('ramDetail');
        if (!detail) return;
        detail.innerHTML = `
          <h3>Address → Data</h3>
          <p><strong>${address}</strong> → <strong>${value}</strong></p>
          <p>Reading a memory address tells the system which data value is stored at that location.</p>
        `;
      });
    });
  }

  window.MemoryExplorer = {
    init() {
      initMemoryHierarchy();
      initRamMemory();
    }
  };
})();
