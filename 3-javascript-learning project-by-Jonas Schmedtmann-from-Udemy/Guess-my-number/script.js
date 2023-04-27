"use strict";


let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
document.querySelector(".score").textContent = score;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number");

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct number! You win!!!!");

    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    // reset high score
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    } else {
      document.querySelector(".highscore").textContent = highScore;
    }

  }

  // When guess is wrong  
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
  // When guess is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📈 Too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "💥 You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }

  //   // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📉 Too low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "💥 You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector(".score").textContent = score;

  displayMessage("Start guessing...");
  document.querySelector(".guess").value = 0;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
});
