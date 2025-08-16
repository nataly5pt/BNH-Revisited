// script.js
'use strict';

// ----- DOM -----
const buttons = document.querySelector('.buttons');
const results  = document.getElementById('results');
const score    = document.getElementById('score');
const actions  = document.querySelector('.actions');

const playerWinsEl   = document.getElementById('playerWins');
const computerWinsEl = document.getElementById('computerWins');

const playAgainBtn = document.getElementById('playAgain');
const endSessionBtn = document.getElementById('endSession');

// ----- Game State -----
let playerWins = 0;
let computerWins = 0;

const CHOICES = ['Bear', 'Ninja', 'Hunter'];
const BEATS = {
  Bear: 'Ninja',   // Bear beats Ninja
  Ninja: 'Hunter', // Ninja beats Hunter
  Hunter: 'Bear'   // Hunter beats Bear
};

// ----- Utilities -----
const randChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

function adjudicate(player, comp) {
  if (player === comp) return 'tie';
  return BEATS[player] === comp ? 'player' : 'computer';
}

// ----- View helpers (yours) -----
const actions = document.getElementById('actions'); // not querySelector('.actions')

function renderRound(player, comp, outcomeText, outcomeClass) {
  results.innerHTML = `
    <p><strong>You chose:</strong> ${player}</p>
    <p><strong>Computer chose:</strong> ${comp}</p>
    <p class="outcome ${outcomeClass}">${outcomeText}</p>
  `;
  results.hidden = false;

  playerWinsEl.textContent   = playerWins;
  computerWinsEl.textContent = computerWins;
  score.hidden = false;

  actions.hidden = false; // shows the ONE actions row
  document.getElementById('playAgain').focus();
}

// Return to initial display (rules + buttons only)
function resetToInitial() {
  results.hidden = true;
  score.hidden   = true;            // win counter only after a single game
  // focus the first choice button for quick replay
  const firstBtn = document.querySelector('.buttons button');
  if (firstBtn) firstBtn.focus();
}

// Fully clear a session (when End Session is clicked)
function clearSession() {
  playerWins = 0;
  computerWins = 0;
  playerWinsEl.textContent = '0';
  computerWinsEl.textContent = '0';
  resetToInitial();
}

// ----- Event Handlers -----
function onChoiceClick(e) {
  const btn = e.target.closest('button[data-choice]');
  if (!btn) return;

  const player = btn.dataset.choice;     // "Bear" | "Ninja" | "Hunter"
  const comp   = randChoice();
  const outcome = adjudicate(player, comp);

  let text, klass;

  if (outcome === 'tie') {
    text  = "It's a tie.";
    klass = 'tie';
  } else if (outcome === 'player') {
    playerWins++;
    text  = 'You win this round.';
    klass = 'win';
  } else {
    computerWins++;
    text  = 'Computer wins this round.';
    klass = 'lose';
  }

  // Update the UI for this single round
  renderRound(player, comp, text, klass);
}

function onPlayAgain() {
  resetToInitial();
}

function onEndSession() {
  clearSession();
  alert('Session cleared. Scores reset to 0. Pick a choice to start a new session.');
}

// ----- Wire up listeners -----
buttons.addEventListener('click', onChoiceClick);
playAgainBtn.addEventListener('click', onPlayAgain);
endSessionBtn.addEventListener('click', onEndSession);

// Start on the initial view
resetToInitial();



