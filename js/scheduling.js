(function () {
  function parseProcesses(input) {
    const pattern = /([A-Za-z]+)\s*=\s*(\d+)/g;
    const processes = [];
    let match;
    while ((match = pattern.exec(input)) !== null) {
      processes.push({ name: match[1], burst: Number(match[2]), priority: processes.length + 1 });
    }
    return processes;
  }

  function computeFcfs(processes) {
    let totalWaiting = 0;
    let totalTurnaround = 0;
    let currentTime = 0;
    const history = [];

    processes.forEach((process) => {
      const waiting = currentTime;
      const turnaround = currentTime + process.burst;
      totalWaiting += waiting;
      totalTurnaround += turnaround;
      history.push(`${process.name} (${waiting}, ${turnaround})`);
      currentTime += process.burst;
    });

    return { history, waiting: totalWaiting / processes.length, turnaround: totalTurnaround / processes.length };
  }

  function computeSjf(processes) {
    const sorted = [...processes].sort((a, b) => a.burst - b.burst);
    let currentTime = 0;
    let totalWaiting = 0;
    let totalTurnaround = 0;
    const history = [];

    sorted.forEach((process) => {
      const waiting = currentTime;
      const turnaround = currentTime + process.burst;
      totalWaiting += waiting;
      totalTurnaround += turnaround;
      history.push(`${process.name} (${waiting}, ${turnaround})`);
      currentTime += process.burst;
    });

    return { history, waiting: totalWaiting / sorted.length, turnaround: totalTurnaround / sorted.length };
  }

  function computeRoundRobin(processes, quantum = 2) {
    let queue = [...processes];
    let currentTime = 0;
    const history = [];
    const waits = {};
    const completed = [];

    while (queue.length) {
      const current = queue.shift();
      const slice = Math.min(current.burst, quantum);
      current.burst -= slice;
      currentTime += slice;
      history.push(current.name);

      if (current.burst > 0) {
        queue.push(current);
      } else {
        completed.push({ name: current.name, turnaround: currentTime, waiting: currentTime - (current.initialBurst || current.burst) });
      }
    }

    return { history, waiting: completed.reduce((sum, item) => sum + item.waiting, 0) / completed.length, turnaround: completed.reduce((sum, item) => sum + item.turnaround, 0) / completed.length };
  }

  function computePriority(processes) {
    const sorted = [...processes].sort((a, b) => a.priority - b.priority);
    let currentTime = 0;
    let totalWaiting = 0;
    let totalTurnaround = 0;
    const history = [];

    sorted.forEach((process) => {
      const waiting = currentTime;
      const turnaround = currentTime + process.burst;
      totalWaiting += waiting;
      totalTurnaround += turnaround;
      history.push(`${process.name} (${waiting}, ${turnaround})`);
      currentTime += process.burst;
    });

    return { history, waiting: totalWaiting / sorted.length, turnaround: totalTurnaround / sorted.length };
  }

  function renderChart(history) {
    const container = document.getElementById('ganttChart');
    if (!container) return;
    container.innerHTML = history.map((item) => `<div class="gantt-slot">${item}</div>`).join('');
  }

  function renderStats(stats) {
    const box = document.getElementById('scheduleStats');
    if (!box) return;
    box.innerHTML = `
      <p><strong>Average waiting time:</strong> ${stats.waiting.toFixed(2)} units</p>
      <p><strong>Average turnaround time:</strong> ${stats.turnaround.toFixed(2)} units</p>
    `;
  }

  function scheduleProcesses() {
    const input = document.getElementById('processInput');
    const select = document.getElementById('algoSelect');
    if (!input || !select) return;

    const processes = parseProcesses(input.value);
    if (!processes.length) {
      document.getElementById('scheduleStats').innerHTML = '<p>Please enter valid processes, for example: P1 = 5, P2 = 3.</p>';
      return;
    }

    let stats = { history: [], waiting: 0, turnaround: 0 };
    const chosen = select.value;

    switch (chosen) {
      case 'fcfs':
        stats = computeFcfs(processes);
        break;
      case 'sjf':
        stats = computeSjf(processes);
        break;
      case 'roundrobin':
        const temp = processes.map((process) => ({ ...process, initialBurst: process.burst, burst: process.burst }));
        stats = computeRoundRobin(temp);
        break;
      case 'priority':
        stats = computePriority(processes.map((process, index) => ({ ...process, priority: index + 1 })));
        break;
      default:
        stats = computeFcfs(processes);
    }

    renderChart(stats.history.length ? stats.history : processes.map((process) => process.name));
    renderStats(stats);
  }

  window.Scheduler = {
    init() {
      const button = document.getElementById('scheduleBtn');
      if (!button) return;
      button.addEventListener('click', scheduleProcesses);
    }
  };
})();
