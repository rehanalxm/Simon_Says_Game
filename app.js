let gameSeq = [];
let userSeq = [];
const btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;

const h2 = document.querySelector("h2");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  if (!started) {
    started = true;
    startBtn.disabled = true;
    startBtn.innerText = "Game in Progress...";
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  const randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  flashBtn(randBtn);
}

function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score: ${level}<br>Press Start to try again.`;
    document.body.classList.add("danger");
    setTimeout(() => {
      document.body.classList.remove("danger");
    }, 400);
    resetGame();
  }
}

function btnPress() {
  const btn = this;
  const color = btn.classList[1];
  userSeq.push(color);
  flashBtn(btn);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.disabled = false;
  startBtn.innerText = "Start Game";
}
