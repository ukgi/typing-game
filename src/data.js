'use strict';

export default class Data {
  constructor(url) {
    this.url = url;
    this.words;
    this.wordList = document.querySelector('.words-list');
    this.setData();
  }

  setData() {
    return new Promise(() => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.url);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status === 200) {
          this.words = JSON.parse(xhr.response);
        } else {
          console.error('Error', xhr.status, xhr.statusText);
        }
      };
    });
  }

  randomWordsHandler = () => {
    const randomIndex = getRandomNumber(0, this.words.length - 1);
    this.wordList.lastElementChild.textContent = this.words[randomIndex];
  };
}

function getRandomNumber(min, max) {
  let radomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return radomNum;
}
