(function () {
  const glossaryTerms = [
    { term: 'ALU', definition: 'Arithmetic Logic Unit performs calculations and logic operations.' },
    { term: 'CPU', definition: 'Central Processing Unit executes instructions and manages computation.' },
    { term: 'GPU', definition: 'Graphics Processing Unit accelerates parallel workloads such as images and simulation.' },
    { term: 'RAM', definition: 'Random Access Memory holds actively used data and instructions.' },
    { term: 'ROM', definition: 'Read-Only Memory stores instructions or data used at startup.' },
    { term: 'Cache', definition: 'Small fast memory close to the CPU that stores frequently used data.' },
    { term: 'Register', definition: 'A tiny storage area used by the CPU for immediate access.' },
    { term: 'Bus', definition: 'A communication path that carries data, addresses, or control signals.' },
    { term: 'Kernel', definition: 'The core of the operating system managing hardware and process control.' },
    { term: 'Process', definition: 'A running program with its own memory and resources.' },
    { term: 'Thread', definition: 'A unit of execution inside a process that can run concurrently.' },
    { term: 'Interrupt', definition: 'A signal that pauses normal CPU work to handle an urgent event.' },
    { term: 'Instruction', definition: 'A command or operation that the CPU can perform.' },
    { term: 'Compiler', definition: 'A program that converts source code into machine instructions.' },
    { term: 'BIOS', definition: 'Firmware used during the startup process to initialize hardware.' },
    { term: 'UEFI', definition: 'Modern firmware interface that replaces some older BIOS functions.' },
    { term: 'SSD', definition: 'Solid-state drive using flash memory for storage.' },
    { term: 'HDD', definition: 'Hard disk drive using rotating magnetic media.' },
    { term: 'Virtual Memory', definition: 'An OS technique that uses storage to extend physical RAM.' },
    { term: 'DMA', definition: 'Direct Memory Access allows devices to move data without CPU involvement.' },
    { term: 'RISC', definition: 'Reduced Instruction Set Computing uses simpler instructions.' },
    { term: 'CISC', definition: 'Complex Instruction Set Computing supports richer instructions.' }
  ];

  function renderGlossary(list) {
    const container = document.getElementById('glossaryList');
    if (!container) return;
    container.innerHTML = list.map((item) => `
      <article class="glossary-item">
        <h3>${item.term}</h3>
        <p>${item.definition}</p>
      </article>
    `).join('');
  }

  function filterGlossary(query) {
    const normalized = query.trim().toLowerCase();
    const filtered = glossaryTerms.filter((item) => item.term.toLowerCase().includes(normalized) || item.definition.toLowerCase().includes(normalized));
    renderGlossary(filtered.length ? filtered : [{ term: 'No result', definition: 'No matching concept found.' }]);
  }

  window.Glossary = {
    init() {
      renderGlossary(glossaryTerms);
      const input = document.getElementById('glossarySearch');
      if (!input) return;
      input.addEventListener('input', (event) => filterGlossary(event.target.value));
    }
  };
})();
