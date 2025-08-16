// --- Data ---
const CHOICES = ["Bear", "Ninja", "Hunter"];
const BEATS = { Bear: "Ninja", Ninja: "Hunter", Hunter: "Bear" };

// --- State (persists during a game session) ---
let playerWins = 0;
let computerWins = 0;

// --- DOM refs ---
const initial = document.getElementById("initial");
const result = document.getElementById("result");

const youChoiceEl = document.getElementById("youChoice");
const cpuChoiceEl = document.getElementById("cpuChoice");
const outcomeEl   = document.getElementById("outcome");
const youWinsEl   = document.getElementById("youWins");
const cpuWinsEl   = document.getElementById("cpuWins");

const choiceButtons = document.querySelectorAll("button.choice");
const playAgainBtn  = document.getElementById("playAgain");
const endSessionBtn = document.getElementById("endSession");

// --- Helpers ---
function getComputerChoice(){
  const idx = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[idx];
}

function decideWinner(player, computer){
  if (player === computer) return "tie";
  return BEATS[player] === computer ? "player" : "computer";
}

function updateWinsDisplay(){
  youWinsEl.textContent = String(playerWins);
  cpuWinsEl.textContent = String(computerWins);
}

function showInitial(){
  // Return to initial page display (win counter is hidden there by design)
  result.classList.add("hidden");
  initial.classList.remove("hidden");
}

function showResult(player, computer, verdict){
  // Update fields
  youChoiceEl.textContent = player;
  cpuChoiceEl.textContent = computer;

  if (verdict === "player"){
    outcomeEl.textContent = "You win this round!";
  } else if (verdict === "computer"){
    outcomeEl.textContent = "Computer wins this round.";
  } else {
    outcomeEl.textContent = "It’s a tie.";
  }

  updateWinsDisplay();

  // Reveal result view (which includes the win counter box)
  initial.classList.add("hidden");
  result.classList.remove("hidden");
}

function playRound(playerChoice){
  const computerChoice = getComputerChoice();
  const verdict = decideWinner(playerChoice, computerChoice);

  if (verdict === "player") playerWins++;
  else if (verdict === "computer") computerWins++;
  // ties do not change counters

  showResult(playerChoice, computerChoice, verdict);
}

function resetSession(){
  playerWins = 0;
  computerWins = 0;
  showInitial();
}

// --- Events ---
choiceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const playerChoice = btn.dataset.choice;
    playRound(playerChoice);
  });
});

playAgainBtn.addEventListener("click", showInitial);
endSessionBtn.addEventListener("click", resetSession);

// Start on initial screen
showInitial();
