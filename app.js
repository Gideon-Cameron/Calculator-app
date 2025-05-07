const screen = document.getElementById('screen');
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle__slider');
const themeDot = document.querySelector('.theme-toggle__circle');
const keysContainer = document.querySelector('.calculator__keys');

const themes = ['default', 'theme-light', 'theme-dark'];
let currentThemeIndex = 0;
let shouldClearScreen = true;

function applyTheme(index) {
  themes.forEach(theme => body.classList.remove(theme));
  if (index > 0) body.classList.add(themes[index]);
}

themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme(currentThemeIndex);
});

function deleteLastChar() {
  const content = screen.textContent;
  screen.textContent = content.length > 1 ? content.slice(0, -1) : '0';
  shouldClearScreen = screen.textContent === '0';
}

function resetDisplay() {
  screen.textContent = '0';
  shouldClearScreen = true;
}

function appendValue(value) {
  if (shouldClearScreen || screen.textContent === '0') {
    screen.textContent = value;
    shouldClearScreen = false;
  } else {
    screen.textContent += value;
  }
}

function calculateExpression() {
  try {
    const expression = screen.textContent.replace(/×/g, '*').replace(/÷/g, '/');
    const result = Function('"use strict";return (' + expression + ')')();
    screen.textContent = result;
    shouldClearScreen = true;
  } catch {
    screen.textContent = 'Error';
    shouldClearScreen = true;
  }
}

keysContainer.addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.matches('button')) return;

  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (value !== undefined) appendValue(value);
  else if (action === 'delete') deleteLastChar();
  else if (action === 'reset') resetDisplay();
  else if (action === 'calculate') calculateExpression();
});
