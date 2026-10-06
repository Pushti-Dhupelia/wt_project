/**
 * Calculator App Logic
 * Expression parsing, keyboard support & calculation history
 */

document.addEventListener('DOMContentLoaded', () => {
  const historyExpr = document.getElementById('historyExpr');
  const currentVal = document.getElementById('currentVal');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  let currentOperand = '0';
  let previousOperand = '';
  let operation = undefined;
  let resetOnNextInput = false;
  let historyLogs = [];

  // Helper: Format number with commas
  const formatDisplay = (numStr) => {
    if (numStr === 'Error') return 'Error';
    const parts = numStr.split('.');
    const integerPart = parseFloat(parts[0]);
    const decimalPart = parts[1];

    let integerDisplay = '';
    if (isNaN(integerPart)) {
      integerDisplay = '0';
    } else {
      integerDisplay = integerPart.toLocaleString('en-US');
    }

    if (decimalPart != null) {
      return `${integerDisplay}.${decimalPart}`;
    } else {
      return integerDisplay;
    }
  };

  const updateDisplay = () => {
    currentVal.textContent = formatDisplay(currentOperand);
    if (operation != null) {
      historyExpr.textContent = `${formatDisplay(previousOperand)} ${operation}`;
    } else {
      historyExpr.innerHTML = '&nbsp;';
    }
  };

  const appendNumber = (number) => {
    if (resetOnNextInput) {
      currentOperand = number;
      resetOnNextInput = false;
      return;
    }
    if (currentOperand === '0' && number !== '.') {
      currentOperand = number;
    } else {
      if (currentOperand.length > 14) return; // Prevent overflow
      currentOperand += number;
    }
  };

  const appendDecimal = () => {
    if (resetOnNextInput) {
      currentOperand = '0.';
      resetOnNextInput = false;
      return;
    }
    if (!currentOperand.includes('.')) {
      currentOperand += '.';
    }
  };

  const chooseOperation = (op) => {
    if (currentOperand === 'Error') return;
    if (previousOperand !== '') {
      compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
  };

  const compute = () => {
    let result;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '÷':
        if (curr === 0) {
          currentOperand = 'Error';
          operation = undefined;
          previousOperand = '';
          updateDisplay();
          return;
        }
        result = prev / curr;
        break;
      case '%':
        result = prev % curr;
        break;
      default:
        return;
    }

    // Save to history
    const exprText = `${formatDisplay(previousOperand)} ${operation} ${formatDisplay(currentOperand)} =`;
    // Clean decimal precision issues
    const resString = parseFloat(result.toFixed(10)).toString();
    addHistoryItem(exprText, resString);

    historyExpr.textContent = exprText;
    currentOperand = resString;
    operation = undefined;
    previousOperand = '';
    resetOnNextInput = true;
  };

  // Immediate scientific calculations
  const applyUnary = (action) => {
    const curr = parseFloat(currentOperand);
    if (isNaN(curr)) return;
    let res;
    let label = '';

    if (action === 'sqrt') {
      if (curr < 0) {
        currentOperand = 'Error';
        updateDisplay();
        return;
      }
      res = Math.sqrt(curr);
      label = `√(${curr})`;
    } else if (action === 'square') {
      res = curr * curr;
      label = `(${curr})²`;
    } else if (action === 'reciprocal') {
      if (curr === 0) {
        currentOperand = 'Error';
        updateDisplay();
        return;
      }
      res = 1 / curr;
      label = `1/(${curr})`;
    } else if (action === 'percent') {
      res = curr / 100;
      label = `${curr}%`;
    } else if (action === 'negate') {
      res = -curr;
    }

    const resStr = parseFloat(res.toFixed(10)).toString();
    if (label) {
      addHistoryItem(`${label} =`, resStr);
      historyExpr.textContent = `${label} =`;
    }
    currentOperand = resStr;
    resetOnNextInput = true;
    updateDisplay();
  };

  const clearAll = () => {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    resetOnNextInput = false;
    updateDisplay();
  };

  const backspace = () => {
    if (currentOperand === 'Error' || resetOnNextInput) {
      clearAll();
      return;
    }
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
      currentOperand = '0';
    } else {
      currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
  };

  // History UI
  const addHistoryItem = (expr, res) => {
    historyLogs.unshift({ expr, res });
    renderHistory();
  };

  const renderHistory = () => {
    if (historyLogs.length === 0) {
      historyList.innerHTML = `<div class="empty-history">No calculations performed yet. Try evaluating an expression!</div>`;
      return;
    }

    historyList.innerHTML = '';
    historyLogs.slice(0, 15).forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-item-expr">${item.expr}</div>
        <div class="history-item-res">${item.res}</div>
      `;
      div.addEventListener('click', () => {
        currentOperand = item.res;
        historyExpr.textContent = item.expr;
        updateDisplay();
      });
      historyList.appendChild(div);
    });
  };

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      historyLogs = [];
      renderHistory();
    });
  }

  // Keypad Click Handlers
  document.querySelectorAll('[data-num]').forEach(btn => {
    btn.addEventListener('click', () => {
      appendNumber(btn.getAttribute('data-num'));
      updateDisplay();
    });
  });

  document.querySelectorAll('[data-op]').forEach(btn => {
    btn.addEventListener('click', () => {
      chooseOperation(btn.getAttribute('data-op'));
      updateDisplay();
    });
  });

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.getAttribute('data-action');
      if (act === 'all-clear') clearAll();
      else if (act === 'backspace') backspace();
      else if (act === 'calculate') {
        compute();
        updateDisplay();
      } else if (act === 'decimal') {
        appendDecimal();
        updateDisplay();
      } else {
        applyUnary(act);
      }
    });
  });

  // Keyboard Listeners
  window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
      appendNumber(e.key);
      updateDisplay();
    } else if (e.key === '.') {
      appendDecimal();
      updateDisplay();
    } else if (e.key === '+') {
      chooseOperation('+');
      updateDisplay();
    } else if (e.key === '-') {
      chooseOperation('-');
      updateDisplay();
    } else if (e.key === '*') {
      chooseOperation('×');
      updateDisplay();
    } else if (e.key === '/') {
      e.preventDefault();
      chooseOperation('÷');
      updateDisplay();
    } else if (e.key === '%') {
      chooseOperation('%');
      updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      compute();
      updateDisplay();
    } else if (e.key === 'Backspace') {
      backspace();
    } else if (e.key === 'Escape') {
      clearAll();
    }
  });

  updateDisplay();
});
