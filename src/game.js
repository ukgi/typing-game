'use strict';

import Data from './data.js';
import Score from './score.js';

export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  build() {
    return new Game(this.gameDuration);
  }
}

class Game {
  constructor(time) {
    this.isGaming = 'init';
    this.time = time;
    this.startBtn = document.querySelector('.start-btn');
    this.startBtn.addEventListener('click', () => {
      this.setIsGaming('start');
    });
    this.input = document.querySelector('input');
    this.points = document.querySelector('.points');
    this.timer = document.querySelector('.time-remaining');
    this.score = new Score();
    this.data = new Data('./words.json');
    this.score.setRandomWordsHandler(this.data.randomWordsHandler);
    this.wordList = document.querySelector('.words-list');
    this.form = document.querySelector('form');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValue = e.target[0].value;
      const word = this.wordList.lastElementChild.firstChild;
      inputValue === word.nodeValue ? this.score.correct() : this.score.wrong();
    });

    this.render();
  }

  render() {
    this.isGaming === 'init' ? this.init() : this.isGaming === 'start' ? this.start() : this.finish();
  }

  setIsGaming = (bool) => {
    this.isGaming = bool;
    this.render();
  };

  init() {
    this.input.classList.add('blocking');
  }

  start() {
    this.startBtn.classList.add('blocking');
    this.startBtn.textContent = '게임중';
    this.input.classList.remove('blocking');
    this.input.removeAttribute('disabled');
    this.input.focus();
    this.score.setScore(0);
    this.points.textContent = `${this.score.score}점`;
    this.data.randomWordsHandler();
    this.onTimer(this.time);
  }

  onTimer(time) {
    this.timer.textContent = `${time}초`;
    const timeId = setInterval(() => {
      this.timer.textContent = `${--time}초`;
      if (time === 0) {
        this.setIsGaming('finish');
        return clearInterval(timeId);
      }
    }, 1000);
  }

  finish() {
    this.startBtn.textContent = '다시시작';
    this.startBtn.classList.remove('blocking');
    this.input.classList.add('blocking');
    this.input.value = '';
    this.input.setAttribute('disabled', 'disabled');
  }
}
