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
  // Create the deck using prototypeQuestions
  const deck = createDeck(prototypeQuestions);

  // Create a new round using the deck
  const round = createRound(deck);

  // Print the message and question
  printMessage(deck);
  printQuestion(round);

  // Return an object containing the deck and round
  return  deck, round ;
}

module.exports = { printMessage, printQuestion, startGame };
