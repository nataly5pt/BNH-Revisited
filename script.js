"use strict";

/* ---------------------------------------------
   Bear • Ninja • Hunter — Functions 1 (Revisited)
   --------------------------------------------- */

// Game data
const CHOICES = ["Bear", "Ninja", "Hunter"];
const BEATS = {
  Bear: "Ninja",
  Ninja: "Hunter",
  Hunter: "Bear",
};

// State that persists through a session
let playerWins = 0;
let computerWins = 0;

// DOM
const resultsEl =
  document.getElementById("results") ||
  (() => {
    const el = document.createElement("div");
    el.id = "results";
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
    return el;
  })();

resultsEl.hidden = true;

// Attach click handlers to the three choice buttons
// (We read the button text as the choice if data-choice is not set.)
const choiceButtons = document.querySelectorAll(".buttons button");
choiceButtons.forEach((btn) => {
  if (!btn.dataset.choice) btn.dataset.choice = btn.textContent.trim();
  btn.addEventListener("click", () => playRound(btn.dataset.choice));
});

// --- Helpers ---
function randomComputerChoice() {
  const idx = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[idx];
}

function decideWinner(player, computer) {
  if (player === computer) return "tie";
  return BEATS[player] === computer ? "player" : "computer";
}

// --- Round flow ---
function playRound(playerChoice) {
  const computerChoice = randomComputerChoice();
  const winner = decideWinner(playerChoice, computerChoice);

  if (winner === "player") playerWins++;
  else if (winner === "computer") computerWins++;

  renderResults(playerChoice, computerChoice, winner);
}

function renderResults(player, computer, winner) {
  const outcomeText =
    winner === "tie"
      ? "It's a tie."
      : winner === "player"
      ? "You win this round."
      : "Computer wins this round.";

  resultsEl.className = "results";
  resultsEl.innerHTML = `
    <p><strong>You chose:</strong> ${player}</p>
    <p><strong>Computer chose:</strong> ${computer}</p>
    <p class="outcome">${outcomeText}</p>

    <div id="score" class="counters">
      <span>Player Wins: <span id="pWins">${playerWins}</span></span>
      <span class="sep">|</span>
      <span>Computer Wins: <span id="cWins">${computerWins}</span></span>
    </div>

    <div class="actions">
      <button id="playAgain" type="button">Play Again</button>
      <button id="endSession" type="button">End Session</button>
    </div>
  `;
  resultsEl.hidden = false;

  // Wire action buttons
  document.getElementById("playAgain").addEventListener("click", resetRoundUI);
  document.getElementById("endSession").addEventListener("click", endSession);
}

// Hide results, keep totals (for another single game)
function resetRoundUI() {
  resultsEl.hidden = true;
  resultsEl.innerHTML = "";
  // Initial page display (rules + buttons) remains visible in your HTML.
}

// Clear totals and return to the initial display
function endSession() {
  playerWins = 0;
  computerWins = 0;
  resetRoundUI();
}

