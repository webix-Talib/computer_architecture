(function () {
  const componentData = {
    cpu: {
      title: 'CPU',
      simple: 'The CPU is the main processing unit that executes instructions and controls the computer.',
      technical: 'The central processing unit reads instructions, coordinates arithmetic and logic, and manages data movement between memory and peripherals.',
      what: 'It performs calculations, compares values, and keeps the program flow moving.',
      importance: 'Without the CPU, a computer cannot interpret instructions or run software.',
      example: 'A calculator app uses the CPU to add numbers and update the display.',
      related: 'RAM, registers, cache, buses, memory, and storage.'
    },
    alu: {
      title: 'ALU',
      simple: 'The ALU performs arithmetic and logical operations.',
      technical: 'The Arithmetic Logic Unit handles operations such as addition, subtraction, comparison, and boolean logic.',
      what: 'It evaluates expressions and produces results used by the rest of the CPU.',
      importance: 'The ALU is the core computation engine that turns data into results.',
      example: 'If the program needs to compute 15 + 7, the ALU performs that addition.',
      related: 'Control Unit, registers, instruction fetch cycle.'
    },
    'control-unit': {
      title: 'Control Unit',
      simple: 'The Control Unit coordinates the activities of the CPU.',
      technical: 'It decodes instructions and sends control signals to the ALU, memory, and registers in the right order.',
      what: 'It decides what happens next during each instruction cycle.',
      importance: 'The system would be disorganized without a control unit to sequence actions.',
      example: 'When the CPU sees an instruction to store a value, the control unit tells memory where to write it.',
      related: 'Instruction fetch, decode, execute, ALU.'
    },
    registers: {
      title: 'Registers',
      simple: 'Registers are tiny, very fast storage locations inside the CPU.',
      technical: 'Registers store the current instruction, memory addresses, intermediate values, and status flags needed for immediate execution.',
      what: 'They hold data needed while instructions are being processed.',
      importance: 'Fast access to small values is essential for high-speed execution.',
      example: 'The program counter holds the address of the next instruction to execute.',
      related: 'Program Counter, Instruction Register, Accumulator.'
    },
    cache: {
      title: 'Cache',
      simple: 'Cache is small, fast memory located near the CPU to reduce waiting time.',
      technical: 'The cache stores frequently used data and instructions so the processor can access them more quickly than from RAM.',
      what: 'It improves performance by reducing memory access latency.',
      importance: 'Cache significantly speeds up repeated data access in programs and the operating system.',
      example: 'A program repeatedly reading the same file data may benefit from cache hits.',
      related: 'L1, L2, L3, RAM, memory hierarchy.'
    }
  };

  function updateDetailPanel(data) {
    const title = document.getElementById('detailTitle');
    const simple = document.getElementById('simpleDef');
    const tech = document.getElementById('techDef');
    const what = document.getElementById('whatItDoes');
    const why = document.getElementById('whyImportant');
    const example = document.getElementById('exampleText');
    const related = document.getElementById('relatedText');

    if (!title || !simple || !tech || !what || !why || !example || !related) return;

    title.textContent = data.title;
    simple.textContent = data.simple;
    tech.textContent = data.technical;
    what.textContent = data.what;
    why.textContent = data.importance;
    example.textContent = data.example;
    related.textContent = data.related;
  }

  function initExploreCards() {
    document.querySelectorAll('.explore-card').forEach((card) => {
      card.addEventListener('click', () => {
        const target = card.dataset.target || 'cpu-panel';
        const selected = target.includes('cpu') ? 'cpu'
          : target.includes('memory') ? 'registers'
          : target.includes('storage') ? 'cache'
          : target.includes('io') ? 'control-unit'
          : target.includes('output') ? 'cpu'
          : 'cpu';
        updateDetailPanel(componentData[selected]);
      });
    });
  }

  function updateRegisterDetail(name) {
    const detail = document.getElementById('registerDetail');
    if (!detail) return;

    const registerText = {
      'Program Counter': 'Holds the memory address of the next instruction that should be executed.',
      'Instruction Register': 'Stores the current instruction being decoded and executed.',
      'Accumulator': 'Stores intermediate results from arithmetic and logic operations.',
      'General Purpose Registers': 'Temporarily hold data used during computing tasks.',
      'Stack Pointer': 'Tracks the top of the stack memory used for function calls and temporary data.',
      'Status / Flag Register': 'Tracks conditions such as zero, carry, overflow, or comparison results.'
    };

    detail.innerHTML = `<h3>${name}</h3><p>${registerText[name] || 'Registers are fast, tiny storage locations inside the CPU.'}</p>`;
  }

  function initCpuButtons() {
    document.querySelectorAll('.cpu-spot').forEach((button) => {
      button.addEventListener('click', () => {
        const component = button.dataset.component;
        updateDetailPanel(componentData[component] || componentData.cpu);
      });
    });

    document.querySelectorAll('.register-card').forEach((button) => {
      button.addEventListener('click', () => {
        updateRegisterDetail(button.dataset.register || 'Program Counter');
      });
    });
  }

  function initAluCalculator() {
    const input = document.getElementById('aluInput');
    const output = document.getElementById('aluOutput');
    const button = document.getElementById('aluCalculateBtn');
    if (!input || !output || !button) return;

    button.addEventListener('click', () => {
      const raw = input.value.trim();
      if (!raw) {
        output.textContent = 'Error';
        return;
      }

      const match = raw.match(/^(-?\d+)\s*([+\-*/])\s*(-?\d+)$/);
      if (!match) {
        output.textContent = 'Invalid';
        return;
      }

      const [, left, operator, right] = match;
      const a = Number(left);
      const b = Number(right);
      let result = 0;
      switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b === 0 ? 'Error' : a / b; break;
        default: result = 'Error';
      }
      output.textContent = result;
    });
  }

  function animateCycle() {
    const items = [...document.querySelectorAll('.cycle-flow span')];
    if (!items.length) return;

    items.forEach((item) => item.classList.remove('active'));

    let index = 0;
    const interval = setInterval(() => {
      items.forEach((item) => item.classList.remove('active'));
      if (index < items.length) {
        items[index].classList.add('active');
      }
      index += 1;
      if (index > items.length) {
        clearInterval(interval);
      }
    }, 450);
  }

  function initCycleButton() {
    const button = document.getElementById('runCycleBtn');
    if (!button) return;
    button.addEventListener('click', animateCycle);
  }

  window.CPUExplorer = {
    init() {
      initExploreCards();
      initCpuButtons();
      initAluCalculator();
      initCycleButton();
      updateDetailPanel(componentData.cpu);
    }
  };
})();
