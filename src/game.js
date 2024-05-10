const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const { createRound} = require("../src/round")
const { createDeck, countCards } = require("../src/deck")



function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

function startGame() {
  const deck = createDeck(prototypeQuestions);

  const round = createRound(deck);

  printMessage(deck);
  printQuestion(round);

  return  deck, round ;
}

module.exports = { printMessage, printQuestion, startGame };
