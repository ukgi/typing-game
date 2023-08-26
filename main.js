const startBtn = document.querySelector('.start-btn');
const timer = document.querySelector('.time-remaining');
const input = document.querySelector('input');
const wordList = document.querySelector('.words-list');
const form = document.querySelector('form');
const points = document.querySelector('.points');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = e.target[0].value;
  const word = wordList.lastElementChild.firstChild;
  console.log(inputValue);
  console.log(word.nodeValue);

  inputValue === word.nodeValue ? correct(word.nodeValue) : wrong();
});

let words;
let score = 0;

function getData() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './words.json');
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  });
}

startBtn.addEventListener('click', () => {
  setIsGaming('start');
});

let isGaming = 'init';
render();

function setIsGaming(bool) {
  isGaming = bool;
  render();
}

function render() {
  isGaming === 'init' ? init() : isGaming === 'start' ? start() : finish();
}

function init() {
  input.classList.add('blocking');
}

function start() {
  startBtn.classList.add('blocking');
  startBtn.textContent = '게임중';
  input.classList.remove('blocking');
  input.removeAttribute('disabled');
  input.focus();
  score = 0;
  points.textContent = `${score}점`;

  getData().then((data) => {
    words = data;
    randomWordsHandler();
  });
  onTimer(30);
}

function onTimer(time) {
  timer.textContent = `${time}초`;
  const timeId = setInterval(() => {
    timer.textContent = `${--time}초`;
    if (time === 0) {
      setIsGaming('finish');
      return clearInterval(timeId);
    }
  }, 1000);
}

function finish() {
  startBtn.textContent = '다시시작';
  startBtn.classList.remove('blocking');
  input.classList.add('blocking');
  input.value = '';
  input.setAttribute('disabled', 'disabled');
}

// 랜덤으로 선택된 단어를 화면에 보여주는 기능
// 이 코드는 사용자가 단어를 맞출 때마다 반복 실행되어야한다.
// 지금 코드에서는 불필요한 데이터 페칭이 반복 이루어진다
// ✅ 데이터를 전역에 저장한다음에 해당 데이터를 함수의 인자로 받아와서
// 랜덤 인덱스를 추출하면 되겠다.
function randomWordsHandler() {
  const randomIndex = getRandomNumber(0, words.length - 1);
  wordList.lastElementChild.textContent = words[randomIndex];
}

function getRandomNumber(min, max) {
  let radomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return radomNum;
}

function correct(word) {
  scoreHandler();
  words.splice(
    words.findIndex((w) => w === word),
    1
  );
  input.value = '';
  randomWordsHandler();
}

function wrong() {
  input.value = '';
  randomWordsHandler();
}

function scoreHandler() {
  points.textContent = `${(score += 10)}점`;
}
