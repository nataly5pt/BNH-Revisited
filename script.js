"use strict";

/* Bear • Ninja • Hunter — Functions 1 (Revisited) */

// Data
const CHOICES = ["Bear", "Ninja", "Hunter"];
const BEATS = { Bear: "Ninja", Ninja: "Hunter", Hunter: "Bear" };

let playerWins = 0;
let computerWins = 0;
let resultsEl;

// Init after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  resultsEl =
    document.getElementById("results") ||
    (() => {
      const el = document.createElement("div");
      el.id = "results";
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
      return el;
    })();

  resultsEl.hidden = true;

  // Event delegation: works for the three choice buttons anywhere on the page,
  // and for the action buttons we inject later.
  document.addEventListener("click", (evt) => {
    const choiceBtn = evt.target.closest("button[data-choice]");
    if (choiceBtn) {
      const choice = normalize(choiceBtn.dataset.choice);
      if (CHOICES.includes(choice)) playRound(choice);
      return;
    }
    if (evt.target.id === "playAgain") {
      resetRoundUI();
      return;
    }
    if (evt.target.id === "endSession") {
      endSession();
      return;
    }
  });
});

// Helpers
function normalize(s = "") {
  s = s.trim();
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function randomComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function decideWinner(player, computer) {
  if (player === computer) return "tie";
  return BEATS[player] === computer ? "player" : "computer";
}

// Round flow
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
}

function resetRoundUI() {
  resultsEl.hidden = true;
  resultsEl.innerHTML = "";
}

function endSession() {
  playerWins = 0;
  computerWins = 0;
  resetRoundUI();
}


