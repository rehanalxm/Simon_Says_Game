const gameSeq = [];
let userSeq = [];
const btns = ['red', 'yellow', 'green', 'purple'];
let started = false;
let level = 0;

const h2 = document.querySelector("h2");

document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
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
  }, 300);
}

function checkAns(currentIdx) {
  if (userSeq[currentIdx] === gameSeq[currentIdx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    h2.innerHTML = `Game Over! Score: ${level}<br>Press any key to restart.`;
    document.body.style.backgroundColor = "#ff0000";
    setTimeout(() => {
      document.body.style.backgroundColor = "ff0000";
    }, 200);
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

const allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

function resetGame() {
  started = false;
  gameSeq.length = 0;
  userSeq = [];
  level = 0;
}

