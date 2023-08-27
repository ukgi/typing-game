'use strict';

export default class Score {
  constructor() {
    this.input = document.querySelector('input');
    this.points = document.querySelector('.points');
    this.score = 0;
  }

  setScore(score) {
    this.score = score;
  }

  setRandomWordsHandler(handler) {
    this.randomWordsHandler = handler;
  }

  correct() {
    this.scoreHandler();
    this.input.value = '';
    this.randomWordsHandler();
  }

  wrong() {
    this.input.value = '';
  }

  scoreHandler() {
    this.points.textContent = `${(this.score += 10)}점`;
  }
}
