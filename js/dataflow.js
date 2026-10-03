(function () {
  function highlightSequence(selector, delay = 480) {
    const nodes = [...document.querySelectorAll(selector)];
    if (!nodes.length) return;
    nodes.forEach((node) => node.classList.remove('active'));
    let index = 0;
    const interval = setInterval(() => {
      nodes.forEach((node) => node.classList.remove('active'));
      if (index < nodes.length) {
        nodes[index].classList.add('active');
      }
      index += 1;
      if (index > nodes.length) {
        clearInterval(interval);
      }
    }, delay);
  }

  function initFlowButtons() {
    const dataButton = document.getElementById('animateDataFlowBtn');
    const keyButton = document.getElementById('pressKeyBtn');
    const dataFlow = document.querySelector('#data-flow .packet-flow');
    const keyFlow = document.querySelector('#key-flow .packet-flow');
    const keyResult = document.getElementById('keyResult');

    if (dataButton && dataFlow) {
      dataButton.addEventListener('click', () => {
        dataFlow.classList.add('data-flow-active');
        highlightSequence('#data-flow .packet-flow span', 520);
      });
    }

    if (keyButton && keyFlow && keyResult) {
      keyButton.addEventListener('click', () => {
        keyResult.textContent = 'The letter "A" appears on your screen.';
        keyFlow.classList.add('data-flow-active');
        highlightSequence('#key-flow .packet-flow span', 430);
      });
    }
  }

  window.DataFlowExplorer = {
    init() {
      initFlowButtons();
    }
  };
})();
